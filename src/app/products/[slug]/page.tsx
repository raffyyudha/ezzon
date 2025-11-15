import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { getProduct, type Product } from "@/data/products";
import { notFound } from "next/navigation";

function getLongDescription(product: Product): string[] {
  if (product.brand === "SATEC" && product.category === "Meters & Analyzers") {
    return [
      `${product.name} adalah meter daya presisi dari SATEC yang dirancang untuk memberikan pengukuran energi dan parameter kelistrikan yang akurat secara terus-menerus. Perangkat ini membantu tim operasi melihat apa yang benar-benar terjadi di jaringan, bukan hanya angka kWh di akhir bulan.`,
      "Di dalam satu perangkat, Anda mendapatkan pemantauan tegangan, arus, daya aktif/reaktif, faktor daya, hingga event kualitas daya yang kritikal untuk menjaga keandalan sistem. Data dapat dicatat dan dianalisis untuk menemukan beban tidak efisien, ketidakseimbangan fasa, atau potensi gangguan sebelum menimbulkan downtime.",
      "{name} sangat cocok digunakan pada panel distribusi utama, substation, gedung komersial, hingga fasilitas industri yang membutuhkan billing internal dan pembagian biaya energi yang transparan. Integrasi dengan sistem EMS atau SCADA memudahkan engineer dan manajemen membuat keputusan berbasis data untuk penghematan energi jangka panjang.".replace("{name}", product.name),
    ];
  }

  if (product.brand === "SATEC" && product.category === "Current Sensors") {
    return [
      `${product.name} merupakan sensor arus akurasi tinggi yang dirancang khusus untuk melengkapi meter dan analyzer SATEC. Dengan karakteristik linier dan error yang sangat rendah, sensor ini memastikan data pengukuran yang masuk ke sistem benar-benar dapat dipercaya.`,
      "Penggunaan sensor arus yang tepat sangat penting dalam aplikasi billing energi, monitoring beban kritis, maupun studi kualitas daya. {name} membantu menjaga konsistensi hasil pengukuran meskipun arus beban berfluktuasi atau terjadi distorsi harmonisa di jaringan.".replace("{name}", product.name),
      "Sensor ini ideal untuk dipasang pada panel distribusi di gedung komersial, data center, pabrik, dan fasilitas utilitas yang membutuhkan kombinasi antara akurasi, keandalan, dan kemudahan instalasi.",
    ];
  }

  if (product.brand === "SATEC" && product.category === "Accessories") {
    return [
      `${product.name} adalah aksesoris pendukung yang memperluas fungsi meter dan analyzer SATEC, mulai dari komunikasi, logging data, hingga antarmuka grafis untuk operator lapangan.`,
      "Dengan menambahkan perangkat ini, sistem pemantauan energi menjadi lebih lengkap: data lebih mudah dikumpulkan, ditampilkan, dan diintegrasikan ke platform analitik atau EMS. Hal ini mengurangi pekerjaan manual dan meminimalkan kesalahan baca di lapangan.",
      "Aksesoris seperti {name} sangat berguna pada proyek retrofit maupun instalasi baru yang membutuhkan solusi terukur dan scalable seiring pertumbuhan jumlah titik ukur.".replace("{name}", product.name),
    ];
  }

  if (product.brand === "EMS") {
    return [
      `${product.name} merupakan solusi perangkat lunak yang dirancang untuk membantu perusahaan memahami, menganalisis, dan mengoptimalkan konsumsi energi di berbagai lokasi. Melalui tampilan grafis yang intuitif, pengguna dapat melihat tren beban, anomali, dan peluang penghematan dalam hitungan detik.`,
      "Perangkat lunak ini mengumpulkan data dari berbagai meter, analyzer, dan sensor di lapangan, kemudian menyajikannya dalam bentuk laporan otomatis, dashboard KPI, serta analitik yang siap dipakai oleh engineer maupun manajemen. Hal ini mempercepat proses pengambilan keputusan dan memastikan investasi peralatan listrik benar-benar menghasilkan efisiensi.",
      "{name} cocok digunakan oleh industri manufaktur, gedung komersial, utilitas, maupun perusahaan multi-site yang ingin membangun budaya manajemen energi berkelanjutan dan mematuhi regulasi terkait efisiensi energi.".replace("{name}", product.name),
    ];
  }

  if (product.brand === "SERTEC" && product.category.startsWith("Lightning Protection")) {
    return [
      `${product.name} adalah solusi proteksi petir berbasis teknologi CMCE dari SERTEC yang bekerja dengan cara menyeimbangkan medan listrik di sekitar struktur, sehingga risiko sambaran langsung dapat dikurangi secara signifikan.`,
      "Berbeda dengan penangkal petir konvensional, sistem CMCE dirancang untuk mengurangi akumulasi muatan di area yang dilindungi. Hasilnya, struktur penting seperti gardu induk, menara telekomunikasi, kilang, atau fasilitas industri memiliki perlindungan yang lebih andal terhadap kerusakan akibat petir.",
      "Perangkat {name} sangat tepat untuk proyek yang menuntut tingkat keselamatan tinggi dan downtime minimal, sekaligus ingin menjaga estetika bangunan karena desainnya yang ringkas dan modern.".replace("{name}", product.name),
    ];
  }

  if (product.brand === "SERTEC Marine") {
    return [
      `${product.name} dirancang khusus untuk kebutuhan proteksi petir di lingkungan kelautan yang ekstrem, seperti kapal pesiar, kapal niaga, kapal militer, maupun instalasi lepas pantai.`,
      "Material dan konstruksinya disesuaikan untuk menahan korosi, getaran, dan kondisi cuaca yang berat di laut, sehingga perlindungan terhadap sambaran petir tetap terjaga sepanjang umur operasi kapal.",
      "Dengan memasang {name}, operator kapal mendapatkan lapisan keamanan tambahan terhadap risiko kebakaran, kerusakan peralatan navigasi, dan gangguan sistem listrik akibat petir di tengah laut.".replace("{name}", product.name),
    ];
  }

  if (product.brand === "SERTEC" && product.category === "Monitoring") {
    return [
      `${product.name} adalah sistem monitoring yang dirancang untuk memantau kinerja dan kondisi solusi CMCE secara real-time. Data penting seperti arus drainase, suhu, dan status perangkat dapat dipantau dari jarak jauh.`,
      "Dengan adanya monitoring terpusat, tim maintenance dapat segera mendeteksi anomali dan melakukan tindakan preventif sebelum terjadi gangguan lebih besar. Hal ini menurunkan biaya perawatan dan meningkatkan keandalan keseluruhan sistem proteksi petir.",
      "{name} sangat sesuai untuk instalasi skala besar yang tersebar, seperti jaringan telekomunikasi, ladang panel surya, atau infrastruktur industri yang membutuhkan visibilitas penuh terhadap sistem proteksi petirnya.".replace("{name}", product.name),
    ];
  }

  if (product.brand === "SERTEC" && product.category === "Surge Protection") {
    return [
      `${product.name} berfungsi sebagai garis pertahanan pertama terhadap lonjakan tegangan yang berasal dari aktivitas atmosfer maupun switching di jaringan listrik.`,
      "Dengan memasang surge arrester yang tepat, peralatan sensitif seperti PLC, sistem kontrol, dan perangkat komunikasi terlindungi dari kerusakan mendadak yang dapat menyebabkan downtime mahal.",
      "{name} cocok dipasang pada panel distribusi utama, panel kontrol, maupun titik masuk utilitas untuk memastikan kualitas suplai listrik tetap dalam batas aman bagi peralatan elektronik.".replace("{name}", product.name),
    ];
  }

  if (product.brand === "SERTEC" && product.category === "Grounding") {
    return [
      `${product.name} menyediakan solusi elektroda dan material grounding yang andal untuk memastikan sistem pembumian memiliki resistansi rendah dan stabil.`,
      "Sistem grounding yang baik merupakan fondasi dari proteksi petir dan keselamatan instalasi listrik. Dengan material yang tepat, arus gangguan dan sambaran petir dapat dialirkan ke tanah secara aman tanpa merusak peralatan.",
      "Produk {name} sangat relevan untuk proyek infrastruktur, gardu induk, menara telekomunikasi, dan instalasi industri yang harus memenuhi standar keselamatan listrik dan proteksi petir internasional.".replace("{name}", product.name),
    ];
  }

  if (product.brand === "SERTEC" && product.category === "Beacons") {
    return [
      `${product.name} adalah solusi penanda visual berbasis LED tenaga surya yang dirancang untuk meningkatkan keselamatan pada bangunan tinggi, menara, atau struktur navigasi.`,
      "Dengan konsumsi energi sangat rendah dan sumber daya surya, beacon ini dapat beroperasi secara mandiri tanpa perlu penarikan kabel listrik tambahan.",
      "{name} cocok digunakan pada menara telekomunikasi, crane, pelabuhan, dan area yang membutuhkan penandaan visual yang jelas untuk keselamatan penerbangan maupun pelayaran.".replace("{name}", product.name),
    ];
  }

  if (product.brand === "SERTEC" && product.category === "Power Generation") {
    return [
      `${product.name} menawarkan solusi pembangkit listrik (genset) yang andal untuk aplikasi industri maupun komersial, mulai dari kapasitas kecil hingga besar.`,
      "Dengan konfigurasi yang fleksibel, sistem kontrol modern, dan opsi integrasi dengan panel transfer otomatis, genset ini dapat menjadi sumber daya cadangan maupun utama dengan tingkat keandalan tinggi.",
      "Produk ini sangat cocok untuk rumah sakit, data center, pabrik, dan fasilitas penting lain yang tidak boleh mengalami pemadaman listrik berkepanjangan.",
    ];
  }

  if (product.brand === "SERTEC" && product.category === "Services") {
    return [
      `${product.name} adalah layanan pemeliharaan yang dirancang untuk menjaga sistem proteksi petir, grounding, dan genset tetap bekerja optimal sepanjang waktu.`,
      "Tim teknis melakukan inspeksi berkala, pengujian, dan perbaikan yang diperlukan sehingga perusahaan tidak perlu khawatir mengenai detail teknis di lapangan.",
      "Layanan ini ideal bagi operator jaringan telekomunikasi, perusahaan energi, maupun fasilitas industri yang ingin fokus pada bisnis utama namun tetap memastikan infrastruktur kelistrikannya terawat dengan baik.",
    ];
  }

  // Fallback
  return [product.description];
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return notFound();

  const whatsappMessage = encodeURIComponent(
    `Halo, saya tertarik dengan produk ${product.name}. Mohon informasi lebih lanjut.`,
  );
  const whatsappUrl = `https://wa.me/628174147477?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        {/* Hero produk */}
        <section className="py-16 md:py-20 border-b border-white/10">
          <div className="container">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-10">
              {/* Teks */}
              <div className="flex-1">
                <div className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white/60 mb-3">
                  {product.brand} · {product.category}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {product.name}
                </h1>
                <div className="space-y-3 text-sm md:text-base lg:text-lg text-white/80 max-w-2xl leading-relaxed">
                  {getLongDescription(product).map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Gambar produk */}
              <div className="flex-1 flex justify-end">
                <div className="relative w-full max-w-xs md:max-w-sm h-40 sm:h-48 md:h-56 lg:h-64 rounded-2xl bg-black/40 border border-white/15 shadow-[0_18px_45px_rgba(0,0,0,0.7)] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 sm:p-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fitur & CTA */}
        <section className="py-12 md:py-16">
          <div className="container max-w-5xl">
            {product.features?.length ? (
              <div className="mb-10">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white">Fitur Utama</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <svg
                        className="w-5 h-5 text-white flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm md:text-base text-white/80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#1A7B4C] hover:bg-[#166A42] text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>Beli via WhatsApp</span>
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto border border-white/60 text-white hover:bg-white hover:text-black px-6 py-3 rounded-lg font-semibold inline-flex items-center justify-center"
              >
                Dapatkan Penawaran
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
