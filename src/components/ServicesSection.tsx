import Link from "next/link";

const services = [
  {
    id: 1,
    title: "Shopping Mall",
    description: "Professional renovation services for shopping malls and retail spaces with modern design solutions.",
    image: "/images/mall.jpg",
    link: "/services#shopping-mall"
  },
  {
    id: 2,
    title: "Commercial",
    description: "Comprehensive commercial renovation including offices, restaurants, and business establishments.",
    image: "/images/service.jpg",
    link: "/services#commercial"
  },
  {
    id: 3,
    title: "House - Childcare - Villa",
    description: "Residential renovation services for houses, childcare centers, and luxury villas with attention to detail.",
    image: "/images/rumah.jpg",
    link: "/services#residential"
  },
  {
    id: 4,
    title: "Flooring Solutions",
    description: "Discover the perfect flooring for your space with unbeatable prices and professional installation.",
    image: "/images/service2.jpg",
    link: "/services#flooring"
  },
  {
    id: 5,
    title: "Professional Installation",
    description: "Expert installation services with lifetime warranty and knowledgeable, friendly staff to assist you.",
    image: "/images/service3.jpg",
    link: "/services#installation"
  },
  {
    id: 6,
    title: "Design Consultation",
    description: "Professional design consultation to help you choose the best renovation solutions for your space.",
    image: "/images/service4.jpg",
    link: "/services#consultation"
  }
];

export default function ServicesSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/mantap.jpg')`,
        }}
      />
      {/* Overlay with same opacity as hero */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            With over two decades of experience, we provide comprehensive renovation services
            for all types of spaces. From shopping malls to residential homes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.link}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage: `url(${service.image})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-4 flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors">
                  Learn More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center"
          >
            View All Services
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
