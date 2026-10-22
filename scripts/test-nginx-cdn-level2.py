#!/usr/bin/env python3
"""
Verification Script for NGINX CDN Level 2 Customization in story-frame
Tests:
1. Environment file completeness & variable resolution (.env.production & .env.example)
2. NGINX template envsubst simulation (82-cache-policy-map & 45-media)
3. URI to cache profile regular expression matching matrix parsed directly from template
4. Cache-Control pipeline logic (profile -> status -> method -> auth)
5. Media streaming location configuration (gzip off, sendfile 1m chunk, root.d include)
6. Dockerfile, Dockerignore & Compose invariants (multi-stage build, no compose, public icons preserved)
"""

import re
import sys
import fnmatch
from pathlib import Path

def parse_env_file(path: Path) -> dict:
    env = {}
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" in line:
                k, v = line.split("=", 1)
                k = k.strip()
                v = v.strip().strip('"').strip("'")
                env[k] = v
    return env

def test_environment_variables():
    print("--- 1. Testing Environment Variables ---")
    prod_env = parse_env_file(Path(".env.production"))
    example_env = parse_env_file(Path(".env.example"))

    required_vars = [
        "NGINX_FORCE_DOMAIN",
        "NGINX_CANONICAL_SCHEME",
        "NGINX_FORCE_DOMAIN_STATUS",
        "NGINX_TRUSTED_PROXY_CIDRS",
        "NGINX_REAL_IP_HEADER",
        "NGINX_CDN_S_MAXAGE",
        "NGINX_CDN_CACHE_HASHED",
        "NGINX_CDN_MEDIA_S_MAXAGE",
        "NGINX_CDN_CACHE_MEDIA",
        "NGINX_CDN_IMAGE_S_MAXAGE",
        "NGINX_CDN_CACHE_IMAGE",
        "NGINX_CDN_HTML_S_MAXAGE",
        "NGINX_CDN_CACHE_HTML",
        "NGINX_CDN_CACHE_JSON",
        "NGINX_CDN_CACHE_UNVERSIONED_STATIC",
        "NGINX_CDN_CACHE_SERVICE_WORKER",
        "NGINX_CDN_CACHE_ERROR",
        "NGINX_GZIP",
        "NGINX_GZIP_STATIC",
        "NGINX_AUTO_WEBP",
        "NGINX_CORS_ENABLE",
    ]

    for var in required_vars:
        assert var in prod_env, f"Missing {var} in .env.production"
        assert var in example_env, f"Missing {var} in .env.example"
        print(f"  ✓ {var} present in both env files")

    assert prod_env["NGINX_CDN_MEDIA_S_MAXAGE"] == "31536000"
    assert prod_env["NGINX_CDN_CACHE_MEDIA"] == "public, max-age=31536000, immutable"
    print("  ✓ Media cache settings verified")

def test_template_substitution():
    print("\n--- 2. Testing Template envsubst Simulation ---")
    map_template_path = Path("nginx/templates/http.d/82-cache-policy-map.conf.template")
    media_template_path = Path("nginx/templates/location.d/45-media.conf.template")
    assert map_template_path.exists(), "Cache policy map template missing"
    assert media_template_path.exists(), "Media location template missing"

    content = map_template_path.read_text(encoding="utf-8")
    media_content = media_template_path.read_text(encoding="utf-8")

    # In gecut/nginx/cdn, envsubst only replaces $NGINX_* variables
    env = parse_env_file(Path(".env.production"))
    
    # Check for variables to substitute in map template
    nginx_vars_in_template = re.findall(r"\$(NGINX_[A-Z0-9_]+)", content)
    unique_nginx_vars = sorted(set(nginx_vars_in_template))
    print(f"  Found NGINX env variables in map template: {unique_nginx_vars}")
    for var in unique_nginx_vars:
        assert var in env, f"Variable ${var} in template not found in .env.production!"
        print(f"  ✓ ${var} -> '{env[var]}'")

    # Runtime variables that MUST NOT be substituted by entrypoint envsubst
    runtime_vars = ["$uri", "$status", "$request_method", "$http_authorization", "$cdn_cache_profile", "$cdn_cache_control", "$cdn_vary"]
    for rv in runtime_vars:
        assert rv in content, f"Expected runtime variable {rv} missing in template"
        print(f"  ✓ Preserved runtime variable in map template: {rv}")

    assert "$uri" in media_content, "Expected $uri in 45-media.conf.template"
    print("  ✓ Preserved runtime variable in media template: $uri")

