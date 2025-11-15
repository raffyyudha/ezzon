"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import desktop1 from "@/images/1.png";
import desktop2 from "@/images/2.png";
import desktop3 from "@/images/3.png";
import desktop4 from "@/images/4.png";
import android1 from "@/android 1.png";
import android2 from "@/android 2.png";
import android3 from "@/android 3.png";
import android4 from "@/android 4.png";

const slides = [
  {
    id: 1,
    imageMobile: android1.src,
    imageDesktop: desktop1.src,
    title: "Energy Management Systems",
    subtitle:
      "Pantau, analisis, dan optimalkan konsumsi energi Anda secara real-time",
  },
  {
    id: 2,
    imageMobile: android2.src,
    imageDesktop: desktop2.src,
    title: "SATEC ExpertPower (EMS)",
    subtitle:
      "Dashboard energi, pelaporan, dan analitik untuk efisiensi operasional",
  },
  {
    id: 3,
    imageMobile: android3.src,
    imageDesktop: desktop3.src,
    title: "Integrasi SERTEC",
    subtitle:
      "Perangkat pendukung untuk monitoring, proteksi, dan inspeksi jaringan",
  },
  {
    id: 4,
    imageMobile: android4.src,
    imageDesktop: desktop4.src,
    title: "Solusi Energi Terintegrasi",
    subtitle:
      "Dari monitoring hingga proteksi, satu platform untuk semua kebutuhan energi Anda",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Mobile background */}
          <div
            className="absolute inset-0 bg-no-repeat md:hidden"
            style={{
              backgroundImage: `url('${slide.imageMobile}')`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
            }}
          />
          {/* Desktop background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
            style={{ backgroundImage: `url('${slide.imageDesktop}')` }}
          />
          
          
        </div>
      ))}

      {/* CTA Button */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex justify-center">
        <Link
          href="/products"
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold shadow-lg text-sm"
        >
          Lihat Produk
        </Link>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? "bg-primary scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
    </>
  );
}
