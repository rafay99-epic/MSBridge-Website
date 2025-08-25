import Container from "@/app/_components/container";

export default function TechnologiesPage() {
  const technologies = [
    {
      name: "Flutter",
      description:
        "Cross‑platform UI toolkit enabling a single codebase for mobile, web, and desktop.",
      Icon: FlutterIcon,
      color: "from-sky-400 to-cyan-500",
    },
    {
      name: "Firebase",
      description:
        "Authentication, realtime data, and serverless functions powering a fast backend.",
      Icon: FirebaseIcon,
      color: "from-amber-400 to-orange-500",
    },
    {
      name: "Cloudinary",
      description:
        "Optimized media storage, on-the-fly transformations, and global CDN delivery.",
      Icon: CloudinaryIcon,
      color: "from-indigo-400 to-blue-500",
    },
    {
      name: "Hive",
      description:
        "Lightweight, fast key‑value storage for offline‑first data on device.",
      Icon: HiveIcon,
      color: "from-yellow-400 to-amber-500",
    },
    {
      name: "Provider",
      description:
        "Simple, robust state management for Flutter with clear data flows.",
      Icon: ProviderIcon,
      color: "from-emerald-400 to-teal-500",
    },
    {
      name: "GitHub",
      description:
        "Source control, PR workflows, and CI to keep quality and velocity high.",
      Icon: GitHubIcon,
      color: "from-neutral-500 to-neutral-700",
    },
    {
      name: "Bug Tracking",
      description:
        "Proactive issue reporting and triage to maintain app reliability.",
      Icon: BugIcon,
      color: "from-rose-400 to-pink-500",
    },
  ];

  return (
    <main className="min-h-[60vh] py-16">
      <Container>
        <section className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Technology Stack</h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            The foundation behind MS Bridge — a modern, private, and AI‑powered note
            experience. Built for speed, reliability, and a seamless cross‑platform UI.
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map(({ name, description, Icon, color }) => (
            <article
              key={name}
              className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 transition-shadow shadow-sm hover:shadow-lg"
            >
              <div
                className={`pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-to-b opacity-20 ${color}`}
                aria-hidden
              />
              <div className="relative flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight">{name}</h3>
              </div>
              <p className="relative mt-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {description}
              </p>
            </article>
          ))}
        </section>
      </Container>
    </main>
  );
}

type IconProps = { className?: string };

function FlutterIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M14.24 3.02 4.5 12.76l3.53 3.53L21 3.02h-6.76z" fill="#42A5F5" />
      <path d="m21 3.02-9.73 9.74 3.54 3.53L24 6.1V3.02h-3z" fill="#1E88E5" />
      <path d="m8.03 16.3 3.54 3.54h6.76l-6.76-6.77-3.54 3.23z" fill="#29B6F6" />
    </svg>
  );
}

function FirebaseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fill="#FFA000" d="m5 15 3-12 3 6z" />
      <path fill="#F57F17" d="M5 15l7-6-4-6z" />
      <path fill="#FFCA28" d="M5 15l7 5 7-5-7-7z" />
    </svg>
  );
}

function CloudinaryIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="c" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#5B8DEF" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      <path fill="url(#c)" d="M20 40a10 10 0 010-20c.7-7 6.6-12 13.6-12C42.5 8 48 13.5 49 20c6.6.2 12 5.7 12 12 0 6.6-5.4 12-12 12H20z" />
      <circle cx="22" cy="32" r="3" fill="#fff" />
      <circle cx="32" cy="32" r="3" fill="#fff" />
      <circle cx="42" cy="32" r="3" fill="#fff" />
    </svg>
  );
}

function HiveIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fill="#F59E0B" d="M8 3l4-2 4 2 4 2v6l-4 2-4-2-4 2-4-2V5l4-2z" />
      <path fill="#D97706" d="M4 13l4-2 4 2 4-2 4 2v6l-4 2-4-2-4 2-4-2v-6z" />
    </svg>
  );
}

function ProviderIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="12" cy="12" r="10" fill="#10B981" />
      <path fill="#fff" d="M7 12h10v2H7zM9 8h6v2H9zM9 16h6v2H9z" />
    </svg>
  );
}

function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fill="#18181B" d="M12 1.5c-5.8 0-10.5 4.7-10.5 10.5 0 4.6 3 8.5 7.2 9.9.5.1.7-.2.7-.5v-2c-2.9.6-3.5-1.2-3.5-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.7.1-.7.1-.7 1 .1 1.6 1 1.6 1 .9 1.6 2.5 1.1 3.1.8.1-.7.4-1.1.7-1.4-2.4-.3-5-1.2-5-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1.1.8-.2 1.7-.3 2.6-.3.9 0 1.8.1 2.6.3 1.9-1.4 2.8-1.1 2.8-1.1.6 1.4.2 2.4.1 2.7.7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.2-5 5.5.4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5 4.2-1.4 7.2-5.3 7.2-9.9C22.5 6.2 17.8 1.5 12 1.5z" />
    </svg>
  );
}

function BugIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fill="#E11D48" d="M9 4a3 3 0 116 0v1H9V4z" />
      <path fill="#F43F5E" d="M6 10a6 6 0 1112 0v6a6 6 0 11-12 0v-6z" />
      <path fill="#E11D48" d="M3 11h4v2H3zM17 11h4v2h-4zM4 7l3 2-1 1-3-2zM16 9l3-2 1 1-3 2zM5 19l3-2 1 1-3 2zM16 18l3 2-1 1-3-2z" />
    </svg>
  );
}


