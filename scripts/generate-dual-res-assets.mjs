import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const assetsDir = path.join(rootDir, "public", "assets");

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

// ----------------------------------------------------------------------------
// 1. Process fatimiyeh-1398
// ----------------------------------------------------------------------------
console.log("=== Processing fatimiyeh-1398 ===");
const dir1398 = path.join(assetsDir, "fatimiyeh-1398");
const zoom1398 = path.join(dir1398, "zoom");
const blur1398 = path.join(dir1398, "blur");
fs.mkdirSync(zoom1398, { recursive: true });
fs.mkdirSync(blur1398, { recursive: true });

const manifest1398 = {};

for (const n of ["01", "02", "03", "04", "05", "06", "07", "08"]) {
  const originalFile = path.join(dir1398, `${n}.webp`);
  const zoomFile = path.join(zoom1398, `${n}.webp`);
  const displayTemp = path.join(dir1398, `${n}.display.webp`);
  const blurFile = path.join(blur1398, `${n}.webp`);

  console.log(`Processing 1398-${n}...`);
  // Generate Zoom high-res version (max 2560px width) from original
  execSync(`cwebp -resize 2560 0 -q 88 -m 6 "${originalFile}" -o "${zoomFile}"`);

  // Generate standard display version (960px width)
  execSync(`cwebp -resize 960 0 -q 85 -m 6 "${originalFile}" -o "${displayTemp}"`);
  fs.renameSync(displayTemp, originalFile);

  // Generate blur placeholder (32x23) from display version
  execSync(`cwebp -resize 32 23 -q 15 -f 100 -m 6 "${originalFile}" -o "${blurFile}"`);

  const dispDim = getImageDimensions(originalFile);
  const zoomDim = getImageDimensions(zoomFile);
  const blurBuf = fs.readFileSync(blurFile);
  const blurDataURL = `data:image/webp;base64,${blurBuf.toString("base64")}`;

  manifest1398[n] = {
    url: `/assets/fatimiyeh-1398/${n}.webp`,
    zoomUrl: `/assets/fatimiyeh-1398/zoom/${n}.webp`,
    width: dispDim.width,
    height: dispDim.height,
    zoomWidth: zoomDim.width,
    zoomHeight: zoomDim.height,
    blurDataURL,
  };
  console.log(`  1398-${n} -> Display: ${dispDim.width}x${dispDim.height}, Zoom: ${zoomDim.width}x${zoomDim.height}`);
}

fs.writeFileSync(
  path.join(dir1398, "manifest.json"),
  JSON.stringify(manifest1398, null, 2),
  "utf-8"
);
console.log("Saved fatimiyeh-1398/manifest.json");

// ----------------------------------------------------------------------------
// 2. Process fatimiyeh-1401
// ----------------------------------------------------------------------------
console.log("=== Processing fatimiyeh-1401 ===");
const dir1401 = path.join(assetsDir, "fatimiyeh-1401");
const zoom1401 = path.join(dir1401, "zoom");
const blur1401 = path.join(dir1401, "blur");
fs.mkdirSync(zoom1401, { recursive: true });
fs.mkdirSync(blur1401, { recursive: true });

const manifest1401 = {};

