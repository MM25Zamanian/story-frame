import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const uploaded04Jpg = "/Users/mm25zamanian/.gemini/antigravity/brain/6611f792-671c-4a29-be72-64fc2123089e/.user_uploaded/media_1792066058777_8b1139d2.jpg";

const assetsDir = path.join(rootDir, "public", "assets");
const assets1401 = path.join(assetsDir, "fatimiyeh-1401");
const blur1401 = path.join(assets1401, "blur");
const assets1398 = path.join(assetsDir, "fatimiyeh-1398");
const blur1398 = path.join(assets1398, "blur");
const assets1403 = path.join(assetsDir, "roundtable-1403");

// 1. Ensure directories exist
fs.mkdirSync(blur1401, { recursive: true });
fs.mkdirSync(blur1398, { recursive: true });
fs.mkdirSync(assets1403, { recursive: true });

// 2. Process fatimiyeh-1401
console.log("=== Processing fatimiyeh-1401 ===");
const old1401Dir = path.join(rootDir, "public", "images", "fatimiyeh-1401");

// Copy existing 1401 webps except 04
for (const n of ["01", "02", "03", "05", "06", "07"]) {
  const src = path.join(old1401Dir, `${n}.webp`);
  const dst = path.join(assets1401, `${n}.webp`);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
  }
  const blurSrc = path.join(old1401Dir, "blur", `${n}.webp`);
  const blurDst = path.join(blur1401, `${n}.webp`);
  if (fs.existsSync(blurSrc)) {
    fs.copyFileSync(blurSrc, blurDst);
  }
}

// Convert uploaded 04 image
console.log("Converting uploaded image 04 to webp...");
const out04Webp = path.join(assets1401, "04.webp");
const blur04Webp = path.join(blur1401, "04.webp");
execSync(`cwebp -q 90 -m 6 "${uploaded04Jpg}" -o "${out04Webp}"`);
execSync(`cwebp -resize 32 23 -q 15 -f 100 -m 6 "${out04Webp}" -o "${blur04Webp}"`);

// Generate 1401 manifest
const manifest1401 = {};
for (const n of ["01", "02", "03", "04", "05", "06", "07"]) {
  const blurFile = path.join(blur1401, `${n}.webp`);
  const buf = fs.readFileSync(blurFile);
  manifest1401[n] = {
    url: `/assets/fatimiyeh-1401/${n}.webp`,
    blurDataURL: `data:image/webp;base64,${buf.toString("base64")}`,
  };
}
fs.writeFileSync(path.join(assets1401, "manifest.json"), JSON.stringify(manifest1401, null, 2), "utf-8");
console.log("Saved fatimiyeh-1401/manifest.json");

// 3. Process fatimiyeh-1398
console.log("=== Processing fatimiyeh-1398 ===");
const storiesDir = path.join(rootDir, "public", "stories");

for (const n of ["01", "02", "03", "04", "05", "06", "07", "08"]) {
  const src = path.join(storiesDir, `${n}.webp`);
  const dst = path.join(assets1398, `${n}.webp`);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
  }
  const blurSrc = path.join(storiesDir, "blur", `${n}.webp`);
  const blurDst = path.join(blur1398, `${n}.webp`);
  if (fs.existsSync(blurSrc)) {
    fs.copyFileSync(blurSrc, blurDst);
  }
}

// Generate 1398 manifest
const manifest1398 = {};
for (const n of ["01", "02", "03", "04", "05", "06", "07", "08"]) {
  const blurFile = path.join(blur1398, `${n}.webp`);
  const buf = fs.readFileSync(blurFile);
  manifest1398[n] = {
    url: `/assets/fatimiyeh-1398/${n}.webp`,
    blurDataURL: `data:image/webp;base64,${buf.toString("base64")}`,
  };
}
fs.writeFileSync(path.join(assets1398, "manifest.json"), JSON.stringify(manifest1398, null, 2), "utf-8");
console.log("Saved fatimiyeh-1398/manifest.json");

// 4. Update content/programs/fatimiyeh-1401
console.log("Updating content/programs/fatimiyeh-1401...");
const program1401JsonPath = path.join(rootDir, "content", "programs", "fatimiyeh-1401", "program.json");
if (fs.existsSync(program1401JsonPath)) {
  const prog1401 = JSON.parse(fs.readFileSync(program1401JsonPath, "utf-8"));
  if (prog1401.coverImage?.url) {
    prog1401.coverImage.url = "/assets/fatimiyeh-1401/01.webp";
    prog1401.coverImage.blurDataURL = manifest1401["01"].blurDataURL;
  }
  fs.writeFileSync(program1401JsonPath, JSON.stringify(prog1401, null, 2) + "\n", "utf-8");
}

const items1401Dir = path.join(rootDir, "content", "programs", "fatimiyeh-1401", "items");
for (const file of fs.readdirSync(items1401Dir).filter(f => f.endsWith(".mdx"))) {
  const num = file.slice(0, 2);
  const data = manifest1401[num];
  if (!data) continue;
  const filePath = path.join(items1401Dir, file);
  let content = fs.readFileSync(filePath, "utf-8");

  // If file is 04, update dimensions as well
  if (num === "04") {
    content = content.replace(/url:\s*"[^"]+"/, `url: "${data.url}"`);
    content = content.replace(/width:\s*\d+/, "width: 1024");
    content = content.replace(/height:\s*\d+/, "height: 731");
    content = content.replace(/aspectRatio:\s*"[^"]+"/, 'aspectRatio: "1024/731"');
    content = content.replace(/blurDataURL:\s*"[^"]+"/, `blurDataURL: "${data.blurDataURL}"`);
  } else {
    content = content.replace(/url:\s*"[^"]+"/, `url: "${data.url}"`);
    content = content.replace(/blurDataURL:\s*"[^"]+"/, `blurDataURL: "${data.blurDataURL}"`);
  }
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`Updated 1401 item ${file}`);
}

// 5. Update content/programs/fatimiyeh-1398
console.log("Updating content/programs/fatimiyeh-1398...");
const program1398JsonPath = path.join(rootDir, "content", "programs", "fatimiyeh-1398", "program.json");
if (fs.existsSync(program1398JsonPath)) {
  const prog1398 = JSON.parse(fs.readFileSync(program1398JsonPath, "utf-8"));
  if (prog1398.coverImage?.url) {
    prog1398.coverImage.url = "/assets/fatimiyeh-1398/01.webp";
    prog1398.coverImage.blurDataURL = manifest1398["01"].blurDataURL;
  }
  fs.writeFileSync(program1398JsonPath, JSON.stringify(prog1398, null, 2) + "\n", "utf-8");
}

const items1398Dir = path.join(rootDir, "content", "programs", "fatimiyeh-1398", "items");
for (const file of fs.readdirSync(items1398Dir).filter(f => f.endsWith(".mdx"))) {
  const num = file.slice(0, 2);
  const data = manifest1398[num];
  if (!data) continue;
  const filePath = path.join(items1398Dir, file);
  let content = fs.readFileSync(filePath, "utf-8");
  content = content.replace(/url:\s*"[^"]+"/, `url: "${data.url}"`);
  content = content.replace(/blurDataURL:\s*"[^"]+"/, `blurDataURL: "${data.blurDataURL}"`);
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`Updated 1398 item ${file}`);
}

console.log("=== Asset migration and generation complete! ===");
