import Header from "@/components/Header";
import Footer from "@/components/Footer";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CategoryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dataPath = path.join(process.cwd(), "src", "data", "products.categorized.json");
  let categorized: any = null;
  let rawCategorized: string | null = null;
  try {
    rawCategorized = await fs.readFile(dataPath, "utf-8");
    categorized = JSON.parse(rawCategorized);
  } catch {}
  let items: any[] = categorized?.items ?? [];
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
    } catch {}
  }
  if (!items || items.length === 0) {
    try {
      const genPath = path.join(process.cwd(), "src", "data", "products.generated.json");
      const rawGen = await fs.readFile(genPath, "utf-8");
      const parsedGen = JSON.parse(rawGen);
      if (Array.isArray(parsedGen)) items = parsedGen;
    } catch {}
  }
  const groupsColor: any[] = categorized?.groups?.byShapeColor ?? [];
  const sections: any[] = categorized?.groups?.sections ?? [];

  // Try to read external curated sections file if not present in categorized
  let extraSections: any[] = [];
  if (!sections || sections.length === 0) {
    try {
      const sectionsPath = path.join(process.cwd(), "src", "data", "products.sections.json");
      const raw = await fs.readFile(sectionsPath, "utf-8");
      const parsed = JSON.parse(raw);
      extraSections = parsed?.sections ?? [];
    } catch {}
  }

  const allSections = (sections && sections.length > 0) ? sections : extraSections;

  const normalizeCode = (s: any): string => String(s ?? "").replace(/\s+/g, "").replace(/^LD/i, "").toUpperCase();
  const addImage = (arr: string[], src?: string) => { if (src && !arr.includes(src)) arr.push(src); };
  const itemsByNormCode = new Map<string, any>();
  for (const it of items) {
    if (it?.codeNumber) itemsByNormCode.set(normalizeCode(it.codeNumber), it);
  }
  const readFolderImages = async (slug?: string): Promise<string[]> => {
    if (!slug) return [];
    try {
      const dir = path.join(process.cwd(), "public", "images", "product", slug);
      const entries = await fs.readdir(dir, { withFileTypes: true });
      return entries
        .filter((d) => d.isFile())
        .map((d) => d.name)
        .filter((n) => /\.(png|jpe?g|webp|gif|bmp|tiff|ico)$/i.test(n))
        .map((n) => `/images/product/${slug}/${n}`);
    } catch { return []; }
  };
  const computeImages = async (grp: any): Promise<string[]> => {
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
    } catch {}
    return null;
  };

  let group: any = null;
  // Prefer curated section by slug
  group = allSections.find((g: any) => g.slug === slug);
  if (group) {
    group = {
      ...group,
      images: await computeImages(group),
      shape: group.shape || "Collections",
      colorFamily: group.colorFamily || undefined,
      title: group.title || group.name || group.colorFamily,
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

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative py-16">
          <div className="container">
            <div className="mb-6 text-sm">
              <Link href="/products" className="text-primary">&larr; Back to products</Link>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{group.shape} — {group.title || group.colorFamily}</h1>
            <div className="text-gray-400 text-sm mb-6">
              {group.codes?.length ? <span className="mr-3">Codes: {group.codes.join(", ")}</span> : null}
              {group.pageRanges?.length ? <span className="mr-3">Pages: {group.pageRanges.map((r: any)=>`${r[0]}–${r[1]}`).join(", ")}</span> : null}
              {group.names?.length ? <span>Names: {group.names.join(", ")}</span> : null}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.images.map((src: string, idx: number) => (
                <div key={src + idx} className="overflow-hidden rounded-md border border-white/10">
                  <img src={src} alt={`${group.shape} ${group.colorFamily} ${idx + 1}`} className="w-full h-80 object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

