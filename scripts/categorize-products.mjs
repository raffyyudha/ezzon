#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";

const root = process.cwd();
const srcFile = path.join(root, "src", "data", "products.generated.json");
const outFile = path.join(root, "src", "data", "products.categorized.json");
const overridesFile = path.join(root, "src", "data", "products.overrides.json");

function normalizeCodeNumber(code) {
  if (!code) return null;
  let s = String(code).toUpperCase().replace(/\s+/g, " ").trim();
  // Map short 4-digit overlay like 5301 -> LD 825301
  const short = s.match(/^\d{4}$/) ? s : null;
  if (short && s.startsWith("5")) {
    return `LD 825${s.slice(1)}`;
  }
  // Map 6-digit 825xxx -> LD 825xxx
  if (/^825\d{3}$/.test(s)) {
    return `LD ${s}`;
  }
  let m = s.match(/\bLD\s*\d{3,6}\b/);
  if (m) {
    const t = m[0];
    // Ensure space after LD even if original has none, e.g. LD2801 -> LD 2801
    return `LD ${t.replace(/^LD\s*/, "").trim()}`;
  }
  m = s.match(/\b\d{3,6}\s*HRB\b/);
  if (m) return m[0].replace(/\s+/, " ");
  m = s.match(/\b\d{4,6}\b/);
  if (m) return m[0];
  return s;
}

