"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { type Post } from "@/interfaces/post";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import DateFormatter from "@/app/_components/date-formatter";
import Avatar from "@/app/_components/avatar";
import Link from "next/link";
import CoverImage from "@/app/_components/cover-image";

type Props = {
  posts: Post[];
};

const POSTS_PER_PAGE = 6;

export default function PostsListClient({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const inputRef = useRef<HTMLInputElement>(null);

  // Quick-jump to search with '/'
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const isTyping = tag === "input" || tag === "textarea" || (e.target as HTMLElement)?.isContentEditable;
      if (!isTyping && e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => {
      const hay = `${p.title} ${p.excerpt ?? ""} ${p.author?.name ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [posts, query]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [filtered, sortBy]);

  const totalPages = Math.ceil(sorted.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = sorted.slice(startIndex, endIndex);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query, sortBy]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            i === currentPage
              ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 ring-1 ring-black/10 dark:ring-white/10 shadow-sm"
              : "text-neutral-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-16">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-sm font-medium text-neutral-700 dark:text-slate-200 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-3 py-1.5 text-sm font-medium text-neutral-700 dark:text-slate-200 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              1
            </button>
            {startPage > 2 && <span className="px-2 text-neutral-500 dark:text-slate-400">...</span>}
          </>
        )}
        {pages}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2 text-neutral-500 dark:text-slate-400">...</span>}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-3 py-1.5 text-sm font-medium text-neutral-700 dark:text-slate-200 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 text-sm font-medium text-neutral-700 dark:text-slate-200 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <section>
      {/* Search and Sort Controls */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-slate-400">
                <MagnifyingGlassIcon className="h-4 w-4" />
              </span>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts..."
                className="w-full rounded-lg bg-white dark:bg-slate-900 ring-1 ring-black/10 dark:ring-white/10 pl-10 pr-16 py-2.5 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-white/20 transition-all"
                aria-label="Search posts"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center rounded-lg px-2 py-1 text-neutral-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/5 transition-colors"
                  aria-label="Clear search"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              ) : (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 text-xs text-neutral-500 dark:text-slate-400">
                  Press <kbd className="px-1.5 py-0.5 rounded border border-neutral-300 dark:border-slate-600 bg-white dark:bg-slate-800 font-mono text-xs">/</kbd>
                </span>
              )}
            </div>
          </div>

          {/* Sort and Results */}
          <div className="flex items-center gap-4 text-sm">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 ring-1 ring-black/10 dark:ring-white/10 focus:ring-2 focus:ring-neutral-300 dark:focus:ring-white/20 text-sm font-medium cursor-pointer transition-all"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <span className="text-neutral-500 dark:text-slate-400">
              {filtered.length} post{filtered.length === 1 ? "" : "s"}
              {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
            </span>
          </div>
        </div>
      </div>

      {/* Posts */}
      {sorted.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-neutral-600 dark:text-slate-300">No posts found.</p>
        </div>
      ) : (
        <div className="space-y-16">
          {/* Hero Post - Only show on first page */}
          {currentPage === 1 && currentPosts.length > 0 && (
            <div className="mb-16">
              <div className="mb-8 md:mb-16">
                <CoverImage title={currentPosts[0].title} src={currentPosts[0].coverImage} slug={currentPosts[0].slug} />
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
                <div>
                  <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
                    <Link href={`/posts/${currentPosts[0].slug}`} className="hover:underline">
                      {currentPosts[0].title}
                    </Link>
                  </h3>
                  <div className="mb-4 md:mb-0 text-lg">
                    <DateFormatter dateString={currentPosts[0].date} />
                  </div>
                </div>
                <div>
                  <p className="text-lg leading-relaxed mb-4">{currentPosts[0].excerpt}</p>
                  <Avatar name={currentPosts[0].author.name} picture={currentPosts[0].author.picture} />
                </div>
              </div>
            </div>
          )}

          {/* Posts Grid */}
          {(currentPage === 1 ? currentPosts.slice(1) : currentPosts).length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32">
              {(currentPage === 1 ? currentPosts.slice(1) : currentPosts).map((post) => (
                <div key={post.slug}>
                  <div className="mb-5">
                    <CoverImage slug={post.slug} title={post.title} src={post.coverImage} />
                  </div>
                  <h3 className="text-3xl mb-3 leading-snug">
                    <Link href={`/posts/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <div className="text-lg mb-4">
                    <DateFormatter dateString={post.date} />
                  </div>
                  <p className="text-lg leading-relaxed mb-4">{post.excerpt}</p>
                  <Avatar name={post.author.name} picture={post.author.picture} />
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {renderPagination()}
        </div>
      )}
    </section>
  );
}


