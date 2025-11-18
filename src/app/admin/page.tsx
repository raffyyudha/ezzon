"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

const PASSWORD = "baswaranewss";
const STORAGE_KEY = "adminNewsAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (token === PASSWORD) {
      router.replace("/admin/news");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, PASSWORD);
      }
      router.replace("/admin/news");
    } else {
      setError("Password salah");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-10">
        <div className="container max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Berita &amp; Event</h1>
          <p className="text-gray-600 mb-6 text-center text-sm">
            Masukkan password admin untuk mengelola konten Berita &amp; Event.
          </p>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder="Masukkan password admin"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-primary text-white rounded-md text-sm font-semibold hover:bg-primary/90"
            >
              Masuk Admin
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
