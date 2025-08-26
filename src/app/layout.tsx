import Footer from "@/app/_components/footer";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import { ThemeSwitcher } from "./_components/theme-switcher";

import "./globals.css";
import Header from "./_components/header";
import CacheRefresher from "./_components/CacheRefresher";

const inter = Inter({ subsets: ["latin"] });

// Prefer dynamic render for fresh deployments; individual routes can opt-in to ISR
export const revalidate = 0;

export const metadata: Metadata = {
  title: `MS Bridge`,
  description: `The ultimate note reading and note-taking application, powered by AI, with a fully private, local-first option.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon/icon.ico" />
        <link rel="apple-touch-icon" href="/assets/logo/icon.png" />
        <link rel="icon" type="image/png" href="/assets/logo/icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon/icon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link rel="alternate" type="application/rss+xml" title="Releases" href="/releases.xml" />
      </head>
      <body
        className={cn(inter.className, "dark:bg-slate-900 dark:text-slate-400")}
      >
        <CacheRefresher />
        <Header />
        <ThemeSwitcher />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
