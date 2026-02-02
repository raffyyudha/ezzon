import Header from "@/components/Header";
import Footer from "@/components/Footer";

import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import ProductListing from "./ProductListing";

interface ProductItem {
  image?: string;
  codeNumber?: string;
  codeName?: string | null;
  shape?: string | null;
  colorFamily?: string | null;
  size?: string | null;
  trimming?: string | null;
  [key: string]: unknown;
}

interface ProductGroup {
  shape?: string;
  title?: string;
  name?: string;
  colorFamily?: string | null;
  codes?: string[];
  pageRanges?: [number, number][];
  series?: string;
  slug?: string;
  dirName?: string;
  images?: string[];
  thumbnail?: string;
  names?: string[];
  [key: string]: unknown;
}

interface CategorizedData {
  groups?: {
    sections?: ProductGroup[];
    byShapeName?: ProductGroup[];
    byShapeColor?: ProductGroup[];
    [key: string]: unknown;
  };
  items?: ProductItem[];
  [key: string]: unknown;
}

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  noStore();
  const dataPath = path.join(process.cwd(), "src", "data", "products.categorized.json");
  let categorized: CategorizedData | null = null;
  let rawCategorized: string | null = null;
  try {
    rawCategorized = await fs.readFile(dataPath, "utf-8");
    categorized = JSON.parse(rawCategorized);
  } catch { }
  const groupSets = categorized?.groups ?? {};
  let items: ProductItem[] = categorized?.items ?? [];
  if ((!items || items.length === 0) && rawCategorized) {
    // Attempt to leniently extract items array from malformed JSON by bracket matching
    try {
      const startKey = '"items"';
      const startIdx = rawCategorized.indexOf(startKey);
      if (startIdx !== -1) {
        const arrStart = rawCategorized.indexOf('[', startIdx);
        if (arrStart !== -1) {
          let i = arrStart;
          let depth = 0;
          let arrEnd = -1;
          while (i < rawCategorized.length) {
            const ch = rawCategorized[i];
            if (ch === '[') depth++;
            else if (ch === ']') {
              depth--;
              if (depth === 0) { arrEnd = i; break; }
            }
            i++;
          }
          if (arrEnd > arrStart) {
            const arrText = rawCategorized.slice(arrStart, arrEnd + 1);
            const parsedItems = JSON.parse(arrText);
            if (Array.isArray(parsedItems)) items = parsedItems;
          }
        }
      }
    } catch { }
  }
  if (!items || items.length === 0) {
    try {
      const genPath = path.join(process.cwd(), "src", "data", "products.generated.json");
      const raw = await fs.readFile(genPath, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) items = parsed;
    } catch { }
  }

  // Helper: normalize code for matching (strip spaces and LD prefix)
  const normalizeCode = (s: string | null | undefined): string => String(s ?? "").replace(/\s+/g, "").replace(/^LD/i, "").toUpperCase();
  const addImage = (arr: string[], src?: string) => { if (src && !arr.includes(src)) arr.push(src); };
  const itemsByNormCode = new Map<string, ProductItem>();
  for (const it of items) {
    if (it?.codeNumber) itemsByNormCode.set(normalizeCode(it.codeNumber), it);
  }
  // Helper: load images from public folder per section slug
  // Helper: load images from public folder per section slug (recursive)
  const readFolderImages = async (slug?: string, dirName?: string): Promise<string[]> => {
    const folder = dirName || slug;
    if (!folder) return [];

    const walk = async (dir: string): Promise<string[]> => {
      let results: string[] = [];
      try {
        const list = await fs.readdir(dir, { withFileTypes: true });
        for (const t of list) {
          const res = path.join(dir, t.name);
          if (t.isDirectory()) {
            results = results.concat(await walk(res));
          } else if (/\.(png|jpe?g|webp|gif|bmp|tiff|ico)$/i.test(t.name)) {
            results.push(res);
          }
        }
      } catch { /* ignore */ }
      return results;
    };

    try {
      const rootDir = path.join(process.cwd(), "public", "images", "product", folder);
      const absFiles = await walk(rootDir);
      const productRoot = path.join(process.cwd(), "public", "images", "product");
      return absFiles.map(f => {
        const rel = path.relative(productRoot, f);
        return `/images/product/${rel}`.replace(/\\/g, '/');
      });
    } catch { return []; }
  };
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  // Explicit thumbnail overrides per folder (1-based index)
  const thumbnailOverrides: Array<{ code: string; index: number }> = [
    { code: "825302", index: 1 },
    { code: "2804", index: 3 },
    { code: "2803", index: 1 },
    { code: "825102", index: 3 },
    { code: "825103", index: 2 },
    { code: "825104", index: 2 },
    { code: "825106", index: 2 },
    { code: "825109", index: 3 },
    { code: "825328", index: 1 },
    { code: "825502", index: 1 },
    { code: "825503", index: 1 },
  ];
  const applyOverrideThumbnail = (dirName: string, images: string[]): string | undefined => {
    const digitsInName = (dirName.match(/\d+/g) || []).join("");
    for (const o of thumbnailOverrides) {
      if (digitsInName.includes(o.code)) {
        const idx = Math.max(1, Math.floor(o.index));
        if (images[idx - 1]) return images[idx - 1];
      }
    }
    return undefined;
  };
  const pickThumbnail = (images: string[], folderName?: string): string | undefined => {
    if (!images || images.length === 0) return undefined;
    const folderDigits = (folderName || "").match(/\d+/g) || [];
    const mainCode = folderDigits.sort((a, b) => b.length - a.length)[0] || "";
    const scoreName = (src: string) => {
      const name = src.split('/').pop()?.toLowerCase() || "";
      const hasLD = /(^|[^a-z])ld([^a-z]|$)/.test(name);
      const hasHRB = /(^|[^a-z])hrb([^a-z]|$)/.test(name);
      const hasCodeWord = /code|number/.test(name);
      const hasFolderDigits = mainCode && name.includes(mainCode);
      const digits = (name.match(/\d+/g) || []).reduce((m, s) => Math.max(m, s.length), 0);
      return (hasFolderDigits ? 200 : 0) + (hasLD ? 80 : 0) + (hasHRB ? 60 : 0) + (hasCodeWord ? 40 : 0) + digits;
    };
    const sorted = [...images].sort((a, b) => scoreName(b) - scoreName(a));
    const top = sorted[0];
    if (scoreName(top) === 0 && images.length > 1) {
      // pick pseudo-random stable by hash of names
      const idx = Math.abs(images.join('|').split('').reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0)) % images.length;
      return images[idx];
    }
    return top;
  };
  const readFolderGroups = async (): Promise<ProductGroup[]> => {
    const root = path.join(process.cwd(), "public", "images", "product");
    try {
      const entries = await fs.readdir(root, { withFileTypes: true });
      const dirs = entries.filter((e) => e.isDirectory());
      const groups: ProductGroup[] = [];
      for (const d of dirs) {
        const dirName = d.name;
        const images = await readFolderImages(undefined, dirName);
        if (images.length === 0) continue;
        const overridden = applyOverrideThumbnail(dirName, images);
        const thumbnail = overridden || (pickThumbnail(images, dirName) || images[0]);
        groups.push({
          shape: "Collections",
          title: dirName,
          name: dirName,
          slug: slugify(dirName),
          dirName,
          images,
          thumbnail,
        });
      }
      return groups;
    } catch {
      return [];
    }
  };
  const unique = <T,>(arr: T[]) => Array.from(new Set(arr));
  const computeCodes = (grp: ProductGroup): string[] => {
    const out: string[] = [];
    // explicit
    if (grp?.codes && Array.isArray(grp.codes) && grp.codes.length > 0) return unique(grp.codes);
    // infer by series
    const t = `${grp?.series ?? ""} ${grp?.title ?? ""} ${grp?.slug ?? ""}`.toUpperCase();
    const want8253 = /8253/.test(t);
    const want8251 = /8251/.test(t);
    const want8255 = /8255/.test(t);
    const wantHRB64 = /(HRB\s*64|64XX)/.test(t);
    const want63xx = /\b63XX\b/.test(t);
    const want56xx = /\b56XX\b/.test(t);
    const wantMixed = /(55XX|53XX|52XX|51XX|82XXXX)/.test(t);
    for (const it of items) {
      const raw = String(it?.codeNumber ?? "");
      const norm = normalizeCode(raw);
      const digits = norm.replace(/[^0-9]/g, "");
      const hasHRB = /HRB/i.test(raw);
      const pick = (
        (want8253 && digits.startsWith("8253")) ||
        (want8251 && digits.startsWith("8251")) ||
        (want8255 && digits.startsWith("8255")) ||
        (wantHRB64 && hasHRB && digits.startsWith("64")) ||
        (want63xx && digits.startsWith("63")) ||
        (want56xx && digits.startsWith("56")) ||
        (wantMixed && (digits.startsWith("55") || digits.startsWith("53") || digits.startsWith("52") || digits.startsWith("51") || digits.startsWith("82")))
      );
      if (pick && raw) out.push(raw);
    }
    // fallback page ranges
    if (out.length === 0 && grp?.pageRanges && Array.isArray(grp.pageRanges)) {
      for (const range of grp.pageRanges) {
        const [start, end] = range as [number, number];
        for (let p = start; p <= end; p++) {
          const it = items[p - 1];
          if (it?.codeNumber) out.push(String(it.codeNumber));
        }
      }
    }
    return unique(out);
  };
  // Helper to compute images for a group from items when missing
  const computeImages = async (grp: ProductGroup): Promise<string[]> => {
    const imgs: string[] = [];
    // Priority 0: user-provided folder per section
    const byFolder = await readFolderImages(grp?.slug);
    if (byFolder.length > 0) return byFolder;
    // Priority 1: explicit codes
    if (grp?.codes && Array.isArray(grp.codes) && grp.codes.length > 0) {
      for (const rawCode of grp.codes) {
        const key = normalizeCode(rawCode);
        const it = itemsByNormCode.get(key);
        if (it?.image) addImage(imgs, it.image);
      }
    }
    // Priority 1b: infer by series keywords in title/slug when no explicit codes matched
    if (imgs.length === 0) {
      const t = `${grp?.series ?? ""} ${grp?.title ?? ""} ${grp?.slug ?? ""}`.toUpperCase();
      const want8253 = /8253/.test(t);
      const want8251 = /8251/.test(t);
      const want8255 = /8255/.test(t);
      const wantHRB64 = /(HRB\s*64|64XX)/.test(t);
      const want63xx = /\b63XX\b/.test(t);
      const want56xx = /\b56XX\b/.test(t);
      const wantMixed = /(55XX|53XX|52XX|51XX|82XXXX)/.test(t);
      for (const it of items) {
        const norm = normalizeCode(it?.codeNumber);
        const digits = norm.replace(/[^0-9]/g, "");
        const hasHRB = /HRB/i.test(String(it?.codeNumber ?? ""));
        const pick = (
          (want8253 && digits.startsWith("8253")) ||
          (want8251 && digits.startsWith("8251")) ||
          (want8255 && digits.startsWith("8255")) ||
          (wantHRB64 && hasHRB && digits.startsWith("64")) ||
          (want63xx && digits.startsWith("63")) ||
          (want56xx && digits.startsWith("56")) ||
          (wantMixed && (digits.startsWith("55") || digits.startsWith("53") || digits.startsWith("52") || digits.startsWith("51") || digits.startsWith("82")))
        );
        if (pick) addImage(imgs, it?.image);
      }
    }
    // Priority 2: pageRanges as [start,end] 1-indexed
    if (imgs.length === 0 && grp?.pageRanges && Array.isArray(grp.pageRanges)) {
      for (const range of grp.pageRanges) {
        const [start, end] = range as [number, number];
        for (let p = start; p <= end; p++) {
          const idx = p - 1;
          const it = items[idx];
          addImage(imgs, it?.image);
        }
      }
    }
    return imgs;
  };

  // Prefer curated sections if available (internal or external)
  let sections: ProductGroup[] = Array.isArray(groupSets.sections) ? groupSets.sections : [];
  if (!sections || sections.length === 0) {
    try {
      const sectionsPath = path.join(process.cwd(), "src", "data", "products.sections.json");
      const raw = await fs.readFile(sectionsPath, "utf-8");
      const parsed = JSON.parse(raw);
      sections = Array.isArray(parsed?.sections) ? parsed.sections : [];
    } catch { }
  }
  let groups: ProductGroup[];
  const hasSections = sections.length > 0;
  // Prefer folder-based categories if present
  const folderGroups = await readFolderGroups();
  const hasFolders = folderGroups.length > 0;
  if (hasFolders) {
    groups = folderGroups;
  } else if (hasSections) {
    // Enrich sections with computed images when not provided
    const enriched: ProductGroup[] = [];
    for (const g of sections) {
      const codes = computeCodes(g);
      const images = (g.images && g.images.length > 0) ? g.images : await computeImages({ ...g, codes });
      enriched.push({
        ...g,
        codes,
        images,
        shape: g.shape || "Collections",
        name: g.name || g.colorFamily || g.title,
      });
    }
    groups = enriched;
  } else {
    // Fallback to previous behavior
    groups = groupSets.byShapeName && groupSets.byShapeName.length > 0
      ? groupSets.byShapeName
      : (groupSets.byShapeColor ?? []);
  }

  // Extract unique shapes for filters
  const uniqueShapes = Array.from(new Set(groups.map(g => g.shape || "Uncategorized"))).sort();
  // Ensure Collections is last or handled in the client comp, but let's pass all available shapes

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      <ProductListing initialGroups={groups} allShapes={uniqueShapes} />
      <Footer />
    </div>
  );
}

