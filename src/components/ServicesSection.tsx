import Link from "next/link";

const services = [
  {
    id: 1,
    title: "ExpertPower",
    description: "Platform Sistem Manajemen Energi",
    image: "/products/satec/expertpower.webp",
    link: "/products#expertpower-(ems)",
    bg: "/bgsemua.png",
  },
  {
    id: 2,
    title: "SATEC",
    description:
      "Power Quality Analyzer multi kanal dan Power Meter untuk pemantauan kualitas daya",
    image: "/products/satec/pm17x-pro.webp",
    link: "/products#satec",
    bg: "/bgsemua.png",
  },
  {
    id: 3,
    title: "SERTEC",
    description: "Perangkat Pencegahan Petir",
    image: "/products/sertec/sertec-thumbnail.png",
    link: "/products#sertec",
    bg: "/bgsemua.png",
  },
  {
    id: 4,
    title: "Kamera PTZ SENTER",
    description: "AI Thermal Kamera Transmisi",
    image: "/products/senter/ai-power-inspection.png",
    link: "/products#senter",
    bg: "/bgsemua.png",
  },
];

export default function ServicesSection() {
  return (
    <>
      {services.map((service, index) => (
        <section
          key={service.id}
          className="py-16 bg-cover bg-center"
          style={{
            backgroundImage: `url('${service.bg}')`,
          }}
        >
          <div className="container">
            <div className="grid grid-cols-2 gap-3 md:gap-8 lg:gap-12 items-center">
              {/* Kolom Kiri: Teks & Deskripsi */}
              <div>
                <h2 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4">
                  {service.title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-100 mb-3 md:mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Bullet points - bisa disesuaikan per produk */}
                <div className="space-y-1 md:space-y-3 mb-4 md:mb-8">
                  <div className="flex items-start space-x-1 md:space-x-3">
                    <svg className="w-3 h-3 md:w-5 md:h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs sm:text-sm md:text-base text-gray-100">Pemantauan dan analitik real-time</p>
                  </div>
                  <div className="flex items-start space-x-1 md:space-x-3">
                    <svg className="w-3 h-3 md:w-5 md:h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs sm:text-sm md:text-base text-gray-100">Pengukuran dan pengendalian yang presisi</p>
                  </div>
                  <div className="flex items-start space-x-1 md:space-x-3">
                    <svg className="w-3 h-3 md:w-5 md:h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs sm:text-sm md:text-base text-gray-100">Integrasi dan skalabilitas sistem</p>
                  </div>
                </div>

                <Link
                  href={service.link}
                  className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg text-xs md:text-base font-semibold transition-all duration-200"
                >
                  Lihat Produk
                  <svg className="w-3 h-3 md:w-5 md:h-5 ml-1 md:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Kolom Kanan: Gambar Besar */}
              <div className="relative h-48 sm:h-56 md:h-80 lg:h-96 rounded-lg md:rounded-xl overflow-hidden shadow-xl md:shadow-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundPosition:
                      service.title === "Kamera PTZ SENTER" ? "60% 40%" : "center",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Tombol Lihat Semua Produk di akhir */}
      <section className="py-12 bg-gray-50">
        <div className="container text-center">
          <Link
            href="/products"
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200"
          >
            Lihat Semua Produk
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
