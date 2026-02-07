import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import ToolsPromo from "@/components/ToolsPromo";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

// Seeded random function for deterministic uniqueness
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

// Content pools for variation
const introVariations = [
    "Looking for professional {service} in {location}? You've come to the right place. Our team of certified specialists delivers exceptional results.",
    "Transform your space with our expert {service} services in {location}. With years of experience, we guarantee satisfaction.",
    "Need reliable {service} in {location}? Our skilled contractors provide top-quality workmanship at competitive prices.",
    "Discover premium {service} solutions in {location}. We combine craftsmanship with modern techniques for stunning results.",
    "Your search for quality {service} in {location} ends here. We're the trusted choice for homeowners across the region.",
    "Experience the difference with our {service} services in {location}. Customer satisfaction is our top priority.",
];

const benefitPool = [
    { icon: "✓", title: "Licensed & Insured", desc: "All contractors fully certified" },
    { icon: "⭐", title: "5-Star Reviews", desc: "Trusted by hundreds of homeowners" },
    { icon: "🏆", title: "Quality Guaranteed", desc: "1-year warranty on all work" },
    { icon: "💰", title: "Competitive Pricing", desc: "Best value for your budget" },
    { icon: "⚡", title: "Fast Turnaround", desc: "Quick project completion" },
    { icon: "🛠️", title: "Expert Team", desc: "Skilled professionals" },
    { icon: "📞", title: "24/7 Support", desc: "Always here when you need us" },
    { icon: "🎨", title: "Custom Solutions", desc: "Tailored to your needs" },
    { icon: "✨", title: "Premium Materials", desc: "Only the best quality" },
    { icon: "🏠", title: "Local Experts", desc: "We know your neighborhood" },
];

const faqPool = [
    { q: "How long does {service} take in {location}?", a: "Typically 3-7 days depending on scope." },
    { q: "What's the cost of {service} in {location}?", a: "Prices start from ${price}/sqft. Contact us for accurate quote." },
    { q: "Do you provide warranty for {service}?", a: "Yes, we offer 1-year warranty on all work." },
    { q: "Are your contractors licensed in {location}?", a: "All our contractors are fully licensed and insured." },
    { q: "Can I see samples before {service}?", a: "Absolutely! We provide free samples and consultations." },
    { q: "Do you work on weekends in {location}?", a: "Yes, we offer flexible scheduling including weekends." },
    { q: "What brands do you use for {service}?", a: "We use premium brands like Pergo, QuickStep, and more." },
    { q: "Is there a minimum project size?", a: "We handle projects of all sizes, from small rooms to entire homes." },
];

const testimonialPool = [
    { name: "Sarah L.", rating: 5, text: "Excellent {service} work! The team was professional and finished on time." },
    { name: "James T.", rating: 5, text: "Best {service} service in {location}. Highly recommend to everyone!" },
    { name: "Michelle K.", rating: 5, text: "Transformed our home completely. Amazing attention to detail." },
    { name: "David W.", rating: 5, text: "Fair pricing and outstanding quality. Will use again!" },
    { name: "Rachel M.", rating: 5, text: "From consultation to completion, everything was perfect." },
    { name: "Kevin C.", rating: 5, text: "Professional team, clean work, great results. 5 stars!" },
    { name: "Amanda H.", rating: 5, text: "They exceeded our expectations. Our neighbors are jealous!" },
    { name: "Brian L.", rating: 5, text: "Reliable, skilled, and reasonably priced. Thank you!" },
];

const localLandmarks = [
    "Community Centre", "MRT Station", "Shopping Mall", "Food Court",
    "Primary School", "Sports Complex", "Park", "Market"
];

