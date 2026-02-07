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

// Style-specific data
const styleData: Record<string, { colors: string[]; features: string[]; materials: string[] }> = {
    scandinavian: { colors: ["#FFFFFF", "#F5F5DC", "#D3D3D3", "#87CEEB"], features: ["Minimalist layout", "Natural light focus", "Functional furniture", "Cozy textures"], materials: ["Light oak", "White linen", "Wool rugs", "Ceramic"] },
    minimalist: { colors: ["#FFFFFF", "#000000", "#808080", "#C0C0C0"], features: ["Clean lines", "Hidden storage", "Neutral palette", "Open spaces"], materials: ["White lacquer", "Glass", "Stainless steel", "Concrete"] },
    industrial: { colors: ["#1C1C1C", "#B87333", "#708090", "#8B4513"], features: ["Exposed brick", "Metal fixtures", "Raw finishes", "Open ceilings"], materials: ["Reclaimed wood", "Iron pipes", "Concrete floor", "Edison bulbs"] },
    japanese: { colors: ["#F5F5DC", "#8B4513", "#228B22", "#D2B48C"], features: ["Zen simplicity", "Natural elements", "Sliding doors", "Low furniture"], materials: ["Tatami", "Bamboo", "Shoji paper", "Cedar wood"] },
    modern: { colors: ["#2F4F4F", "#FFFFFF", "#C0C0C0", "#4682B4"], features: ["Sleek surfaces", "Bold accents", "Tech integration", "Geometric shapes"], materials: ["Lacquered panels", "Chrome", "Tempered glass", "Quartz"] },
    contemporary: { colors: ["#708090", "#FFFAF0", "#4169E1", "#2F4F4F"], features: ["Flowing spaces", "Mixed textures", "Statement art", "Curved forms"], materials: ["Velvet", "Brass", "Marble", "Tinted glass"] },
    luxury: { colors: ["#000000", "#FFD700", "#800020", "#1C1C1C"], features: ["Premium finishes", "Custom details", "Chandelier lighting", "Rich fabrics"], materials: ["Italian marble", "Gold trim", "Silk", "Crystal"] },
    tropical: { colors: ["#228B22", "#FFD700", "#8B4513", "#87CEEB"], features: ["Indoor plants", "Natural breeze", "Rattan accents", "Bright colors"], materials: ["Teak wood", "Rattan", "Palm leaves", "Terracotta"] },
};

const designTips = [
    "Consider layered lighting for depth and ambiance",
    "Use mirrors to create an illusion of space",
    "Incorporate plants for natural freshness",
    "Choose a focal point for each room",
    "Balance proportions with varied furniture heights",
    "Add texture through textiles and materials",
    "Create visual flow between connected spaces",
    "Invest in quality over quantity",
];

const testimonialPool = [
    { name: "Emily R.", text: "The {style} design transformed our home. Absolutely stunning!" },
    { name: "Jason L.", text: "Perfect {style} aesthetic. Better than we imagined!" },
    { name: "Priya S.", text: "Our {location} home now looks like a magazine feature." },
    { name: "Marcus T.", text: "Professional team with great {style} design sense." },
    { name: "Sophia W.", text: "Love the {style} vibes. Best renovation decision ever!" },
];

