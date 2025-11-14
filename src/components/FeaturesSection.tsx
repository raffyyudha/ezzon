const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
      </svg>
    ),
    title: "Pemantauan Real-time",
    description: "Pantau konsumsi dan kualitas energi secara langsung untuk keputusan cepat dan akurat."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V7a4 4 0 118 0v4M5 13l4 4L19 7" />
      </svg>
    ),
    title: "Analitik & Laporan",
    description: "Dashboard, pelaporan kepatuhan, dan analitik untuk efisiensi operasional (SATEC ExpertPower)."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Integrasi Perangkat",
    description: "Terintegrasi dengan perangkat SERTEC dan kamera PTZ SENTER untuk monitoring & proteksi."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
      </svg>
    ),
    title: "Skalabel & Fleksibel",
    description: "Cocok untuk gedung komersial, industri, dan utilitas—dari pilot hingga enterprise."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.657 1.343-3 3-3h3m-6 6c0 1.657-1.343 3-3 3H6" />
      </svg>
    ),
    title: "Dukungan Lokal",
    description: "Tim siap membantu implementasi, pelatihan, dan after-sales service."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3 1.343 3 3v4H9v-4c0-1.657 1.343-3 3-3z" />
      </svg>
    ),
    title: "Keamanan Data",
    description: "Standar keamanan tinggi untuk melindungi data operasional dan kepatuhan Anda."
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mengapa Memilih EMS Kami?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Solusi terpadu berbasis SATEC ExpertPower untuk meningkatkan efisiensi energi,
            mengurangi biaya, dan meningkatkan keandalan operasional.
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 -mx-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-lg hover:shadow-lg transition-all duration-300 group bg-white min-w-[280px] snap-start"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
