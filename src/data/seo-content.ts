// SEO Content Variations for PSEO Pages
// Spintax format {option1|option2|option3} for content uniqueness

export interface ContentTemplate {
    metaTitle: string[];
    metaDescription: string[];
    heroTitle: string[];
    heroSubtitle: string[];
    introText: string[];
    whyChooseUs: string[];
    ctaText: string[];
    sectionOrder?: string[];
}

// Helper to generate randomness based on seed
export const seededRandom = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    const x = Math.sin(hash) * 10000;
    return x - Math.floor(x);
};

// Content templates for Service + Location pages
export const serviceLocationContent: Record<string, ContentTemplate> = {
    default: {
        metaTitle: [
            "{service} in {location} | Expert Contractors | Ezzon",
            "Best {service} in {location} | 20+ Years Experience | Ezzon",
            "Professional {service} in {location} | Free Quote | Ezzon",
            "Top-Rated {service} in {location} Singapore | Ezzon",
            "{service} Specialists in {location} | Quality Guaranteed | Ezzon",
            "Reliable {service} Services {location} | Ezzon Singapore",
            "{location} {service} Experts | Affordable & Quality | Ezzon",
            "Premium {service} @ {location} | Get Free Estimate | Ezzon",
            "#1 {service} Contractor in {location} | Trusted by Locals",
            "Expert {service} Solutions for {location} Homes | Ezzon",
            "{service} Near You in {location} | Fast & Reliable",
            "Your Local {service} Partner in {location} | Ezzon SG",
            "Quality {service} in {location} | 100% Satisfaction | Ezzon",
            "Affordable {service} Packages in {location} | Book Now",
            "Professional {service} {location} | Licensed Contractors",
        ],
        metaDescription: [
            "Looking for {service} in {location}? Ezzon offers premium renovation services with 20+ years experience. Free consultation & competitive pricing. Call now!",
            "Professional {service} in {location} Singapore. Quality materials, expert craftsmanship, lifetime warranty. Get your free quote today!",
            "Transform your space with expert {service} in {location}. Trusted by 1000+ homeowners. Affordable rates, premium results. Contact us!",
            "Best {service} services in {location}. From consultation to completion, we deliver excellence. 20+ years experience. Free site visit!",
            "Need {service} in {location}? Our certified specialists provide top-quality work with guaranteed satisfaction. Get free estimate now!",
            "Your trusted {service} partner in {location}. We deliver on time and on budget. Experience Ezzon quality today. Call +65 9451 3098.",
            "Searching for reliable {service} near {location}? We provide comprehensive solutions with warranty. Book a free site inspection.",
            "Get the best deal for {service} in {location}. Direct contractor pricing, no hidden costs. Quality workmanship guaranteed by Ezzon.",
            "Ezzon Renovation: The leading choice for {service} in {location}. Browse our portfolio and get a custom quote for your home today.",
            "Don't compromise on quality. Choose Ezzon for your {service} needs in {location}. Superior materials and skilled installers.",
            "Homeowners in {location} trust Ezzon for {service}. 5-star reviews, transparent pricing, and dedicated project management.",
            "Upgrade your property in {location} with our {service}. Specialized in HDB, Condo, and Landed homes. Free design consultation.",
            "Fast, reliable, and affordable {service} in {location}. We handle everything from permit to handover. Contact us for a quote!",
            "Expert {service} tailored for {location} residents. Enhance your living space with our award-winning design and build services.",
            "Complete {service} solutions in {location}. We make renovation easy and stress-free. trusted by thousands of Singaporeans.",
        ],
        heroTitle: [
            "Expert {service} in {location}",
            "Professional {service} Services in {location}",
            "Premium {service} for {location} Residents",
            "Quality {service} in {location}, Singapore",
            "Trusted {service} Specialists in {location}",
            "Reliable {service} Contractor {location}",
            "Best {service} Solutions {location}",
            "Top-Notch {service} in {location}",
            "Your Local {service} Experts in {location}",
            "Affordable {service} in {location}",
            "Superior {service} Work in {location}",
            "Premier {service} Company {location}",
            "{location}'s Choice for {service}",
            "Exceptional {service} for {location} Homes",
            "Masterful {service} in {location}",
        ],
        heroSubtitle: [
            "Transform your {location} home with our professional {service} team. 20+ years of excellence, serving {region} and beyond.",
            "Looking for reliable {service} in {location}? Our expert team delivers quality work with competitive pricing.",
            "Get the best {service} in {location}. Free consultation, premium materials, and workmanship guaranteed.",
            "Your trusted partner for {service} in {location}. Quality work, on-time delivery, satisfaction guaranteed.",
            "Professional {service} services for {location} homeowners. Transform your space with experts you can trust.",
            "We bring vision to life with complete {service} solutions in {location}. Experienced, insured, and dedicated to quality.",
            "Enhance your property value in {location} with our top-rated {service}. Skilled craftsmanship meets modern design.",
            "The preferred {service} choice for {location} residents. We handle every detail so you don't have to.",
            "Quality {service} without the premium price tag in {location}. Get your free quote and design proposal today.",
            "From concept to completion, we are your dedicated specialists for {service} in {location}.",
            "Experience hassle-free {service} in {location} with our streamlined process and expert project management.",
            "Serving the {location} community with pride. We stand behind our {service} with comprehensive warranties.",
            "Don't settle for less. Get Ezzon quality for your {service} project in {location}.",
            "Create the home of your dreams in {location} with our bespoke {service} solutions.",
            "Expertise you can trust, quality you can see. The best {service} team in {location}.",
        ],
        introText: [
            "When it comes to {service} in {location}, Ezzon stands out as the premier choice for homeowners and businesses alike. With over two decades of experience serving the {region} area, we have built a reputation for excellence, reliability, and outstanding customer service. Our team of certified professionals understands the unique needs of {location} residents and delivers customized solutions that exceed expectations.",
            "Searching for quality {service} in {location}? Look no further than Ezzon. We are a trusted renovation company with 20+ years of experience serving homeowners throughout Singapore. Our {location} clients appreciate our attention to detail, competitive pricing, and commitment to using only the highest quality materials.",
            "Welcome to Ezzon's {service} services in {location}. As one of Singapore's most trusted renovation contractors, we bring expertise, professionalism, and passion to every project. Whether you're renovating an HDB flat, condo, or landed property in {location}, our team is ready to transform your vision into reality.",
            "At Ezzon, we take pride in delivering exceptional {service} to {location} residents. Our comprehensive approach combines expert craftsmanship, premium materials, and personalized service to ensure your complete satisfaction. From initial consultation to final inspection, we're with you every step of the way.",
            "Experience the Ezzon difference with our professional {service} in {location}. Our dedicated team serves the {region} region with unmatched quality and service. We understand that your home is your sanctuary, and we treat every project with the care and attention it deserves.",
            "For residents of {location} seeking top-tier {service}, Ezzon offers a blend of traditional craftsmanship and modern innovation. We have successfully completed hundreds of projects in the {region} district, understanding specifically what works best for properties in {location}. Our commitment is to deliver results that not only look stunning but stand the test of time.",
            "Elevate your living standards in {location} with Ezzon's specialized {service}. We know that every home in {location} is unique, which is why we don't believe in one-size-fits-all solutions. Our team works closely with you to understand your specific requirements, lifestyle, and budget to craft a {service} solution that is perfectly tailored to your needs.",
            "Finding a reliable contractor for {service} in {location} can be challenging. Ezzon simplifies this process by providing transparent, all-inclusive services that {location} homeowners trust. From the first site visit to the final handover, our process is designed to be stress-free, efficient, and focused on delivering the highest quality output for your home.",
            "Ezzon brings world-class {service} expertise right to your doorstep in {location}. Our deep understanding of local building regulations in {location} ensures a smooth renovation process without legal hiccups. We combine this technical knowledge with creative design solutions to maximize the potential of your space.",
            "Your search for the best {service} in {location} ends here. Ezzon combines affordability with luxury quality. We leverage our strong supplier network to bring premium materials to {location} residents at the best possible prices, ensuring your renovation delivers exceptional value for money.",
        ],
        whyChooseUs: [
            "Choose Ezzon for your {service} needs in {location} because we offer unbeatable value, expert workmanship, and a customer-first approach that has earned us the trust of thousands of satisfied clients.",
            "Why do {location} residents choose Ezzon for {service}? It's simple: quality materials, skilled craftsmen, competitive prices, and a 100% satisfaction guarantee on every project.",
            "For {service} in {location}, Ezzon delivers what matters most: reliability, quality, and value. Our team's expertise combined with premium materials ensures results that last.",
            "Ezzon is the preferred choice for {service} in {location} thanks to our comprehensive warranty, transparent pricing, and commitment to completing every project on time and within budget.",
            "When you choose Ezzon for {service} in {location}, you're choosing a partner who cares about your home as much as you do. Experience the difference quality makes.",
        ],
        ctaText: [
            "Ready to start your {service} project in {location}? Contact us today for a free consultation and quote!",
            "Get your free estimate for {service} in {location}. Call us now or fill out our online form!",
            "Transform your {location} home with professional {service}. Request your free site visit today!",
            "Looking for reliable {service} in {location}? Get in touch with our expert team for a no-obligation quote!",
            "Start your {service} journey in {location} with Ezzon. Free consultation available - contact us now!",
        ],
    },
    flooring: {
        metaTitle: [
            "{service} in {location} | Expert Flooring Contractors | Ezzon",
            "Best {service} in {location} | Premium Flooring | Ezzon",
            "Professional {service} in {location} | Lifetime Warranty | Ezzon",
            "Top {service} Services in {location} Singapore | Ezzon",
            "Affordable {service} in {location} | Quality Guaranteed | Ezzon",
        ],
        metaDescription: [
            "Premium {service} in {location}. Wide selection of flooring options, expert installation, lifetime warranty. Free measurement & quote. Call Ezzon today!",
            "Looking for {service} in {location}? We offer top brands, professional installation, and best prices. 20+ years experience. Get your free quote!",
            "Transform your floors with professional {service} in {location}. Quality materials, skilled installers, competitive rates. Contact us for free consultation!",
            "Best {service} in {location} Singapore. From vinyl to hardwood, we install it all. Expert workmanship, guaranteed satisfaction. Call now!",
            "Need {service} in {location}? Premium flooring solutions at affordable prices. Free site visit & measurement. Get your quote today!",
        ],
        heroTitle: [
            "Premium {service} in {location}",
            "Expert {service} Services in {location}",
            "Quality {service} for {location} Homes",
            "Professional {service} in {location}, Singapore",
            "Best {service} Contractor in {location}",
        ],
        heroSubtitle: [
            "Upgrade your {location} home with beautiful, durable flooring. Wide selection of premium materials, expert installation, and lifetime warranty included.",
            "Professional {service} in {location}. From selection to installation, we make the process easy. Free measurement and consultation.",
            "Transform your space with quality {service} in {location}. Top brands, competitive prices, and skilled craftsmen.",
            "Your trusted source for {service} in {location}. Experience the perfect blend of quality, value, and expert service.",
            "Get stunning floors installed by professionals in {location}. Premium materials, flawless installation, satisfaction guaranteed.",
        ],
        introText: [
            "Upgrade your {location} home with premium {service} from Ezzon. Our flooring specialists bring over 20 years of experience to every installation, ensuring beautiful, long-lasting results. We understand that selecting the right flooring for your {location} home is a significant decision, and we're here to guide you through every step of the process.",
            "Looking for quality {service} in {location}? Ezzon is your go-to flooring contractor in the {region} area. We offer an extensive range of flooring options to suit every style, budget, and lifestyle. Our expert installers ensure precision and care, delivering floors that look stunning and perform beautifully for years to come.",
            "At Ezzon, we specialize in professional {service} for {location} homes and businesses. Our comprehensive flooring solutions include consultation, selection assistance, precise measurement, and expert installation. We work with top flooring brands to offer you the best quality at competitive prices.",
            "Transform your {location} space with Ezzon's expert {service}. As one of Singapore's leading flooring contractors, we pride ourselves on quality workmanship, transparent pricing, and exceptional customer service. Whether you're renovating a single room or an entire property, we have the expertise to handle projects of any size.",
            "Experience the Ezzon difference with our professional {service} in {location}. We combine premium materials, skilled craftsmen, and a customer-centric approach to deliver flooring solutions that exceed expectations. From HDB flats to landed homes in {location}, we've helped thousands of homeowners achieve the floors of their dreams.",
        ],
        whyChooseUs: [
            "Choose Ezzon for {service} in {location} and enjoy free site measurement, competitive pricing, a wide selection of premium brands, and expert installation backed by our comprehensive warranty.",
            "Why {location} homeowners trust Ezzon for {service}: We offer the best value without compromising on quality. Our skilled installers, premium materials, and lifetime warranty ensure your complete satisfaction.",
            "For {service} in {location}, Ezzon delivers unbeatable value. We provide free consultation, honest pricing, quality materials, and expert installation that stands the test of time.",
            "Ezzon is the smart choice for {service} in {location}. With our extensive experience, quality partnerships, and commitment to excellence, we guarantee results that exceed your expectations.",
            "Trust Ezzon for your {service} in {location}. We combine industry expertise with customer care to deliver flooring solutions that enhance your space and add value to your property.",
        ],
        ctaText: [
            "Ready for beautiful new floors in {location}? Get your free measurement and quote today!",
            "Upgrade your {location} home with premium {service}. Call now for a free consultation!",
            "Transform your floors with expert {service} in {location}. Request your free estimate today!",
            "Looking for affordable {service} in {location}? Contact us for the best prices and quality!",
            "Start your flooring project in {location} with confidence. Get your free quote from Ezzon today!",
        ],
    },
};

