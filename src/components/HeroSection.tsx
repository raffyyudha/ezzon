"use client";

import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    imageMobile: "/images/slider-1.jpg",
    imageDesktop: "/images/landscape-1.png",
    title: "Energy Management Systems",
    subtitle:
      "Pantau, analisis, dan optimalkan konsumsi energi Anda secara real-time",
  },
  {
    id: 2,
    imageMobile: "/images/slider-2.jpg",
    imageDesktop: "/images/landscape-2.png",
    title: "SATEC ExpertPower (EMS)",
    subtitle:
      "Dashboard energi, pelaporan, dan analitik untuk efisiensi operasional",
  },
  {
    id: 3,
    imageMobile: "/images/slider-3.jpg",
    imageDesktop: "/images/landscape-3.png",
    title: "Integrasi SERTEC & Kamera PTZ SENTER",
    subtitle:
      "Perangkat pendukung untuk monitoring, proteksi, dan inspeksi jaringan",
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
    <section className="relative w-full md:w-screen h-[60vh] md:h-screen min-h-[400px] md:min-h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Mobile background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
            style={{ backgroundImage: `url(${slide.imageMobile})` }}
          />
          {/* Desktop background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
            style={{ backgroundImage: `url(${slide.imageDesktop})` }}
          />
          
          
        </div>
      ))}

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
    <div className="container mt-4 md:mt-6 flex justify-center">
      <a
        href="/products"
        className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold shadow-lg text-sm"
      >
        Lihat Produk
      </a>
    </div>
    </>
  );
}