for (const n of ["01", "02", "03", "04", "05", "06", "07"]) {
  const originalFile = path.join(dir1401, `${n}.webp`);
  const zoomFile = path.join(zoom1401, `${n}.webp`);
  const displayTemp = path.join(dir1401, `${n}.display.webp`);
  const blurFile = path.join(blur1401, `${n}.webp`);

  console.log(`Processing 1401-${n}...`);
  const origDim = getImageDimensions(originalFile);

  // Zoom version
  if (origDim.width > 2400) {
    execSync(`cwebp -resize 2400 0 -q 88 -m 6 "${originalFile}" -o "${zoomFile}"`);
  } else {
    execSync(`cwebp -q 90 -m 6 "${originalFile}" -o "${zoomFile}"`);
  }

  // Display version (960px width)
  execSync(`cwebp -resize 960 0 -q 85 -m 6 "${originalFile}" -o "${displayTemp}"`);
  fs.renameSync(displayTemp, originalFile);

  // Blur version
  execSync(`cwebp -resize 32 23 -q 15 -f 100 -m 6 "${originalFile}" -o "${blurFile}"`);

  const dispDim = getImageDimensions(originalFile);
  const zoomDim = getImageDimensions(zoomFile);
  const blurBuf = fs.readFileSync(blurFile);
  const blurDataURL = `data:image/webp;base64,${blurBuf.toString("base64")}`;

  manifest1401[n] = {
    url: `/assets/fatimiyeh-1401/${n}.webp`,
    zoomUrl: `/assets/fatimiyeh-1401/zoom/${n}.webp`,
    width: dispDim.width,
    height: dispDim.height,
    zoomWidth: zoomDim.width,
    zoomHeight: zoomDim.height,
    blurDataURL,
  };
  console.log(`  1401-${n} -> Display: ${dispDim.width}x${dispDim.height}, Zoom: ${zoomDim.width}x${zoomDim.height}`);
}

fs.writeFileSync(
  path.join(dir1401, "manifest.json"),
  JSON.stringify(manifest1401, null, 2),
  "utf-8"
);
console.log("Saved fatimiyeh-1401/manifest.json");

// ----------------------------------------------------------------------------
// 3. Process roundtable-1403
// ----------------------------------------------------------------------------
console.log("=== Processing roundtable-1403 ===");
const dir1403 = path.join(assetsDir, "roundtable-1403");
const zoom1403 = path.join(dir1403, "zoom");
const blur1403 = path.join(dir1403, "blur");
fs.mkdirSync(zoom1403, { recursive: true });
fs.mkdirSync(blur1403, { recursive: true });

const originalCover = path.join(dir1403, "cover.webp");
const zoomCover = path.join(zoom1403, "cover.webp");
const displayTemp = path.join(dir1403, "cover.display.webp");
const blurCover = path.join(blur1403, "cover.webp");

// Zoom cover: Keep high quality 1024x731 original
execSync(`cwebp -q 90 -m 6 "${originalCover}" -o "${zoomCover}"`);

// Display cover: 960px width
execSync(`cwebp -resize 960 0 -q 85 -m 6 "${originalCover}" -o "${displayTemp}"`);
fs.renameSync(displayTemp, originalCover);

// Blur cover
execSync(`cwebp -resize 32 23 -q 15 -f 100 -m 6 "${originalCover}" -o "${blurCover}"`);

const dispDim1403 = getImageDimensions(originalCover);
const zoomDim1403 = getImageDimensions(zoomCover);
const blurBuf1403 = fs.readFileSync(blurCover);
const blurDataURL1403 = `data:image/webp;base64,${blurBuf1403.toString("base64")}`;

const manifest1403 = {
  cover: {
    url: "/assets/roundtable-1403/cover.webp",
    zoomUrl: "/assets/roundtable-1403/zoom/cover.webp",
    width: dispDim1403.width,
    height: dispDim1403.height,
    zoomWidth: zoomDim1403.width,
    zoomHeight: zoomDim1403.height,
    blurDataURL: blurDataURL1403,
  },
};

fs.writeFileSync(
  path.join(dir1403, "manifest.json"),
  JSON.stringify(manifest1403, null, 2),
  "utf-8"
);
console.log("Saved roundtable-1403/manifest.json");

// ----------------------------------------------------------------------------
// 4. Update content/programs/fatimiyeh-1398 MDX & program.json
// ----------------------------------------------------------------------------
console.log("=== Updating content/programs/fatimiyeh-1398 ===");
const items1398Dir = path.join(rootDir, "content", "programs", "fatimiyeh-1398", "items");
const mdx1398Files = fs.readdirSync(items1398Dir).filter((f) => f.endsWith(".mdx")).sort();

