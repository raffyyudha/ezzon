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

// Property-specific content pools
const propertyIntros = [
    "Specialized {service} for {property} in {location}. Our team understands the unique requirements of {property} homes.",
    "Expert {service} tailored for {property} properties in {location}. We deliver results that exceed expectations.",
    "Looking for {service} for your {property} in {location}? Our specialists have renovated hundreds of similar units.",
    "Transform your {property} with professional {service} in {location}. Quality craftsmanship guaranteed.",
];

const propertyFeatures: Record<string, string[]> = {
    hdb: ["HDB-approved materials", "BTO/Resale expertise", "MOP considerations", "Neighbor-friendly work hours"],
    condo: ["MCST compliance", "Premium finishes", "Noise regulations adherence", "After-hours scheduling"],
    landed: ["Full customization", "Multi-story capability", "Outdoor/indoor integration", "Structural modifications"],
};

const packageInclusions = [
    "Free site assessment", "Material supply", "Professional installation", "Debris cleanup",
    "1-year warranty", "After-service support", "Progress photos", "Quality inspection",
    "Color consultation", "3D visualization", "Project timeline", "Dedicated manager",
];

const testimonialPool = [
    { name: "Mr. Tan", text: "Excellent work on our {property}! The team was professional and tidy." },
    { name: "Mrs. Lee", text: "Best {service} experience in {location}. Highly recommend!" },
    { name: "Dr. Wong", text: "Quality workmanship at reasonable price. Very satisfied." },
    { name: "Ms. Chen", text: "Transformed our {property} completely. Amazing results!" },
    { name: "Mr. Kumar", text: "Reliable team, on-time delivery, great communication." },
    { name: "Mrs. Lim", text: "Our neighbors keep asking who did our renovation!" },
];

