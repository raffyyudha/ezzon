// Renovation Services Data for PSEO
// Combined with locations = 30,000+ unique pages

export interface RenovationService {
    name: string;
    slug: string;
    category: string;
    description: string;
    keywords: string[];
}

export interface PropertyType {
    name: string;
    slug: string;
    category: string;
}

export interface Material {
    name: string;
    slug: string;
    type: string;
    description?: string;
    applications?: string[];
    benefits?: string[];
}

export interface Style {
    name: string;
    slug: string;
    description?: string;
    features?: string[];
    colors?: string[];
}

// Main Renovation Services (25 services)
export const renovationServices: RenovationService[] = [
    // Flooring Services
    { name: "Vinyl Flooring Installation", slug: "vinyl-flooring-installation", category: "flooring", description: "Professional vinyl flooring installation with premium materials", keywords: ["vinyl floor", "LVT", "luxury vinyl", "vinyl plank"] },
    { name: "Laminate Flooring Installation", slug: "laminate-flooring-installation", category: "flooring", description: "High-quality laminate flooring for modern spaces", keywords: ["laminate floor", "wood laminate", "flooring"] },
    { name: "Hardwood Flooring Installation", slug: "hardwood-flooring-installation", category: "flooring", description: "Classic hardwood flooring installation services", keywords: ["hardwood", "timber floor", "parquet"] },
    { name: "Tile Flooring Installation", slug: "tile-flooring-installation", category: "flooring", description: "Professional tile floor installation for all spaces", keywords: ["tiles", "ceramic", "porcelain"] },
    { name: "Marble Flooring Installation", slug: "marble-flooring-installation", category: "flooring", description: "Luxury marble flooring for elegant spaces", keywords: ["marble", "natural stone", "luxury"] },
    { name: "Parquet Flooring Installation", slug: "parquet-flooring-installation", category: "flooring", description: "Beautiful parquet pattern flooring installation", keywords: ["parquet", "herringbone", "chevron"] },
    { name: "Epoxy Flooring Installation", slug: "epoxy-flooring-installation", category: "flooring", description: "Industrial-grade epoxy floor coating services", keywords: ["epoxy", "resin", "industrial floor"] },
    { name: "Carpet Installation", slug: "carpet-installation", category: "flooring", description: "Professional carpet laying and installation", keywords: ["carpet", "broadloom", "carpet tiles"] },
    { name: "Floor Polishing", slug: "floor-polishing", category: "flooring", description: "Expert floor polishing and restoration services", keywords: ["polishing", "parquet polish", "floor restoration"] },
    { name: "Floor Sanding", slug: "floor-sanding", category: "flooring", description: "Professional floor sanding services", keywords: ["sanding", "refinishing", "floor buffing"] },

    // Wall & Ceiling Services
    { name: "Painting Services", slug: "painting-services", category: "walls", description: "Professional interior and exterior painting", keywords: ["paint", "wall painting", "interior paint"] },
    { name: "Wallpaper Installation", slug: "wallpaper-installation", category: "walls", description: "Expert wallpaper hanging and installation", keywords: ["wallpaper", "wall covering", "accent wall"] },
    { name: "False Ceiling Installation", slug: "false-ceiling-installation", category: "ceiling", description: "Modern false ceiling design and installation", keywords: ["false ceiling", "drop ceiling", "suspended ceiling"] },
    { name: "Plaster Ceiling Repair", slug: "plaster-ceiling-repair", category: "ceiling", description: "Plaster ceiling repair and maintenance", keywords: ["plaster", "ceiling repair", "crack repair"] },

    // Kitchen & Bathroom
    { name: "Kitchen Renovation", slug: "kitchen-renovation", category: "room", description: "Complete kitchen renovation and remodeling", keywords: ["kitchen", "cabinet", "countertop", "kitchen remodel"] },
    { name: "Bathroom Renovation", slug: "bathroom-renovation", category: "room", description: "Full bathroom renovation services", keywords: ["bathroom", "toilet", "shower", "bath remodel"] },
    { name: "Kitchen Cabinet Installation", slug: "kitchen-cabinet-installation", category: "room", description: "Custom kitchen cabinet design and installation", keywords: ["cabinet", "kitchen cabinet", "built-in"] },

    // Carpentry & Built-ins
    { name: "Carpentry Services", slug: "carpentry-services", category: "carpentry", description: "Custom carpentry and woodwork solutions", keywords: ["carpentry", "woodwork", "custom furniture"] },
    { name: "Wardrobe Installation", slug: "wardrobe-installation", category: "carpentry", description: "Built-in wardrobe design and installation", keywords: ["wardrobe", "closet", "built-in wardrobe"] },
    { name: "TV Console Installation", slug: "tv-console-installation", category: "carpentry", description: "Custom TV console and feature wall", keywords: ["TV console", "feature wall", "entertainment unit"] },
    { name: "Shoe Cabinet Installation", slug: "shoe-cabinet-installation", category: "carpentry", description: "Built-in shoe cabinet solutions", keywords: ["shoe cabinet", "entryway", "storage"] },
    { name: "Storage Solutions", slug: "storage-solutions", category: "carpentry", description: "Custom storage and organization systems", keywords: ["storage", "shelving", "organization"] },

    // Electrical & Plumbing
    { name: "Electrical Works", slug: "electrical-works", category: "mep", description: "Professional electrical installation and repair", keywords: ["electrical", "wiring", "power points"] },
    { name: "Plumbing Works", slug: "plumbing-works", category: "mep", description: "Comprehensive plumbing services", keywords: ["plumbing", "pipes", "water heater"] },
    { name: "Aircon Installation", slug: "aircon-installation", category: "mep", description: "Air conditioning installation and servicing", keywords: ["aircon", "AC", "air conditioning"] },

    // Doors & Windows
    { name: "Door Installation", slug: "door-installation", category: "doors", description: "Interior and exterior door installation", keywords: ["door", "main door", "bedroom door"] },
    { name: "Window Installation", slug: "window-installation", category: "windows", description: "Window replacement and installation", keywords: ["window", "glass", "sliding window"] },
    { name: "Glass Works", slug: "glass-works", category: "glass", description: "Custom glass installation and replacement", keywords: ["glass", "mirror", "glass panel"] },

    // Complete Renovation
    { name: "HDB Renovation", slug: "hdb-renovation", category: "complete", description: "Complete HDB flat renovation packages", keywords: ["HDB", "BTO", "resale flat"] },
    { name: "Condo Renovation", slug: "condo-renovation", category: "complete", description: "Full condominium renovation services", keywords: ["condo", "condominium", "private apartment"] },
    { name: "Landed House Renovation", slug: "landed-house-renovation", category: "complete", description: "Comprehensive landed property renovation", keywords: ["landed", "terrace", "bungalow", "semi-D"] },
    { name: "Office Renovation", slug: "office-renovation", category: "complete", description: "Commercial office space renovation", keywords: ["office", "commercial", "workplace"] },
    { name: "Shop Renovation", slug: "shop-renovation", category: "complete", description: "Retail shop fit-out and renovation", keywords: ["shop", "retail", "F&B"] },
    { name: "Restaurant Renovation", slug: "restaurant-renovation", category: "complete", description: "Restaurant and F&B outlet renovation", keywords: ["restaurant", "cafe", "F&B", "food court"] },
];

