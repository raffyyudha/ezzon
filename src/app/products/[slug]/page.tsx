import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/data/products";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return notFound();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div>
                  <div className="text-sm text-primary font-semibold mb-2">{product.brand} · {product.category}</div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                  <p className="text-lg text-gray-700 max-w-2xl">{product.description}</p>
                </div>
                <div className="relative w-full md:w-72 h-40 md:h-40 bg-white rounded-lg shadow-sm">
                  <Image src={product.image} alt={product.name} fill className="object-contain p-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container max-w-5xl">
            {product.features?.length ? (
              <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Fitur Utama</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={product.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center justify-center"
              >
                Lihat di Situs Resmi
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center justify-center"
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
