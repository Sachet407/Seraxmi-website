"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Tag, Clock, User, BookOpen } from "lucide-react";

type Author = {
  id: string;
  name: string;
  photo?: string;
  role?: string;
};

type BlogItem = {
  _id: string;
  title: string;
  slug: string;
  authorId: string;
  authorDetails?: Author;
  blogPhoto?: string;
  metadata?: {
    wordCount?: number;
    readingTime?: number;
    createdAt?: string;
  };
  keywords?: string[];
  content?: string;
  createdAt?: string;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showOnlyWithPhotos, setShowOnlyWithPhotos] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/api/blog")
      .then(async (res) => {
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const json = await res.json();
        // Expecting { success: true, data: [...] }
        if (!json?.success || !Array.isArray(json.data)) {
          throw new Error("Invalid API response");
        }
        if (mounted) {
          setBlogs(json.data);
          setError(null);
        }
      })
      .catch((err) => {
        if (mounted) setError(err.message || "Failed to load blogs");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // all tags
  const tags = useMemo(() => {
    const s = new Set<string>();
    blogs.forEach((b) => (b.keywords || []).forEach((k) => s.add(k)));
    return Array.from(s).sort();
  }, [blogs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogs.filter((b) => {
      if (showOnlyWithPhotos && !b.blogPhoto) return false;
      if (activeTag && !(b.keywords || []).includes(activeTag)) return false;
      if (!q) return true;
      const hay =
        (b.title || "") +
        " " +
        (b.content || "") +
        " " +
        (b.authorDetails?.name || "") +
        " " +
        (b.keywords || []).join(" ");
      return hay.toLowerCase().includes(q);
    });
  }, [blogs, query, activeTag, showOnlyWithPhotos]);

  const handleClearFilters = () => {
    setQuery("");
    setActiveTag(null);
    setShowOnlyWithPhotos(false);
  };

  function fmtDate(iso?: string) {
    if (!iso) return "";
    try {
      const d = parseISO(iso);
      return formatDistanceToNowStrict(d, { addSuffix: true });
    } catch {
      return iso;
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 p-6 md:p-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 mb-8 mt-10">
          <div className="flex items-center gap-4">

            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Latest from the Blog
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Thoughtful writing on product, craft, and productivity.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, author, or keyword..."
                className="outline-none text-sm placeholder:text-slate-400 bg-transparent"
              />
            </div>

            <button
              onClick={handleClearFilters}
              className="text-sm text-slate-600 hover:text-slate-800 px-3 py-2 rounded-md"
              aria-label="Clear filters"
            >
              Clear
            </button>
          </div>
        </header>

        {/* Filters */}
        <section className="mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Tag className="w-4 h-4" />
              <span className="font-medium">Tags</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTag(null)}
                className={`px-3 py-1.5 rounded-md text-sm border ${
                  activeTag === null
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-200"
                }`}
              >
                All
              </button>

              {tags.slice(0, 12).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag((prev) => (prev === t ? null : t))}
                  className={`px-3 py-1.5 rounded-md text-sm border ${
                    activeTag === t
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-3">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={showOnlyWithPhotos}
                  onChange={(e) => setShowOnlyWithPhotos(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300"
                />
                Only with images
              </label>
              <div className="text-sm text-slate-500">{filtered.length} results</div>
            </div>
          </div>
        </section>

        {/* Loading / Error */}
        <section>
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="flex flex-col items-center gap-4">
                <div
                  aria-hidden
                  className="w-20 h-20 p-4 rounded-full bg-white border border-slate-200 shadow flex items-center justify-center animate-spin-slow"
                >
                  {/* loader uses your logo */}
                  <Image
                    src="/seraxmi-Light.svg"
                    alt="Loading..."
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-slate-600">Loading articles…</p>
              </div>
            </div>
          ) : error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-8 text-center">
              <p className="text-red-700 font-medium">Failed to load blogs</p>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          ) : (
            <>
              {/* Grid */}
              <AnimatePresence>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filtered.map((b) => (
                    <motion.article
                      layout
                      key={b._id}
                      whileHover={{ y: -6 }}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
                    >
                      <Link href={`/blog/${b.slug}`} className="block group">
                        <div className="relative h-44 w-full bg-slate-50 overflow-hidden">
                          {b.blogPhoto ? (
                            <Image
                              src={b.blogPhoto}
                              alt={b.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              priority={false}
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                              <BookOpen className="w-10 h-10 opacity-40" />
                            </div>
                          )}
                        </div>

                        <div className="p-5">
                          <h2 className="text-lg md:text-xl font-semibold text-slate-900 line-clamp-2">
                            {b.title}
                          </h2>

                          <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                            {/* extract a short excerpt if content exists (strip HTML simply) */}
                            {b.content
                              ? stripHtml(b.content).slice(0, 140) + (stripHtml(b.content).length > 140 ? "…" : "")
                              : "Read this thoughtful article."}
                          </p>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                                {b.authorDetails?.photo ? (
                                  <Image
                                    src={b.authorDetails.photo}
                                    alt={b.authorDetails.name}
                                    width={36}
                                    height={36}
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="text-xs text-slate-500">{initials(b.authorDetails?.name)}</div>
                                )}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-slate-800">
                                  {b.authorDetails?.name || "Unknown"}
                                </div>
                                <div className="text-xs text-slate-500">
                                  {b.authorDetails?.role || ""}
                                </div>
                              </div>
                            </div>

                            <div className="text-xs text-slate-500 text-right">
                              <div className="flex items-center gap-2">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{b.metadata?.readingTime ?? `${estimateReadingTime(b.content)} min`}</span>
                              </div>
                              <div className="mt-1 text-xs text-slate-400">{fmtDate(b.metadata?.createdAt || b.createdAt)}</div>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {(b.keywords || []).slice(0, 4).map((k) => (
                              <span
                                key={k}
                                className="text-xs px-2 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700"
                              >
                                {k}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

/* -------------------------
   Small helpers
   ------------------------- */

function initials(name?: string) {
  if (!name) return "AU";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() || "").join("");
}

function stripHtml(html: string) {
  if (!html) return "";
  // quick-and-simple stripper (keeps text only)
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function estimateReadingTime(content?: string) {
  if (!content) return 2;
  // strip tags and count words
  const text = stripHtml(content);
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return minutes;
}

/* -------------------------
   tiny CSS for spinner animation (tailwind not required, but helpful)
   If your project uses global css, add:
   .animate-spin-slow { animation: spin 1.3s linear infinite; }
   @keyframes spin { to { transform: rotate(360deg); } }
   Or include it in a global css file.
   ------------------------- */
