import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const srcDir = path.join(rootDir, "public", "story-1401");
const outDir = path.join(rootDir, "public", "images", "fatimiyeh-1401");
const blurDir = path.join(outDir, "blur");

if (!fs.existsSync(blurDir)) {
  fs.mkdirSync(blurDir, { recursive: true });
}

// 1. Process available png files (01, 02, 03, 05, 06, 07)
const pngFiles = ["01.png", "02.png", "03.png", "05.png", "06.png", "07.png"];

const results = {};

for (const png of pngFiles) {
  const base = path.basename(png, ".png");
  const inputPng = path.join(srcDir, png);
  const outWebp = path.join(outDir, `${base}.webp`);
  const blurWebp = path.join(blurDir, `${base}.webp`);

  console.log(`Converting ${png} to webp...`);
  // High quality WebP with cwebp (q 90, method 6 for maximum compression efficiency without visual quality loss)
  execSync(`cwebp -q 90 -m 6 "${inputPng}" -o "${outWebp}"`);

  console.log(`Generating blur for ${base}.webp...`);
  // Blur preview: resize to 32x23 with low quality and high deblocking
  execSync(`cwebp -resize 32 23 -q 15 -f 100 -m 6 "${outWebp}" -o "${blurWebp}"`);

  const blurBuf = fs.readFileSync(blurWebp);
  const blurDataURL = `data:image/webp;base64,${blurBuf.toString("base64")}`;

  results[base] = {
    url: `/images/fatimiyeh-1401/${base}.webp`,
    blurDataURL,
  };
}

// Fallback for 04 (not present in raw uploads, use stories/04.webp)
const fallback04Src = path.join(rootDir, "public", "stories", "04.webp");
const fallback04Dest = path.join(outDir, "04.webp");
const blur04Dest = path.join(blurDir, "04.webp");

if (fs.existsSync(fallback04Src)) {
  fs.copyFileSync(fallback04Src, fallback04Dest);
  execSync(`cwebp -resize 32 23 -q 15 -f 100 -m 6 "${fallback04Dest}" -o "${blur04Dest}"`);
  const blur04Buf = fs.readFileSync(blur04Dest);
  results["04"] = {
    url: `/images/fatimiyeh-1401/04.webp`,
    blurDataURL: `data:image/webp;base64,${blur04Buf.toString("base64")}`,
  };
}

console.log("Image processing complete!");
console.log(JSON.stringify(results, null, 2));

// Save manifest
fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(results, null, 2), "utf-8");
