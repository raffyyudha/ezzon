import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import logo from "@/images/logo.png";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-16">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero-tentang-kami.png')" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Tentang Kami
              </h1>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-12 bg-white">
          <div className="container max-w-4xl">
            {/* Diagram Section */}
            <div className="relative mb-12">
              {/* Center Logo */}
              <div className="flex justify-center mb-8">
                <div className="relative w-64 h-auto">
                  <Image
                    src={logo}
                    alt="ABM Logo"
                    width={300}
                    height={150}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Circular Diagram */}
              <div className="relative flex justify-center items-center min-h-[400px]">
                {/* Top Circle - Yellow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-center px-6">
                    <p className="text-sm font-semibold text-gray-800 leading-tight">
                      Inspection,<br/>
                      Analysis, Power<br/>
                      Quality and<br/>
                      Billing Solution
                    </p>
                  </div>
                </div>

                {/* Bottom Left Circle - Green (Brand) */}
                <div className="absolute bottom-0 left-8 w-40 h-40 bg-[#1A7B4C] rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-center px-4">
                    <p className="text-sm font-bold text-white uppercase leading-tight">
                      Energy<br/>
                      Rental
                    </p>
                  </div>
                </div>

                {/* Bottom Right Circle - Red (Brand) */}
                <div className="absolute bottom-0 right-8 w-40 h-40 bg-[#FC0002] rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-center px-4">
                    <p className="text-sm font-bold text-white uppercase leading-tight">
                      Lightning<br/>
                      Solution
                    </p>
                  </div>
                </div>

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
                  {/* Yellow to Green line */}
                  <line x1="50%" y1="25%" x2="25%" y2="75%" stroke="#1A7B4C" strokeWidth="8" />
                  {/* Green to Red line */}
                  <line x1="25%" y1="75%" x2="75%" y2="75%" stroke="#1A7B4C" strokeWidth="8" />
                  {/* Red to Yellow line */}
                  <line x1="75%" y1="75%" x2="50%" y2="25%" stroke="#FC0002" strokeWidth="8" />
                </svg>
              </div>
            </div>

            {/* Text Content */}
            <div className="prose max-w-none">
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                <strong>PT. Anugerah Baswara Megah</strong> didirikan pada tahun <strong className="text-[#FC0002]">2013</strong> di kota <strong className="text-[#FC0002]">Makassar</strong> provinsi <strong className="text-[#FC0002]">Sulawesi Selatan</strong>.
              </p>

              <p className="text-base text-gray-700 leading-relaxed mb-6">
                Kami adalah mitra solusi dari <strong className="text-[#FC0002]">Perusahaan Multinasional</strong> (SATEC, SERTEC) untuk <strong>Inspeksi, Analisis, Kualitas Daya dan Solusi Billing, Rental Energi</strong> dan <strong>Solusi Proteksi Petir</strong>.
              </p>

              {/* Download Profile Button */}
              <div className="flex justify-center">
                <a
                  href="/images/sertec/Profile-Baswara.pdf"
                  download="Profile-Baswara.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Profile Company
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">12+</div>
                <div className="text-gray-600">Tahun Pengalaman</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-gray-600">Proyek Terselesaikan</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-gray-600">Kepuasan Pelanggan</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">Lifetime</div>
                <div className="text-gray-600">Cakupan Garansi</div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nilai Inti Kami
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Prinsip yang memandu setiap langkah kami
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Kualitas Layanan</h3>
                <p className="text-gray-600">
                  Kami berkomitmen pada kualitas hasil dan standar layanan yang konsisten.
                </p>
              </div>

              <div className="text-center p-8">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Hubungan Pelanggan</h3>
                <p className="text-gray-600">
                  Kemitraan jangka panjang yang dibangun melalui kepercayaan dan transparansi.
                </p>
              </div>

              <div className="text-center p-8">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Layanan Andal</h3>
                <p className="text-gray-600">
                  Layanan tepat waktu, sesuai anggaran, dan didukung tim yang berpengalaman.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
