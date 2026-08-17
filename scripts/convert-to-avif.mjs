import sharp from "sharp";
import fs from "fs";
import path from "path";

const targetDirs = [
  "public/images",
  "public/projects/portfolio-engineering",
  "public/projects/smart-school-reports",
  "public/projects/solarbrain-techos"
];

async function convertFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext !== ".png" && ext !== ".jpeg" && ext !== ".jpg") return;

  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);
  const outPath = path.join(dir, `${baseName}.avif`);

  console.log(`Converting ${filePath} -> ${outPath}`);
  await sharp(filePath)
    .avif({
      quality: 90,
      effort: 6,
      chromaSubsampling: "4:4:4"
    })
    .toFile(outPath);

  const origStat = fs.statSync(filePath);
  const avifStat = fs.statSync(outPath);
  console.log(`  Done: ${(origStat.size / 1024).toFixed(1)} KB -> ${(avifStat.size / 1024).toFixed(1)} KB (-${((1 - avifStat.size / origStat.size) * 100).toFixed(1)}%)`);
}

async function run() {
  for (const dir of targetDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isFile()) {
        await convertFile(fullPath);
      }
    }
  }

  // Also ensure preview.avif exists for each project if 1.avif exists
  for (const dir of [
    "public/projects/portfolio-engineering",
    "public/projects/smart-school-reports",
    "public/projects/solarbrain-techos"
  ]) {
    const previewAvif = path.join(dir, "preview.avif");
    const oneAvif = path.join(dir, "1.avif");
    if (!fs.existsSync(previewAvif) && fs.existsSync(oneAvif)) {
      fs.copyFileSync(oneAvif, previewAvif);
      console.log(`Created fallback ${previewAvif}`);
    }
  }
}

run().catch(console.error);