interface PageProps {
    params: Promise<{ style: string; service: string; location: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { style, service, location } = await params;
    const styleName = style.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const serviceName = service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const locName = location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const seed = style + service + location;
    const rng = seededRandom(seed);

    const titles = [
        `${styleName} ${serviceName} in ${locName} | Design Experts | Ezzon`,
        `${styleName} Style ${serviceName} ${locName} | Free Consultation`,
        `Create Your ${styleName} Home in ${locName} | Ezzon Singapore`,
        `${styleName} Interior Design & ${serviceName} | ${locName}`,
    ];

    const descs = [
        `Create your dream ${styleName.toLowerCase()} home with our ${serviceName.toLowerCase()} services in ${locName}. Expert designers available.`,
        `Beautiful ${styleName.toLowerCase()} ${serviceName.toLowerCase()} in ${locName}. Transform your space with timeless elegance.`,
        `Looking for ${styleName.toLowerCase()} design? Professional ${serviceName.toLowerCase()} in ${locName}. Get inspired today!`,
    ];

    return {
        title: titles[Math.floor(rng() * titles.length)],
        description: descs[Math.floor(rng() * descs.length)],
    };
}

export default async function StyleServiceLocationPage({ params }: PageProps) {
    const { style, service, location } = await params;
    const styleName = style.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const serviceName = service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const locName = location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const seed = `${style}-${service}-${location}`;
    const rng = seededRandom(seed);

    // Get style-specific data or defaults
    const data = styleData[style] || styleData.modern;

    // Dynamic values
    const designFee = 800 + Math.floor(rng() * 1200);
    const projectsInStyle = 50 + Math.floor(rng() * 200);

    // Pick unique content
    const tips = pickItems(designTips, 4, seed);
    const testimonials = pickItems(testimonialPool, 2, seed + 'test').map(t => ({
        ...t,
        text: t.text.replace(/{style}/g, styleName.toLowerCase()).replace(/{location}/g, locName)
    }));

    // Shuffle sections
    const sections = shuffleArray(['palette', 'features', 'materials', 'tips', 'testimonials'], seed);

    const renderSection = (sectionId: string) => {
        switch (sectionId) {
            case 'palette':
                return (
                    <section key="palette" className="py-16 bg-gray-50">
                        <div className="container mx-auto px-4 text-center">
                            <h2 className="text-3xl font-bold mb-10">{styleName} Color Palette</h2>
                            <div className="flex justify-center gap-6 flex-wrap">
                                {data.colors.map((color, i) => (
                                    <div key={i} className="text-center">
                                        <div className="w-20 h-20 rounded-full shadow-lg mb-3 mx-auto border-2 border-gray-200" style={{ backgroundColor: color }} />
                                        <p className="text-sm text-gray-600">{color}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            case 'features':
                return (
                    <section key="features" className="py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-10">{styleName} Key Elements</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                                {data.features.map((f, i) => (
                                    <div key={i} className="bg-white p-6 rounded-lg shadow text-center">
                                        <div className="text-3xl mb-3">✦</div>
                                        <p className="font-semibold">{f}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            case 'materials':
                return (
                    <section key="materials" className="py-16 bg-purple-900 text-white">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-10">Recommended Materials</h2>
                            <div className="flex flex-wrap justify-center gap-4">
                                {data.materials.map((m, i) => (
                                    <span key={i} className="bg-purple-700 px-6 py-3 rounded-full">{m}</span>
                                ))}
                            </div>
                            <p className="text-center mt-8 text-purple-200">{projectsInStyle}+ {styleName} projects completed in Singapore</p>
                        </div>
                    </section>
                );
            case 'tips':
                return (
                    <section key="tips" className="py-16 bg-gray-50">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-10">{styleName} Design Tips</h2>
                            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                                {tips.map((tip, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow">
                                        <span className="text-purple-600 font-bold text-xl">💡</span>
                                        <p>{tip}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            case 'testimonials':
                return (
                    <section key="testimonials" className="py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-10">{styleName} Transformations</h2>
                            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                {testimonials.map((t, i) => (
                                    <div key={i} className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
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
                <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                        <span className="bg-purple-500 text-sm px-4 py-1 rounded-full mb-4 inline-block">{styleName} Design</span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{styleName} {serviceName} in {locName}</h1>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Create your dream {styleName.toLowerCase()} space with expert {serviceName.toLowerCase()} services tailored for homes in {locName}.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg text-lg font-semibold">
                                Free Design Consultation
                            </Link>
                        </div>
                        <p className="mt-4 text-purple-200">Design consultation from ${designFee}</p>
                    </div>
                </section>

                {/* Dynamic Sections */}
                {sections.map(renderSection)}

                {/* CTA */}
                <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-6">Bring {styleName} Style to Your {locName} Home</h2>
                        <p className="text-xl mb-8">Expert designers ready to transform your space</p>
                        <Link href="/contact" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold inline-block">
                            Book Consultation
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
