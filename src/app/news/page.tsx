import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllNews } from "@/lib/newsStore";
import type { NewsItem } from "@/lib/newsStore";
import Link from "next/link";

export const revalidate = 0;

function formatDate(value: string) {
  if (!value) return "";
  try {
    const d = new Date(value);
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

function getImageUrl(item: NewsItem) {
  return item.imageUrl && item.imageUrl.trim() !== ""
    ? item.imageUrl
    : "/images/hero-berita-event.png";
}

export default async function NewsPage() {
  const items = await getAllNews();

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-16">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero-berita-event.png')" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">Berita &amp; Event</h1>
              <p className="text-white/80 max-w-2xl mx-auto">
                Kumpulan berita dan event resmi PT. Anugerah Baswara Megah.
              </p>
            </div>
          </div>
        </section>

        {/* News list or empty state */}
        <section className="py-12 bg-white">
          <div className="container max-w-6xl">
            {items.length === 0 ? (
              <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-100 p-8 text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  Belum ada Berita &amp; Event
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Konten Berita &amp; Event akan segera kami tampilkan di sini. Untuk informasi
                  terbaru, silakan hubungi kami melalui halaman Kontak.
                </p>
              </div>
            ) : (
              <>
                {/* Featured article */}
                {(() => {
                  const [featured, ...others] = items as NewsItem[];

                  const featuredArticle = (
                    <article className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                      <div className="relative h-64 sm:h-80 lg:h-full">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${getImageUrl(featured)})` }}
                        />
                        <div className="absolute inset-0 bg-black/30" />
                      </div>

                        <div className="p-6 sm:p-8 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-primary/90 text-white">
                                Berita Utama
                              </span>
                              <p className="text-xs text-gray-500">
                                {formatDate(featured.date)}
                              </p>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                              {featured.title}
                            </h2>
                            <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-6">
                              {featured.summary}
                            </p>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            Klik kartu ini untuk membaca berita lengkap.
                          </div>
                        </div>
                      </article>
                  );

                  return (
                    <>
                      <Link href={`/news/${featured.id}`} className="block group cursor-pointer">
                        {featuredArticle}
                      </Link>

                      {/* Other articles */}
                      {others.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {others.map((item) => {
                            const card = (
                              <article className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col group-hover:shadow-lg transition-shadow">
                                {item.imageUrl && (
                                  <div className="relative h-40 bg-gray-100">
                                    <div
                                      className="absolute inset-0 bg-cover bg-center"
                                      style={{ backgroundImage: `url(${getImageUrl(item)})` }}
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
                                  </div>
                                )}

                                <div className="px-5 pt-5 pb-4 flex flex-col flex-grow">
                                  <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                                    {formatDate(item.date)}
                                  </p>
                                  <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
                                    {item.title}
                                  </h3>
                                  <p className="text-sm text-gray-700 leading-relaxed mb-3 line-clamp-3 flex-grow">
                                    {item.summary}
                                  </p>
                                </div>
                              </article>
                            );

                            return (
                              <Link
                                key={item.id}
                                href={`/news/${item.id}`}
                                className="block group cursor-pointer"
                              >
                                {card}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </>
                  );
                })()}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
