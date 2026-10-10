import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "..");
const storiesDir = path.join(rootDir, "public", "stories");
const blurDir = path.join(storiesDir, "blur");

if (!fs.existsSync(blurDir)) {
  fs.mkdirSync(blurDir, { recursive: true });
}

// Find all original webp images in public/stories (e.g. 01.webp .. 08.webp)
const files = fs
  .readdirSync(storiesDir)
  .filter((f) => /^\d+\.webp$/.test(f))
  .sort();

console.log(`Found ${files.length} artwork images in ${storiesDir}`);

const blurMap = {};

for (const file of files) {
  const inputPath = path.join(storiesDir, file);
  const outputPath = path.join(blurDir, file);

  // cwebp: scale down to 32x23 preserving 5120x3656 aspect ratio, low quality + max deblocking filter
  const cmd = `cwebp -resize 32 23 -q 15 -f 100 -m 6 "${inputPath}" -o "${outputPath}"`;
  execSync(cmd, { stdio: "ignore" });

  const buf = fs.readFileSync(outputPath);
  const base64 = `data:image/webp;base64,${buf.toString("base64")}`;
  blurMap[file] = {
    file: `/stories/blur/${file}`,
    sizeBytes: buf.length,
    blurDataURL: base64,
  };

  console.log(`Generated blur for ${file}: ${buf.length} bytes`);
}

// Write the mapping as a json for easy inspection or import
const jsonPath = path.join(blurDir, "blur-manifest.json");
fs.writeFileSync(jsonPath, JSON.stringify(blurMap, null, 2), "utf-8");
console.log(`Saved manifest to ${jsonPath}`);
