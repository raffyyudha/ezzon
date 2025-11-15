import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo.png";
import { getAllNews, type NewsItem } from "@/lib/newsStore";

function formatDate(value: string) {
  if (!value) return "";
  try {
    const d = new Date(value);
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

export default async function Footer() {
  const year = new Date().getFullYear();
  
  // Fetch 2 artikel terbaru
  let recentPosts: NewsItem[] = [];
  try {
    const allNews = await getAllNews();
    recentPosts = allNews.slice(0, 2);
  } catch (error) {
    console.error("Failed to load recent posts:", error);
  }

  return (
    <footer className="bg-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Left Column - Company Info */}
          <div className="md:col-span-5">
            <div className="mb-6">
              <Image
                src={logo}
                alt="PT. Anugerah Baswara Megah"
                width={200}
                height={85}
                className="object-contain"
              />
            </div>
            
            <div className="text-xs leading-relaxed text-gray-700 space-y-3">
              <p>
                PT Anugerah Baswara Megah, didirikan pada tahun 2013 di Makassar, Sulawesi Selatan, adalah perusahaan penyedia solusi manajemen energi, monitoring kelistrikan, otomasi industri, serta sistem proteksi dan keamanan berbasis teknologi tinggi. Kami membantu pelanggan meningkatkan efisiensi energi, keandalan listrik, dan keselamatan operasional melalui perangkat presisi dan analitik real-time.
              </p>
              
              <p>
                Dengan dukungan ExpertPower Energy Management System, kami menghadirkan solusi seperti submetering, power quality monitoring, kontrol beban otomatis, dan integrasi BMS/PLC/SCADA.
              </p>
              
              <p>
                Kami juga menyediakan SERTEC Sistem Pencegahan Petir untuk perlindungan infrastruktur kritis serta solusi monitoring dan keamanan berbasis teknologi tinggi.
              </p>
              
              <p>
                Melayani rumah sakit, manufaktur, minyak & gas, utilitas, dan gedung komersial, kami menawarkan layanan konsultasi, instalasi, integrasi, hingga dukungan purna jual yang andal.
              </p>
              
              <p>
                Tujuan kami: menghadirkan solusi energi & keamanan yang lebih cerdas, efisien, dan berkelanjutan.
              </p>
            </div>

            <div className="mt-6 inline-flex items-center justify-center border-2 border-gray-700 px-6 py-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">ISO</div>
                <div className="text-xs font-semibold text-gray-700">9001:2015</div>
              </div>
            </div>
          </div>

          {/* Middle Column - Quick Find */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold tracking-widest text-gray-900 mb-6">
              TAUTAN CEPAT
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">
                  Produk
                </Link>
              </li>
              <li>
                <Link href="/download" className="hover:text-primary transition-colors">
                  Download
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-primary transition-colors">
                  Artikel
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column - Recent Posts */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-bold tracking-widest text-gray-900 mb-6">
              ARTIKEL TERBARU
            </h3>
            
            {recentPosts.length > 0 ? (
              <div className="space-y-6">
                {recentPosts.map((post) => (
                  <Link key={post.id} href={`/news/${post.id}`} className="block group">
                    <div className="flex gap-4">
                      <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden bg-gray-200 rounded">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ 
                            backgroundImage: `url(${post.imageUrl || '/images/hero-berita-event.png'})` 
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed mb-2 line-clamp-3">
                          {post.summary}
                        </p>
                        <p className="text-xs text-gray-500">{formatDate(post.date)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Belum ada artikel terbaru.</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Black Bar */}
      <div className="bg-black text-white py-3">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
            <p>2025 PT ANUGERAH BASWARA MEGAH | NPWP: 81.86.496.5-805.00 | ABM® Seluruh Hak Cipta Dilindungi</p>
            <p className="flex items-center gap-2">
              <Link href="/privacy" className="hover:underline">Kebijakan Privasi</Link>
              <span>|</span>
              <Link href="/terms" className="hover:underline">Syarat & Ketentuan</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/628174147477"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#1A7B4C] hover:bg-[#166A42] text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
      </a>
    </footer>
  );
}