def parse_map_rules_from_template(template_path: Path):
    """
    Parses the actual regular expression rules directly from map $uri $cdn_cache_profile { ... }
    in 82-cache-policy-map.conf.template using brace tracking.
    """
    content = template_path.read_text(encoding="utf-8")
    start = content.find("map $uri $cdn_cache_profile")
    assert start != -1, "map $uri $cdn_cache_profile block not found in template!"
    block_start = content.find("{", start)
    brace_count = 0
    block_end = None
    for i in range(block_start, len(content)):
        if content[i] == "{":
            brace_count += 1
        elif content[i] == "}":
            brace_count -= 1
            if brace_count == 0:
                block_end = i
                break
    assert block_end, "Unbalanced braces in template map block!"
    block = content[block_start + 1 : block_end]

    parsed_rules = []
    default_profile = "static_unversioned"

    for line in block.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("default "):
            default_profile = line.split()[1].rstrip(";")
            continue

        parts = line.rstrip(";").rsplit(None, 1)
        if len(parts) == 2:
            pat_str = parts[0].strip('"')
            target = parts[1]
            if pat_str.startswith("~*"):
                flags = re.IGNORECASE
                pat = pat_str[2:]
            elif pat_str.startswith("~"):
                flags = 0
                pat = pat_str[1:]
            else:
                flags = 0
                pat = "^" + re.escape(pat_str)
            parsed_rules.append((re.compile(pat, flags), target))

    return parsed_rules, default_profile

def test_uri_classification():
    print("\n--- 3. Testing URI Cache Profile Regex Classifier (Parsed Directly From Template) ---")
    map_template_path = Path("nginx/templates/http.d/82-cache-policy-map.conf.template")
    rules, default_profile = parse_map_rules_from_template(map_template_path)
    print(f"  Successfully parsed {len(rules)} regex rules from {map_template_path}")

    def classify(uri: str) -> str:
        for pattern, profile in rules:
            if pattern.search(uri):
                return profile
        return default_profile

    test_cases = [
        # Next.js static chunks
        ("/_next/static/chunks/main-12345.js", "hashed"),
        ("/_next/static/css/abcde.css", "hashed"),
        ("/_next/static/media/font.woff2", "hashed"),
        ("/_next/static/media/GeistVF.woff2", "hashed"),
        # Media files (in assets, tableaus, audio, and even if under _next/static/media/)
        ("/assets/booth-1403/1405-07-26_15.11.55_optimized_hevc.mp4", "media"),
        ("/assets/booth-1403/1405-07-26_15.11.55_optimized_h264.mp4", "media"),
        ("/tableaus/1.mp4", "media"),
        ("/tableaus/8.mp4", "media"),
        ("/audio/sample.mp3", "media"),
        ("/video/sample.webm", "media"),
        ("/audio/recording.wav", "media"),
        ("/audio/song.flac", "media"),
        ("/audio/stream.aac", "media"),
        ("/_next/static/media/video.mp4", "media"),
        # Next.js RSC payload files (both root and nested App Router routes)
        ("/index.txt", "html"),
        ("/__next._tree.txt", "html"),
        ("/__next._full.txt", "html"),
        ("/fatimiyeh-1398/index.txt", "html"),
        ("/fatimiyeh-1398/__next.$d$programSlug.__PAGE__.txt", "html"),
        ("/tr/__next._index.txt", "html"),
        ("/categories/tableau/index.txt", "html"),
        ("/categories/tableau/__next.categories.$d$categorySlug.__PAGE__.txt", "html"),
        ("/a/b/c/d/index.txt", "html"),
        ("/a/b/c/d/__next._tree.txt", "html"),
        # Plain text non-RSC files
        ("/README.txt", "static_unversioned"),
        ("/robots.txt", "static_unversioned"),
        ("/llms.txt", "static_unversioned"),
        # Images
        ("/assets/booth-1403/cover.webp", "image"),
        ("/favicon.ico", "image"),
        ("/icon-192.png", "image"),
        ("/artwork.jpg", "image"),
        ("/artwork.svg", "image"),
        # HTML shells
        ("/", "html"),
        ("/index.html", "html"),
        ("/404.html", "html"),
        ("/fatimiyeh-domino/", "html"),
        ("/fatimiyeh-1401/two-ears-one-mouth/", "html"),
        # JSON & manifest
        ("/manifest.json", "json"),
        ("/site.webmanifest", "json"),
        # Service worker (must always revalidate)
        ("/sw.js", "service_worker"),
        ("/service-worker.js", "service_worker"),
        ("/_next/sw.js", "service_worker"),
        # Unversioned documents
        ("/assets/seminar-1403/booklet-trust-and-be-happy-15.pdf", "static_unversioned"),
        ("/assets/seminar-1403/the-life-portfolio.pptx", "static_unversioned"),
    ]

    for uri, expected_profile in test_cases:
        actual_profile = classify(uri)
        assert actual_profile == expected_profile, f"Mismatch for '{uri}': expected '{expected_profile}', got '{actual_profile}'"
        print(f"  ✓ {uri} -> {actual_profile}")

