/**
 * Simple Sitemap Generator for PSEO
 * Run with: node scripts/generate-sitemap.js
 * Output: public/sitemap.xml (and sitemap-1.xml, sitemap-2.xml, etc.)
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://ezonrenovation.com';
const MAX_URLS_PER_SITEMAP = 45000; // Google limit is 50k, we use 45k for safety

// Simple data - copy from your data files
const locations = [
    "bishan", "bukit-merah", "bukit-timah", "downtown-core", "geylang", "kallang",
    "marine-parade", "museum", "newton", "novena", "orchard", "outram", "queenstown",
    "river-valley", "rochor", "singapore-river", "southern-islands", "tanglin", "toa-payoh",
    "bedok", "changi", "changi-bay", "pasir-ris", "paya-lebar", "tampines",
    "central-water-catchment", "lim-chu-kang", "mandai", "sembawang", "simpang",
    "sungei-kadut", "woodlands", "yishun", "ang-mo-kio", "hougang", "north-eastern-islands",
    "punggol", "seletar", "sengkang", "serangoon", "boon-lay", "bukit-batok",
    "bukit-panjang", "choa-chu-kang", "clementi", "jurong-east", "jurong-west",
    "pioneer", "tengah", "tuas", "western-islands", "western-water-catchment",
    "tiong-bahru", "holland-village", "dempsey-hill", "robertson-quay", "clarke-quay",
    "boat-quay", "raffles-place", "marina-bay", "tanjong-pagar", "chinatown",
    "little-india", "bugis", "lavender", "potong-pasir", "whampoa", "bendemeer",
    "balestier", "thomson", "telok-blangah", "harbourfront", "sentosa", "pasir-panjang",
    "west-coast", "dover", "buona-vista", "commonwealth", "redhill", "alexandra",
    "ghim-moh", "farrer-road", "botanic-gardens", "stevens", "dunearn", "king-albert-park",
    "sixth-avenue", "coronation", "tan-kah-kee", "beauty-world", "hillview", "dairy-farm",
    "cashew", "east-coast", "katong", "joo-chiat", "siglap", "kembangan", "eunos",
    "aljunied", "macpherson", "simei", "tanah-merah", "expo", "changi-village", "loyang",
    "upper-east-coast", "marsiling", "admiralty", "kranji", "khatib", "yew-tee", "canberra",
    "kovan", "lorong-chuan", "bartley", "tai-seng", "upper-serangoon", "buangkok",
    "compassvale", "rivervale", "anchorvale", "fernvale", "waterway", "matilda", "damai",
    "jurong-lake", "lakeside", "chinese-garden", "taman-jurong", "nanyang",
    "corporation-drive", "jurong-gateway", "international-business-park", "sunset-way",
    "teban-gardens", "hong-kah", "teck-whye", "phoenix", "fajar", "senja", "petir",
    "bangkit", "pending", "jelapang"
];

const services = [
    "vinyl-flooring-installation", "laminate-flooring-installation", "hardwood-flooring-installation",
    "tile-flooring-installation", "marble-flooring-installation", "parquet-flooring-installation",
    "epoxy-flooring-installation", "carpet-installation", "floor-polishing", "floor-sanding",
    "painting-services", "wallpaper-installation", "false-ceiling-installation",
    "plaster-ceiling-repair", "kitchen-renovation", "bathroom-renovation",
    "kitchen-cabinet-installation", "carpentry-services", "wardrobe-installation",
    "tv-console-installation", "shoe-cabinet-installation", "storage-solutions",
    "electrical-works", "plumbing-works", "aircon-installation", "door-installation",
    "window-installation", "glass-works", "hdb-renovation", "condo-renovation",
    "landed-house-renovation", "office-renovation", "shop-renovation", "restaurant-renovation"
];

const propertyTypes = [
    "3-room-hdb", "4-room-hdb", "5-room-hdb", "executive-hdb", "bto-flat",
    "resale-hdb", "dbss-flat", "condominium", "ec-condominium", "apartment",
    "penthouse", "terrace-house", "semi-detached", "bungalow", "gcb-bungalow",
    "office-space", "retail-shop", "restaurant-space", "shophouse"
];

const styles = [
    "scandinavian", "minimalist", "modern", "contemporary", "industrial",
    "japanese", "japandi", "korean", "muji", "wabi-sabi", "mid-century-modern",
    "rustic", "bohemian", "tropical", "classic", "luxury", "european", "asian",
    "art-deco", "eclectic"
];

function generateUrls() {
    const urls = [];
    const now = new Date().toISOString().split('T')[0];

    // Static pages
    ['', '/about', '/contact', '/services', '/products'].forEach(page => {
        urls.push({ loc: `${BASE_URL}${page}`, priority: page === '' ? '1.0' : '0.8', changefreq: 'weekly' });
    });

    // Pattern 1: Service + Location
    services.forEach(service => {
        locations.forEach(location => {
            urls.push({
                loc: `${BASE_URL}/services/${service}/${location}`,
                priority: '0.7',
                changefreq: 'monthly'
            });
        });
    });

    // Pattern 2: Property + Service + Location (key services only)
    const keyServices = ["hdb-renovation", "condo-renovation", "vinyl-flooring-installation",
        "laminate-flooring-installation", "kitchen-renovation", "bathroom-renovation"];

    propertyTypes.forEach(prop => {
        keyServices.forEach(service => {
            locations.forEach(location => {
                urls.push({
                    loc: `${BASE_URL}/property/${prop}/${service}/${location}`,
                    priority: '0.6',
                    changefreq: 'monthly'
                });
            });
        });
    });

    // Pattern 3: Style + Service + Location
    const styleServices = ["hdb-renovation", "condo-renovation", "kitchen-renovation",
        "bathroom-renovation", "vinyl-flooring-installation"];

    styles.forEach(style => {
        styleServices.forEach(service => {
            locations.forEach(location => {
                urls.push({
                    loc: `${BASE_URL}/styles/${style}/${service}/${location}`,
                    priority: '0.5',
                    changefreq: 'monthly'
                });
            });
        });
    });

    console.log(`Total URLs generated: ${urls.length.toLocaleString()}`);
    return urls;
}

function generateSitemapXml(urls, index = null) {
    const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    const footer = `</urlset>`;

    const urlEntries = urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n');

    return `${header}\n${urlEntries}\n${footer}`;
}

function generateSitemapIndex(count) {
    const header = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    const footer = `</sitemapindex>`;

    let entries = '';
    for (let i = 1; i <= count; i++) {
        entries += `  <sitemap>
    <loc>${BASE_URL}/sitemap-${i}.xml</loc>
  </sitemap>\n`;
    }

    return `${header}\n${entries}${footer}`;
}

function main() {
    const publicDir = path.join(__dirname, '..', 'public');

    // Ensure public dir exists
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    const allUrls = generateUrls();

    // Split into multiple sitemaps if needed
    const chunks = [];
    for (let i = 0; i < allUrls.length; i += MAX_URLS_PER_SITEMAP) {
        chunks.push(allUrls.slice(i, i + MAX_URLS_PER_SITEMAP));
    }

    if (chunks.length === 1) {
        // Single sitemap
        const xml = generateSitemapXml(allUrls);
        fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
        console.log('✅ Generated: public/sitemap.xml');
    } else {
        // Multiple sitemaps + index
        chunks.forEach((chunk, idx) => {
            const xml = generateSitemapXml(chunk);
            fs.writeFileSync(path.join(publicDir, `sitemap-${idx + 1}.xml`), xml);
            console.log(`✅ Generated: public/sitemap-${idx + 1}.xml (${chunk.length.toLocaleString()} URLs)`);
        });

        const indexXml = generateSitemapIndex(chunks.length);
        fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexXml);
        console.log('✅ Generated: public/sitemap.xml (index)');
    }

    console.log('\n🎉 Sitemap generation complete!');
    console.log(`📊 Total: ${allUrls.length.toLocaleString()} URLs in ${chunks.length} file(s)`);
}

main();
