import utilitiesImage from "@/images/utilities.webp";
import renewableImage from "@/images/renewable.webp";
import komersialImage from "@/images/komersial.webp";

const features = [
  {
    title: "Commercial",
    description:
      "Solusi EMS untuk gedung komersial seperti pusat perbelanjaan, perkantoran, dan hotel.",
    image: komersialImage.src,
  },
  {
    title: "Industrial",
    description:
      "Monitoring energi presisi untuk fasilitas industri dengan beban tinggi dan proses kritikal.",
    image: "/industrial.webp",
  },
  {
    title: "Renewables & Generation",
    description:
      "Optimasi performa pembangkit dan integrasi energi terbarukan dalam satu platform.",
    image: renewableImage.src,
  },
  {
    title: "Public Facilities",
    description:
      "Pengelolaan energi untuk fasilitas publik seperti rumah sakit, kampus, dan gedung pemerintahan.",
    image: "/public facilities.webp",
  },
  {
    title: "Utilities",
    description:
      "Visibilitas menyeluruh untuk jaringan distribusi dan transmisi perusahaan utilitas.",
    image: utilitiesImage.src,
  },
  {
    title: "Data Centers",
    description:
      "Kontrol dan pemantauan energi yang andal untuk pusat data dengan SLA ketat.",
    image: "/data center.webp",
  },
];

export default function FeaturesSection() {
  return (
    <section
      className="py-20 relative"
      style={{
        backgroundImage: "url('/mengapamemilihkamibg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative container">
        <div className="text-center mb-16 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Mengapa Memilih EMS Kami?
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-100">
            ExpertPower Cloud Energy Management Systems menghadirkan Monitoring Energi
            Presisi, Analisa Kualitas Daya, Tarif TOU/Pola Tarif PLN, serta Kontrol
            Otomatis untuk Meningkatkan Efisiensi dan Keandalan Listrik.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-40 md:h-56 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('${feature.image}')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                {feature.description && (
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