def test_cache_control_pipeline():
    print("\n--- 4. Testing 4-Stage Cache-Control Pipeline ---")
    env = parse_env_file(Path(".env.production"))

    def compute_cache_control(uri_profile: str, status: int, method: str, auth_header: str) -> str:
        # Stage 1: URI profile
        by_uri = {
            "hashed": f"{env['NGINX_CDN_CACHE_HASHED']}, s-maxage={env['NGINX_CDN_S_MAXAGE']}",
            "media": f"{env['NGINX_CDN_CACHE_MEDIA']}, s-maxage={env['NGINX_CDN_MEDIA_S_MAXAGE']}",
            "image": f"{env['NGINX_CDN_CACHE_IMAGE']}, s-maxage={env['NGINX_CDN_IMAGE_S_MAXAGE']}",
            "html": f"{env['NGINX_CDN_CACHE_HTML']}, s-maxage={env['NGINX_CDN_HTML_S_MAXAGE']}",
            "json": env['NGINX_CDN_CACHE_JSON'],
            "service_worker": env['NGINX_CDN_CACHE_SERVICE_WORKER'],
            "static_unversioned": env['NGINX_CDN_CACHE_UNVERSIONED_STATIC'],
        }.get(uri_profile, env['NGINX_CDN_CACHE_UNVERSIONED_STATIC'])

        # Stage 2: Status override
        if status >= 400:
            by_status = env['NGINX_CDN_CACHE_ERROR']
        else:
            by_status = by_uri

        # Stage 3: Method override
        if method not in ("GET", "HEAD"):
            by_method = env['NGINX_CDN_CACHE_ERROR']
        else:
            by_method = by_status

        # Stage 4: Authorization guard
        if auth_header:
            return "private, no-store"
        return by_method

    # Normal GET responses
    assert compute_cache_control("media", 200, "GET", "") == "public, max-age=31536000, immutable, s-maxage=31536000"
    print("  ✓ Media 200 GET: public, max-age=31536000, immutable, s-maxage=31536000")

    assert compute_cache_control("media", 206, "GET", "") == "public, max-age=31536000, immutable, s-maxage=31536000"
    print("  ✓ Media 206 Partial Content: public, max-age=31536000, immutable, s-maxage=31536000")

    assert compute_cache_control("hashed", 200, "GET", "") == "public, max-age=31536000, immutable, s-maxage=31536000"
    print("  ✓ Hashed chunk 200 GET: public, max-age=31536000, immutable, s-maxage=31536000")

    assert compute_cache_control("html", 200, "GET", "") == "public, max-age=0, must-revalidate, s-maxage=0"
    print("  ✓ HTML shell / RSC 200 GET: public, max-age=0, must-revalidate, s-maxage=0")

    # Error overrides
    assert compute_cache_control("media", 404, "GET", "") == "no-store"
    print("  ✓ 404 Not Found override: no-store")

    assert compute_cache_control("hashed", 500, "GET", "") == "no-store"
    print("  ✓ 500 Server Error override: no-store")

    # Method overrides
    assert compute_cache_control("media", 200, "POST", "") == "no-store"
    print("  ✓ POST method override: no-store")

    # Authorization guard
    assert compute_cache_control("media", 200, "GET", "Bearer token123") == "private, no-store"
    print("  ✓ Authorization header guard: private, no-store")