// Property Types (15 types)
export const propertyTypes: PropertyType[] = [
    // HDB Types
    { name: "3-Room HDB Flat", slug: "3-room-hdb", category: "hdb" },
    { name: "4-Room HDB Flat", slug: "4-room-hdb", category: "hdb" },
    { name: "5-Room HDB Flat", slug: "5-room-hdb", category: "hdb" },
    { name: "Executive HDB Flat", slug: "executive-hdb", category: "hdb" },
    { name: "BTO Flat", slug: "bto-flat", category: "hdb" },
    { name: "Resale HDB Flat", slug: "resale-hdb", category: "hdb" },
    { name: "DBSS Flat", slug: "dbss-flat", category: "hdb" },

    // Private Residential
    { name: "Condominium", slug: "condominium", category: "private" },
    { name: "Executive Condominium", slug: "ec-condominium", category: "private" },
    { name: "Apartment", slug: "apartment", category: "private" },
    { name: "Penthouse", slug: "penthouse", category: "private" },

    // Landed
    { name: "Terrace House", slug: "terrace-house", category: "landed" },
    { name: "Semi-Detached House", slug: "semi-detached", category: "landed" },
    { name: "Bungalow", slug: "bungalow", category: "landed" },
    { name: "Good Class Bungalow", slug: "gcb-bungalow", category: "landed" },

    // Commercial
    { name: "Office Space", slug: "office-space", category: "commercial" },
    { name: "Retail Shop", slug: "retail-shop", category: "commercial" },
    { name: "Restaurant Space", slug: "restaurant-space", category: "commercial" },
    { name: "Shophouse", slug: "shophouse", category: "commercial" },
];

