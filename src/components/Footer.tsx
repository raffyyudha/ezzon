import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#FC0002] text-white py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Tentang Kami</h3>
            <p className="text-white mb-6 leading-relaxed">
              PT. ANUGERAH BASWARA MEGAH didirikan pada tahun 2013 di kota Makassar,
              Sulawesi Selatan. Kami adalah Solution Partner bagi berbagai perusahaan
              multi-nasional seperti PT. PLN (PERSERO), PT. PELABUHAN INDONESIA (PERSERO),
              PT. ANGKASA PURA II, BPFK MAKASSAR, Kementerian Kesehatan, rumah sakit,
              pabrik makanan, dan perbankan. Mitra teknologi kami antara lain: SATEC,
              SERTEC, HIOKI, SONEL, GFUVE, SENTUH DIGITAL, FLISOM, dan INTELENERGI.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/images/sertec/Profile-Baswara.pdf"
                target="_blank"
                className="bg-white hover:bg-gray-100 text-[#FC0002] px-4 py-2 rounded-md text-sm font-medium"
              >
                Profil Perusahaan
              </Link>
            </div>
          </div>

          {/* Social Link */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Media Sosial</h3>
            <div className="flex items-center gap-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2FBaswaraIndonesia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.63-1.3 1.3V12h2.2l-.35 3h-1.85v7A10 10 0 0022 12" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/uas/login?session_redirect=%2Fcompany%2F96025513"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 17H6V10h2v7zm-1-8.2a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zM18 17h-2v-3.5c0-1.1-.4-1.8-1.4-1.8-.8 0-1.2.5-1.4 1-.1.2-.1.5-.1.8V17h-2v-7h2v1h.1c.3-.5 1-1.2 2.3-1.2 1.7 0 2.9 1.1 2.9 3.4V17z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/linkshim/?u=http%3A%2F%2Fwww.baswarasolution.com%2F&e=AT3EtawAdRrsV8OAx6Mah-x2L5cW7K4t1UvjVyv774BYNF0SjOHaMiSUjt9YlInd3AGmP593qYaAu6ypT73Ru_IX5kAyP3GjOhDdOiEUcDs1Dw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2.2A2.8 2.8 0 1112 16.8 2.8 2.8 0 0112 9.2zm5.3-.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/channel/UCkYjgKXanWyPFBeZxa27W0Q"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.7 3.6 12 3.6 12 3.6s-7.7 0-9.4.5A3 3 0 00.5 6.2 31.4 31.4 0 000 12a31.4 31.4 0 00.5 5.8 3 3 0 002.1 2.1c1.7.5 9.4.5 9.4.5s7.7 0 9.4-.5a3 3 0 002.1-2.1A31.4 31.4 0 0024 12a31.4 31.4 0 00-.5-5.8zM9.6 15.5v-7l6.2 3.5-6.2 3.5z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://api.whatsapp.com/send?phone=628174147477&text=Salam%20Baswara,%20saya%20mau%20tanya%20informasi%20Produk..."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
              </a>
            </div>

            {/* Certification block */}
            <div className="mt-8 flex flex-col items-center space-y-4">
              <div className="inline-flex flex-col items-center justify-center bg-white text-[#FC0002] rounded-md border-4 border-[#FC0002] px-6 py-4">
                <div className="text-3xl font-extrabold leading-none tracking-tight">RVD</div>
                <div className="text-xs font-semibold mt-1">CERTIFICATION</div>
                <div className="mt-3 text-sm font-bold">ISO 9001 : 2015</div>
              </div>
              <a
                href="/images/sertec/ISO-ABM.2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FC0002] hover:bg-[#e00002] text-white px-4 py-2 rounded-md text-sm font-semibold"
              >
                Lihat Sertifikat
              </a>
            </div>
          </div>

          {/* Office */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Kantor</h3>
            <div className="space-y-5">
              <div>
                <div className="text-white font-semibold mb-2">Kantor Pusat</div>
                <div className="flex items-start space-x-3 text-white">
                  <svg className="w-5 h-5 text-white mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  <span>Paccerakang Raya No. 150A, Biringkanaya - Makassar 90241</span>
                </div>
                <div className="flex items-center space-x-3 mt-2">
                  <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  <a href="mailto:sales@baswarasolution.com" className="text-white hover:text-gray-100 transition-colors">sales@baswarasolution.com</a>
                </div>
                <div className="flex items-center space-x-3 mt-2">
                  <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  <a href="tel:08174147477" className="text-white hover:text-gray-100 transition-colors">08174147477</a>
                </div>
              </div>

              <div>
                <div className="text-white font-semibold mb-2">Kantor Cabang</div>
                <div className="flex items-start space-x-3 text-white">
                  <svg className="w-5 h-5 text-white mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  <span>Jl. Gajah Mada No.27A, RT.5/RW.7, Krukut, Kec. Taman Sari, Kota Jakarta Barat, DKI Jakarta 11140</span>
                </div>
                <div className="flex items-center space-x-3 mt-2">
                  <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  <a href="mailto:sales@baswarasolution.com" className="text-white hover:text-gray-100 transition-colors">sales@baswarasolution.com</a>
                </div>
                <div className="flex items-center space-x-3 mt-2">
                  <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 01.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  <a href="tel:08174147477" className="text-white hover:text-gray-100 transition-colors">08174147477</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#FC0002] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-sm">
              {`2013 - ${new Date().getFullYear()} © PT. Anugerah Baswara Megah`}
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-white text-sm">Web oleh Baswara Website</span>
            </div>
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
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </a>
    </footer>
  );
}
