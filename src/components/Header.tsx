"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo.png";

export default function Header() {

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-24 h-10 md:w-32 md:h-12 shrink-0">
              <Image
                src={logo}
                alt="Logo"
                fill
                priority
                sizes="(min-width: 768px) 128px, 96px"
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
            >
              Beranda
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
            >
              Tentang Kami
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
            >
              Produk
            </Link>
            <Link
              href="/solutions"
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
            >
              Solusi
            </Link>
            <Link
              href="/partners"
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
            >
              Partner
            </Link>
            <Link
              href="/news"
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
            >
              Berita &amp; Event
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
            >
              Kontak
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation: always visible horizontal bar */}
        <div className="md:hidden border-t border-gray-100 py-3">
          <nav className="flex items-center space-x-4 overflow-x-auto no-scrollbar text-sm">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium whitespace-nowrap"
            >
              Beranda
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium whitespace-nowrap"
            >
              Tentang Kami
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium whitespace-nowrap"
            >
              Produk
            </Link>
            <Link
              href="/solutions"
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium whitespace-nowrap"
            >
              Solusi
            </Link>
            <Link
              href="/partners"
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium whitespace-nowrap"
            >
              Partner
            </Link>
            <Link
              href="/news"
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium whitespace-nowrap"
            >
              Berita &amp; Event
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium whitespace-nowrap"
            >
              Kontak
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