// Design Styles (15 styles) - ENRICHED
export const designStyles: Style[] = [
    { name: "Scandinavian", slug: "scandinavian", description: "Functional, simple, and organic, emphasizing whites, woods, and clean lines.", features: ["White walls", "Wooden floors", "Natural light", "Functional furniture"], colors: ["White", "Beige", "Light Grey"] },
    { name: "Minimalist", slug: "minimalist", description: "Less is more. Uncluttered spaces, monochrome palettes, and essential items only.", features: ["Clean lines", "Hidden storage", "Neutral colors", "Open layout"], colors: ["White", "Black", "Grey"] },
    { name: "Modern", slug: "modern", description: "Sleek and sophisticated with a focus on simplicity and function.", features: ["Geometric shapes", "Glass & metal", "Smooth surfaces", "Neutral base"], colors: ["Grey", "White", "Taupe"] },
    { name: "Contemporary", slug: "contemporary", description: "Current and trending styles, featuring soft curves and bold accents.", features: ["Fluid shapes", "Mixed textures", "Bold art", "Statement lighting"], colors: ["Greige", "Cream", "Charcoal"] },
    { name: "Industrial", slug: "industrial", description: "Raw and edgy, inspired by warehouses and factories.", features: ["Exposed pipes", "Brick walls", "Concrete floors", "Metal accents"], colors: ["Black", "Rust", "Concrete Grey"] },
    { name: "Japanese", slug: "japanese", description: "Zen-like simplicity with natural materials and low furniture.", features: ["Tatami mats", "Shoji screens", "Wooden elements", "Nature connection"], colors: ["Wood", "Bamboo", "White"] },
    { name: "Japandi", slug: "japandi", description: "A hybrid of Japanese and Scandinavian aesthetics.", features: ["Warm minimalism", "Natural textures", "Muted tones", "Quality craftsmanship"], colors: ["Cream", "Oak", "Sage"] },
    { name: "Korean", slug: "korean", description: "Bright, airy, and cozy with soft colors and wood accents.", features: ["White sheer curtains", "Light wood", "Low furniture", "Pastel accents"], colors: ["White", "Pastel Pink", "Light Wood"] },
    { name: "Muji", slug: "muji", description: "Inspired by the Muji brand - simple, functional, and devoid of excess.", features: ["Uniformity", "Storage focus", "Natural wood", "Neutral tones"], colors: ["Oak", "White", "Beige"] },
    { name: "Wabi Sabi", slug: "wabi-sabi", description: "Finding beauty in imperfection and age.", features: ["Rough textures", "Aged wood", "Asymmetry", "Earthy pottery"], colors: ["Earth tones", "Stone", "Clay"] },
    { name: "Mid-Century Modern", slug: "mid-century-modern", description: "Retro style from the 50s and 60s with organic shapes.", features: ["Tapered legs", "Teak wood", "Bold patterns", "Statement chairs"], colors: ["Mustard", "Teak", "Olive"] },
    { name: "Rustic", slug: "rustic", description: "Rugged and natural beauty with raw materials.", features: ["Reclaimed wood", "Stone fireplace", "Vintage decor", "Cozy textiles"], colors: ["Brown", "Green", "Cream"] },
    { name: "Bohemian", slug: "bohemian", description: "Eclectic and free-spirited with layers of color and pattern.", features: ["Plants", "Rugs", "Macrame", "Mixed patterns"], colors: ["Jewel tones", "Terracotta", "Gold"] },
    { name: "Tropical", slug: "tropical", description: "Resort vibes with lush greenery and natural fibers.", features: ["Indoor plants", "Rattan furniture", "Ceiling fans", "Bright & airy"], colors: ["Green", "Yellow", "Wood"] },
    { name: "Classic", slug: "classic", description: "Timeless elegance with symmetrical balance.", features: ["Moldings", "Rich fabrics", "Antique warmth", "Elegant details"], colors: ["Cream", "Gold", "Navy"] },
    { name: "Luxury", slug: "luxury", description: "high-end finishes, sophisticated lighting, and premium materials.", features: ["Marble", "Gold accents", "Chandelier", "Velvet"], colors: ["Black", "Gold", "Silver"] },
    { name: "European", slug: "european", description: "Ornate and historical influences from Europe.", features: ["Archways", "Detailed trim", "Vintage furniture", "Romance"], colors: ["Pastels", "Cream", "White"] },
    { name: "Asian", slug: "asian", description: "Traditional Eastern influences with rich symbolism.", features: ["Carved wood", "Silk textiles", "Feng Shui", "Oriental patterns"], colors: ["Red", "Gold", "Black"] },
    { name: "Art Deco", slug: "art-deco", description: "Glamorous and ornamental style from the 1920s.", features: ["Geometric patterns", "Metallic finishes", "Sunburst motifs", "Luxurious materials"], colors: ["Black", "Gold", "Emerald"] },
    { name: "Eclectic", slug: "eclectic", description: "A personalized mix of different time periods and styles.", features: ["Mixed eras", "Contrast", "Personal collection", "Unique pairings"], colors: ["Multi-colored", "Bold", "Vibrant"] },
];

