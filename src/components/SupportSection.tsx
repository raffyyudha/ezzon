import Image from "next/image";

const logos: string[] = [
  "/partners/1.webp",
  "/partners/2.webp",
  "/partners/3.webp",
  "/partners/4.webp",
  "/partners/5.webp",
  "/partners/6.webp",
  "/partners/7.webp",
  "/partners/8.webp",
  "/partners/9.webp",
  "/partners/10.webp",
  "/partners/11.webp",
  "/partners/12.webp",
  "/partners/13.webp",
  "/partners/14.webp",
  "/partners/15.webp",
  "/partners/16.webp",
  "/partners/17.webp",
  "/partners/18.webp",
  "/partners/19.webp",
  "/partners/20.webp",
  "/partners/21.webp",
  "/partners/22.webp",
  "/partners/23.webp",
  "/partners/24.webp",
  "/partners/25.webp",
  "/partners/26.webp",
  "/partners/27.webp",
  "/partners/28.webp",
  "/partners/ANGKASA-PURA-2.webp",
  "/partners/AWAL-BROS.webp",
  "/partners/BPFK.webp",
  "/partners/Durasol.webp",
  "/partners/Logo-Flisom.webp",
  "/partners/Logo-HIOKI.webp",
  "/partners/Logo-Satec.webp",
  "/partners/Logo-Sertec.webp",
  "/partners/PELINDO-IV.webp",
  "/partners/PLN.webp",
  "/partners/Pertamina.webp",
  "/partners/RSWS.webp",
  "/partners/Sarullah-Logo.webp",
  "/partners/sentuh.webp",
];

export default function SupportSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Support</h2>
          <p className="text-gray-600">Merek dan institusi yang kami dukung</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {logos.map((src, idx) => (
            <div
              key={src + idx}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative h-14 sm:h-16 md:h-20">
                <Image
                  src={src}
                  alt={`Support logo ${idx + 1}`}
                  fill
                  sizes="(min-width: 1024px) 160px, (min-width: 768px) 120px, 50vw"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
