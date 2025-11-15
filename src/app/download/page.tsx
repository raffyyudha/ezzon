import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBrochureGroups } from "@/lib/brochures";

export default function DownloadPage() {
  const allGroups = getBrochureGroups();
  // Sembunyikan group "Lainnya" dan brosur Senter seperti permintaan
  const groups = allGroups.filter(
    (g) =>
      g.brand !== "Lainnya" &&
      !g.brand.toLowerCase().includes("senter"),
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <div className="container py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Download Brosur</h1>
          <p className="text-gray-600 max-w-2xl mb-10">
            Unduh katalog produk dan brosur resmi dalam format PDF. Pilih brand di bawah ini untuk melihat daftar dokumen yang tersedia.
          </p>

          {groups.length === 0 && (
            <p className="text-gray-500 text-sm">
              Belum ada brosur yang tersedia. Tambahkan file PDF ke folder <code>public/brosur</code> untuk menampilkannya di halaman ini.
            </p>
          )}

          <div className="space-y-6 md:space-y-8">
            {groups.map((group) => (
              <section key={group.brand}>
                <details className="group border border-gray-200 rounded-lg bg-white">
                  <summary className="flex cursor-pointer items-center justify-between px-4 sm:px-6 py-3 sm:py-4 select-none">
                    <span className="text-sm md:text-base font-semibold text-gray-900 tracking-wide">
                      {group.brand}
                    </span>
                    <span className="ml-4 text-gray-400 text-xl leading-none transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="border-t border-gray-100">
                    {group.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base text-gray-900 hover:bg-gray-50 border-t border-gray-100 first:border-t-0"
                      >
                        <span className="truncate">{item.name}</span>
                        <span className="ml-4 text-gray-300 text-base leading-none">PDF</span>
                      </a>
                    ))}
                  </div>
                </details>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
