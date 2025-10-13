import Header from "@/components/Header";
import Footer from "@/components/Footer";

const services = [
  {
    id: "shopping-mall",
    title: "Shopping Mall Renovation",
    description: "Comprehensive renovation services for shopping malls and large retail spaces",
    image: "/images/mall.jpg",
    features: [
      "Modern design concepts",
      "High-traffic flooring solutions",
      "Retail space optimization",
      "Commercial-grade materials",
      "Minimal disruption during renovation"
    ]
  },
  {
    id: "commercial",
    title: "Commercial Renovation",
    description: "Professional renovation for offices, restaurants, and business establishments",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Office space planning",
      "Restaurant fit-outs",
      "Commercial flooring",
      "Business environment design",
      "Code compliance assurance"
    ]
  },
  {
    id: "residential",
    title: "House - Childcare - Villa",
    description: "Residential renovation services for homes, childcare centers, and luxury properties",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Custom home renovation",
      "Child-safe materials for childcare",
      "Luxury villa upgrades",
      "Family-friendly designs",
      "Safety-first approach"
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/service.jpg')`,
            }}
          />
          {/* Overlay with same opacity as hero */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-white mb-6">
                Our Services
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Professional renovation services backed by over 20 years of experience.
                From shopping malls to residential homes, we deliver excellence in every project.
              </p>
            </div>
          </div>
        </section>

        {/* Services Details */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/service2.jpg')`,
            }}
          />
          {/* Overlay with same opacity as hero */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative container">
            <div className="space-y-24">
              {services.map((service, index) => (
                <div key={service.id} id={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} bg-white/10 backdrop-blur-sm p-8 rounded-lg`}>
                    <h2 className="text-4xl font-bold text-white mb-6">
                      {service.title}
                    </h2>
                    <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-200">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="/contact"
                      className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center"
                    >
                      Get Quote for This Service
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <div className="relative">
                      <div className="h-96 rounded-lg overflow-hidden shadow-2xl">
                        <div
                          className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-500"
                          style={{
                            backgroundImage: `url(${service.image})`,
                          }}
                        />
                      </div>

                      {/* Decorative elements */}
                      <div className={`absolute -top-4 w-24 h-24 bg-primary/20 rounded-lg ${index % 2 === 1 ? '-right-4' : '-left-4'}`}></div>
                      <div className={`absolute -bottom-4 w-32 h-32 bg-primary/10 rounded-lg ${index % 2 === 1 ? '-left-4' : '-right-4'}`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/service3.jpg')`,
            }}
          />
          {/* Overlay with same opacity as hero */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Additional Services
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Comprehensive solutions for all your renovation needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 id="flooring" className="text-xl font-semibold mb-4 text-white">Flooring Solutions</h3>
                <p className="text-gray-200">Discover the perfect flooring for your space with unbeatable prices on top-brand materials.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 id="installation" className="text-xl font-semibold mb-4 text-white">Professional Installation</h3>
                <p className="text-gray-200">Expert installation services with lifetime warranty and skilled craftsmanship.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 id="consultation" className="text-xl font-semibold mb-4 text-white">Design Consultation</h3>
                <p className="text-gray-200">Professional design consultation with knowledgeable and friendly staff to assist you.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden text-white">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/service5.jpg')`,
            }}
          />
          {/* Overlay with same opacity as hero */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative container text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Get in touch with our expert team today for a free consultation and quote.
              Let us bring your renovation vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center justify-center"
              >
                Get Free Quote
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=6594513098"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center justify-center"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
