import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostTitle } from "@/app/_components/post-title";
import { type ComponentType } from "react";

type IconProps = { className?: string };
function PencilIcon(props: IconProps) {
  const { className } = props;
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={className} aria-hidden>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.1 2.1 0 1 1 2.971 2.971L7.5 18.79 3 21l2.21-4.5L16.862 3.487Z"/>
    </svg>
  );
}
function SparklesIcon(props: IconProps) {
  const { className } = props;
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={className} aria-hidden>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M9 3l1.5 3.5L14 8l-3.5 1.5L9 13l-1.5-3.5L4 8l3.5-1.5L9 3Zm9 3l.9 2.1L21 9l-2.1.9L18 12l-.9-2.1L15 9l2.1-.9L18 6Zm-3 8l1.2 2.8L19 18l-2.8 1.2L15 22l-1.2-2.8L11 18l2.8-1.2L15 14Z"/>
    </svg>
  );
}
function CheckCircleIcon(props: IconProps) {
  const { className } = props;
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={className} aria-hidden>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </svg>
  );
}
function LockIcon(props: IconProps) {
  const { className } = props;
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={className} aria-hidden>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M7 10V8a5 5 0 1 1 10 0v2m-9 0h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"/>
    </svg>
  );
}
function CloudIcon(props: IconProps) {
  const { className } = props;
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={className} aria-hidden>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.58-1.5A4.5 4.5 0 1 1 17 18H7Z"/>
    </svg>
  );
}
function SwatchIcon(props: IconProps) {
  const { className } = props;
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={className} aria-hidden>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M4 13a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5Zm2-4h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H8L6 5v4Z"/>
    </svg>
  );
}
function ArrowsIcon(props: IconProps) {
  const { className } = props;
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={className} aria-hidden>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M3 7h13l-3-3m3 3-3 3M21 17H8l3-3m-3 3 3 3"/>
    </svg>
  );
}
function WrenchIcon(props: IconProps) {
  const { className } = props;
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={className} aria-hidden>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M14 7a4 4 0 1 0-5 5l-6 6 3 3 6-6a4 4 0 0 0 5-5Z"/>
    </svg>
  );
}

type Feature = {
  title: string;
  description: string;
  badge?: string;
};

type FeatureCategory = {
  name: string;
  features: Feature[];
};

const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    name: "Notes",
    features: [
      {
        title: "Markdown & Diagrams",
        description:
          "Beautiful Markdown with code blocks and diagram rendering (e.g., Mermaid).",
      },
      {
        title: "Layouts, Search & Tags",
        description:
          "Multiple note layouts, fast search, and tagging for effortless organization.",
      },
      {
        title: "Note Templates",
        description: "Reusable templates to standardize your note structure.",
      },
      {
        title: "Secure Sharing",
        description: "Share notes via secure, time‑bound links when you choose.",
      },
    ],
  },
  {
    name: "Intelligence",
    features: [
      {
        title: "Per‑Note Summaries",
        description: "Get the gist instantly with on‑demand summaries for each note.",
      },
      {
        title: "AI Assistant",
        description:
          "Chat with an assistant that can reference your notes and personal knowledge—securely scoped to you.",
      },
    ],
  },
  {
    name: "Productivity",
    features: [
      { title: "To‑Do List", description: "Capture tasks inline and keep momentum." },
      {
        title: "Streaks & Notifications",
        description:
          "Build habits with streak tracking and smart reminders.",
      },
    ],
  },
  {
    name: "Privacy & Security",
    features: [
      {
        title: "App Lock",
        description: "Protect access with PIN or biometric (where supported).",
      },
      {
        title: "Local‑Only Mode",
        description:
          "Full privacy with cloud disabled—your data stays on your device.",
      },
      {
        title: "Account & Theme Reset",
        description: "One‑tap account deletion and theme reset options.",
      },
    ],
  },
  {
    name: "Sync & Reliability",
    features: [
      {
        title: "Cloud Sync",
        description: "Stay in sync across devices with conflict‑free merging.",
      },
      {
        title: "Background Workers",
        description:
          "Work continues in the background; syncing resumes automatically.",
      },
      {
        title: "Custom Schedules",
        description:
          "Tune background sync intervals to your preferences.",
      },
      {
        title: "Offline First",
        description:
          "Full offline access; changes sync seamlessly when you reconnect.",
      },
    ],
  },
  {
    name: "Customization",
    features: [
      {
        title: "Themes",
        description: "18 themes, including dynamic Material You on Android.",
      },
      {
        title: "Fonts",
        description: "Choose from multiple Google Fonts with live preview.",
      },
    ],
  },
  {
    name: "Data Portability",
    features: [
      {
        title: "Import / Export",
        description:
          "One‑click import/export of notes, templates, settings, and streaks.",
      },
    ],
  },
  {
    name: "Updates & Admin",
    features: [
      {
        title: "In‑App Updates",
        description:
          "Download the latest version directly from the official site.",
      },
      {
        title: "Admin Tools",
        description: "Contact form, debugging utilities, and CMS access.",
      },
    ],
  },
];

