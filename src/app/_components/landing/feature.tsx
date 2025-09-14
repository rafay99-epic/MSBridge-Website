import {
    DocumentTextIcon,
    SparklesIcon,
    CheckCircleIcon,
    ShieldCheckIcon,
    CloudIcon,
    AdjustmentsHorizontalIcon,
    ArrowPathIcon,
    WrenchScrewdriverIcon,
  } from "@heroicons/react/24/outline";
import { MicIcon } from "lucide-react";
  
  const features = [
    {
      name: "Notes",
      description:
        "Rich note rendering with Markdown, code blocks, diagrams, and reusable templates.",
      icon: DocumentTextIcon,
    },
    {
      name: "Intelligence",
      description:
        "AI summaries and a chat assistant with scoped access to your notes.",
      icon: SparklesIcon,
    },
    {
      name: "Productivity",
      description:
        "Built‑in to‑do list, streaks, and smart notifications to keep you on track.",
      icon: CheckCircleIcon,
    },
    {
      name: "Privacy & Security",
      description:
        "PIN/biometric lock, local‑only mode, and one‑tap account deletion.",
      icon: ShieldCheckIcon,
    },
    {
      name: "Sync & Reliability",
      description:
        "Cloud sync across devices, offline access, and conflict‑free background sync.",
      icon: CloudIcon,
    },
    {
      name: "Customization",
      description:
        "19 themes, Material You support, and multiple Google Fonts with live preview.",
      icon: AdjustmentsHorizontalIcon,
    },
    {
      name: "Voice Notes",
      description:
        "Effortless recording with auto-save protection for uninterrupted voice capture.",
      icon: MicIcon,
    },
    {
      name: "Data Portability",
      description:
        "One‑click import/export of notes, templates, settings, and streaks.",
      icon: ArrowPathIcon,
    },
    {
      name: "Updates & Operations",
      description:
        "In‑app updater, admin tools, debugging utilities, and CMS access.",
      icon: WrenchScrewdriverIcon,
    },

  ];
  
  export default function Features() {
    return (
      <section className="relative px-4 sm:px-6 md:px-10 py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-neutral-900 dark:text-white">
            Powerful Features
          </h2>
          <p className="mt-4 text-center text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Everything you need to take notes, stay productive, and keep your data
            secure.
          </p>
  
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="flex flex-col items-start rounded-2xl bg-neutral-50 dark:bg-slate-800 p-6 shadow-md hover:shadow-lg transition"
              >
                <feature.icon className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }