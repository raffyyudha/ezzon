import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import ToolsPromo from "@/components/ToolsPromo";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

// Seeded random for deterministic uniqueness
function seededRandom(seed: string) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash |= 0;
    }
    return () => {
        hash = (hash * 1103515245 + 12345) & 0x7fffffff;
        return hash / 0x7fffffff;
    };
}

function shuffleArray<T>(array: T[], seed: string): T[] {
    const rng = seededRandom(seed);
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function pickItems<T>(array: T[], count: number, seed: string): T[] {
    return shuffleArray(array, seed).slice(0, count);
}

// Material-specific data
const materialData: Record<string, { benefits: string[]; applications: string[]; brands: string[] }> = {
    vinyl: { benefits: ["100% Waterproof", "Easy maintenance", "Durable", "Affordable", "Quick install"], applications: ["Kitchen", "Bathroom", "Living room", "Bedroom"], brands: ["Pergo", "Armstrong", "Tarkett", "LG Hausys"] },
    laminate: { benefits: ["Scratch resistant", "Realistic wood look", "Budget friendly", "DIY friendly", "Variety of styles"], applications: ["Living room", "Bedroom", "Study", "Hallway"], brands: ["QuickStep", "Kronotex", "Egger", "Meister"] },
    hardwood: { benefits: ["Natural beauty", "Increases home value", "Can be refinished", "Long lasting", "Timeless appeal"], applications: ["Living room", "Bedroom", "Dining room"], brands: ["Kahrs", "Boen", "Bruce", "Somerset"] },
    marble: { benefits: ["Luxurious look", "Unique patterns", "Cool surface", "Durable", "Heat resistant"], applications: ["Living room", "Bathroom", "Kitchen counter", "Foyer"], brands: ["Italian Carrara", "Turkish White", "Indian Green", "Spanish Crema"] },
    porcelain: { benefits: ["Extremely durable", "Water resistant", "Stain proof", "Low maintenance", "Versatile"], applications: ["Bathroom", "Kitchen", "Balcony", "Commercial"], brands: ["Roman", "Niro", "Mulia", "White Horse"] },
    quartz: { benefits: ["Non-porous", "Scratch resistant", "Consistent pattern", "Low maintenance", "Hygienic"], applications: ["Kitchen counter", "Bathroom vanity", "Tabletop"], brands: ["Caesarstone", "Silestone", "Cambria", "LG Viatera"] },
};

const installTips = [
    "Acclimate material for 48 hours before installation",
    "Ensure subfloor is level and clean",
    "Leave expansion gaps around perimeter",
    "Use appropriate underlayment",
    "Check moisture levels before starting",
    "Plan layout to minimize cuts",
    "Consider traffic patterns for seam placement",
    "Follow manufacturer guidelines strictly",
];

const testimonialPool = [
    { name: "Mr. Ong", text: "The {material} looks amazing in our {location} home!" },
    { name: "Mrs. Chong", text: "Best {material} installation service. Very professional." },
    { name: "Dr. Yeo", text: "Quality {material} at competitive price. Highly recommend!" },
    { name: "Ms. Ang", text: "Our new {material} flooring is stunning. Thank you Ezzon!" },
    { name: "Mr. Goh", text: "Fast installation, great workmanship on our {material}." },
];

const faqPool = [
    { q: "How long does {material} last?", a: "With proper care, {material} can last 15-25 years or more." },
    { q: "Is {material} suitable for my home?", a: "Yes, {material} is versatile and works well in most Singapore homes." },
    { q: "What's the warranty on {material}?", a: "We offer 1-year installation warranty plus manufacturer warranty." },
    { q: "How do I maintain {material}?", a: "Regular sweeping and occasional mopping with appropriate cleaner." },
    { q: "Can {material} be installed over existing floor?", a: "In many cases yes, but we recommend site assessment first." },
];

interface PageProps {
    params: Promise<{ material: string; location: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { material, location } = await params;
    const materialName = material.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const locName = location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const seed = material + location;
    const rng = seededRandom(seed);

    const titles = [
        `${materialName} in ${locName} | Best Prices | Ezzon Singapore`,
        `${materialName} Supply & Install ${locName} | Free Quote`,
        `Buy ${materialName} ${locName} | Premium Quality | Ezzon`,
        `${materialName} Flooring ${locName} | Expert Installation`,
    ];

    const descs = [
        `Premium ${materialName.toLowerCase()} supply and installation in ${locName}. Competitive prices, expert installers, 1-year warranty.`,
        `Looking for ${materialName.toLowerCase()} in ${locName}? Best selection, professional installation, free quote today!`,
        `Quality ${materialName.toLowerCase()} for your home in ${locName}. Top brands, skilled craftsmen, satisfaction guaranteed.`,
    ];

    return {
        title: titles[Math.floor(rng() * titles.length)],
        description: descs[Math.floor(rng() * descs.length)],
    };
}

export default async function MaterialLocationPage({ params }: PageProps) {
    const { material, location } = await params;
    const materialName = material.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const locName = location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const seed = `${material}-${location}`;
    const rng = seededRandom(seed);

    // Get material-specific data or defaults
    const data = materialData[material] || materialData.vinyl;

    // Dynamic pricing
    const prices = [18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 55, 62];
    const price = prices[Math.floor(rng() * prices.length)];
    const sqftInstalled = 5000 + Math.floor(rng() * 15000);

    // Pick unique content
    const tips = pickItems(installTips, 4, seed);
    const faqs = pickItems(faqPool, 3, seed + 'faq').map(f => ({
        q: f.q.replace(/{material}/g, materialName.toLowerCase()),
        a: f.a.replace(/{material}/g, materialName.toLowerCase())
    }));
    const testimonials = pickItems(testimonialPool, 2, seed + 'test').map(t => ({
        ...t,
        text: t.text.replace(/{material}/g, materialName.toLowerCase()).replace(/{location}/g, locName)
    }));

    // Shuffle sections
    const sections = shuffleArray(['benefits', 'pricing', 'brands', 'applications', 'tips', 'faq', 'testimonials'], seed);

    const renderSection = (sectionId: string) => {
        switch (sectionId) {
            case 'benefits':
                return (
                    <section key="benefits" className="py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-10">Why Choose {materialName}?</h2>
                            <div className="flex flex-wrap justify-center gap-4">
                                {data.benefits.map((b, i) => (
                                    <div key={i} className="bg-amber-100 px-6 py-3 rounded-full text-amber-800 font-medium">
                                        ✓ {b}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            case 'pricing':
                return (
                    <section key="pricing" className="py-16 bg-gray-50">
                        <div className="container mx-auto px-4 text-center">
                            <h2 className="text-3xl font-bold mb-10">{materialName} Pricing in {locName}</h2>
                            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                                <p className="text-gray-600 mb-2">From</p>
                                <p className="text-5xl font-bold text-amber-600 mb-2">${price}/sqft</p>
                                <p className="text-gray-500 text-sm mb-6">Supply + Professional Installation</p>
                                <Link href="/contact" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg inline-block">
                                    Get Exact Quote
                                </Link>
                            </div>
                            <p className="mt-6 text-gray-600">{sqftInstalled.toLocaleString()} sqft installed in {locName} area</p>
                        </div>
                    </section>
                );
            case 'brands':
                return (
                    <section key="brands" className="py-16 bg-amber-800 text-white">
                        <div className="container mx-auto px-4 text-center">
                            <h2 className="text-3xl font-bold mb-10">{materialName} Brands We Carry</h2>
                            <div className="flex flex-wrap justify-center gap-6">
                                {data.brands.map((b, i) => (
                                    <div key={i} className="bg-amber-700 px-8 py-4 rounded-lg font-semibold">{b}</div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            case 'applications':
                return (
                    <section key="applications" className="py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-10">Best Rooms for {materialName}</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                                {data.applications.map((a, i) => (
                                    <div key={i} className="bg-white p-6 rounded-lg shadow text-center">
                                        <div className="text-3xl mb-3">🏠</div>
                                        <p className="font-semibold">{a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            case 'tips':
                return (
                    <section key="tips" className="py-16 bg-gray-50">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-10">{materialName} Installation Tips</h2>
                            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                                {tips.map((tip, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow">
                                        <span className="text-amber-600 font-bold">💡</span>
                                        <p>{tip}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            case 'faq':
                return (
                    <section key="faq" className="py-16">
                        <div className="container mx-auto px-4 max-w-3xl">
                            <h2 className="text-3xl font-bold text-center mb-10">{materialName} FAQs</h2>
                            <div className="space-y-4">
                                {faqs.map((f, i) => (
                                    <div key={i} className="bg-white p-6 rounded-lg shadow">
                                        <h3 className="font-semibold text-lg mb-2">{f.q}</h3>
                                        <p className="text-gray-600">{f.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            case 'testimonials':
                return (
                    <section key="testimonials" className="py-16 bg-gray-50">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-10">{materialName} Customer Reviews</h2>
                            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                {testimonials.map((t, i) => (
                                    <div key={i} className="bg-white p-6 rounded-lg shadow border-l-4 border-amber-500">
                                        <div className="flex text-yellow-400 mb-3">⭐⭐⭐⭐⭐</div>
                                        <p className="text-gray-700 mb-4 italic">"{t.text}"</p>
                                        <p className="font-semibold">— {t.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen">
            <Header />
            <main>
                {/* Hero */}
                <section className="bg-gradient-to-r from-amber-800 to-amber-600 text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{materialName} in {locName}</h1>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Premium {materialName.toLowerCase()} supply and professional installation services.
                            Serving {locName} and surrounding areas with quality materials and expert craftsmanship.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact" className="bg-white text-amber-800 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold">
                                Get Free Quote
                            </Link>
                            <Link href="/contact" className="border-2 border-white hover:bg-white hover:text-amber-800 px-8 py-4 rounded-lg text-lg font-semibold">
                                Request Sample
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Dynamic Sections */}
                {sections.map(renderSection)}

                {/* CTA */}
                <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-6">Get {materialName} Installed in {locName}</h2>
                        <p className="text-xl mb-8">Free consultation • Competitive pricing • 1-year warranty</p>
                        <Link href="/contact" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold inline-block">
                            Contact Us Today
                        </Link>
                    </div>
                </section>
                <ToolsPromo />
                <FloatingWhatsApp locationName={locName} />
            </main>
            <Footer />
        </div>
    );
}
