"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo.png";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isProductDetail = pathname?.startsWith("/products/") && pathname !== "/products";

  return (
    <header className="bg-transparent">
      <div className="container">
        <div className="flex items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center mr-6 md:mr-10">
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
          <nav className="hidden md:flex flex-1 items-center justify-center space-x-8">
            <Link
              href="/"
              className={
                (isProductDetail
                  ? "text-white hover:text-white/70"
                  : "text-gray-700 hover:text-primary") +
                " transition-colors duration-200 font-medium"
              }
            >
              Beranda
            </Link>
            <Link
              href="/products"
              className={
                (isProductDetail
                  ? "text-white hover:text-white/70"
                  : "text-gray-700 hover:text-primary") +
                " transition-colors duration-200 font-medium"
              }
            >
              Produk
            </Link>
            <Link
              href="/download"
              className={
                (isProductDetail
                  ? "text-white hover:text-white/70"
                  : "text-gray-700 hover:text-primary") +
                " transition-colors duration-200 font-medium"
              }
            >
              Download
            </Link>
            <Link
              href="/news"
              className={
                (isProductDetail
                  ? "text-white hover:text-white/70"
                  : "text-gray-700 hover:text-primary") +
                " transition-colors duration-200 font-medium"
              }
            >
              Artikel
            </Link>
            <Link
              href="/contact"
              className={
                (isProductDetail
                  ? "text-white hover:text-white/70"
                  : "text-gray-700 hover:text-primary") +
                " transition-colors duration-200 font-medium"
              }
            >
              Kontak
            </Link>
          </nav>

          <a
            href="https://wa.me/628174147477"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#1A7B4C] hover:bg-[#166A42] text-white shadow-md"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
            </svg>
          </a>
        </div>

        {/* Mobile Navigation: always visible horizontal bar */}
        <div className="md:hidden border-t border-gray-100 py-3">
          <nav className="flex items-center justify-between w-full text-sm">
            <Link
              href="/"
              className={
                (isProductDetail
                  ? "text-white hover:text-white/70"
                  : "text-gray-700 hover:text-primary") +
                " transition-colors duration-200 font-medium whitespace-nowrap"
              }
            >
              Beranda
            </Link>
            <Link
              href="/products"
              className={
                (isProductDetail
                  ? "text-white hover:text-white/70"
                  : "text-gray-700 hover:text-primary") +
                " transition-colors duration-200 font-medium whitespace-nowrap"
              }
            >
              Produk
            </Link>
            <Link
              href="/download"
              className={
                (isProductDetail
                  ? "text-white hover:text-white/70"
                  : "text-gray-700 hover:text-primary") +
                " transition-colors duration-200 font-medium whitespace-nowrap"
              }
            >
              Download
            </Link>
            <Link
              href="/news"
              className={
                (isProductDetail
                  ? "text-white hover:text-white/70"
                  : "text-gray-700 hover:text-primary") +
                " transition-colors duration-200 font-medium whitespace-nowrap"
              }
            >
              Artikel
            </Link>
            <Link
              href="/contact"
              className={
                (isProductDetail
                  ? "text-white hover:text-white/70"
                  : "text-gray-700 hover:text-primary") +
                " transition-colors duration-200 font-medium whitespace-nowrap"
              }
            >
              Kontak
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