for (let i = 0; i < mdx1398Files.length; i++) {
  const file = mdx1398Files[i];
  const numStr = String(i + 1).padStart(2, "0");
  const meta = manifest1398[numStr];
  if (!meta) continue;

  const filePath = path.join(items1398Dir, file);
  let content = fs.readFileSync(filePath, "utf-8");

  // Replace image block
  content = content.replace(
    /image:\s*\n\s*url:\s*"[^"]+"\s*\n(\s*zoomUrl:\s*"[^"]+"\s*\n)?\s*alt:\s*"([^"]+)"\s*\n\s*width:\s*\d+\s*\n\s*height:\s*\d+\s*\n\s*aspectRatio:\s*"[^"]+"\s*\n\s*blurDataURL:\s*"[^"]+"/g,
    `image:
  url: "${meta.url}"
  zoomUrl: "${meta.zoomUrl}"
  alt: "$2"
  width: ${meta.width}
  height: ${meta.height}
  aspectRatio: "${meta.width}/${meta.height}"
  blurDataURL: "${meta.blurDataURL}"`
  );

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`Updated 1398 item ${file}`);
}

const program1398JsonPath = path.join(rootDir, "content", "programs", "fatimiyeh-1398", "program.json");
const p1398 = JSON.parse(fs.readFileSync(program1398JsonPath, "utf-8"));
if (p1398.coverImage) {
  const m1 = manifest1398["01"];
  p1398.coverImage.url = m1.url;
  p1398.coverImage.zoomUrl = m1.zoomUrl;
  p1398.coverImage.width = m1.width;
  p1398.coverImage.height = m1.height;
  p1398.coverImage.blurDataURL = m1.blurDataURL;
  fs.writeFileSync(program1398JsonPath, JSON.stringify(p1398, null, 2), "utf-8");
  console.log("Updated fatimiyeh-1398/program.json");
}

// ----------------------------------------------------------------------------
// 5. Update content/programs/fatimiyeh-1401 MDX & program.json
// ----------------------------------------------------------------------------
console.log("=== Updating content/programs/fatimiyeh-1401 ===");
const items1401Dir = path.join(rootDir, "content", "programs", "fatimiyeh-1401", "items");
const mdx1401Files = fs.readdirSync(items1401Dir).filter((f) => f.endsWith(".mdx")).sort();

for (let i = 0; i < mdx1401Files.length; i++) {
  const file = mdx1401Files[i];
  const numStr = String(i + 1).padStart(2, "0");
  const meta = manifest1401[numStr];
  if (!meta) continue;

  const filePath = path.join(items1401Dir, file);
  let content = fs.readFileSync(filePath, "utf-8");

  content = content.replace(
    /image:\s*\n\s*url:\s*"[^"]+"\s*\n(\s*zoomUrl:\s*"[^"]+"\s*\n)?\s*alt:\s*"([^"]+)"\s*\n\s*width:\s*\d+\s*\n\s*height:\s*\d+\s*\n\s*aspectRatio:\s*"[^"]+"\s*\n\s*blurDataURL:\s*"[^"]+"/g,
    `image:
  url: "${meta.url}"
  zoomUrl: "${meta.zoomUrl}"
  alt: "$2"
  width: ${meta.width}
  height: ${meta.height}
  aspectRatio: "${meta.width}/${meta.height}"
  blurDataURL: "${meta.blurDataURL}"`
  );

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`Updated 1401 item ${file}`);
}