function slugify(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function normalizeCodeName(name) {
  if (!name) return null;
  let s = String(name).toUpperCase().replace(/[^A-Z\s]/g, " ").replace(/\s+/g, " ").trim();
  if (!s) return null;
  // Known word joins
  s = s.replace(/WASH OAK/g, "WASH OAK");
  return s;
}

function fillShape(item) {
  const uName = (item.codeName || "").toUpperCase();
  const uSize = (item.size || "").toUpperCase();
  const uCode = (item.codeNumber || "").toUpperCase();
  if (item.shape) return item.shape;
  // From codes and brochure patterns
  if (/HRB\b/.test(uCode) || /HERRINGBONE/.test(uName) || /\bLD\s*8255/.test(uCode)) return "Herringbone";
  if (/\bLD\s*8253/.test(uCode)) return "Stone";
  if (/\bLD\s*825[12]/.test(uCode)) return "Plank";
  if (/STONE/.test(uName)) return "Stone";
  if (/300\s*MM/.test(uSize) && /600\s*MM/.test(uSize)) return "Stone";
  if (/150\s*MM/.test(uSize) && /900\s*MM/.test(uSize)) return "Plank";
  if (/(OAK|TEAK|WALNUT|MAPLE|ASH|CHESTNUT)/.test(uName)) return "Plank";
  return null;
}

function inferColor(name, fallback) {
  const n = (name || "").toUpperCase();
  if (/LIGHT\s+GREY|LIGHT\s+GRAY/.test(n)) return "Light Grey";
  if (/GREY|GRAY/.test(n)) return "Grey";
  if (/CHARCOAL/.test(n)) return "Charcoal";
  if (/WHITE/.test(n)) return "White";
  if (/BLACK/.test(n)) return "Black";
  if (/BEIGE/.test(n)) return "Beige";
  if (/BROWN/.test(n)) return "Brown";
  if (/(OAK|TEAK|WALNUT|MAPLE|ASH|CHESTNUT)/.test(n)) return "Oak";
  if (/LIME\s+WASH/.test(n)) return "Lime Wash";
  return fallback || null;
}

function summarize(items) {
  const stats = { count: items.length, withCode: 0, withName: 0 };
  const shapes = {};
  const colors = {};
  for (const it of items) {
    if (it.codeNumber) stats.withCode++;
    if (it.codeName) stats.withName++;
    if (it.shape) shapes[it.shape] = (shapes[it.shape] || 0) + 1;
    if (it.colorFamily) colors[it.colorFamily] = (colors[it.colorFamily] || 0) + 1;
  }
  stats.shapes = shapes;
  stats.colors = colors;
  return stats;
}

async function main() {
  const raw = await fs.readFile(srcFile, "utf-8");
  const data = JSON.parse(raw);
  let overrides = { byImage: {}, byCode: {} };
  try {
    const oRaw = await fs.readFile(overridesFile, "utf-8");
    overrides = JSON.parse(oRaw);
  } catch {}

  const items = data.map((r) => {
    const codeNumber = normalizeCodeNumber(r.codeNumber);
    const codeName = normalizeCodeName(r.codeName);
    const shape = fillShape({ ...r, codeName, codeNumber });
    const colorFamily = inferColor(codeName, r.colorFamily);
    let it = {
      image: r.image,
      codeNumber,
      codeName,
      shape,
      colorFamily,
      size: r.size || null,
      trimming: r.trimming || null,
    };
    // Apply overrides by image first
    const oImg = overrides.byImage?.[r.image];
    if (oImg) {
      it = { ...it, ...oImg };
    }
    // Apply overrides by code
    const oCode = it.codeNumber ? overrides.byCode?.[it.codeNumber] : null;
    if (oCode) {
      it = { ...it, ...oCode };
    }
    // Recompute inferred fields if override updated name/shape
    it.codeName = normalizeCodeName(it.codeName);
    it.shape = it.shape || fillShape(it);
    it.colorFamily = inferColor(it.codeName, it.colorFamily);
    return it;
  });

  // Aggregate by code to propagate missing fields across items
  const byCode = new Map();
  for (const it of items) {
    if (!it.codeNumber) continue;
    const key = it.codeNumber;
    let agg = byCode.get(key);
    if (!agg) {
      agg = { codeNumber: key, names: new Set(), shapes: new Set(), colors: new Set(), size: null, trimming: null };
      byCode.set(key, agg);
    }
    if (it.codeName) agg.names.add(it.codeName);
    if (it.shape) agg.shapes.add(it.shape);
    if (it.colorFamily) agg.colors.add(it.colorFamily);
    if (!agg.size && it.size) agg.size = it.size;
    if (!agg.trimming && it.trimming) agg.trimming = it.trimming;
  }
  // Choose majority/first values
  function pick(set) {
    return Array.from(set || [])[0] || null;
  }
  for (const it of items) {
    if (!it.codeNumber) continue;
    const agg = byCode.get(it.codeNumber);
    if (!it.codeName) it.codeName = pick(agg.names);
    if (!it.shape) it.shape = pick(agg.shapes);
    if (!it.colorFamily) it.colorFamily = pick(agg.colors);
    if (!it.size && agg.size) it.size = agg.size;
    if (!it.trimming && agg.trimming) it.trimming = agg.trimming;
  }

  // Build groups
  const byShape = {};
  const byColorFamily = {};
  const byShapeColor = {};
  const byShapeName = {};
  for (const it of items) {
    const s = it.shape || "Uncategorized";
    const c = it.colorFamily || "Unknown";
    const n = it.codeName || "Unknown";
    (byShape[s] ||= []).push(it);
    (byColorFamily[c] ||= []).push(it);
    const key = `${s}|${c}`;
    const slug = `${slugify(s)}-${slugify(c)}`;
    (byShapeColor[key] ||= { shape: s, colorFamily: c, slug, images: [], codes: new Set(), names: new Set(), items: [] });
    const g = byShapeColor[key];
    g.items.push(it);
    g.images.push(it.image);
    if (it.codeNumber) g.codes.add(it.codeNumber);
    if (it.codeName) g.names.add(it.codeName);

    const keyN = `${s}|${n}`;
    const slugN = `${slugify(s)}-${slugify(n)}`;
    (byShapeName[keyN] ||= { shape: s, name: n, slug: slugN, images: [], codes: new Set(), items: [] });
    const gn = byShapeName[keyN];
    gn.items.push(it);
    gn.images.push(it.image);
    if (it.codeNumber) gn.codes.add(it.codeNumber);
  }
  // Serialize sets and sort images unique
  const shapeColorGroups = Object.values(byShapeColor).map((g) => ({
    shape: g.shape,
    colorFamily: g.colorFamily,
    slug: g.slug,
    images: Array.from(new Set(g.images)),
    codes: Array.from(g.codes),
    names: Array.from(g.names),
    count: g.items.length,
  }));
  const shapeNameGroups = Object.values(byShapeName).map((g) => ({
    shape: g.shape,
    name: g.name,
    slug: g.slug,
    images: Array.from(new Set(g.images)),
    codes: Array.from(g.codes),
    count: g.items.length,
  }));

  const stats = summarize(items);

  const out = { items, byShape, byColorFamily, groups: { byShapeColor: shapeColorGroups, byShapeName: shapeNameGroups }, stats };
  await fs.writeFile(outFile, JSON.stringify(out, null, 2), "utf-8");
  console.log(`Saved: ${outFile}`);
  console.log(stats);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