// FAQs for different service categories
export const serviceFAQs: Record<string, { question: string; answer: string }[]> = {
    flooring: [
        {
            question: "How long does {service} take in {location}?",
            answer: "For most {location} homes, {service} typically takes 1-3 days depending on the size of the area and complexity of the project. Larger properties or those requiring subflooring work may take longer. We'll provide an accurate timeline during your free consultation."
        },
        {
            question: "What is the cost of {service} in {location}?",
            answer: "The cost of {service} in {location} varies based on material choice, area size, and project complexity. We offer competitive pricing starting from $3.50 per sqft for basic materials. Contact us for a free quote tailored to your specific requirements."
        },
        {
            question: "Do you offer warranty for {service} in {location}?",
            answer: "Yes! All our {service} projects in {location} come with a comprehensive warranty. Material warranties range from 10-30 years depending on the product, and our workmanship is guaranteed for 1 year. We stand behind our work 100%."
        },
        {
            question: "Can you work on weekends for {service} in {location}?",
            answer: "We understand that {location} residents have busy schedules. We offer flexible scheduling including weekends and after-hours work to minimize disruption to your daily routine. Additional charges may apply for weekend work."
        },
        {
            question: "What flooring materials do you recommend for {location} homes?",
            answer: "For {location} homes, we typically recommend vinyl or laminate flooring due to Singapore's humid climate. These materials are water-resistant, durable, and easy to maintain. We'll help you choose the best option based on your lifestyle and budget."
        },
        {
            question: "Do you handle HDB flooring regulations in {location}?",
            answer: "Yes, we're fully familiar with HDB renovation guidelines and regulations for {location} estates. We handle all necessary permits and ensure compliance with noise limits, working hours, and material regulations."
        },
    ],
    renovation: [
        {
            question: "How much does renovation cost in {location}?",
            answer: "Renovation costs in {location} vary widely based on the scope of work. Basic HDB renovations start from $15,000, while comprehensive packages can range from $30,000 to $80,000+. Contact us for a detailed quote based on your specific requirements."
        },
        {
            question: "How long does a full renovation take in {location}?",
            answer: "A complete renovation for {location} homes typically takes 6-10 weeks for HDB flats and 10-16 weeks for larger properties. We provide a detailed timeline during the planning phase and keep you updated throughout the project."
        },
        {
            question: "Do you handle renovation permits for {location} properties?",
            answer: "Absolutely! We handle all necessary permits and approvals for {location} renovations, including HDB permits, condo management approvals, and any required government submissions. This is included in our comprehensive service."
        },
        {
            question: "What warranty do you provide for renovation work in {location}?",
            answer: "We provide a comprehensive 1-year workmanship warranty on all renovation work in {location}. Additionally, individual product warranties from manufacturers (ranging from 1-10 years) are passed on to you for maximum protection."
        },
        {
            question: "Can I stay at home during the renovation in {location}?",
            answer: "For minor renovations, you can often stay in your {location} home. For major renovations, we recommend temporary relocation for comfort and safety. We work efficiently to minimize the renovation period and can suggest cost-effective accommodation options."
        },
        {
            question: "Do you provide design services for {location} homes?",
            answer: "Yes! Our in-house design team creates custom designs for {location} homes. We provide 3D visualizations so you can see exactly how your renovated space will look before work begins. Design consultation is included in our renovation packages."
        },
    ],
    default: [
        {
            question: "What areas does Ezzon serve in {location}?",
            answer: "We proudly serve all of {location} and surrounding areas in the {region} region of Singapore. Our team is familiar with local building regulations and community requirements to ensure smooth project execution."
        },
        {
            question: "How do I get a quote for {service} in {location}?",
            answer: "Getting a quote is easy! Simply call us, WhatsApp us, or fill out our online form. We offer free site visits and consultations for all {location} residents. Our team will assess your needs and provide a transparent, no-obligation quote."
        },
        {
            question: "What payment options do you offer for {service} in {location}?",
            answer: "We offer flexible payment options for {location} clients including progress-based payments, credit card payments, and installment plans. A typical payment schedule is 50% deposit, 40% mid-project, and 10% upon completion."
        },
        {
            question: "How experienced is your team with {service} in {location}?",
            answer: "Our team has over 20 years of combined experience in {service} throughout Singapore. We've completed numerous projects in {location} and the {region} region, earning a reputation for quality and reliability."
        },
        {
            question: "Do you use subcontractors for {service} in {location}?",
            answer: "We primarily use our in-house team for {service} in {location} to ensure quality control. For specialized work, we partner with trusted contractors who meet our strict quality standards and are fully insured."
        },
        {
            question: "What safety measures do you follow during {service} in {location}?",
            answer: "Safety is paramount. We follow strict safety protocols including proper equipment use, site cleanliness, and compliance with all Singapore workplace safety regulations. Our team is insured and trained for safe work practices."
        },
    ],
};