const CATEGORY_META: Record<string, { icon: ComponentType<IconProps>; wrapperClass: string; iconClass: string }> = {
  "Notes": {
    icon: PencilIcon,
    wrapperClass: "from-indigo-500/10 to-purple-500/10",
    iconClass: "text-indigo-600 dark:text-indigo-400",
  },
  "Intelligence": {
    icon: SparklesIcon,
    wrapperClass: "from-violet-500/10 to-fuchsia-500/10",
    iconClass: "text-violet-600 dark:text-violet-400",
  },
  "Productivity": {
    icon: CheckCircleIcon,
    wrapperClass: "from-emerald-500/10 to-teal-500/10",
    iconClass: "text-emerald-600 dark:text-emerald-400",
  },
  "Privacy & Security": {
    icon: LockIcon,
    wrapperClass: "from-amber-500/10 to-orange-500/10",
    iconClass: "text-amber-600 dark:text-amber-400",
  },
  "Sync & Reliability": {
    icon: CloudIcon,
    wrapperClass: "from-sky-500/10 to-cyan-500/10",
    iconClass: "text-sky-600 dark:text-sky-400",
  },
  "Customization": {
    icon: SwatchIcon,
    wrapperClass: "from-fuchsia-500/10 to-pink-500/10",
    iconClass: "text-fuchsia-600 dark:text-fuchsia-400",
  },
  "Data Portability": {
    icon: ArrowsIcon,
    wrapperClass: "from-cyan-500/10 to-teal-500/10",
    iconClass: "text-cyan-600 dark:text-cyan-400",
  },
  "Updates & Admin": {
    icon: WrenchIcon,
    wrapperClass: "from-orange-500/10 to-rose-500/10",
    iconClass: "text-orange-600 dark:text-orange-400",
  },
};

type FeatureCardProps = { feature: Feature };
function FeatureCard(props: FeatureCardProps) {
  const { feature } = props;
  return (
    <div className="group relative rounded-2xl border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-6 shadow-sm transition-transform transition-shadow duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold tracking-tight">{feature.title}</h3>
        {feature.badge && (
          <span className="ml-3 inline-flex items-center rounded-full bg-neutral-100 dark:bg-slate-700 px-2.5 py-0.5 text-xs font-medium text-neutral-700 dark:text-slate-200">
            {feature.badge}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm text-neutral-600 dark:text-slate-300 leading-6">
        {feature.description}
      </p>
    </div>
  );
}

type FeatureCategorySectionProps = { category: FeatureCategory };
function FeatureCategorySection(props: FeatureCategorySectionProps) {
  const { category } = props;
  const meta = CATEGORY_META[category.name];
  return (
    <section className="mb-14 group">
      <div className="flex items-center gap-3 mb-6">
        <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-inset ring-neutral-200 dark:ring-slate-700 bg-gradient-to-br ${meta?.wrapperClass || "from-neutral-200 to-neutral-100"} transition-transform duration-200 group-hover:scale-105`}>
          {meta?.icon ? (
            <meta.icon className={`h-5 w-5 ${meta.iconClass}`} />
          ) : (
            <PencilIcon className="h-5 w-5 text-neutral-600" />
          )}
        </span>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">{category.name}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.features.map((f) => (
          <FeatureCard key={`${category.name}-${f.title}`} feature={f} />
        ))}
      </div>
    </section>
  );
}

export default function FeaturesPage() {
  return (
    <main>
      <Container>
        <Header />
        <article className="mb-24">
          <PostTitle>Features</PostTitle>
          <p className="max-w-2xl text-neutral-600 dark:text-slate-300 leading-7 mb-10">
            Built for speed, privacy, and control. Explore what you can do today.
          </p>
          {FEATURE_CATEGORIES.map((category) => (
            <FeatureCategorySection key={category.name} category={category} />)
          )}
        </article>
      </Container>
    </main>
  );
}


