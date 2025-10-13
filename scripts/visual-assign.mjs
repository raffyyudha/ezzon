#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const root = process.cwd();
const dataFile = path.join(root, "src", "data", "products.categorized.json");
const overridesFile = path.join(root, "src", "data", "products.overrides.json");

// Compute 64-bit dHash (horizontal) using 9x8 grayscale
async function dhash64(fp) {
  const { data, info } = await sharp(fp).grayscale().resize(9, 8, { fit: "fill" }).raw().toBuffer({ resolveWithObject: true });
  let bits = 0n;
  let bitIndex = 0n;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const left = data[y * 9 + x];
      const right = data[y * 9 + x + 1];
      const bit = right > left ? 1n : 0n;
      bits |= (bit << bitIndex);
      bitIndex++;
    }
  }
  return bits;
}

function hammingDist64(a, b) {
  let x = a ^ b;
  let count = 0;
  while (x) {
    x &= x - 1n;
    count++;
  }
  return count;
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return { h: h * 360, s, l };
}

async function averageColorFamily(fp) {
  const stats = await sharp(fp).stats();
  const r = stats.channels[0].mean;
  const g = stats.channels[1].mean;
  const b = stats.channels[2].mean;
  const { h, s, l } = rgbToHsl(r, g, b);
  if (s < 0.12 && l > 0.78) return "White";
  if (l < 0.18 && s < 0.4) return "Charcoal";
  if (s < 0.18) return "Grey";
  if (h >= 15 && h <= 55) return "Oak"; // yellow/orange brownish
  return null;
}

function isGoodGroup(g) {
  return g.shape && g.shape !== "Uncategorized" && g.colorFamily && g.colorFamily !== "Unknown";
}

async function main() {
  const raw = await fs.readFile(dataFile, "utf-8");
  const categorized = JSON.parse(raw);
  const groups = (categorized.groups?.byShapeColor || []).filter(isGoodGroup);

  // Build prototype hashes for each group (use first 3 images when possible)
  const prototypes = [];
  for (const g of groups) {
    const imgs = Array.from(new Set(g.images)).slice(0, 3);
    const hashes = [];
    for (const img of imgs) {
      const fp = path.join(root, "public", img.replace(/^\//, ""));
      try { hashes.push(await dhash64(fp)); } catch {}
    }
    if (hashes.length) {
      prototypes.push({ slug: g.slug, shape: g.shape, colorFamily: g.colorFamily, hashes });
    }
  }
  if (prototypes.length === 0) {
    console.error("No prototypes to match against. Aborting.");
    process.exit(2);
  }

  // Collect uncategorized images
  const uncGroup = (categorized.groups?.byShapeColor || []).find(g => g.slug === "uncategorized-unknown");
  const unassigned = uncGroup ? uncGroup.images : [];

  const updates = {};
  for (const rel of unassigned) {
    const fp = path.join(root, "public", rel.replace(/^\//, ""));
    let imgHash;
    try { imgHash = await dhash64(fp); } catch { continue; }
    const fam = await averageColorFamily(fp);

    // Find nearest prototype
    let best = null;
    for (const p of prototypes) {
      for (const h of p.hashes) {
        const d = Number(hammingDist64(imgHash, h));
        const score = { d, p };
        if (!best || d < best.d) best = score;
      }
    }
    if (!best) continue;

    // Confidence rule: require small distance; adapt threshold by color agreement
    const colorOk = fam && fam === best.p.colorFamily;
    const thr = colorOk ? 14 : 10; // allow larger distance if color agrees
    if (best.d <= thr) {
      updates[rel] = { shape: best.p.shape, colorFamily: best.p.colorFamily };
    } else if (fam && fam !== "Grey" && fam !== "White") {
      // If strong color (oak/charcoal) but far, still assign by color to most common shape for that color
      const fallback = groups.find(g => g.colorFamily === fam) || null;
      if (fallback) updates[rel] = { shape: fallback.shape, colorFamily: fam };
    }
  }

  // Merge into overrides
  let overrides = { byImage: {}, byCode: {} };
  try { overrides = JSON.parse(await fs.readFile(overridesFile, "utf-8")); } catch {}
  overrides.byImage = overrides.byImage || {};
  for (const [img, patch] of Object.entries(updates)) {
    overrides.byImage[img] = { ...(overrides.byImage[img] || {}), ...patch };
  }
  await fs.writeFile(overridesFile, JSON.stringify(overrides, null, 2), "utf-8");
  console.log(`Updated overrides for ${Object.keys(updates).length} images -> ${overridesFile}`);
  console.log("Run: npm run categorize && refresh /products");
}

main().catch((e) => { console.error(e); process.exit(1); });
