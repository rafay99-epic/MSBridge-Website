import Container from "../_components/container";
import DateFormatter from "../_components/date-formatter";
import { getAllVersions, getLatestVersion } from "@/lib/versions";
import Link from "next/link";

export const metadata = {
  title: "App Versions - MS Bridge",
  description: "Download APK releases and view changelogs for MS Bridge.",
};

export default function VersionsPage() {
  const versions = getAllVersions();
  const latest = getLatestVersion();

  return (
    <Container>
        <div className="my-8" />
      <section className="mt-10 md:mt-14">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Releases
            </h1>
            <p className="mt-3 text-neutral-600 dark:text-slate-300">
              Download the latest Android APK and browse previous versions.
            </p>
          </header>

          {latest && (
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-6 md:p-8 mb-10">
              <div
                className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-white/5 dark:to-transparent"
                aria-hidden
              />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-neutral-500 dark:text-slate-400">
                    Latest
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                    v{latest.version} (build {latest.buildNumber})
                  </h2>
                  <div className="text-sm text-neutral-500 dark:text-slate-400">
                    Released <DateFormatter dateString={latest.releaseDate} />
                  </div>
                  {latest.changelog && (
                    <p className="mt-2 text-neutral-700 dark:text-slate-200">
                      {latest.changelog}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href={latest.downloadUrl}
                    className="inline-flex items-center justify-center rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 font-semibold shadow-sm transition-colors dark:bg-white dark:text-neutral-900"
                  >
                    Download APK
                  </Link>
                  <a
                    href="#all-releases"
                    className="inline-flex items-center justify-center rounded-xl ring-1 ring-black/10 dark:ring-white/10 px-4 py-2 font-semibold text-neutral-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    See all
                  </a>
                </div>
              </div>
            </div>
          )}

          <div id="all-releases" className="mt-6">
            <h3 className="text-xl font-semibold mb-4">All releases</h3>
            <ul className="divide-y divide-neutral-200 dark:divide-white/10 rounded-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden bg-white dark:bg-slate-900">
              {versions.map((v) => (
                <li key={v.buildNumber} className="p-4 md:p-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <div className="font-semibold">
                        v{v.version} <span className="text-neutral-400">(build {v.buildNumber})</span>
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-slate-400">
                        Released <DateFormatter dateString={v.releaseDate} />
                      </div>
                      {v.changelog && (
                        <p className="mt-1 text-sm text-neutral-700 dark:text-slate-200">
                          {v.changelog}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={v.downloadUrl}
                        className="inline-flex items-center justify-center rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-3 py-1.5 text-sm font-semibold hover:opacity-90"
                      >
                        Download
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Container>
  );
}

