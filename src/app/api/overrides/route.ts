import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";

const root = process.cwd();
const dataPath = path.join(root, "src", "data", "products.categorized.json");
const overridesPath = path.join(root, "src", "data", "products.overrides.json");

interface ProductGroup {
  slug?: string;
  images?: string[];
  [key: string]: unknown;
}

interface CategorizedData {
  groups?: {
    byShapeColor?: ProductGroup[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface OverrideData {
  byImage: Record<string, ProductOverride>;
  byCode: Record<string, ProductOverride>;
}

interface ProductOverride {
  shape?: string | null;
  colorFamily?: string | null;
  codeNumber?: string | null;
  codeName?: string | null;
  [key: string]: unknown;
}

interface ApiResponse {
  images?: string[];
  count?: number;
  error?: string;
  ok?: boolean;
  rebuilt?: boolean;
}

export async function GET(): Promise<NextResponse<ApiResponse>> {
  try {
    const raw = await fs.readFile(dataPath, "utf-8");
    const categorized: CategorizedData = JSON.parse(raw);
    const groups = categorized?.groups?.byShapeColor ?? [];
    const unc = groups.find((g: ProductGroup) => g.slug === "uncategorized-unknown");
    const images: string[] = unc?.images ?? [];
    return NextResponse.json({ images, count: images.length });
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
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

    let overrides: OverrideData = { byImage: {}, byCode: {} };
    try {
      const raw = await fs.readFile(overridesPath, "utf-8");
      overrides = JSON.parse(raw);
    } catch {}

    if (by === "image") {
      if (!image) return NextResponse.json({ error: "image required" }, { status: 400 });
      const cur = overrides.byImage[image] || {};
      overrides.byImage[image] = { ...cur, shape: shape ?? cur.shape ?? null, colorFamily: colorFamily ?? cur.colorFamily ?? null, codeNumber: codeNumber ?? cur.codeNumber ?? null, codeName: codeName ?? cur.codeName ?? null };
    } else if (by === "code") {
      if (!codeNumber) return NextResponse.json({ error: "codeNumber required" }, { status: 400 });
      const cur = overrides.byCode[codeNumber] || {};
      overrides.byCode[codeNumber] = { ...cur, shape: shape ?? cur.shape ?? null, colorFamily: colorFamily ?? cur.colorFamily ?? null, codeName: codeName ?? cur.codeName ?? null };
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
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error }, { status: 500 });
  }
}
