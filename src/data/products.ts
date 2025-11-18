export type Product = {
  slug: string;
  name: string;
  brand: "SATEC" | "SERTEC" | "SERTEC Marine" | "EMS";
  category: string;
  description: string;
  features: string[];
  image: string;
  externalUrl: string;
};

export const products: Product[] = [
  {
    slug: "expertpower",
    name: "ExpertPower (EMS)",
    brand: "EMS",
    category: "Software",
    description:
      "Platform Energy Management Systems berbasis cloud (SaaS) untuk pemantauan real-time, pelaporan, dan analitik energi.",
    features: [
      "Dashboard & KPI",
      "Alarm & notifikasi",
      "Pelaporan otomatis",
      "Analitik beban & kualitas daya",
      "Multi-site & multi-user",
    ],
    image: "/products/satec/expertpower.webp",
    externalUrl: "https://www.satec-global.com/products/expertpower/",
  },
  {
    slug: "em133-power-meter",
    name: "EM133 Energy & Power Meter",
    brand: "SATEC",
    category: "Meters & Analyzers",
    description:
      "MID certified energy meter untuk pengukuran energi dan daya yang akurat.",
    features: ["Sertifikasi MID", "Pengukuran multi-parameter", "Instalasi fleksibel"],
    image: "/products/satec/em133.webp",
    externalUrl: "https://www.satec-global.com/products/em133-power-meter/",
  },
  {
    slug: "pm180",
    name: "PM180 All-in-One PQ Analyzer",
    brand: "SATEC",
    category: "Meters & Analyzers",
    description: "Power Quality Analyzer, PMU, DFR, DDD dan lainnya.",
    features: ["Perekaman gelombang", "Event & alarm", "Analisis kualitas daya"],
    image: "/products/satec/pm180.webp",
    externalUrl: "https://www.satec-global.com/products/pm180/",
  },
  {
    slug: "cmce-25-nano-and-cmce-50-nano",
    name: "CMCE 25 NANO AND CMCE 50 NANO",
    brand: "SERTEC",
    category: "Lightning Protection (CMCE)",
    description:
      "Proteksi petir ukuran nano untuk struktur kecil, rumah tinggal, dan tower komunikasi kecil.",
    features: ["Ukuran kompak", "Ringan", "Ideal untuk struktur kecil"],
    image: "/products/sertec/cmce-25-nano-and-cmce-50-nano.webp",
    externalUrl:
      "https://sertec.com.py/wp-content/uploads/2024/10/BROCHURE-2024-CMCE-A4-ESP.pdf",
  },
  {
    slug: "cmce-120-at",
    name: "CMCE 120 AT",
    brand: "SERTEC",
    category: "Lightning Protection (CMCE)",
    description:
      "Resistansi isolasi hingga 400°C untuk area temperatur tinggi.",
    features: ["High temperature resistance", "Teknologi de-ionisasi", "Area temperatur tinggi"],
    image: "/products/sertec/cmce-120-at.webp",
    externalUrl:
      "https://sertec.com.py/wp-content/uploads/2024/10/BROCHURE-2024-CMCE-A4-ESP.pdf",
  },
  {
    slug: "cmce-120-black",
    name: "CMCE 120 BLACK",
    brand: "SERTEC",
    category: "Lightning Protection (CMCE)",
    description:
      "Varian hitam dari CMCE 120 untuk estetika bangunan modern dengan perlindungan maksimal.",
    features: ["Desain hitam elegan", "Radius proteksi besar", "Teknologi de-ionisasi"],
    image: "/products/sertec/cmce-120-black.webp",
    externalUrl:
      "https://sertec.com.py/wp-content/uploads/2024/10/BROCHURE-2024-CMCE-A4-ESP.pdf",
  },
  {
    slug: "cmce-120",
    name: "CMCE 120",
    brand: "SERTEC",
    category: "Lightning Protection (CMCE)",
    description:
      "Proteksi petir de-ionisasi untuk bangunan, substation, dan area industri berskala besar.",
    features: ["Radius proteksi besar", "Teknologi de-ionisasi", "Aplikasi industri"],
    image: "/products/sertec/cmce-120.webp",
    externalUrl:
      "https://sertec.com.py/wp-content/uploads/2024/10/BROCHURE-2024-CMCE-A4-ESP.pdf",
  },
  {
    slug: "cmce-graphene",
    name: "CMCE GRAPHENE",
    brand: "SERTEC",
    category: "Lightning Protection (CMCE)",
    description:
      "Untuk aplikasi khusus/militer, berbasis material graphene.",
    features: ["Material graphene", "Aplikasi khusus", "Militer"],
    image: "/products/sertec/cmce-graphene.webp",
    externalUrl:
      "https://sertec.com.py/wp-content/uploads/2024/10/BROCHURE-2024-CMCE-A4-ESP.pdf",
  },
  {
    slug: "cmce-high-resistance",
    name: "CMCE HIGH RESISTANCE",
    brand: "SERTEC",
    category: "Lightning Protection (CMCE)",
    description:
      "Untuk lingkungan sangat korosif dengan baja tahan korosi tinggi.",
    features: ["Tahan korosi tinggi", "Lingkungan ekstrem", "Baja khusus"],
    image: "/products/sertec/cmce-high-resistance.webp",
    externalUrl:
      "https://sertec.com.py/wp-content/uploads/2024/10/BROCHURE-2024-CMCE-A4-ESP.pdf",
  },
  {
    slug: "cmce-nice-75",
    name: "CMCE NICE 75",
    brand: "SERTEC",
    category: "Lightning Protection (CMCE)",
    description:
      "Solusi proteksi petir untuk gedung menengah dengan desain kompak dan efisien.",
    features: ["Radius proteksi menengah", "Desain kompak", "Instalasi mudah"],
    image: "/products/sertec/cmce-nice-75.webp",
    externalUrl:
      "https://sertec.com.py/wp-content/uploads/2024/10/BROCHURE-2024-CMCE-A4-ESP.pdf",
  },
  {
    slug: "cmce-twin-max",
    name: "CMCE TWIN MAX",
    brand: "SERTEC",
    category: "Lightning Protection (CMCE)",
    description:
      "Untuk kondisi medan listrik ekstrim, turbin angin, solar park.",
    features: ["Medan listrik ekstrim", "Turbin angin", "Solar park"],
    image: "/products/sertec/cmce-twin-max.webp",
    externalUrl:
      "https://sertec.com.py/wp-content/uploads/2024/10/BROCHURE-2024-CMCE-A4-ESP.pdf",
  },
  {
    slug: "cmce-ul",
    name: "CMCE UL",
    brand: "SERTEC",
    category: "Lightning Protection (CMCE)",
    description:
      "Model bersertifikasi UL-96 untuk standar Amerika.",
    features: ["Sertifikasi UL-96", "Standar Amerika", "Proteksi petir"],
    image: "/products/sertec/cmce-ul.webp",
    externalUrl:
      "https://sertec.com.py/wp-content/uploads/2024/10/BROCHURE-2024-CMCE-A4-ESP.pdf",
  },
  {
    slug: "sertec-marine-gold",
    name: "CMCE Marine GOLD",
    brand: "SERTEC Marine",
    category: "Marine Lightning Protection",
    description:
      "Karena ukuran dan bobotnya yang ringkas, ideal untuk kapal kecil, sailboat, buoy laut, dll.",
    features: [
      "Gross weight: 1062 kg",
      "Dimensions: Ø 12,5 cm x 21,6 cm",
      "Packaging: Galvanized metal"
    ],
    image: "/products/sertec/cmce-marine-gold.webp",
    externalUrl:
      "https://marine.sertec.com.py/wp-content/uploads/2025/03/BROCHURE-Marine-ENG-2024.pdf",
  },
  {
    slug: "em132",
    name: "EM132 Smart Transducer",
    brand: "SATEC",
    category: "Meters & Analyzers",
    description: "Power meter & smart transducer untuk pengukuran energi.",
    features: ["Smart transducer", "Pengukuran energi"],
    image: "/products/satec/em132.webp",
    externalUrl: "https://www.satec-global.com/products/em132/",
  },
  {
    slug: "pm130-plus",
    name: "PM130-PLUS Series",
    brand: "SATEC",
    category: "Meters & Analyzers",
    description: "Multi-function power meter model panel LED.",
    features: ["Multi-parameter", "Panel meter"],
    image: "/products/satec/pm130-plus.webp",
    externalUrl: "https://www.satec-global.com/products/pm130-plus/",
  },
  {
    slug: "pm135",
    name: "PM135-PLUS Series",
    brand: "SATEC",
    category: "Meters & Analyzers",
    description: "Multi-function power meter model panel LCD.",
    features: ["Multi-parameter", "Panel meter"],
    image: "/products/satec/pm135.webp",
    externalUrl: "https://www.satec-global.com/products/pm135/",
  },
  {
    slug: "pm172",
    name: "PM172 High Accuracy Power Meter",
    brand: "SATEC",
    category: "Meters & Analyzers",
    description: "Power meter akurasi tinggi (0.2/0.2S).",
    features: ["Akurasi 0.2/0.2S"],
    image: "/products/satec/pm172.webp",
    externalUrl: "https://www.satec-global.com/products/pm172/",
  },
  {
    slug: "pm174",
    name: "PM174 IEEE 1159 Power Quality Analyzer",
    brand: "SATEC",
    category: "Meters & Analyzers",
    description: "PQ analyzer untuk pasar North America.",
    features: ["IEEE 1159"],
    image: "/products/satec/pm174.webp",
    externalUrl: "https://www.satec-global.com/products/pm174/",
  },
  {
    slug: "pm175",
    name: "PM175 EN50160 Power Quality Analyzer",
    brand: "SATEC",
    category: "Meters & Analyzers",
    description: "PQ analyzer untuk pasar Eropa (EN50160).",
    features: ["EN50160"],
    image: "/products/satec/pm175.webp",
    externalUrl: "https://www.satec-global.com/products/pm175/",
  },
  {
    slug: "em720",
    name: "EM720 Revenue Meter & PQ Analyzer",
    brand: "SATEC",
    category: "Meters & Analyzers",
    description: "Versi wall-mount untuk revenue & PQ.",
    features: ["Revenue", "PQ"],
    image: "/products/satec/em720.webp",
    externalUrl: "https://www.satec-global.com/products/em720/",
  },
  {
    slug: "em920",
    name: "EM920 Revenue Meter & PQ Analyzer",
    brand: "SATEC",
    category: "Meters & Analyzers",
    description: "Versi ANSI socket mount untuk revenue & PQ.",
    features: ["Revenue", "PQ"],
    image: "/products/satec/em920.webp",
    externalUrl: "https://www.satec-global.com/products/em920/",
  },
  {
    slug: "bfm136",
    name: "BFM136 Multi-Channel Energy Meter",
    brand: "SATEC",
    category: "Meters & Analyzers",
    description: "Meter energi multi-channel hingga 36 kanal arus.",
    features: ["36 kanal arus"],
    image: "/products/satec/bfm136.webp",
    externalUrl: "https://www.satec-global.com/products/bfm136/",
  },
  {
    slug: "bfm-ii",
    name: "BFM-II Multi-Channel Power Meter",
    brand: "SATEC",
    category: "Meters & Analyzers",
    description: "Meter daya multi-channel hingga 54 kanal arus.",
    features: ["54 kanal arus"],
    image: "/products/satec/bfm-ii.webp",
    externalUrl: "https://www.satec-global.com/products/bfm-ii/",
  },
  {
    slug: "bfm-dfr",
    name: "BFM-DFR Multi-Channel Fault Recorder",
    brand: "SATEC",
    category: "Meters & Analyzers",
    description: "Perekam gangguan multi-channel (40-channel waveform).",
    features: ["Perekaman gelombang 40 channel"],
    image: "/products/satec/bfm-dfr.webp",
    externalUrl: "https://www.satec-global.com/products/bfm-dfr/",
  },
  {
    slug: "pro-series",
    name: "PRO Series NextGen Analyzer",
    brand: "SATEC",
    category: "Meters & Analyzers",
    description: "Advanced power analyzer & meter generasi berikutnya.",
    features: ["NextGen analyzer"],
    image: "/products/satec/pro-series.webp",
    externalUrl: "https://www.satec-global.com/products/pro-series-power-meter/",
  },
  {
    slug: "em235",
    name: "EM235",
    brand: "SATEC",
    category: "Meters & Analyzers",
    description: "PRO Series NextGen Analyzer.",
    features: ["NextGen analyzer"],
    image: "/products/satec/pro-series.webp",
    externalUrl: "https://www.satec-global.com/products/pro-series-power-meter/",
  },
  {
    slug: "pm335",
    name: "PM335",
    brand: "SATEC",
    category: "Meters & Analyzers",
    description: "PRO Series NextGen Analyzer.",
    features: ["NextGen analyzer"],
    image: "/products/satec/pro-series.webp",
    externalUrl: "https://www.satec-global.com/products/pro-series-power-meter/",
  },
  {
    slug: "pm17x-pro",
    name: "PM17x PRO NextGen Analyzer",
    brand: "SATEC",
    category: "Meters & Analyzers",
    description: "Advanced power analyzer & meter.",
    features: ["Analyzer & meter"],
    image: "/products/satec/pm17x-pro.webp",
    externalUrl: "https://www.satec-global.com/products/17x_pro/",
  },
  {
    slug: "pmu-pro",
    name: "PMU PRO Phasor Measurement Unit",
    brand: "SATEC",
    category: "Meters & Analyzers",
    description: "Unit pengukuran phasor (IEEE C37.118.1).",
    features: ["IEEE C37.118.1"],
    image: "/products/satec/pmu-pro.webp",
    externalUrl: "https://www.satec-global.com/products/pmu-pro/",
  },
  {
    slug: "edl180",
    name: "EDL180 Portable Power Quality Analyzer",
    brand: "SATEC",
    category: "Meters & Analyzers",
    description: "Versi portable berbasis PM180 untuk analisis PQ.",
    features: ["Portable", "Analisis PQ"],
    image: "/products/satec/edl180.webp",
    externalUrl: "https://www.satec-global.com/products/edl180/",
  },
  {
    slug: "pas-software",
    name: "PAS Power Analysis Software",
    brand: "EMS",
    category: "Software",
    description: "Perangkat lunak analisis daya (desktop).",
    features: ["Analisis daya", "Pelaporan"],
    image: "/products/satec/pas.webp",
    externalUrl: "https://www.satec-global.com/products/pas/",
  },
  {
    slug: "hacs-sensors",
    name: "HACS High Accuracy Current Sensors",
    brand: "SATEC",
    category: "Current Sensors",
    description: "CTs untuk meter versi HACS.",
    features: ["Akurasi tinggi"],
    image: "/products/satec/hacs.webp",
    externalUrl: "https://www.satec-global.com/products/hacs/",
  },
  {
    slug: "etc-one-plus",
    name: "ETC One Plus Communication Gateway",
    brand: "SATEC",
    category: "Accessories",
    description: "Gateway/konverter komunikasi COM.",
    features: ["Gateway", "Converter"],
    image: "/products/satec/etc-one-plus.webp",
    externalUrl: "https://www.satec-global.com/products/etc-i/",
  },
  {
    slug: "etc-ii",
    name: "ETC-II Gateway and Data-logger",
    brand: "SATEC",
    category: "Accessories",
    description: "Gateway, data-logger, dan COM converter.",
    features: ["Gateway", "Data-logger"],
    image: "/products/satec/etc-ii.webp",
    externalUrl: "https://www.satec-global.com/products/etc-ii/",
  },
  {
    slug: "rgm180",
    name: "RGM180 Graphic Touch Screen",
    brand: "SATEC",
    category: "Accessories",
    description: "Layar sentuh grafis untuk integrasi meter.",
    features: ["Graphic touch"],
    image: "/products/satec/rgm180.webp",
    externalUrl: "https://www.satec-global.com/products/rgm180/",
  },
  {
    slug: "vrm",
    name: "VRM Voltage Ratio Module",
    brand: "SATEC",
    category: "Accessories",
    description: "Modul rasio tegangan untuk aplikasi DC.",
    features: ["Voltage ratio"],
    image: "/products/satec/vrm.webp",
    externalUrl: "https://www.satec-global.com/products/vrm/",
  },
  {
    slug: "sertec-marine-platinum",
    name: "CMCE Marine PLATINUM",
    brand: "SERTEC Marine",
    category: "Marine Lightning Protection",
    description:
      "Untuk kapal medium seperti kapal ekspedisi, catamaran, yacht kecil, dll.",
    features: [
      "Gross weight: 2750 kg",
      "Dimensions: Ø 16,25 cm x 25,67 cm",
      "Packaging: Galvanized metal material"
    ],
    image: "/products/sertec/cmce-marine-platinum.webp",
    externalUrl: "https://marine.sertec.com.py/wp-content/uploads/2025/03/BROCHURE-Marine-ENG-2024.pdf",
  },
  {
    slug: "sertec-marine-diamond",
    name: "CMCE Marine DIAMOND",
    brand: "SERTEC Marine",
    category: "Marine Lightning Protection",
    description:
      "Dirancang untuk perlindungan maksimum pada yacht, kapal pesiar, kapal kargo, kapal militer, dll.",
    features: [
      "Gross weight: 6,170 kg",
      "Dimensions: Ø 25 cm x 37,8 cm",
      "Packaging: Galvanized metal material"
    ],
    image: "/products/sertec/cmce-marine-diamond.webp",
    externalUrl: "https://marine.sertec.com.py/wp-content/uploads/2025/03/BROCHURE-Marine-ENG-2024.pdf",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const brands: Array<Product["brand"]> = [
  "SATEC",
  "SERTEC Marine",
];


