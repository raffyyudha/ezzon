import fs from "fs";
import path from "path";

export type BrochureItem = {
  name: string;
  href: string;
};

export type BrochureGroup = {
  brand: string;
  items: BrochureItem[];
};

function toTitleCase(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1));
}

export function getBrochureGroups(): BrochureGroup[] {
  const root = path.join(process.cwd(), "public", "brosur");

  if (!fs.existsSync(root)) {
    return [];
  }

  const groupsMap = new Map<string, BrochureItem[]>();

  const walk = (dir: string, segments: string[] = []) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(entryPath, [...segments, entry.name]);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".pdf")) {
        const relativePath = path.relative(root, entryPath).replace(/\\/g, "/");
        const href = `/brosur/${relativePath}`;

        const brandSegment = segments[0] ?? "Lainnya";
        const brand = toTitleCase(brandSegment);

        const baseName = entry.name.replace(/\.pdf$/i, "");
        const name = toTitleCase(baseName);

        if (!groupsMap.has(brand)) {
          groupsMap.set(brand, []);
        }
        groupsMap.get(brand)!.push({ name, href });
      }
    }
  };

  walk(root);

  const groups: BrochureGroup[] = Array.from(groupsMap.entries()).map(([brand, items]) => ({
    brand,
    items: items.sort((a, b) => a.name.localeCompare(b.name)),
  }));

  return groups.sort((a, b) => a.brand.localeCompare(b.brand));
}
