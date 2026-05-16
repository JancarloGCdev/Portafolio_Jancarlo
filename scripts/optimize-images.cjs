/**
 * Convierte PNG/JPEG/WebP bajo `public/` a AVIF y elimina el original.
 * Ejecutar tras añadir assets: npm run optimize-images
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const exts = new Set([".png", ".jpg", ".jpeg", ".webp"]);

async function convertFile(filePath) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath, path.extname(filePath));
  const outPath = path.join(dir, `${base}.avif`);
  console.log(`${path.relative(process.cwd(), filePath)} -> ${path.relative(process.cwd(), outPath)}`);
  await sharp(filePath).avif({ quality: 75, effort: 6 }).toFile(outPath);
  await fs.promises.unlink(filePath);
}

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      await walk(full);
    } else if (exts.has(path.extname(e.name).toLowerCase())) {
      await convertFile(full);
    }
  }
}

async function main() {
  const root = path.join(__dirname, "..", "public");
  if (!fs.existsSync(root)) {
    console.warn("Sin carpeta public/, nada que convertir.");
    return;
  }
  await walk(root);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
