import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";

const root = process.cwd();
const dataPath = path.join(root, "src", "data", "products.categorized.json");
const overridesPath = path.join(root, "src", "data", "products.overrides.json");

export async function GET() {
  try {
    const raw = await fs.readFile(dataPath, "utf-8");
    const categorized = JSON.parse(raw);
    const groups = categorized?.groups?.byShapeColor ?? [];
    const unc = groups.find((g: any) => g.slug === "uncategorized-unknown");
    const images: string[] = unc?.images ?? [];
    return NextResponse.json({ images, count: images.length });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, codeNumber, codeName, shape, colorFamily, by = "image", rebuild, action } = body || {};
    if (action === "rebuild") {
      await new Promise<void>((resolve, reject) => {
        exec("node scripts/categorize-products.mjs", { cwd: root }, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
      return NextResponse.json({ ok: true, rebuilt: true });
    }
    let overrides = { byImage: {} as Record<string, any>, byCode: {} as Record<string, any> };
    try {
      const raw = await fs.readFile(overridesPath, "utf-8");
      overrides = JSON.parse(raw);
    } catch {}

    if (by === "image") {
      if (!image) return NextResponse.json({ error: "image required" }, { status: 400 });
      const cur = (overrides.byImage as any)[image] || {};
      (overrides.byImage as any)[image] = { ...cur, shape: shape ?? cur.shape ?? null, colorFamily: colorFamily ?? cur.colorFamily ?? null, codeNumber: codeNumber ?? cur.codeNumber ?? null, codeName: codeName ?? cur.codeName ?? null };
    } else if (by === "code") {
      if (!codeNumber) return NextResponse.json({ error: "codeNumber required" }, { status: 400 });
      const cur = (overrides.byCode as any)[codeNumber] || {};
      (overrides.byCode as any)[codeNumber] = { ...cur, shape: shape ?? cur.shape ?? null, colorFamily: colorFamily ?? cur.colorFamily ?? null, codeName: codeName ?? cur.codeName ?? null };
    }

    await fs.writeFile(overridesPath, JSON.stringify(overrides, null, 2), "utf-8");

    if (rebuild) {
      await new Promise<void>((resolve, reject) => {
        exec("node scripts/categorize-products.mjs", { cwd: root }, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || String(e) }, { status: 500 });
  }
}
