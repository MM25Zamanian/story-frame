import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const uploadedImage = "/Users/mm25zamanian/.gemini/antigravity/brain/e49534bb-15c2-4f4d-9c6d-8bb542b94e0a/.user_uploaded/media_1792404505212_1301d9c5.jpg";

const assetsDir = path.join(rootDir, "public", "assets", "booth-1403");
const zoomDir = path.join(assetsDir, "zoom");
const blurDir = path.join(assetsDir, "blur");

console.log("=== Processing Cover Image for booth-1403 ===");

// 1. Ensure target directories
fs.mkdirSync(assetsDir, { recursive: true });
fs.mkdirSync(zoomDir, { recursive: true });
fs.mkdirSync(blurDir, { recursive: true });

// 2. Generate optimized image variants
const zoomCover = path.join(zoomDir, "cover.webp");
const displayCover = path.join(assetsDir, "cover.webp");
const blurCover = path.join(blurDir, "cover.webp");

console.log("1. Generating Zoom cover (1024x731, q=90, m=6)...");
execSync(`cwebp -q 90 -m 6 "${uploadedImage}" -o "${zoomCover}"`, { stdio: "inherit" });

console.log("2. Generating Display cover (960px width, q=85, m=6)...");
execSync(`cwebp -resize 960 0 -q 85 -m 6 "${uploadedImage}" -o "${displayCover}"`, { stdio: "inherit" });

console.log("3. Generating Blur placeholder (32x23, q=15, f=100)...");
execSync(`cwebp -resize 32 23 -q 15 -f 100 -m 6 "${displayCover}" -o "${blurCover}"`, { stdio: "inherit" });

// 3. Inspect dimensions and build manifest
function getImageDimensions(filePath) {
  try {
    const output = execSync(`sips -g pixelWidth -g pixelHeight "${filePath}"`, { encoding: "utf-8" });
    const widthMatch = output.match(/pixelWidth:\s*(\d+)/);
    const heightMatch = output.match(/pixelHeight:\s*(\d+)/);
    return {
      width: widthMatch ? parseInt(widthMatch[1], 10) : 0,
      height: heightMatch ? parseInt(heightMatch[1], 10) : 0,
    };
  } catch (err) {
    console.error(`Failed to get dimensions for ${filePath}:`, err);
    return { width: 0, height: 0 };
  }
}

const dispDim = getImageDimensions(displayCover);
const zoomDim = getImageDimensions(zoomCover);
const blurBuf = fs.readFileSync(blurCover);
const blurDataURL = `data:image/webp;base64,${blurBuf.toString("base64")}`;

const manifest = {
  cover: {
    url: "/assets/booth-1403/cover.webp",
    zoomUrl: "/assets/booth-1403/zoom/cover.webp",
    width: dispDim.width,
    height: dispDim.height,
    zoomWidth: zoomDim.width,
    zoomHeight: zoomDim.height,
    blurDataURL,
  },
  video: {
    sources: [
      {
        src: "/assets/booth-1403/1405-07-26_15.11.55_optimized_hevc.mp4",
        type: 'video/mp4; codecs="hvc1"',
        quality: "1080p HEVC",
      },
      {
        src: "/assets/booth-1403/1405-07-26_15.11.55_optimized_web_720p.mp4",
        type: 'video/mp4; codecs="avc1"',
        quality: "720p Web",
      },
    ],
    duration: "۵ دقیقه و ۳۴ ثانیه",
    durationSeconds: 334,
  },
};

const manifestPath = path.join(assetsDir, "manifest.json");
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");
console.log(`Manifest created at ${manifestPath}`);
console.log(`Display: ${dispDim.width}x${dispDim.height}, Zoom: ${zoomDim.width}x${zoomDim.height}, Blur: ${blurBuf.length} bytes`);

// 4. Update program.json
const programJsonPath = path.join(rootDir, "content", "programs", "booth", "program.json");
if (fs.existsSync(programJsonPath)) {
  const progData = JSON.parse(fs.readFileSync(programJsonPath, "utf-8"));
  progData.coverImage = {
    url: "/assets/booth-1403/cover.webp",
    alt: "غرفه‌ای فاطمیه - سناریو و مستند تصویری",
    width: dispDim.width,
    height: dispDim.height,
    blurDataURL,
    zoomUrl: "/assets/booth-1403/zoom/cover.webp",
  };
  fs.writeFileSync(programJsonPath, JSON.stringify(progData, null, 2) + "\n", "utf-8");
  console.log("Updated content/programs/booth/program.json");
}

// 5. Update categories.json
const categoriesJsonPath = path.join(rootDir, "content", "categories.json");
if (fs.existsSync(categoriesJsonPath)) {
  const catData = JSON.parse(fs.readFileSync(categoriesJsonPath, "utf-8"));
  const boothCat = catData.find((c) => c.id === "booth" || c.slug === "booth");
  if (boothCat) {
    boothCat.coverImage = {
      url: "/assets/booth-1403/cover.webp",
      alt: "غرفه‌ای فاطمیه",
      blurDataURL,
    };
    fs.writeFileSync(categoriesJsonPath, JSON.stringify(catData, null, 2) + "\n", "utf-8");
    console.log("Updated content/categories.json");
  }
}

console.log("\nNew blurDataURL:\n", blurDataURL);
console.log("\nDone!");
