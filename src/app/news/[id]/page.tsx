import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getNewsById } from "@/lib/newsStore";

export const revalidate = 0;

function formatDate(value: string | null | undefined) {
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

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await getNewsById(id);

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-16">
          <div className="container max-w-3xl">
            <h1 className="text-2xl font-bold mb-2">Berita tidak ditemukan</h1>
            <p className="text-gray-600">Berita yang Anda cari tidak tersedia atau telah dihapus.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const dateLabel = formatDate(news.date);

  // Pecah ringkasan berdasarkan baris supaya lebih enak dibaca
  const paragraphs = news.summary
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Header artikel */}
        <section className="py-10 border-b bg-white">
          <div className="container max-w-4xl">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide">
              Berita &amp; Event
            </p>
            <p className="text-sm text-gray-500 mt-1">{dateLabel}</p>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {news.title}
            </h1>
            {news.url && (
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-md mt-4"
              >
                Buka Artikel Eksternal
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            )}
          </div>
        </section>

        {/* Konten artikel */}
        <section className="py-10">
          <div className="container max-w-4xl">
            {news.imageUrl && news.imageUrl.trim() !== "" && (
              <div className="mb-8 rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            )}

            <article className="prose max-w-none text-gray-800">
              {paragraphs.length === 0 ? (
                <p>{news.summary}</p>
              ) : (
                paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
              )}
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