// Benefits for different service types
export const serviceBenefits: Record<string, string[]> = {
    flooring: [
        "Free site measurement and consultation",
        "Wide selection of premium flooring brands",
        "Expert installation by certified craftsmen",
        "Lifetime warranty on materials",
        "1-year workmanship guarantee",
        "Competitive and transparent pricing",
        "Same-day quote available",
        "Flexible scheduling including weekends",
        "After-sales support and maintenance tips",
        "100% satisfaction guaranteed",
    ],
    renovation: [
        "Complete design and build services",
        "3D visualization of your renovated space",
        "All permits and approvals handled",
        "Quality materials from trusted brands",
        "Skilled and experienced craftsmen",
        "Project management from start to finish",
        "Regular progress updates",
        "Flexible payment options",
        "1-year comprehensive workmanship warranty",
        "After-sales service and support",
    ],
    default: [
        "20+ years of industry experience",
        "Free consultation and quote",
        "Certified professional team",
        "Quality materials guaranteed",
        "On-time project completion",
        "Transparent pricing with no hidden costs",
        "Responsive customer service",
        "Workmanship warranty included",
        "Licensed and fully insured",
        "Satisfaction guaranteed",
    ],
};

// Helper function to get random content variation
export function getRandomContent<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Helper function to replace placeholders in content
export function replaceContentPlaceholders(
    content: string,
    replacements: Record<string, string>
): string {
    let result = content;
    for (const [key, value] of Object.entries(replacements)) {
        result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    }
    return result;
}

// Helper to generate unique content based on seed (for consistent SSG)
export function getSeededContent<T>(arr: T[], seed: string): T {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    const index = Math.abs(hash) % arr.length;
    return arr[index];
}