interface PageProps {
    params: Promise<{ propertyType: string; service: string; location: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { propertyType, service, location } = await params;
    const propName = propertyType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const serviceName = service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const locName = location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const seed = propertyType + service + location;
    const rng = seededRandom(seed);

    const titles = [
        `${propName} ${serviceName} in ${locName} | Ezzon Singapore`,
        `${serviceName} for ${propName} ${locName} | Expert Contractors`,
        `Best ${propName} ${serviceName} ${locName} | Free Quote`,
        `Professional ${serviceName} - ${propName} in ${locName}`,
    ];

    const descs = [
        `Specialized ${serviceName.toLowerCase()} for ${propName.toLowerCase()} in ${locName}. HDB/Condo/Landed expertise. Get free quote!`,
        `Expert ${serviceName.toLowerCase()} services for ${propName.toLowerCase()} properties in ${locName}. Quality guaranteed.`,
        `Looking for ${serviceName.toLowerCase()} for your ${propName.toLowerCase()}? Trusted contractors in ${locName}. Call now!`,
    ];

    return {
        title: titles[Math.floor(rng() * titles.length)],
        description: descs[Math.floor(rng() * descs.length)],
    };
}

export default async function PropertyServiceLocationPage({ params }: PageProps) {
    const { propertyType, service, location } = await params;
    const propName = propertyType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const serviceName = service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const locName = location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const seed = `${propertyType}-${service}-${location}`;
    const rng = seededRandom(seed);

    // Determine property category
    const category = propertyType.includes('hdb') || propertyType.includes('bto') ? 'hdb' :
        propertyType.includes('condo') || propertyType.includes('apartment') || propertyType.includes('penthouse') ? 'condo' : 'landed';

    // Dynamic pricing based on property type
    const basePrices: Record<string, number> = { hdb: 18000, condo: 35000, landed: 65000 };
    const basePrice = basePrices[category] + Math.floor(rng() * 15000);
    const maxPrice = basePrice + 20000 + Math.floor(rng() * 30000);

    // Unique stats
    const projectsThisType = 100 + Math.floor(rng() * 400);
    const avgDays = 14 + Math.floor(rng() * 21);

    // Pick unique content
    const intro = propertyIntros[Math.floor(rng() * propertyIntros.length)]
        .replace(/{service}/g, serviceName.toLowerCase())
        .replace(/{property}/g, propName)
        .replace(/{location}/g, locName);

    const features = propertyFeatures[category] || propertyFeatures.hdb;
    const inclusions = pickItems(packageInclusions, 6, seed);
    const testimonials = pickItems(testimonialPool, 2, seed + 'test').map(t => ({
        ...t,
        text: t.text.replace(/{property}/g, propName.toLowerCase()).replace(/{service}/g, serviceName.toLowerCase()).replace(/{location}/g, locName)
    }));

    // Shuffle sections
    const sections = shuffleArray(['features', 'pricing', 'inclusions', 'testimonials', 'process'], seed);

    const renderSection = (sectionId: string) => {
        switch (sectionId) {
            case 'features':
                return (
                    <section key="features" className="py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-10">{propName} Specialists</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {features.map((f, i) => (
                                    <div key={i} className="bg-white p-6 rounded-lg shadow text-center">
                                        <div className="text-3xl mb-3">✓</div>
                                        <p className="font-semibold">{f}</p>
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
                            <h2 className="text-3xl font-bold mb-10">{propName} {serviceName} Package</h2>
                            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                                <p className="text-gray-600 mb-2">Estimated range</p>
                                <p className="text-4xl font-bold text-green-600 mb-2">
                                    ${basePrice.toLocaleString()} - ${maxPrice.toLocaleString()}
                                </p>
                                <p className="text-gray-500 text-sm mb-6">Based on typical {propName.toLowerCase()} in {locName}</p>
                                <Link href="/contact" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg inline-block">
                                    Get Exact Quote
                                </Link>
                            </div>
                        </div>
                    </section>
                );
            case 'inclusions':
                return (
                    <section key="inclusions" className="py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-10">What's Included</h2>
                            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                                {inclusions.map((inc, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-green-50 p-4 rounded-lg">
                                        <span className="text-green-600 font-bold">✓</span>
                                        <span>{inc}</span>
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
                            <h2 className="text-3xl font-bold text-center mb-10">{propName} Owner Reviews</h2>
                            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                {testimonials.map((t, i) => (
                                    <div key={i} className="bg-white p-6 rounded-lg shadow">
                                        <div className="flex text-yellow-400 mb-3">⭐⭐⭐⭐⭐</div>
                                        <p className="text-gray-700 mb-4">"{t.text}"</p>
                                        <p className="font-semibold">— {t.name}, {propName} Owner</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            case 'process':
                return (
                    <section key="process" className="py-16 bg-green-900 text-white">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-10">Our {propName} Process</h2>
                            <div className="grid md:grid-cols-4 gap-8 text-center">
                                <div><p className="text-4xl font-bold mb-2">1</p><p>Free Consultation</p></div>
                                <div><p className="text-4xl font-bold mb-2">2</p><p>Detailed Quotation</p></div>
                                <div><p className="text-4xl font-bold mb-2">3</p><p>Project Execution</p></div>
                                <div><p className="text-4xl font-bold mb-2">4</p><p>Quality Handover</p></div>
                            </div>
                            <div className="text-center mt-8">
                                <p className="text-lg">Average completion: <strong>{avgDays} days</strong> | {projectsThisType}+ {propName} projects completed</p>
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
                <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                        <span className="bg-green-500 text-sm px-4 py-1 rounded-full mb-4 inline-block">{propName}</span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{serviceName} for {propName} in {locName}</h1>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">{intro}</p>
                        <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg text-lg font-semibold inline-block">
                            Get Free Quote
                        </Link>
                    </div>
                </section>

                {/* Dynamic Sections */}
                {sections.map(renderSection)}

                {/* CTA */}
                <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-6">Transform Your {propName} Today</h2>
                        <p className="text-xl mb-8">Expert {serviceName.toLowerCase()} services in {locName}</p>
                        <Link href="/contact" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold inline-block">
                            Start Your Project
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
