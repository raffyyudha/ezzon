import Image from "next/image";

const logos: string[] = [
  "/partners/1.jpg",
  "/partners/2.jpg",
  "/partners/3.jpg",
  "/partners/4.jpg",
  "/partners/5.jpg",
  "/partners/6.jpg",
  "/partners/7.jpg",
  "/partners/8.jpg",
  "/partners/9.jpg",
  "/partners/10.jpg",
  "/partners/11.jpg",
  "/partners/12.jpg",
  "/partners/13.jpg",
  "/partners/14.jpg",
  "/partners/15.jpg",
  "/partners/16.jpg",
  "/partners/17.jpg",
  "/partners/18.jpg",
  "/partners/19.jpg",
  "/partners/20.jpg",
  "/partners/21.jpg",
  "/partners/22.jpg",
  "/partners/23.jpg",
  "/partners/24.jpg",
  "/partners/25.jpg",
  "/partners/26.jpg",
  "/partners/27.jpg",
  "/partners/28.jpg",
  "/partners/ANGKASA-PURA-2.jpg",
  "/partners/AWAL-BROS.jpg",
  "/partners/BPFK.jpg",
  "/partners/Durasol.png",
  "/partners/Logo-Flisom.png",
  "/partners/Logo-HIOKI.png",
  "/partners/Logo-Satec.png",
  "/partners/Logo-Sertec.png",
  "/partners/PELINDO-IV.jpg",
  "/partners/PLN.jpg",
  "/partners/Pertamina.jpg",
  "/partners/RSWS.jpg",
  "/partners/Sarullah-Logo.png",
  "/partners/sentuh.png",
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
