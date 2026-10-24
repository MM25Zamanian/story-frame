import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const inputVideo = path.join(rootDir, "میزگرد.mp4");
const targetDir = path.join(rootDir, "public", "assets", "roundtable-1403");

fs.mkdirSync(targetDir, { recursive: true });

const hevcOutput = path.join(targetDir, "roundtable-intro-hevc.mp4");
const avcOutput = path.join(targetDir, "roundtable-intro-web.mp4");

console.log("=== Starting Roundtable Video Optimization ===");
console.log(`Input: ${inputVideo}`);
console.log(`Target Directory: ${targetDir}`);

// 1. Generate HEVC (H.265) 20fps, crf 28, 64k mono audio
console.log("\n[1/2] Encoding HEVC (H.265) at 20fps...");
const hevcCmd = `ffmpeg -y -i "${inputVideo}" -r 20 -c:v libx265 -crf 28 -preset medium -tag:v hvc1 -c:a aac -b:a 64k -ac 1 "${hevcOutput}"`;
execSync(hevcCmd, { stdio: "inherit" });

// 2. Generate H.264 Web Fallback 20fps, crf 26, 64k mono audio
console.log("\n[2/2] Encoding H.264 Web Fallback at 20fps...");
const avcCmd = `ffmpeg -y -i "${inputVideo}" -r 20 -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 64k -ac 1 "${avcOutput}"`;
execSync(avcCmd, { stdio: "inherit" });

const hevcStats = fs.statSync(hevcOutput);
const avcStats = fs.statSync(avcOutput);

console.log("\n=== Encoding Complete ===");
console.log(`HEVC Size: ${(hevcStats.size / (1024 * 1024)).toFixed(2)} MB`);
console.log(`H.264 Size: ${(avcStats.size / (1024 * 1024)).toFixed(2)} MB`);
