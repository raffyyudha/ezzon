import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export default function ProductsIndex() {
  // Custom sections order: SATEC hardware → ExpertPower (EMS) → SERTEC → SERTEC Marine
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
      items: products.filter((p) => p.brand === "SERTEC"),
    },
    {
      title: "SERTEC MARINE",
      items: products.filter((p) => p.brand === "SERTEC Marine"),
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
          {/* Header background image for all screen sizes */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/headerproduk.webp')" }}
          />
          <div className="container relative flex items-center justify-center">
            {/* Spacer for hero height */}
            <div className="h-40 sm:h-56 md:h-72 lg:h-80" />
          </div>
        </section>

        {sections.map(({ title, items }) => {
          const anchorId = title.toLowerCase().replace(/\s+/g, "-");
          return (
          <section
            key={title}
            id={anchorId}
            className="py-16 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/productwhole.webp')",
            }}
          >
            <div className="container">
              <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                {items.map((p) => {
                  return (
                  <div
                    key={p.slug}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div
                      className="relative h-32 sm:h-48"
                      style={{
                        backgroundImage: "url('/productbg.webp')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                        className="object-contain p-2 sm:p-4"
                      />
                    </div>
                    <div className="p-3 sm:p-6 flex flex-col flex-grow">
                      <div className="text-xs sm:text-sm text-black font-semibold mb-1 sm:mb-2">{p.category}</div>
                      <h3 className="text-sm sm:text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-xs sm:text-base text-gray-600 mt-1 sm:mt-2 line-clamp-2 flex-grow">{p.description}</p>
                      <Link
                        href={`/products/${p.slug}`}
                        className="mt-3 sm:mt-4 w-full bg-black hover:bg-black/80 text-white font-semibold py-2 sm:py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <span className="text-xs sm:text-base">Detail</span>
                      </Link>
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
