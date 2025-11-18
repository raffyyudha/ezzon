"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo.webp";
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
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3 ml-4">
              <a
                href="https://www.linkedin.com/in/andre-satec-7829aa172"
                target="_blank"
                rel="noopener noreferrer"
                className={
                  (isProductDetail
                    ? "text-white hover:text-white/70"
                    : "text-gray-700 hover:text-primary") +
                  " transition-colors duration-200"
                }
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/satecindonesia"
                target="_blank"
                rel="noopener noreferrer"
                className={
                  (isProductDetail
                    ? "text-white hover:text-white/70"
                    : "text-gray-700 hover:text-primary") +
                  " transition-colors duration-200"
                }
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@satec_baswara"
                target="_blank"
                rel="noopener noreferrer"
                className={
                  (isProductDetail
                    ? "text-white hover:text-white/70"
                    : "text-gray-700 hover:text-primary") +
                  " transition-colors duration-200"
                }
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
            </div>
          </nav>

          {/* Mobile Social Media Icons */}
          <div className="ml-auto md:hidden flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/andre-satec-7829aa172"
              target="_blank"
              rel="noopener noreferrer"
              className={
                (isProductDetail
                  ? "text-white hover:text-white/70"
                  : "text-gray-700 hover:text-primary") +
                " transition-colors duration-200"
              }
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/satecindonesia"
              target="_blank"
              rel="noopener noreferrer"
              className={
                (isProductDetail
                  ? "text-white hover:text-white/70"
                  : "text-gray-700 hover:text-primary") +
                " transition-colors duration-200"
              }
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@satec_baswara"
              target="_blank"
              rel="noopener noreferrer"
              className={
                (isProductDetail
                  ? "text-white hover:text-white/70"
                  : "text-gray-700 hover:text-primary") +
                " transition-colors duration-200"
              }
              aria-label="TikTok"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </a>
            
            <a
              href="https://wa.me/628174147477"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#1A7B4C] hover:bg-[#166A42] text-white shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
              </svg>
            </a>
          </div>
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
