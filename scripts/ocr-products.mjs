#!/usr/bin/env node

import Tesseract from "tesseract.js";
import fs from "fs/promises";
import path from "path";

const root = process.cwd();
const productsDir = path.join(root, "public", "images", "product");
const outDir = path.join(root, "src", "data");
const outFile = path.join(outDir, "products.generated.json");

const IMG_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".bmp", ".gif", ".tiff", ".svg"]);

function isImage(fp) {
  const ext = path.extname(fp).toLowerCase();
  return IMG_EXTS.has(ext);
}

async function walk(dir) {
  const items = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const it of items) {
    const p = path.join(dir, it.name);
    if (it.isDirectory()) {
      files.push(...(await walk(p)));
    } else if (isImage(p)) {
      files.push(p);
    }
  }
  return files;
}

function detectShape(textU) {
  const t = textU;
  if (t.includes("HERRINGBONE")) return "Herringbone";
  if (t.includes("STAGGERED")) return "Staggered";
  if (t.includes("STONE")) return "Stone";
  if (t.includes("PLANK")) return "Plank";
  return null;
}

function inferColor(name) {
  if (!name) return null;
  const n = name.toUpperCase();
  if (n.includes("LIGHT GREY") || n.includes("LIGHT GRAY")) return "Light Grey";
  if (n.includes("GREY") || n.includes("GRAY")) return "Grey";
  if (n.includes("CHARCOAL")) return "Charcoal";
  if (n.includes("OAK")) return "Oak";
  if (n.includes("BEIGE")) return "Beige";
  if (n.includes("WHITE")) return "White";
  if (n.includes("BLACK")) return "Black";
  if (n.includes("BROWN")) return "Brown";
  if (n.includes("LIME WASH")) return "Lime Wash";
  return null;
}

function extractFromLines(lines) {
  let codeNumber = null;
  let codeName = null;
  let trimming = null;
  let size = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const u = line.toUpperCase();

    if (!codeNumber && u.includes("CODE NUMBER")) {
      const m = line.match(/CODE\s*NUMBER\s*[:\-]?\s*(.+)$/i);
      codeNumber = m?.[1]?.trim() || lines[i + 1]?.trim() || null;
      continue;
    }
    if (!codeName && u.includes("CODE NAME")) {
      const m = line.match(/CODE\s*NAME\s*[:\-]?\s*(.+)$/i);
      codeName = m?.[1]?.trim() || lines[i + 1]?.trim() || null;
      continue;
    }
    if (!trimming && (u.includes("PVC SKIRTING") || u.includes("TRIMMING"))) {
      const m = line.match(/TRIMMING\s*[:\-]?\s*([A-Z0-9]+)/i) || lines[i + 1]?.match(/^\s*([A-Z0-9]{2,})\s*$/);
      trimming = m?.[1]?.trim() || null;
      continue;
    }
    if (!size && u.includes("SIZE")) {
      const m = line.match(/SIZE\s*[:\-]?\s*(.+)$/i);
      size = m?.[1]?.trim() || lines[i + 1]?.trim() || null;
      continue;
    }
    if (!codeNumber && u.includes("PRODUCT CODE")) {
      const m = line.match(/PRODUCT\s*CODE\s*[:\-]?\s*(.+)$/i);
      codeNumber = m?.[1]?.trim() || null;
      continue;
    }
    if (!codeName && u.includes("PRODUCT NAME")) {
      const m = line.match(/PRODUCT\s*NAME\s*[:\-]?\s*(.+)$/i);
      codeName = m?.[1]?.trim() || null;
      continue;
    }
  }

  const allU = lines.join(" ").toUpperCase();
  if (!codeNumber) {
    let m = allU.match(/\b(LD\s*\d{4,6})\b/);
    if (m) codeNumber = m[1].replace(/\s+/g, " ");
  }
  if (!codeNumber) {
    let m = allU.match(/\b(\d{3,6}\s*HRB)\b/);
    if (m) codeNumber = m[1].replace(/\s+/g, " ");
  }
  if (!codeNumber) {
    const exclude = new Set(["150", "915", "300", "600", "900", "0.5", "5.0"]);
    const numbers = Array.from(allU.matchAll(/\b(\d{4,6})\b/g)).map((x) => x[1]);
    for (const num of numbers) {
      if (!exclude.has(num)) {
        codeNumber = num;
        break;
      }
    }
  }

  return { codeNumber, codeName, trimming, size };
}

async function main() {
  try {
    await fs.mkdir(outDir, { recursive: true });

    const files = await walk(productsDir);
    if (files.length === 0) {
      console.error(`No images found in ${productsDir}`);
      process.exit(2);
    }

    const results = [];

    for (const fp of files) {
      const rel = path.relative(root, fp).replaceAll("\\", "/");
      process.stdout.write(`\n[OCR] ${rel} `);
      try {
        const { data } = await Tesseract.recognize(fp, "eng");
        const rawText = data?.text || "";
        const lines = rawText.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
        const { codeNumber, codeName, trimming, size } = extractFromLines(lines);
        const shape = detectShape(rawText.toUpperCase());
        const colorFamily = inferColor(codeName);

        results.push({
          image: "/" + rel.replace(/^.*public\//, ""),
          codeNumber: codeNumber || null,
          codeName: codeName || null,
          shape: shape || null,
          colorFamily: colorFamily || null,
          size: size || null,
          trimming: trimming || null,
          ocrTextSample: lines.slice(0, 12),
        });
      } catch (err) {
        console.error(`\n[ERROR] Failed on ${rel}:`, err?.message || err);
        results.push({ image: "/" + rel.replace(/^.*public\//, ""), error: String(err) });
      }
    }

    // Sort by whether we have a codeNumber, then by image name
    results.sort((a, b) => {
      if (!!b.codeNumber - !!a.codeNumber !== 0) return (!!b.codeNumber - !!a.codeNumber);
      return String(a.image).localeCompare(String(b.image));
    });

    await fs.writeFile(outFile, JSON.stringify(results, null, 2), "utf-8");
    console.log(`\n\nSaved: ${outFile}`);

    const withCode = results.filter((r) => r.codeNumber).length;
    console.log(`Entries with code: ${withCode}/${results.length}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
