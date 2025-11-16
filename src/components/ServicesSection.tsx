import Link from "next/link";
import expertLogo from "@/file baru/expertlogo.png";
import expertProduct from "@/file baru/expertpowerproduk.png";
import satecLogo from "@/file baru/satecckckckc.png";
import satecProduct from "@/file baru/satec.png";
import sertecLogo from "@/file baru/sertec logo.png";
import sertecProduct from "@/file baru/sertec produk.png";

const services = [
  {
    id: 1,
    title: "ExpertPower",
    description: "Platform Sistem Manajemen Energi",
    image: expertProduct.src,
    logo: expertLogo.src,
    link: "/products#expertpower-(ems)",
    bullets: [
      "Pemantauan dan analitik real-time",
      "Pengukuran dan pengendalian yang presisi",
      "Integrasi dan skalabilitas sistem",
    ],
    reverse: false,
  },
  {
    id: 2,
    title: "SATEC",
    description:
      "Multi Channel Energy Meter dan Power Quality Analyzer",
    image: satecProduct.src,
    logo: satecLogo.src,
    link: "/products#satec",
    bullets: [
      "Analisa dan pengukuran kualitas daya akurasi tinggi",
      "Pemantauan dan pengendalian sistem kelistrikan",
      "Peringatan dan pemeliharaan sistem kelistrikan",
    ],
    reverse: true,
  },
  {
    id: 3,
    title: "SERTEC",
    description: "Sistem Pencegahan Formasi Petir",
    image: sertecProduct.src,
    logo: sertecLogo.src,
    link: "/products#sertec",
    bullets: [
      "Sistem pencegahan petir",
      "De-ionisasi teknologi",
      "Penangkal petir modern",
    ],
    reverse: true,
  },
];

export default function ServicesSection() {
  return (
    <>
      {services.map((service) => (
        <section
          key={service.id}
          className="py-16 bg-cover bg-center"
          style={{
            backgroundImage: "url('/bghitam.jpg')",
          }}
        >
          <div className="container">
            <div className="max-w-5xl mx-auto grid grid-cols-2 gap-6 md:gap-10 lg:gap-12 items-center">
              {/* Kolom Kiri: Teks & Deskripsi */}
              <div
                className={`${service.reverse ? "order-2" : "order-1"}`}
              >
                {/* Logo + title handling per service */}
                {service.id === 2 && (
                  <div className="mb-2 md:mb-3 inline-flex items-center">
                    <img
                      src={service.logo}
                      alt={service.title}
                      loading="lazy"
                      className="h-8 sm:h-10 md:h-12 lg:h-14 object-contain"
                    />
                  </div>
                )}
                {service.id === 3 && service.logo && (
                  <div className="mt-8 md:mt-12 mb-0">
                    <img
                      src={service.logo}
                      alt={service.title}
                      loading="lazy"
                      className="h-14 sm:h-16 md:h-20 lg:h-24 object-contain"
                    />
                  </div>
                )}
                {service.id === 1 && service.logo && (
                  <div className="mb-3 md:mb-4">
                    <img
                      src={service.logo}
                      alt={service.title}
                      loading="lazy"
                      className="h-14 md:h-20 object-contain"
                    />
                  </div>
                )}
                {service.id === 1 && (
                  <h2 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4">
                    {service.title}
                  </h2>
                )}

                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-100 mb-3 md:mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Bullet points */}
                <div className="space-y-1 md:space-y-3 mb-4 md:mb-8">
                  {service.bullets.map((bullet: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-1 md:space-x-3"
                    >
                      <svg className="w-3 h-3 md:w-5 md:h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xs sm:text-sm md:text-base text-gray-100">{bullet}</p>
                    </div>
                  ))}
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
              <div
                className={`flex justify-center ${
                  service.reverse ? "order-1 md:justify-start" : "order-2 md:justify-end"
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className={
                    service.id === 1
                      ? "w-full max-w-[280px] md:max-w-lg object-contain"
                      : "w-full max-w-[230px] md:max-w-md lg:max-w-lg object-contain"
                  }
                />
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
