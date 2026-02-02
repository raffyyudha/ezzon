"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGroup {
    shape?: string;
    title?: string;
    name?: string;
    colorFamily?: string | null;
    codes?: string[];
    slug?: string;
    thumbnail?: string;
    images?: string[];
    [key: string]: unknown;
}

interface ProductListingProps {
    initialGroups: ProductGroup[];
    allShapes: string[];
}

export default function ProductListing({ initialGroups, allShapes }: ProductListingProps) {
    const [activeFilter, setActiveFilter] = useState("All");

    const categories = ["All", ...allShapes.filter(s => s !== "Collections" && s !== "Uncategorized"), "Collections"];

    const filteredGroups = activeFilter === "All"
        ? initialGroups
        : initialGroups.filter(g => {
            if (activeFilter === "Collections") return g.shape === "Collections";
            return g.shape === activeFilter;
        });

    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-rose-500/30 selection:text-rose-200">

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-neutral-950 z-10" />
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 10, ease: "easeOut" }}
                        className="w-full h-full bg-[url('/images/productganteng.jpg')] bg-cover bg-center"
                    />
                </div>

                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-white/80 mb-6">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            <span>Premium Collection 2026</span>
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
                            Masterpieces for Your Floor.
                        </h1>
                        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                            Discover our curated selection of high-end vinyl, stone, and wood flooring solutions designed to elevate every step you take.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Tabs */}
            <section className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5 py-4">
                <div className="container overflow-x-auto no-scrollbar">
                    <div className="flex items-center justify-start md:justify-center gap-2 min-w-max px-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={cn(
                                    "relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                                    activeFilter === cat
                                        ? "text-black"
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {activeFilter === cat && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="container py-20 px-4">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredGroups.map((group, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                key={group.slug}
                                className="group relative"
                            >
                                <Link href={`/products/category/${group.slug}`} className="block h-full">
                                    <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-neutral-900 border border-white/5 shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]">
                                        {/* Image */}
                                        <div className="absolute inset-0">
                                            <img
                                                src={group.thumbnail || (group.images && group.images[0]) || "/images/service.jpg"}
                                                alt={group.title || group.name}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
                                        </div>

                                        {/* Content */}
                                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                            <div className="transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                                                <p className="text-emerald-400 text-xs font-bold tracking-wider uppercase mb-2">
                                                    {group.shape === "Collections" ? group.title : group.shape}
                                                </p>
                                                <h3 className="text-2xl font-semibold text-white mb-2 leading-tight">
                                                    {group.title || group.name}
                                                </h3>
                                                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                    <p className="text-white/60 text-sm">
                                                        {(group.images?.length || 0)} Designs
                                                    </p>
                                                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transform translate-x-4 group-hover:translate-x-0 transition-transform duration-500">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredGroups.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-white/40 text-lg">No products found in this category.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