const program1401JsonPath = path.join(rootDir, "content", "programs", "fatimiyeh-1401", "program.json");
const p1401 = JSON.parse(fs.readFileSync(program1401JsonPath, "utf-8"));
if (p1401.coverImage) {
  const m1 = manifest1401["01"];
  p1401.coverImage.url = m1.url;
  p1401.coverImage.zoomUrl = m1.zoomUrl;
  p1401.coverImage.width = m1.width;
  p1401.coverImage.height = m1.height;
  p1401.coverImage.blurDataURL = m1.blurDataURL;
  fs.writeFileSync(program1401JsonPath, JSON.stringify(p1401, null, 2), "utf-8");
  console.log("Updated fatimiyeh-1401/program.json");
}

// ----------------------------------------------------------------------------
// 6. Update content/programs/roundtable-1403/program.json
// ----------------------------------------------------------------------------
console.log("=== Updating content/programs/roundtable-1403 ===");
const program1403JsonPath = path.join(rootDir, "content", "programs", "roundtable-1403", "program.json");
const p1403 = JSON.parse(fs.readFileSync(program1403JsonPath, "utf-8"));
if (p1403.coverImage) {
  const m = manifest1403.cover;
  p1403.coverImage.url = m.url;
  p1403.coverImage.zoomUrl = m.zoomUrl;
  p1403.coverImage.width = m.width;
  p1403.coverImage.height = m.height;
  p1403.coverImage.blurDataURL = m.blurDataURL;
  fs.writeFileSync(program1403JsonPath, JSON.stringify(p1403, null, 2), "utf-8");
  console.log("Updated roundtable-1403/program.json");
}

// ----------------------------------------------------------------------------
// 7. Update data/artworks.ts
// ----------------------------------------------------------------------------
console.log("=== Updating data/artworks.ts ===");
const artworksTsPath = path.join(rootDir, "data", "artworks.ts");
let artworksTs = fs.readFileSync(artworksTsPath, "utf-8");

for (let i = 1; i <= 8; i++) {
  const numStr = String(i).padStart(2, "0");
  const meta = manifest1398[numStr];
  if (!meta) continue;

  const urlPattern = new RegExp(`url:\\s*"/stories/${numStr}\\.webp",(\\s*zoomUrl:\\s*"[^"]+",)?`, "g");
  artworksTs = artworksTs.replace(
    urlPattern,
    `url: "/stories/${numStr}.webp",\n      zoomUrl: "/stories/zoom/${numStr}.webp",`
  );

  const dimPattern = new RegExp(
    `width:\\s*\\d+,\\s*\\n\\s*height:\\s*\\d+,\\s*\\n\\s*aspectRatio:\\s*"[^"]+",\\s*\\n\\s*blurDataURL:\\s*"[^"]+",`,
    "g"
  );
  // We match individual tableau entries by slug or id to be precise
}

// Update each artwork entry in data/artworks.ts precisely
for (let i = 1; i <= 8; i++) {
  const numStr = String(i).padStart(2, "0");
  const meta = manifest1398[numStr];
  const regex = new RegExp(
    `image:\\s*\\{\\s*\\n\\s*url:\\s*"/stories/${numStr}\\.webp",(\\s*zoomUrl:\\s*"[^"]+",)?\\s*\\n\\s*alt:\\s*"([^"]+)",\\s*\\n\\s*width:\\s*\\d+,\\s*\\n\\s*height:\\s*\\d+,\\s*\\n\\s*aspectRatio:\\s*"[^"]+",\\s*\\n\\s*blurDataURL:\\s*"[^"]+",\\s*\\n\\s*\\}`,
    "g"
  );
  artworksTs = artworksTs.replace(
    regex,
    `image: {
      url: "/stories/${numStr}.webp",
      zoomUrl: "/stories/zoom/${numStr}.webp",
      alt: "$2",
      width: ${meta.width},
      height: ${meta.height},
      aspectRatio: "${meta.width}/${meta.height}",
      blurDataURL:
        "${meta.blurDataURL}",
    }`
  );
}

fs.writeFileSync(artworksTsPath, artworksTs, "utf-8");
console.log("Updated data/artworks.ts");

console.log("=== All dual-resolution assets and content updated successfully! ===");