// Materials (for specific material pages) - ENRICHED
export const materials: Material[] = [
    // Flooring Materials
    { name: "Vinyl", slug: "vinyl", type: "flooring", description: "Durable and water-resistant synthetic flooring.", applications: ["Kitchen", "Living Room", "Bedroom"], benefits: ["Waterproof", "Durable", "Affordable"] },
    { name: "Laminate", slug: "laminate", type: "flooring", description: "Multi-layer synthetic flooring that simulates wood.", applications: ["Living Room", "Bedroom", "Hallway"], benefits: ["Scratch resistant", "Easy install", "Realistic look"] },
    { name: "Hardwood", slug: "hardwood", type: "flooring", description: "Solid timber flooring for timeless elegance.", applications: ["Living Room", "Bedroom"], benefits: ["Natural beauty", "Long-lasting", "Can be refinished"] },
    { name: "Engineered Wood", slug: "engineered-wood", type: "flooring", description: "Real wood veneer over a plywood base.", applications: ["Condos", "Living Room"], benefits: ["Stable", "Real wood feel", "Moisture resistant"] },
    { name: "Bamboo", slug: "bamboo", type: "flooring", description: "Eco-friendly and sustainable flooring option.", applications: ["Bedroom", "Study"], benefits: ["Sustainable", "Hard", "Unique look"] },
    { name: "Cork", slug: "cork", type: "flooring", description: "Soft and warm natural flooring material.", applications: ["Bedroom", "Nursery"], benefits: ["Soft", "Warm", "Sound buttressing"] },
    { name: "Marble", slug: "marble", type: "flooring", description: "Luxurious natural stone with unique veining.", applications: ["Living Room", "Bathroom"], benefits: ["Luxurious", "Cool", "Unique"] },
    { name: "Granite", slug: "granite", type: "flooring", description: "Extremely hard and durable natural stone.", applications: ["Kitchen", "Bathroom", "Outdoor"], benefits: ["Hard", "Scratch resistant", "Heat resistant"] },
    { name: "Porcelain Tile", slug: "porcelain-tile", type: "flooring", description: "Dense and durable ceramic tile.", applications: ["Bathroom", "Kitchen", "Balcony"], benefits: ["Waterproof", "Stain resistant", "Durable"] },
    { name: "Ceramic Tile", slug: "ceramic-tile", type: "flooring", description: "Versatile and affordable tile option.", applications: ["Bathroom", "Kitchen"], benefits: ["Affordable", "Many designs", "Water resistant"] },
    { name: "Homogeneous Tile", slug: "homogeneous-tile", type: "flooring", description: "Full-body porcelain tile for high traffic.", applications: ["Commercial", "Living Room"], benefits: ["Consistent color", "Durable", "Strong"] },
    { name: "Terracotta", slug: "terracotta", type: "flooring", description: "Rustic clay tiles with natural warmth.", applications: ["Balcony", "Kitchen"], benefits: ["Natural look", "Warm", "Earthy"] },
    { name: "Cement Screed", slug: "cement-screed", type: "flooring", description: "Industrial style raw cement finish.", applications: ["Industrial Homes", "Cafe"], benefits: ["Raw look", "Seamless", "Cool"] },
    { name: "Epoxy", slug: "epoxy", type: "flooring", description: "Seamless resin coating for durability.", applications: ["Create", "Industrial"], benefits: ["Seamless", "Chemical resistant", "Shiny"] },
    { name: "Rubber", slug: "rubber", type: "flooring", description: "Soft and resilient flooring for safety.", applications: ["Gym", "Playroom"], benefits: ["Soft", "Slip resistant", "Durable"] },

    // Countertop Materials
    { name: "Quartz Countertop", slug: "quartz-countertop", type: "countertop", description: "Engineered stone that is durable and low maintenance.", applications: ["Kitchen", "Bathroom Vanity"], benefits: ["Stain resistant", "No sealing", "Consistent"] },
    { name: "Granite Countertop", slug: "granite-countertop", type: "countertop", description: "Natural stone with unique patterns.", applications: ["Kitchen"], benefits: ["Heat resistant", "Unique", "Natural"] },
    { name: "Solid Surface", slug: "solid-surface", type: "countertop", description: "Seamless synthetic material.", applications: ["Kitchen", "Counter"], benefits: ["Seamless", "Repairable", "Flexible"] },
    { name: "Sintered Stone", slug: "sintered-stone", type: "countertop", description: "Ultra-compact surface that is virtually indestructible.", applications: ["Kitchen", "Outdoor"], benefits: ["Heat proof", "Scratch proof", "UV resistant"] },
    { name: "Compact Laminate", slug: "compact-laminate", type: "countertop", description: "Thin and tough laminate material.", applications: ["Kitchen", "Table"], benefits: ["Waterproof", "Antibacterial", "Affordable"] },

    // Cabinet Materials
    { name: "Plywood", slug: "plywood", type: "cabinet", description: "Strong and stable wood composite.", applications: ["Cabinets", "Furniture"], benefits: ["Strong", "Moisture resistant", "Standard"] },
    { name: "MDF", slug: "mdf", type: "cabinet", description: "Smooth medium density fiberboard.", applications: ["Painted Doors"], benefits: ["Smooth", "Paintable", "Affordable"] },
    { name: "Particle Board", slug: "particle-board", type: "cabinet", description: "Economy wood chip board.", applications: ["Budget Cabinets"], benefits: ["Cheap", "Lightweight", "Green"] },
    { name: "Acrylic", slug: "acrylic", type: "cabinet", description: "High gloss plastic finish.", applications: ["Kitchen Doors"], benefits: ["Glossy", "Waterproof", "Modern"] },
    { name: "Glass", slug: "glass", type: "cabinet", description: "Tempered glass for display cabinets.", applications: ["Display Cabinets"], benefits: ["Transparent", "Elegant", "Easy clean"] },
    { name: "Aluminium", slug: "aluminium", type: "cabinet", description: "Metal cabinetry that is water and termite proof.", applications: ["Kitchen", "Bathroom"], benefits: ["Waterproof", "Termite proof", "Durable"] },
];

export const allServiceSlugs = renovationServices.map(s => s.slug);
export const allPropertyTypeSlugs = propertyTypes.map(p => p.slug);
export const allStyleSlugs = designStyles.map(s => s.slug);
export const allMaterialSlugs = materials.map(m => m.slug);

export const calculateTotalPages = (locationCount: number) => {
    const serviceLocationPages = renovationServices.length * locationCount;
    const propertyServiceLocationPages = propertyTypes.length * renovationServices.length * locationCount;
    const styleServiceLocationPages = designStyles.length * 10 * locationCount;
    const materialLocationPages = materials.length * locationCount;

    return {
        serviceLocationPages,
        propertyServiceLocationPages,
        styleServiceLocationPages,
        materialLocationPages,
        total: serviceLocationPages + propertyServiceLocationPages + styleServiceLocationPages + materialLocationPages
    };
};
