"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { type Post } from "@/interfaces/post";
import { PostPreview } from "@/app/_components/post-preview";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  posts: Post[];
};

export default function PostsListClient({ posts }: Props) {
  const [query, setQuery] = useState("");
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

  return (
    <section>
      <div className="mb-2">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-slate-400">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full rounded-2xl bg-white dark:bg-slate-900 ring-1 ring-black/10 dark:ring-white/10 pl-10 pr-20 py-2.5 text-sm md:text-base placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-white/20"
            aria-label="Search posts"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center rounded-lg px-2 py-1 text-neutral-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/5"
              aria-label="Clear search"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          ) : (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center gap-1 text-xs text-neutral-500 dark:text-slate-400">
              Press <kbd className="px-1.5 py-0.5 rounded border border-neutral-300 dark:border-slate-600 bg-white dark:bg-slate-800">/</kbd>
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center justify-between text-sm text-neutral-500 dark:text-slate-400">
          <span>{filtered.length} result{filtered.length === 1 ? "" : "s"}</span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-neutral-600 dark:text-slate-300">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
          {filtered.map((post) => (
            <PostPreview
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          ))}
        </div>
      )}
    </section>
  );
}