interface PageProps {
    params: Promise<{ service: string; location: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { service, location } = await params;
    const serviceName = service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const locName = location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const seed = service + location;
    const rng = seededRandom(seed);
    const year = 2024 + Math.floor(rng() * 2);

    const titleVariations = [
        `${serviceName} in ${locName} | #1 Rated Contractor | Ezzon`,
        `Best ${serviceName} ${locName} | Free Quote | Ezzon Singapore`,
        `${serviceName} Services ${locName} | Expert Contractors | Ezzon`,
        `Professional ${serviceName} in ${locName} | Ezzon SG ${year}`,
        `Top ${serviceName} Contractor ${locName} | Ezzon Singapore`,
    ];

    const descVariations = [
        `Professional ${serviceName.toLowerCase()} services in ${locName}. Licensed contractors, competitive pricing, 1-year warranty. Get your free quote today!`,
        `Looking for ${serviceName.toLowerCase()} in ${locName}? Our expert team delivers quality results. Serving ${locName} since 2015. Call now!`,
        `#1 rated ${serviceName.toLowerCase()} company in ${locName}. Quality workmanship, fair prices, satisfaction guaranteed. Free consultation!`,
        `Expert ${serviceName.toLowerCase()} services for homes in ${locName}. Premium materials, skilled craftsmen. Book your appointment today!`,
    ];

    return {
        title: titleVariations[Math.floor(rng() * titleVariations.length)],
        description: descVariations[Math.floor(rng() * descVariations.length)],
    };
}

export default async function ServiceLocationPage({ params }: PageProps) {
    const { service, location } = await params;
    const serviceName = service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const locName = location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    // Create unique seed from URL combination
    const seed = `${service}-${location}`;
    const rng = seededRandom(seed);

    // Dynamic unique values
    const prices = [28, 32, 35, 38, 42, 45, 48, 52, 55, 58, 62, 68];
    const price = prices[Math.floor(rng() * prices.length)];
    const yearsExp = 8 + Math.floor(rng() * 12);
    const projectsCompleted = 500 + Math.floor(rng() * 2000);
    const rating = (4.7 + rng() * 0.3).toFixed(1);

    // Pick unique content
    const intro = introVariations[Math.floor(rng() * introVariations.length)]
        .replace(/{service}/g, serviceName.toLowerCase())
        .replace(/{location}/g, locName);

    const benefits = pickItems(benefitPool, 4, seed);
    const faqs = pickItems(faqPool, 3, seed + 'faq').map(f => ({
        q: f.q.replace(/{service}/g, serviceName.toLowerCase()).replace(/{location}/g, locName).replace(/{price}/g, String(price)),
        a: f.a
    }));
    const testimonials = pickItems(testimonialPool, 2, seed + 'test').map(t => ({
        ...t,
        text: t.text.replace(/{service}/g, serviceName.toLowerCase()).replace(/{location}/g, locName)
    }));
    const landmarks = pickItems(localLandmarks, 3, seed + 'local').map(l => `${locName} ${l}`);

    // Shuffle section order
    const sections = shuffleArray(['benefits', 'pricing', 'stats', 'testimonials', 'faq', 'local'], seed);

    const renderSection = (sectionId: string) => {
        switch (sectionId) {
            case 'benefits':
                return (
                    <section key="benefits" className="py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us for {serviceName}?</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {benefits.map((b, i) => (
                                    <div key={i} className="text-center p-6 bg-white rounded-lg shadow">
                                        <div className="text-4xl mb-4">{b.icon}</div>
                                        <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
                                        <p className="text-gray-600 text-sm">{b.desc}</p>
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
                            <h2 className="text-3xl font-bold mb-10">{serviceName} Pricing in {locName}</h2>
                            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                                <p className="text-gray-600 mb-2">Starting from</p>
                                <p className="text-5xl font-bold text-blue-600 mb-4">${price}/sqft</p>
                                <p className="text-gray-500 text-sm">*Final price based on site assessment</p>
                                <Link href="/contact" className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block">
                                    Get Exact Quote
                                </Link>
                            </div>
                        </div>
                    </section>
                );
            case 'stats':
                return (
                    <section key="stats" className="py-16 bg-blue-900 text-white">
                        <div className="container mx-auto px-4">
                            <div className="grid md:grid-cols-4 gap-8 text-center">
                                <div><p className="text-4xl font-bold">{yearsExp}+</p><p>Years Experience</p></div>
                                <div><p className="text-4xl font-bold">{projectsCompleted.toLocaleString()}+</p><p>Projects Completed</p></div>
                                <div><p className="text-4xl font-bold">{rating}</p><p>Customer Rating</p></div>
                                <div><p className="text-4xl font-bold">100%</p><p>Satisfaction Guaranteed</p></div>
                            </div>
                        </div>
                    </section>
                );
            case 'testimonials':
                return (
                    <section key="testimonials" className="py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
                            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                {testimonials.map((t, i) => (
                                    <div key={i} className="bg-white p-6 rounded-lg shadow">
                                        <div className="flex text-yellow-400 mb-3">{'⭐'.repeat(t.rating)}</div>
                                        <p className="text-gray-700 mb-4">"{t.text}"</p>
                                        <p className="font-semibold">— {t.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            case 'faq':
                return (
                    <section key="faq" className="py-16 bg-gray-50">
                        <div className="container mx-auto px-4 max-w-3xl">
                            <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
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
            case 'local':
                return (
                    <section key="local" className="py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-10">Serving {locName} Area</h2>
                            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
                                We provide {serviceName.toLowerCase()} services throughout {locName} and surrounding neighborhoods.
                                Our team is familiar with local building regulations and community standards.
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {landmarks.map((l, i) => (
                                    <span key={i} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm">{l}</span>
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
                {/* Hero - Always First */}
                <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{serviceName} in {locName}</h1>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">{intro}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg text-lg font-semibold">
                                Get Free Quote
                            </Link>
                            <a href="tel:+6581315155" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold">
                                Call Now
                            </a>
                        </div>
                    </div>
                </section>

                {/* Dynamic Sections in Random Order */}
                {sections.map(renderSection)}

                {/* CTA - Always Last */}
                <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-6">Ready to Start Your {serviceName} Project?</h2>
                        <p className="text-xl mb-8">Contact us today for a free consultation in {locName}</p>
                        <Link href="/contact" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold inline-block">
                            Get Free Quote Now
                        </Link>
                    </div>
                </section>
            </main>
            <ToolsPromo />
            <FloatingWhatsApp locationName={locName} />
            <Footer />
        </div>
    );
}
