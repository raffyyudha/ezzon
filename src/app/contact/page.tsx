import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default async function ContactPage() {

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-black py-10 sm:py-12 md:py-14">
          <div className="container flex items-center justify-center">
            <img
              src="/kontakk.png"
              alt="Hubungi Kami"
              loading="lazy"
              className="w-full max-w-4xl h-auto object-contain"
            />
          </div>
        </section>

        {/* Contact Information & Form */}
        <section
          className="relative py-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('/contact us 2.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="container relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">
                  Informasi Kontak
                </h2>

                <div className="space-y-8">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Kunjungi Kantor Kami</h3>
                      <p className="text-gray-100 leading-relaxed">
                        <strong>Kantor Pusat</strong><br />
                        Paccerakang Raya No. 150A, Biringkanaya<br />
                        Makassar 90241, Sulawesi Selatan
                        <br />
                        <br />
                        <strong>Kantor Cabang</strong><br />
                        Jl. Gajah Mada No.27A, RT.5/RW.7<br />
                        Krukut, Taman Sari, Jakarta Barat 11140
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Telepon</h3>
                      <a href="tel:+628174147477" className="text-primary hover:text-primary/80 transition-colors text-lg font-medium block">
                        +62 817 4147 477
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1A7B4C]/10 text-[#1A7B4C] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">WhatsApp</h3>
                      <a
                        href="https://wa.me/628174147477"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1A7B4C] hover:text-[#166A42] transition-colors text-lg font-medium block"
                      >
                        +62 817 4147 477
                      </a>
                      <p className="text-gray-100 text-sm mt-1">Respon cepat melalui WhatsApp</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Email</h3>
                      <a href="mailto:sales@baswarasolution.com" className="text-primary hover:text-primary/80 transition-colors text-lg font-medium block">
                        sales@baswarasolution.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 text-lg">Jam Operasional</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Senin - Jumat</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Sabtu</span>
                      <span>9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Minggu</span>
                      <span className="text-gray-500">Dengan janji temu</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Map or Additional Info */}
        <section
          className="relative py-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('/contact us 4.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="container relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Mengapa Memilih PT. Anugerah Baswara Megah?
              </h2>
              <p className="text-lg text-gray-100 max-w-3xl mx-auto">
                Lebih dari satu dekade memberikan solusi manajemen energi yang terpercaya.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2 text-white">Pemantauan Real-time</h3>
                <p className="text-gray-100 text-sm">Memantau konsumsi dan kualitas energi secara real-time dengan presisi.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2 text-white">Analitik & Pelaporan</h3>
                <p className="text-gray-100 text-sm">Dashboard dan laporan komprehensif yang didukung oleh SATEC ExpertPower.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2 text-white">Integrasi Perangkat</h3>
                <p className="text-gray-100 text-sm">Terintegrasi secara mulus dengan sistem kamera PTZ SERTEC dan SENTER.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2 text-white">Dukungan Ahli</h3>
                <p className="text-gray-100 text-sm">Layanan implementasi, pelatihan, dan dukungan purna jual yang komprehensif.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
