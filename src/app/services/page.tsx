import Header from "@/components/Header";
import Footer from "@/components/Footer";

const services = [
  {
    id: "expertpower",
    title: "SATEC ExpertPower (EMS)",
    description: "Platform Energy Management Systems untuk pemantauan real-time, pelaporan kepatuhan, dan analitik energi.",
    image: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Dashboard energi & KPI",
      "Alarm, event, dan notifikasi",
      "Pelaporan otomatis & ekspor data",
      "Analitik beban dan kualitas daya",
      "Multi-site & multi-user management"
    ]
  },
  {
    id: "sertec",
    title: "SERTEC Solutions",
    description: "Perangkat proteksi, automasi, dan monitoring jaringan termasuk solusi kelautan untuk lingkungan berat.",
    image: "https://images.unsplash.com/photo-1581091014534-8987c1d647c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Proteksi & automasi",
      "Monitoring kondisi peralatan",
      "Integrasi SCADA/EMS",
      "Komunikasi industri",
      "Kelas kelautan"
    ]
  },
  {
    id: "senter-ptz",
    title: "Kamera PTZ SENTER",
    description: "Sistem kamera PTZ untuk inspeksi jalur transmisi dan pemantauan area kritikal dari jarak jauh.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Zoom optik & stabilisasi",
      "Deteksi cuaca & kondisi lingkungan",
      "Streaming low-latency",
      "Integrasi ke platform EMS/SCADA",
      "Perekaman & arsip"
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Produk Kami
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Fokus pada SATEC ExpertPower (EMS) sebagai platform utama,
                didukung perangkat SERTEC dan kamera PTZ SENTER untuk monitoring dan inspeksi.
              </p>
            </div>
          </div>
        </section>

        {/* Services Details */}
        <section className="py-20">
          <div className="container">
            <div className="space-y-24">
              {services.map((service, index) => (
                <div key={service.id} id={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                      {service.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="/contact"
                      className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center"
                    >
                      Dapatkan Penawaran
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

        {/* Additional / Integration */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Integrasi & Layanan
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Solusi pendukung untuk implementasi EMS yang andal dan efektif
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 id="integration" className="text-xl font-semibold mb-4">Integrasi SERTEC</h3>
                <p className="text-gray-600">Proteksi, automasi, dan monitoring yang terhubung dengan platform EMS Anda.</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 id="ptz" className="text-xl font-semibold mb-4">Kamera PTZ SENTER</h3>
                <p className="text-gray-600">Inspeksi visual jalur transmisi dan area kritikal dengan zoom optik & stabilisasi.</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 id="implementation" className="text-xl font-semibold mb-4">Implementasi & Pelatihan</h3>
                <p className="text-gray-600">Penerapan EMS end-to-end, pelatihan pengguna, dan dukungan purnajual.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Produk SATEC */}
        <section id="satec-products" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Produk SATEC</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Kategori produk dari SATEC. Tautan mengarah ke situs resmi.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div id="satec-meters">
                <h3 className="text-2xl font-semibold mb-4">Meters & Analyzers</h3>
                <ul className="list-disc pl-6 space-y-2 text-primary">
                  <li><a href="https://www.satec-global.com/products/em132/" target="_blank" rel="noopener noreferrer">EM132 Smart Transducer</a></li>
                  <li><a href="https://www.satec-global.com/products/em133-power-meter/" target="_blank" rel="noopener noreferrer">EM133 Energy & Power Meter</a></li>
                  <li><a href="https://www.satec-global.com/products/pm130-plus/" target="_blank" rel="noopener noreferrer">PM130 PLUS LED Panel Meter</a></li>
                  <li><a href="https://www.satec-global.com/products/pm135/" target="_blank" rel="noopener noreferrer">PM135 LCD Panel Meter</a></li>
                  <li><a href="https://www.satec-global.com/products/pm172/" target="_blank" rel="noopener noreferrer">PM172 High Accuracy Power Meter</a></li>
                  <li><a href="https://www.satec-global.com/products/pm174/" target="_blank" rel="noopener noreferrer">PM174 IEEE 1159 Power Quality Analyzer</a></li>
                  <li><a href="https://www.satec-global.com/products/pm175/" target="_blank" rel="noopener noreferrer">PM175 EN50160 Power Quality Analyzer</a></li>
                  <li><a href="https://www.satec-global.com/products/em720/" target="_blank" rel="noopener noreferrer">EM720 Revenue Meter & PQ Analyzer</a></li>
                  <li><a href="https://www.satec-global.com/products/em920/" target="_blank" rel="noopener noreferrer">EM920 Revenue Meter & PQ Analyzer</a></li>
                  <li><a href="https://www.satec-global.com/products/bfm136/" target="_blank" rel="noopener noreferrer">BFM136 Multi-Circuit Energy Meter</a></li>
                  <li><a href="https://www.satec-global.com/products/bfm-ii/" target="_blank" rel="noopener noreferrer">BFM-II Multi-circuit Power Meter</a></li>
                  <li><a href="https://www.satec-global.com/products/bfm-dfr/" target="_blank" rel="noopener noreferrer">BFM-DFR Multi-Circuit Fault Recorder</a></li>
                  <li><a href="https://www.satec-global.com/products/pro-series-power-meter/" target="_blank" rel="noopener noreferrer">PRO Series NextGen Analyzer</a></li>
                  <li><a href="https://www.satec-global.com/products/17x_pro/" target="_blank" rel="noopener noreferrer">PM17x PRO NextGen Analyzer</a></li>
                  <li><a href="https://www.satec-global.com/products/pm180/" target="_blank" rel="noopener noreferrer">PM180 All-in-One PQ Analyzer</a></li>
                  <li><a href="https://www.satec-global.com/products/pmu-pro/" target="_blank" rel="noopener noreferrer">PMU PRO Phasor Measurement Unit</a></li>
                  <li><a href="https://www.satec-global.com/products/edl180/" target="_blank" rel="noopener noreferrer">EDL180 Portable Power Quality Analyzer</a></li>
                </ul>
              </div>

              <div className="space-y-10">
                <div id="satec-software">
                  <h3 className="text-2xl font-semibold mb-4">Software</h3>
                  <ul className="list-disc pl-6 space-y-2 text-primary">
                    <li><a href="https://www.satec-global.com/products/pas/" target="_blank" rel="noopener noreferrer">PAS Power Analysis Software</a></li>
                    <li><a href="https://www.satec-global.com/products/expertpower/" target="_blank" rel="noopener noreferrer">ExpertPower (Energy Management System)</a></li>
                  </ul>
                </div>

                <div id="satec-sensors">
                  <h3 className="text-2xl font-semibold mb-4">Current Sensors</h3>
                  <ul className="list-disc pl-6 space-y-2 text-primary">
                    <li><a href="https://www.satec-global.com/products/hacs/" target="_blank" rel="noopener noreferrer">HACS High Accuracy Current Sensors</a></li>
                  </ul>
                </div>

                <div id="satec-accessories">
                  <h3 className="text-2xl font-semibold mb-4">Accessories</h3>
                  <ul className="list-disc pl-6 space-y-2 text-primary">
                    <li><a href="https://www.satec-global.com/products/etc-i/" target="_blank" rel="noopener noreferrer">ETC One Plus Communication Gateway</a></li>
                    <li><a href="https://www.satec-global.com/products/etc-ii/" target="_blank" rel="noopener noreferrer">ETC-II Gateway and Data-logger</a></li>
                    <li><a href="https://www.satec-global.com/products/rgm180/" target="_blank" rel="noopener noreferrer">RGM180 Graphic Touch Screen</a></li>
                    <li><a href="https://www.satec-global.com/products/vrm/" target="_blank" rel="noopener noreferrer">VRM Voltage Ratio Module</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Produk SERTEC (CMCE & Lainnya) */}
        <section id="sertec-products" className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Produk SERTEC</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                CMCE Lightning Protection & produk pendukung. Tautan mengarah ke situs resmi.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div id="sertec-cmce">
                <h3 className="text-2xl font-semibold mb-4">CMCE Models</h3>
                <ul className="list-disc pl-6 space-y-2 text-primary">
                  <li><a href="https://sertec.com.py/wp-content/uploads/2024/10/BROCHURE-2024-CMCE-A4-ESP.pdf" target="_blank" rel="noopener noreferrer">CMCE 25</a></li>
                  <li><a href="https://sertec.com.py/wp-content/uploads/2024/10/BROCHURE-2024-CMCE-A4-ESP.pdf" target="_blank" rel="noopener noreferrer">CMCE 55</a></li>
                  <li><a href="https://sertec.com.py/wp-content/uploads/2024/10/BROCHURE-2024-CMCE-A4-ESP.pdf" target="_blank" rel="noopener noreferrer">CMCE 120</a></li>
                  <li><a href="https://sertec.com.py/wp-content/uploads/2024/10/BROCHURE-2024-CMCE-A4-ESP.pdf" target="_blank" rel="noopener noreferrer">CMCE AT 120</a></li>
                  <li><a href="https://sertec.com.py/wp-content/uploads/2024/10/BROCHURE-2024-CMCE-A4-ESP.pdf" target="_blank" rel="noopener noreferrer">PDCE-CMCE UL</a></li>
                  <li><a href="https://sertec.com.py/wp-content/uploads/2024/10/BROCHURE-2024-CMCE-A4-ESP.pdf" target="_blank" rel="noopener noreferrer">CMCE High Vibration</a></li>
                  <li><a href="https://sertec.com.py/wp-content/uploads/2024/10/BROCHURE-2024-CMCE-A4-ESP.pdf" target="_blank" rel="noopener noreferrer">High Resistance</a></li>
                  <li><a href="https://sertec.com.py/wp-content/uploads/2024/10/BROCHURE-2024-CMCE-A4-ESP.pdf" target="_blank" rel="noopener noreferrer">CMCE Graphene</a></li>
                  <li><a href="https://sertec.com.py/wp-content/uploads/2024/10/BROCHURE-2024-CMCE-A4-ESP.pdf" target="_blank" rel="noopener noreferrer">CMCE Twin Max</a></li>
                </ul>
              </div>

              <div id="sertec-others">
                <h3 className="text-2xl font-semibold mb-4">Produk Lainnya</h3>
                <ul className="list-disc pl-6 space-y-2 text-primary">
                  <li>Storm 7 (CMCE Monitoring System)</li>
                  <li>Solar LED Beacons</li>
                  <li>Surge Arresters</li>
                  <li>Electrodes for Grounding</li>
                  <li>Gensets</li>
                  <li>Maintenance Contracts</li>
                </ul>
                <div className="mt-3 text-sm text-gray-600">Sumber: <a className="text-primary" href="https://sertec.com.py/en/" target="_blank" rel="noopener noreferrer">sertec.com.py/en</a></div>
              </div>
            </div>
          </div>
        </section>

        {/* SERTEC Marine */}
        <section id="sertec-marine" className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">SERTEC Marine</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Perlindungan petir untuk kapal: model GOLD, PLATINUM, dan DIAMOND.
              </p>
            </div>

            <ul className="list-disc pl-6 space-y-2 text-primary max-w-3xl mx-auto">
              <li><a href="https://marine.sertec.com.py/wp-content/uploads/2025/03/MARINE_Operation_principle.pdf" target="_blank" rel="noopener noreferrer">Prinsip Operasi (PDF)</a></li>
              <li><a href="https://marine.sertec.com.py/wp-content/uploads/2025/03/BROCHURE-Marine-ENG-2024.pdf" target="_blank" rel="noopener noreferrer">Brochure ENG (PDF)</a></li>
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-6">
              Siap Memulai?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Hubungi tim kami untuk konsultasi dan penawaran. Kami bantu implementasi EMS yang efisien dan andal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center justify-center"
              >
                Dapatkan Penawaran
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=6594513098"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center justify-center"
              >
                WhatsApp Kami
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
