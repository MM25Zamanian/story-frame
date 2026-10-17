import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const uploadedImage = "/Users/mm25zamanian/.gemini/antigravity/brain/e9b76504-9f15-4e77-986a-da559200960a/.user_uploaded/media_1792229424346_dcaed674.jpg";
const pdfSource = path.join(rootDir, "Trust-Be-Happy-Booklet-15.pdf");
const pptxSource = path.join(rootDir, "Trust-Be-Happy-PowerPoint-15.pptx");

const assetsDir = path.join(rootDir, "public", "assets", "seminar-1403");
const zoomDir = path.join(assetsDir, "zoom");
const blurDir = path.join(assetsDir, "blur");

function getImageDimensions(filePath) {
  try {
    const output = execSync(`sips -g pixelWidth -g pixelHeight "${filePath}"`, {
      encoding: "utf-8",
    });
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

// 1. Ensure target directories
fs.mkdirSync(zoomDir, { recursive: true });
fs.mkdirSync(blurDir, { recursive: true });

// 2. Generate optimized image variants
const zoomCover = path.join(zoomDir, "cover.webp");
const displayCover = path.join(assetsDir, "cover.webp");
const blurCover = path.join(blurDir, "cover.webp");

console.log("Generating Zoom cover...");
execSync(`cwebp -q 90 -m 6 "${uploadedImage}" -o "${zoomCover}"`);

console.log("Generating Display cover (960px)...");
execSync(`cwebp -resize 960 0 -q 85 -m 6 "${uploadedImage}" -o "${displayCover}"`);

console.log("Generating Blur placeholder (32x23)...");
execSync(`cwebp -resize 32 23 -q 15 -f 100 -m 6 "${displayCover}" -o "${blurCover}"`);

// 3. Inspect dimensions and build manifest
const dispDim = getImageDimensions(displayCover);
const zoomDim = getImageDimensions(zoomCover);
const blurBuf = fs.readFileSync(blurCover);
const blurDataURL = `data:image/webp;base64,${blurBuf.toString("base64")}`;

const manifest = {
  cover: {
    url: "/assets/seminar-1403/cover.webp",
    zoomUrl: "/assets/seminar-1403/zoom/cover.webp",
    width: dispDim.width,
    height: dispDim.height,
    zoomWidth: zoomDim.width,
    zoomHeight: zoomDim.height,
    blurDataURL,
  },
};

const manifestPath = path.join(assetsDir, "manifest.json");
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");
console.log(`Saved manifest to ${manifestPath}`);
console.log(`Display: ${dispDim.width}x${dispDim.height}, Zoom: ${zoomDim.width}x${zoomDim.height}, Blur size: ${blurBuf.length} bytes`);

// Update program.json with latest blurDataURL and dimensions
const programJsonPath = path.join(rootDir, "content", "programs", "seminar-1403", "program.json");
if (fs.existsSync(programJsonPath)) {
  const progData = JSON.parse(fs.readFileSync(programJsonPath, "utf-8"));
  if (progData.coverImage) {
    progData.coverImage.width = dispDim.width;
    progData.coverImage.height = dispDim.height;
    progData.coverImage.blurDataURL = blurDataURL;
    fs.writeFileSync(programJsonPath, JSON.stringify(progData, null, 2) + "\n", "utf-8");
    console.log("Updated seminar-1403/program.json with new blurDataURL");
  }
}

// 4. Move and rename documents
const targetPdf = path.join(assetsDir, "booklet-trust-and-be-happy-15.pdf");
const targetPptx = path.join(assetsDir, "presentation-trust-and-be-happy-15.pptx");

if (fs.existsSync(pdfSource)) {
  console.log("Moving PDF to assets...");
  fs.copyFileSync(pdfSource, targetPdf);
  fs.unlinkSync(pdfSource);
}

if (fs.existsSync(pptxSource)) {
  console.log("Moving PPTX to assets...");
  fs.copyFileSync(pptxSource, targetPptx);
  fs.unlinkSync(pptxSource);
}

console.log("Asset setup completed successfully!");
