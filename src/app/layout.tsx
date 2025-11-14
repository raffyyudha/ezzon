import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Energy Management Systems (EMS) - SATEC ExpertPower, SERTEC, SENTER",
  description:
    "Solusi Manajemen Energi (EMS) berbahasa Indonesia dengan penekanan pada SATEC ExpertPower sebagai produk utama, didukung perangkat SERTEC dan kamera PTZ SENTER. Integrasi WhatsApp dan AI Chatbot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={jost.variable}>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
