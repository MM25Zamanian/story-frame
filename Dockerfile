# syntax=docker/dockerfile:1

# Stage 1: Build static assets using Bun
FROM oven/bun:1.3-alpine AS builder

WORKDIR /app

# Install dependencies with frozen lockfile for speed and reproducibility
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source code and build Next.js static export
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# Stage 2: Production static origin using pinned ghcr.io/gecut/nginx/cdn:2.0.0
FROM ghcr.io/gecut/nginx/cdn:2.0.0

# Copy static export output into /data with correct nginx worker ownership
COPY --chown=nginx:nginx --from=builder /app/out /data/
