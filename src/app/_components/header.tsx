"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "./container";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/posts", label: "Posts" },
  { href: "/technologies", label: "Technologies" },
  { href: "/versions", label: "Versions" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const Header = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <Container>
    <header className="mb-20 mt-8">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter hover:underline"
        >
          MS Bridge
        </Link>
        <button
          className="md:hidden inline-flex items-center rounded-lg ring-1 ring-black/10 dark:ring-white/10 px-3 py-1.5 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
        >
          Menu
        </button>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                (isActive(item.href)
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 ring-1 ring-black/10 dark:ring-white/10 shadow-sm"
                  : "text-neutral-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5") +
                " inline-flex items-center rounded-lg px-3 py-1.5 transition-colors"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      {mobileOpen && (
        <nav className="md:hidden mt-4 rounded-xl ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-slate-900 p-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    (isActive(item.href)
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 ring-1 ring-black/10 dark:ring-white/10 shadow-sm"
                      : "text-neutral-700 dark:text-slate-200") +
                    " block w-full px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
    </Container>
  );
};

export default Header;
