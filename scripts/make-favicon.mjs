import sharp from "sharp";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = join(__dirname, "..", "public");
const ringsPath = join(pub, "favicon-rings.png");

async function ringPng(px) {
  return sharp(ringsPath)
    .resize(px, px, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();
}

async function overlayPng(svg, w, h) {
  return sharp(Buffer.from(svg))
    .resize(w, h)
    .png()
    .toBuffer();
}

async function compositeMini(px) {
  const base = await ringPng(px);
  const font = Math.max(5, Math.min(Math.floor(px * 0.42), px - 5));
  const sw = Math.max(0.6, font / 10);
  const y1 = Math.floor(px * 0.4);
  const y2 = Math.floor(px * 0.66);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}">
  <text x="50%" y="${y1}" dominant-baseline="middle" text-anchor="middle"
    font-family="Arial Black, Helvetica, sans-serif" font-weight="900" font-size="${font}"
    fill="#fffef8" stroke="#120c04" stroke-width="${sw}">a</text>
  <text x="50%" y="${y2}" dominant-baseline="middle" text-anchor="middle"
    font-family="Arial Black, Helvetica, sans-serif" font-weight="900" font-size="${font}"
    fill="#fffef8" stroke="#120c04" stroke-width="${sw}">b</text>
</svg>`;
  const over = await overlayPng(svg, px, px);
  return sharp(base).composite([{ input: over, blend: "over" }]).png().toBuffer();
}

async function compositeFull(px) {
  const base = await ringPng(px);
  const fs = Math.max(10, Math.floor(px * 0.095));
  const y1 = Math.floor(px * 0.41);
  const y2 = Math.floor(px * 0.56);
  const sw = Math.max(1.5, Math.floor(px * 0.014));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}">
  <text x="50%" y="${y1}" dominant-baseline="middle" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="${fs}"
    fill="#fffef8" stroke="#120c04" stroke-width="${sw}">aravind</text>
  <text x="50%" y="${y2}" dominant-baseline="middle" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="${fs}"
    fill="#fffef8" stroke="#120c04" stroke-width="${sw}">bhuvana</text>
</svg>`;
  const over = await overlayPng(svg, px, px);
  return sharp(base).composite([{ input: over, blend: "over" }]).png().toBuffer();
}

async function writeEmbeddedSvg() {
  const img = await sharp(ringsPath)
    .resize(96, 96, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();
  const b64 = img.toString("base64");
  const font = 26;
  const sw = 2.5;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96">
  <image href="data:image/png;base64,${b64}" width="96" height="96" preserveAspectRatio="xMidYMid slice"/>
  <text x="48" y="40" dominant-baseline="middle" text-anchor="middle" font-family="Arial Black, Helvetica, sans-serif" font-weight="900" font-size="${font}" fill="#fffef8" stroke="#120c04" stroke-width="${sw}">a</text>
  <text x="48" y="62" dominant-baseline="middle" text-anchor="middle" font-family="Arial Black, Helvetica, sans-serif" font-weight="900" font-size="${font}" fill="#fffef8" stroke="#120c04" stroke-width="${sw}">b</text>
</svg>`;
  writeFileSync(join(pub, "favicon.svg"), svg);
}

async function main() {
  writeFileSync(join(pub, "favicon-16.png"), await compositeMini(16));
  writeFileSync(join(pub, "favicon-32.png"), await compositeMini(32));
  writeFileSync(join(pub, "favicon-48.png"), await compositeMini(48));
  writeFileSync(join(pub, "apple-touch-icon.png"), await compositeFull(180));
  await writeEmbeddedSvg();
  console.log("Wrote favicon-16.png, favicon-32.png, favicon-48.png, apple-touch-icon.png, favicon.svg");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
