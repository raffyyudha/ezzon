"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ZoomIn } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CategoryGalleryProps {
    title: string;
    subtitle?: string;
    images: string[];
    codes?: string[];
}

export default function CategoryGallery({ title, subtitle, images, codes }: CategoryGalleryProps) {
    // Simple "lightbox" state could be added here, but for now we focus on the grid aesthetics.

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            {/* Header / Hero */}
            <section className="relative pt-24 pb-12 px-4 container">
                <Link
                    href="/products"
                    className="inline-flex items-center text-white/50 hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                    Back to Collections
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-xl text-white/60 max-w-2xl">{subtitle}</p>
                    )}

                    {codes && codes.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {codes.map(code => (
                                <span key={code} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/40">
                                    {code}
                                </span>
                            ))}
                        </div>
                    )}
                </motion.div>
            </section>

            {/* Gallery Grid */}
            <section className="container px-4 pb-24">
                <motion.div
                    className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    {images.map((src, index) => (
                        <motion.div
                            key={src + index}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                            className="break-inside-avoid"
                        >
                            <div className="group relative overflow-hidden rounded-xl bg-neutral-900 border border-white/5">
                                <img
                                    src={src}
                                    alt={`${title} ${index + 1}`}
                                    loading="lazy"
                                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    {/* Could be a lightbox trigger */}
                                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white">
                                        <ZoomIn className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {images.length === 0 && (
                    <div className="py-20 text-center text-white/30">
                        No images found in this collection.
                    </div>
                )}
            </section>
        </div>
    );
}
