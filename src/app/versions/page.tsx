import { Stable_MSBridge_URL, beta_MSBridge_URL } from "@/lib/constants";
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
          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Releases
            </h1>
            <p className="mt-3 text-neutral-600 dark:text-slate-300">
              Download the latest Android APK and browse previous versions.
            </p>
          </header>

          {/* Latest Version Section */}
          {latest && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">
                Latest Release
              </h2>
              <div className="relative overflow-hidden rounded-3xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-6 md:p-8">
                <div
                  className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-white/5 dark:to-transparent"
                  aria-hidden
                />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-neutral-500 dark:text-slate-400">
                      Latest
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                      v{latest.version} (build {latest.buildNumber})
                    </h3>
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
                      className="inline-flex items-center justify-center rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-3 font-semibold shadow-sm transition-colors dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                    >
                      Download APK
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Release Channels Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">
              Release Channels
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Stable Channel */}
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-slate-900 shadow-lg p-6">
                <div
                  className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10"
                  aria-hidden
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                      Stable
                    </span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-2">
                    Stable Release Channel
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-slate-300 mb-4">
                    Use this stable URL in your Android app - it will always redirect to the newest stable version.
                  </p>
                  <Link
                    href={Stable_MSBridge_URL}
                    className="inline-flex items-center justify-center rounded-xl bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-semibold shadow-sm transition-colors"
                  >
                    Download Stable APK
                  </Link>
                </div>
              </div>

              {/* Beta Channel */}
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-slate-900 shadow-lg p-6">
                <div
                  className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10"
                  aria-hidden
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                      Beta
                    </span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-2">
                    Beta Release Channel
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-slate-300 mb-4">
                    Use this beta URL in your Android app - it will always redirect to the newest beta version.
                  </p>
                  <Link
                    href={beta_MSBridge_URL}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-semibold shadow-sm transition-colors"
                  >
                    Download Beta APK
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* All Releases Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">
              All Releases
            </h2>
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-slate-900 shadow-lg">
              <div className="divide-y divide-neutral-200 dark:divide-white/10">
                {versions.map((v, index) => (
                  <div key={v.buildNumber} className="p-4 md:p-6 hover:bg-neutral-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-lg">
                            v{v.version}
                          </span>
                          <span className="text-sm text-neutral-400 bg-neutral-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                            build {v.buildNumber}
                          </span>
                          {index === 0 && (
                            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
                              Latest
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-neutral-500 dark:text-slate-400 mb-2">
                          Released <DateFormatter dateString={v.releaseDate} />
                        </div>
                        {v.changelog && (
                          <p className="text-sm text-neutral-700 dark:text-slate-200">
                            {v.changelog}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={v.downloadUrl}
                          className="inline-flex items-center justify-center rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                          Download
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="my-8" />
      </section>
    </Container>
  );
}

