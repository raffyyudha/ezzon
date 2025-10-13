import Header from "@/components/Header";
import Footer from "@/components/Footer";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductItem {
  codeNumber?: string;
  codeName?: string | null;
  shape?: string | null;
  colorFamily?: string | null;
  size?: string | null;
  trimming?: string | null;
  image?: string;
  [key: string]: unknown;
}

interface CategorizedData {
  items?: ProductItem[];
  [key: string]: unknown;
}

interface ProductGroup {
  shape: string;
  codeNumber: string;
  codeName: string | null;
  colorFamily: string | null;
  size: string | null;
  trimming: string | null;
  images: string[];
  slug: string;
}

function slugify(shape: string, code: string) {
  const s = (shape || "Uncategorized").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const c = String(code || "").replace(/\s+/g, "").toLowerCase();
  return `${s}-${c}`;
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dataPath = path.join(process.cwd(), "src", "data", "products.categorized.json");
  let categorized: CategorizedData | null = null;
  try {
    const raw = await fs.readFile(dataPath, "utf-8");
    categorized = JSON.parse(raw);
  } catch {}
  const items: ProductItem[] = categorized?.items ?? [];

  const groupMap = new Map<string, ProductGroup>();
  for (const it of items) {
    if (!it.codeNumber) continue;
    const shape = it.shape || "Uncategorized";
    const key = `${shape}|${it.codeNumber}`;
    let g = groupMap.get(key);
    if (!g) {
      g = {
        shape,
        codeNumber: it.codeNumber,
        codeName: it.codeName || null,
        colorFamily: it.colorFamily || null,
        size: it.size || null,
        trimming: it.trimming || null,
        images: [],
        slug: slugify(shape, it.codeNumber),
      };
      groupMap.set(key, g);
    }
    if (!g.codeName && it.codeName) g.codeName = it.codeName;
    if (!g.colorFamily && it.colorFamily) g.colorFamily = it.colorFamily;
    if (!g.size && it.size) g.size = it.size;
    if (!g.trimming && it.trimming) g.trimming = it.trimming;
    if (it.image && !g.images.includes(it.image)) g.images.push(it.image);
  }

  let group: ProductGroup | null = null;
  for (const g of groupMap.values()) {
    if (g.slug === slug) {
      group = g;
      break;
    }
  }
  if (!group) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="relative py-16">
          <div className="container">
            <div className="mb-6 text-sm">
              <Link href="/products" className="text-primary">&larr; Back to products</Link>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{group.codeNumber}</h1>
            <p className="text-gray-300 mb-4">{group.codeName || "—"}</p>
            <div className="text-gray-400 text-sm mb-10">
              <span className="mr-3">{group.shape}</span>
              {group.colorFamily ? <span className="mr-3">{group.colorFamily}</span> : null}
              {group.size ? <span className="mr-3">{group.size}</span> : null}
              {group.trimming ? <span>Trim {group.trimming}</span> : null}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.images.map((src: string, idx: number) => (
                <div key={src + idx} className="overflow-hidden rounded-md border border-white/10">
                  <img src={src} alt={`${group.codeNumber} image ${idx + 1}`} className="w-full h-80 object-cover" />
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
