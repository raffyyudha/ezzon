import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export default function ProductsIndex() {
  // Custom sections order: SATEC hardware → ExpertPower (EMS) → SERTEC Marine → SENTER
  const sections = [
    {
      title: "SATEC",
      items: products.filter((p) => p.brand === "SATEC"),
    },
    {
      title: "EXPERTPOWER (EMS)",
      items: products.filter((p) => p.brand === "EMS"),
    },
    {
      title: "SERTEC",
      items: products.filter((p) => p.brand === "SERTEC Marine"),
    },
    {
      title: "SENTER",
      items: products.filter((p) => p.brand === "SENTER"),
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative py-24">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero-produk.png')" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-white mb-6">Produk</h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Daftar produk ringkas berdasarkan brand. Klik produk untuk melihat ringkasan & tautan resmi.
              </p>
            </div>
          </div>
        </section>

        {sections.map(({ title, items }) => {
          const anchorId = title.toLowerCase().replace(/\s+/g, "-");
          return (
          <section key={title} id={anchorId} className="py-16">
            <div className="container">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                {items.map((p) => {
                  const whatsappMessage = encodeURIComponent(`Halo, saya ingin membeli ${p.name}`);
                  const whatsappUrl = `https://wa.me/628174147477?text=${whatsappMessage}`;
                  
                  return (
                  <div
                    key={p.slug}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-32 sm:h-48 bg-gray-100">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                        className="object-contain p-2 sm:p-4"
                      />
                    </div>
                    <div className="p-3 sm:p-6 flex flex-col flex-grow">
                      <div className="text-xs sm:text-sm text-primary font-semibold mb-1 sm:mb-2">{p.category}</div>
                      <h3 className="text-sm sm:text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-xs sm:text-base text-gray-600 mt-1 sm:mt-2 line-clamp-2 flex-grow">{p.description}</p>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 sm:mt-4 w-full bg-[#1A7B4C] hover:bg-[#166A42] text-white font-semibold py-2 sm:py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        <span className="text-xs sm:text-base">Beli</span>
                      </a>
                    </div>
                  </div>
                )})}
              </div>
            </div>
          </section>
        );})}
      </main>
      <Footer />
    </div>
  );
}
