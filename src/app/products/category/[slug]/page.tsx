import Header from "@/components/Header";
import Footer from "@/components/Footer";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryGallery from "./CategoryGallery";

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

export default async function CategoryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dataPath = path.join(process.cwd(), "src", "data", "products.categorized.json");
  let categorized: CategorizedData | null = null;
  let rawCategorized: string | null = null;
  try {
    rawCategorized = await fs.readFile(dataPath, "utf-8");
    categorized = JSON.parse(rawCategorized);
  } catch { }
  let items: ProductItem[] = categorized?.items ?? [];
  if ((!items || items.length === 0) && rawCategorized) {
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
      const rawGen = await fs.readFile(genPath, "utf-8");
      const parsedGen = JSON.parse(rawGen);
      if (Array.isArray(parsedGen)) items = parsedGen;
    } catch { }
  }
  const groupsColor: ProductGroup[] = categorized?.groups?.byShapeColor ?? [];
  const sections: ProductGroup[] = categorized?.groups?.sections ?? [];

  // Try to read external curated sections file if not present in categorized
  let extraSections: ProductGroup[] = [];
  if (!sections || sections.length === 0) {
    try {
      const sectionsPath = path.join(process.cwd(), "src", "data", "products.sections.json");
      const raw = await fs.readFile(sectionsPath, "utf-8");
      const parsed = JSON.parse(raw);
      extraSections = parsed?.sections ?? [];
    } catch { }
  }

  const allSections = (sections && sections.length > 0) ? sections : extraSections;

  const normalizeCode = (s: string | null | undefined): string => String(s ?? "").replace(/\s+/g, "").replace(/^LD/i, "").toUpperCase();
  const addImage = (arr: string[], src?: string) => { if (src && !arr.includes(src)) arr.push(src); };
  const itemsByNormCode = new Map<string, ProductItem>();
  for (const it of items) {
    if (it?.codeNumber) itemsByNormCode.set(normalizeCode(it.codeNumber), it);
  }
  const readFolderImages = async (slug?: string): Promise<string[]> => {
    if (!slug) return [];

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
      const rootDir = path.join(process.cwd(), "public", "images", "product", slug);
      const absFiles = await walk(rootDir);
      const productRoot = path.join(process.cwd(), "public", "images", "product");
      return absFiles.map(f => {
        const rel = path.relative(productRoot, f);
        return `/images/product/${rel}`.replace(/\\/g, '/');
      });
    } catch { return []; }
  };
  const computeImages = async (grp: ProductGroup): Promise<string[]> => {
    const imgs: string[] = [];
    if (grp?.images && grp.images.length > 0) return grp.images;
    const byFolder = await readFolderImages(grp?.slug);
    if (byFolder.length > 0) return byFolder;
    // explicit codes
    if (grp?.codes && Array.isArray(grp.codes) && grp.codes.length > 0) {
      for (const rawCode of grp.codes) {
        const it = itemsByNormCode.get(normalizeCode(rawCode));
        addImage(imgs, it?.image);
      }
    }
    // infer by series keywords if still empty
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
    // page ranges fallback
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

  // Folders-based category support
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const findFolderBySlug = async (slug: string) => {
    try {
      const root = path.join(process.cwd(), "public", "images", "product");
      const entries = await fs.readdir(root, { withFileTypes: true });
      for (const e of entries) {
        if (!e.isDirectory()) continue;
        const name = e.name;
        if (slugify(name) === slug) {
          const imgs = await readFolderImages(name);
          return { slug, title: name, shape: "Collections", images: imgs };
        }
      }
    } catch { }
    return null;
  };

  let group: ProductGroup | null = null;
  // Prefer curated section by slug
  group = allSections.find((g: ProductGroup) => g.slug === slug) || null;
  if (group) {
    group = {
      ...group,
      images: await computeImages(group),
      shape: group.shape || "Collections",
      colorFamily: group.colorFamily ?? undefined,
      title: group.title || group.name || group.colorFamily || undefined,
    };
  } else {
    // Fallback to existing grouping
    group = groupsColor.find((g) => g.slug === slug) || null;
    // Fallback to folder-based groups
    if (!group) {
      const folderGroup = await findFolderBySlug(slug);
      if (folderGroup) group = folderGroup;
    }
  }
  if (!group) notFound();

  const displayTitle = group.title || group.name || group.colorFamily || "Collection";
  const displaySubtitle = group.shape || "Category";

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      <CategoryGallery
        title={displayTitle}
        subtitle={displaySubtitle}
        images={group.images || []}
        codes={group.codes || []}
      />
      <Footer />
    </div>
  );
}

