import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Solution = {
  id: string;
  title: string;
  paragraphs: string[];
  image: string;
};

const solutions: Solution[] = [
  {
    id: "billing-pq",
    title: "Billing, Revenue (TOU) dan Monitoring Kualitas Daya",
    image: "/images/solutions/billing-monitoring.jpg",
    paragraphs: [
      "Solusi pengukuran billing dan revenue mencakup banyak kWh meter, berbagai platform komunikasi, serta perangkat lunak manajemen yang terintegrasi.",
      "Penagihan sub-tenant umum digunakan di berbagai fasilitas seperti apartemen, asrama mahasiswa, pusat perbelanjaan, dan data center. Sistem ini menyediakan kontrol penuh, pengukuran energi Time of Use (TOU), serta pengelolaan tagihan dan invoice.",
      "Analisis kualitas daya sangat bermanfaat bagi utilitas listrik karena memungkinkan pemantauan kontinu, deteksi dini penyimpangan, analisis akar masalah, dan tindakan korektif tepat waktu yang meningkatkan keandalan jaringan secara keseluruhan.",
    ],
  },
  {
    id: "ess",
    title: "Sistem Penyimpanan Energi (ESS)",
    image: "/images/solutions/energy-storage.jpg",
    paragraphs: [
      "Sistem penyimpanan energi berbasis baterai (BESS) untuk manajemen beban puncak (peak shaving), cadangan daya (backup), integrasi energi terbarukan, dan optimasi biaya energi.",
      "Terintegrasi dengan BMS, PCS/solar inverter, serta EMS untuk kontrol cerdas. Mendukung mode operasi seperti arbitrase energi, time-shifting, dan frequency response.",
      "Pemantauan real-time dan pelaporan performa memastikan visibilitas status baterai, efisiensi, dan kesehatan sistem (SoC/SoH).",
    ],
  },
  {
    id: "rental",
    title: "Rental Energi",
    image: "/images/solutions/energy-rental.jpg",
    paragraphs: [
      "Layanan sewa solusi energi untuk kebutuhan sementara atau proyek pilot—mulai dari meter/panel monitoring hingga genset atau ESS mobile.",
      "Masa sewa fleksibel dengan paket instalasi, operasi, dan pemeliharaan. Cocok untuk event, lokasi konstruksi, dan uji coba sistem tanpa investasi awal yang besar.",
    ],
  },
  {
    id: "lightning",
    title: "Solusi Proteksi Petir",
    image: "/images/solutions/lightning-protection.jpg",
    paragraphs: [
      "Solusi proteksi petir menggunakan teknologi SERTEC CMCE untuk menurunkan gradien medan listrik dan meminimalkan risiko sambaran langsung.",
      "Aplikasi luas pada bangunan industri, fasilitas komersial, area pelabuhan, dan lingkungan maritim. Tersedia varian CMCE (Gold/Platinum/Diamond) sesuai skala proteksi.",
      "Didukung kajian teknis, instalasi sesuai standar, dan dokumentasi sertifikasi yang relevan.",
    ],
  },
];

export default function SolutionsPage() {

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-16">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero-solusi.png')" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Solusi
              </h1>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-white">
          <div className="container max-w-4xl">
            <div className="space-y-8">
              {solutions.map((solution) => (
                <div key={solution.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  {/* Image */}
                  <div className="relative h-64 bg-gray-100">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${solution.image})`,
                      }}
                    />
                    {/* Overlay with title */}
                    <div className="absolute bottom-0 left-0 right-0 bg-primary text-white p-4">
                      <h3 className="text-lg font-semibold">
                        {solution.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      {solution.paragraphs.map((paragraph, index) => (
                        <p key={index} className="text-sm">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
