"use client";

import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image: "/images/service.jpg",
    title: "Discover the perfect flooring for your home or business",
    subtitle: "Professional renovation services with over two decades of experience"
  },
  {
    id: 2,
    image: "/images/service2.jpg",
    title: "Unbeatable prices on top-brand flooring",
    subtitle: "Quality materials and craftsmanship you can trust"
  },
  {
    id: 3,
    image: "/images/service3.jpg",
    title: "Professional installation services available",
    subtitle: "Expert installation with lifetime warranty on all our products"
  }
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
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative h-full flex items-center">
            <div className="container">
              <div className="max-w-3xl text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/contact"
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center justify-center"
                  >
                    Get Free Quote
                  </a>
                  <a
                    href="/services"
                    className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center justify-center"
                  >
                    Our Services
                  </a>
                </div>
              </div>
            </div>
          </div>
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
  );
}