def test_media_location_template():
    print("\n--- 5. Testing Media Location Template ---")
    loc_path = Path("nginx/templates/location.d/45-media.conf.template")
    assert loc_path.exists(), "Media location template missing"
    content = loc_path.read_text(encoding="utf-8")

    assert "gzip off;" in content
    assert "gzip_static off;" in content
    assert "sendfile on;" in content
    assert "sendfile_max_chunk 1m;" in content
    assert "tcp_nopush on;" in content
    assert "tcp_nodelay on;" in content
    assert "include /etc/nginx/conf.d/location.d/root.d/*.conf;" in content
    assert "try_files $uri =404;" in content
    print("  ✓ All required media directives confirmed")

def test_dockerfile_and_compose():
    print("\n--- 6. Testing Dockerfile, Dockerignore & Compose invariants ---")
    df = Path("Dockerfile").read_text(encoding="utf-8")
    assert "FROM node:22-alpine AS builder" in df
    assert "FROM ghcr.io/gecut/nginx/cdn:2.0.0" in df
    assert "COPY nginx/templates/ /etc/nginx/templates/" in df
    assert "NGINX_CDN_CACHE_MEDIA" in df
    assert "NGINX_CDN_MEDIA_S_MAXAGE" in df
    assert "COPY --chown=nginx:nginx --from=builder /app/out /data/" in df
    print("  ✓ Dockerfile multi-stage structure & Level 2 copy verified")

    for f in Path(".").glob("*compose*"):
        assert False, f"Unexpected compose file found: {f}"
    print("  ✓ Confirmed no compose files exist in repo root")

    # Test .dockerignore to ensure public icons are never excluded
    di_path = Path(".dockerignore")
    assert di_path.exists(), ".dockerignore missing"
    di_content = di_path.read_text(encoding="utf-8")
    
    # Must NOT have an unanchored *.png wildcard that kills public icons
    lines = [l.strip() for l in di_content.splitlines() if l.strip() and not l.strip().startswith("#")]
    assert "*.png" not in lines, "Unanchored *.png in .dockerignore excludes public PNG icons!"
    assert "!public/**/*.png" in lines or "!public/*.png" in lines, ".dockerignore must whitelist public PNG icons"
    print("  ✓ .dockerignore verified (public PWA PNG icons preserved, root screenshots excluded)")

if __name__ == "__main__":
    test_environment_variables()
    test_template_substitution()
    test_uri_classification()
    test_cache_control_pipeline()
    test_media_location_template()
    test_dockerfile_and_compose()
    print("\n==============================================")
    print("ALL VERIFICATION CHECKS PASSED SUCCESSFULLY! ✓")
    print("==============================================")
