import Link from "next/link";

const services = [
  {
    id: 1,
    title: "ExpertPower (EMS)",
    description:
      "Platform Energy Management Systems untuk pemantauan, pelaporan, dan analitik energi.",
    image: "/products/satec/expertpower.webp",
    link: "/products#expertpower-(ems)",
  },
  {
    id: 2,
    title: "SATEC",
    description:
      "Perangkat metering & power quality analyzer untuk berbagai kebutuhan industri.",
    image: "/products/satec/pm17x-pro.webp",
    link: "/products#satec",
  },
  {
    id: 3,
    title: "SERTEC",
    description:
      "Perangkat proteksi petir CMCE (termasuk varian Marine) dan solusi pendukung.",
    image: "/products/sertec/sertec-thumbnail.png",
    link: "/products#sertec",
  },
  {
    id: 4,
    title: "Kamera PTZ SENTER",
    description:
      "Sistem kamera PTZ untuk inspeksi jalur transmisi dan pemantauan area kritikal.",
    image: "/products/senter/ai-power-inspection.png",
    link: "/products#senter",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Produk Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empat kategori produk untuk mendukung implementasi EMS: platform, perangkat SATEC,
            perangkat pendukung SERTEC, dan sistem kamera inspeksi.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.link}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-40 md:h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage: `url(${service.image})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="p-3 md:p-6">
                <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-2 md:mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs md:text-base text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-3 md:mt-4 flex items-center text-primary text-sm md:text-base font-medium group-hover:text-primary/80 transition-colors">
                  Lihat Produk
                  <svg className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center"
          >
            Lihat Semua Produk
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
