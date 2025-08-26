import Container from "@/app/_components/container";
// Assuming your SVG imports are correct relative to your project structure
import Flutter from "@/svg/flutter";
import Firebase from "@/svg/firebase";
import Cloudinary from "@/svg/cloudnaury";
import Git from "@/svg/git";
import GitHub from "@/svg/github";
import Android from "@/svg/android";
import Swift from "@/svg/swift";
import Bash from "@/svg/bash";
import Postman from "@/svg/postman";
// Add other SVG imports if you have more technologies

export default function TechnologiesPage() {
  const technologies = [
    {
      name: "Flutter",
      description:
        "Cross‑platform UI toolkit enabling a single codebase for mobile, web, and desktop.",
      Icon: Flutter,
      color: "from-sky-400 to-cyan-500", // Will be used for icon background and hover accent
      badge: "UI",
      badgeColor: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    },
    {
      name: "Firebase",
      description:
        "Authentication, realtime data, and serverless functions powering a fast backend.",
      Icon: Firebase,
      color: "from-amber-400 to-orange-500",
      badge: "Backend",
      badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    },
    {
      name: "Cloudinary",
      description:
        "Optimized media storage, on‑the‑fly transformations, and global CDN delivery.",
      Icon: Cloudinary,
      color: "from-indigo-400 to-blue-500",
      badge: "Media",
      badgeColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
    },
    {
      name: "Android",
      description:
        "Modern Android platform support for performant builds and distribution.",
      Icon: Android,
      color: "from-lime-400 to-emerald-500",
      badge: "Platform",
      badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    },
    {
      name: "Git",
      description:
        "Reliable source control and branching workflows for safe collaboration.",
      Icon: Git,
      color: "from-orange-400 to-red-500",
      badge: "VCS",
      badgeColor: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
    },
    {
      name: "GitHub",
      description:
        "PR workflows and CI to keep quality and velocity high.",
      Icon: GitHub,
      color: "from-neutral-500 to-neutral-700",
      badge: "Hosting",
      badgeColor: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
    },
    {
      name: "Swift",
      description:
        "Native iOS components and integrations where it makes sense.",
      Icon: Swift,
      color: "from-orange-400 to-rose-500",
      badge: "iOS",
      badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
    },
    {
      name: "Bash",
      description:
        "Reliable automation scripts for build, release, and tooling.",
      Icon: Bash,
      color: "from-neutral-400 to-slate-600",
      badge: "Tooling",
      badgeColor: "bg-slate-100 text-slate-800 dark:bg-slate-900/40 dark:text-slate-300",
    },
    {
      name: "Postman",
      description:
        "API modeling, collections, and monitors for robust endpoints.",
      Icon: Postman,
      color: "from-amber-500 to-orange-600",
      badge: "API",
      badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    },
  ];

  return (
    <main className="min-h-[60vh] py-16">
      <Container>
        <section className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            My Dev Arsenal
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            These are the tools and technologies I wield to craft delightful
            digital experiences, from slick UIs to robust backends.
          </p>
        </section>

        <section className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {technologies.map(({ name, description, Icon, color, badge, badgeColor }) => (
            <article
              key={name}
              className={`group relative overflow-hidden rounded-2xl p-6 ring-1 ring-black/10 dark:ring-white/10  transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-neutral-800/50`}
            >
              {/* Subtle accent border on hover */}
              <div
                aria-hidden
                className={`absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ring-2 ring-inset ${color} blur-sm`}
              />
              <div className="flex flex-col items-center text-center">
                {/* Prominent icon with its own colorful gradient background - NO MORE RING HERE! */}
                <div
                  className={`relative mb-4 h-20 w-20 rounded-full grid place-items-center transition-all duration-300 group-hover:scale-105 ${color}`}
                >
                  {/* Icon color set to white for contrast on gradients */}
                  <Icon className="h-10 w-10 text-white" aria-hidden />
                </div>

                <div className="w-full">
                  <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-2 mb-2">
                    <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                      {name}
                    </h3>
                    {badge && (
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-black/10 dark:ring-white/10 ${badgeColor}`}>
                        {badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
                    {description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>
      </Container>
    </main>
  );
}