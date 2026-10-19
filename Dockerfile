# syntax=docker/dockerfile:1

# Stage 1: Build static assets using Node.js & Bun (for fast install and stable Next.js build)
FROM node:22-alpine AS builder

WORKDIR /app

# Install Bun for fast package installation
RUN npm install -g bun@1.3.14

# Install dependencies with frozen lockfile
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source code and build Next.js static export using Node runtime
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npx next build

# Stage 2: Production static origin using pinned ghcr.io/gecut/nginx/cdn:2.0.0
FROM ghcr.io/gecut/nginx/cdn:2.0.0

# Copy Level 2 NGINX templates (cache policy map & media streaming configuration)
COPY nginx/templates/ /etc/nginx/templates/

# Default cache policy for media streaming assets (1 year immutable edge cache)
ENV NGINX_CDN_CACHE_MEDIA="public, max-age=31536000, immutable" \
    NGINX_CDN_MEDIA_S_MAXAGE="31536000"

# Copy static export output into /data with correct nginx worker ownership
COPY --chown=nginx:nginx --from=builder /app/out /data/
