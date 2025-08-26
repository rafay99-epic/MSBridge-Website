import Container from "@/app/_components/container";
import { PostTitle } from "@/app/_components/post-title";
import { FEATURE_CATEGORIES } from "@/lib/constants";
import { type ComponentType } from "react";
import {
  FileText,
  Sparkles,
  CircleCheck,
  ShieldCheck,
  Cloud,
  Palette,
  ArrowLeftRight,
  Wrench,
} from "lucide-react";

const CATEGORY_META: Record<string, { icon: ComponentType<any>; wrapperClass: string; iconClass: string }> = {
  "Notes": {
    icon: FileText,
    wrapperClass: "from-indigo-500/10 to-purple-500/10",
    iconClass: "text-indigo-600 dark:text-indigo-400",
  },
  "Intelligence": {
    icon: Sparkles,
    wrapperClass: "from-violet-500/10 to-fuchsia-500/10",
    iconClass: "text-violet-600 dark:text-violet-400",
  },
  "Productivity": {
    icon: CircleCheck,
    wrapperClass: "from-emerald-500/10 to-teal-500/10",
    iconClass: "text-emerald-600 dark:text-emerald-400",
  },
  "Privacy & Security": {
    icon: ShieldCheck,
    wrapperClass: "from-amber-500/10 to-orange-500/10",
    iconClass: "text-amber-600 dark:text-amber-400",
  },
  "Sync & Reliability": {
    icon: Cloud,
    wrapperClass: "from-sky-500/10 to-cyan-500/10",
    iconClass: "text-sky-600 dark:text-sky-400",
  },
  "Customization": {
    icon: Palette,
    wrapperClass: "from-fuchsia-500/10 to-pink-500/10",
    iconClass: "text-fuchsia-600 dark:text-fuchsia-400",
  },
  "Data Portability": {
    icon: ArrowLeftRight,
    wrapperClass: "from-cyan-500/10 to-teal-500/10",
    iconClass: "text-cyan-600 dark:text-cyan-400",
  },
  "Updates & Admin": {
    icon: Wrench,
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
          {meta?.icon && (
            <meta.icon className={`h-5 w-5 ${meta.iconClass}`} />
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


