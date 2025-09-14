import Container from "@/app/_components/container";
import { PostTitle } from "@/app/_components/post-title";
import { FEATURE_CATEGORIES } from "@/lib/constants";
import { type LucideIcon } from "lucide-react";
import {
  FileText,
  Cloud,
  Palette,
  ArrowLeftRight,
  Wrench,
  Download,
  Settings,
  Brain,
  Lock,
  Target,
  Sparkles,
  Mic,
} from "lucide-react";

// Define types inline since they're not exported from interfaces
type Feature = {
  title: string;
  description: string;
  badge?: string;
};

type FeatureCategory = {
  name: string;
  features: Feature[];
};

const CATEGORY_META: Record<string, { 
  icon: LucideIcon; 
  iconClass: string;
  description: string;
  gradient: string;
}> = {
  "Notes": {
    icon: FileText,
    iconClass: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500/10 to-blue-600/5",
    description: "Powerful note-taking with rich formatting and organization"
  },
  "Intelligence": {
    icon: Brain,
    iconClass: "text-emerald-600 dark:text-emerald-400",
    gradient: "from-emerald-500/10 to-emerald-600/5",
    description: "AI-powered features that make your notes smarter"
  },
  "Productivity": {
    icon: Target,
    iconClass: "text-orange-600 dark:text-orange-400",
    gradient: "from-orange-500/10 to-orange-600/5",
    description: "Tools to boost your efficiency and build better habits"
  },
  "Privacy & Security": {
    icon: Lock,
    iconClass: "text-amber-600 dark:text-amber-400",
    gradient: "from-amber-500/10 to-amber-600/5",
    description: "Enterprise-grade security with complete privacy control"
  },
  "Sync & Reliability": {
    icon: Cloud,
    iconClass: "text-cyan-600 dark:text-cyan-400",
    gradient: "from-cyan-500/10 to-cyan-600/5",
    description: "Seamless synchronization across all your devices"
  },
  "Customization": {
    icon: Palette,
    iconClass: "text-fuchsia-600 dark:text-fuchsia-400",
    gradient: "from-fuchsia-500/10 to-fuchsia-600/5",
    description: "Personalize your experience with themes and fonts"
  },
  "Data Portability": {
    icon: ArrowLeftRight,
    iconClass: "text-teal-600 dark:text-teal-400",
    gradient: "from-teal-500/10 to-teal-600/5",
    description: "Full control over your data with easy import/export"
  },
  "Voice Notes": {
    icon: Mic,
    iconClass: "text-violet-600 dark:text-violet-400",
    gradient: "from-violet-500/10 to-violet-600/5",
    description: "Capture ideas instantly with powerful voice recording and sharing"
  },
  "Updates & Admin": {
    icon: Wrench,
    iconClass: "text-slate-600 dark:text-slate-400",
    gradient: "from-slate-500/10 to-slate-600/5",
    description: "Stay updated and manage your app experience"
  },
};

type FeatureCardProps = { feature: Feature; categoryName: string; index: number };
function FeatureCard({ feature, categoryName, index }: FeatureCardProps) {
  const meta = CATEGORY_META[categoryName];
  
  return (
    <div 
      className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:bg-neutral-50 dark:hover:bg-slate-800/80 transition-all duration-500 hover:border-neutral-300 dark:hover:border-slate-600"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Subtle gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${meta?.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative p-6">
        <div className="flex items-start gap-4">
          {/* Icon with enhanced styling */}
          <div className="relative flex-shrink-0">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${meta?.gradient} border border-neutral-200 dark:border-slate-700 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
              {meta?.icon && <meta.icon className={`h-6 w-6 ${meta?.iconClass} group-hover:scale-110 transition-transform duration-500`} />}
            </div>
            {/* Subtle glow effect */}
            <div className={`absolute inset-0 w-12 h-12 rounded-xl bg-gradient-to-br ${meta?.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors duration-300">
                {feature.title}
              </h3>
              {feature.badge && (
                <span className="ml-3 inline-flex items-center rounded-full bg-neutral-100 dark:bg-slate-700 px-2.5 py-0.5 text-xs font-medium text-neutral-700 dark:text-slate-200 group-hover:bg-neutral-200 dark:group-hover:bg-slate-600 transition-colors duration-300">
                  {feature.badge}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm text-neutral-600 dark:text-slate-300 leading-relaxed group-hover:text-neutral-700 dark:group-hover:text-slate-200 transition-colors duration-300">
              {feature.description}
            </p>
          </div>
        </div>
        
        {/* Subtle bottom accent line */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${meta?.iconClass.includes('blue') ? 'from-blue-500 to-blue-600' : 
          meta?.iconClass.includes('emerald') ? 'from-emerald-500 to-emerald-600' :
          meta?.iconClass.includes('orange') ? 'from-orange-500 to-orange-600' :
          meta?.iconClass.includes('amber') ? 'from-amber-500 to-amber-600' :
          meta?.iconClass.includes('cyan') ? 'from-cyan-500 to-cyan-600' :
          meta?.iconClass.includes('fuchsia') ? 'from-fuchsia-500 to-fuchsia-600' :
          meta?.iconClass.includes('teal') ? 'from-teal-500 to-teal-600' :
          meta?.iconClass.includes('violet') ? 'from-violet-500 to-violet-600' :
          'from-slate-500 to-slate-600'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl`} />
      </div>
    </div>
  );
}

type FeatureCategorySectionProps = { category: FeatureCategory; sectionIndex: number };
function FeatureCategorySection({ category }: FeatureCategorySectionProps) {
  const meta = CATEGORY_META[category.name];
  
  return (
    <section className="mb-20">
      {/* Enhanced Category Header */}    
      <div className="mb-10">
        <div className="flex items-start gap-6 mb-6">
          <div className="relative">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${meta?.gradient} border border-neutral-200 dark:border-slate-700 flex items-center justify-center shadow-lg`}>
              {meta?.icon && <meta.icon className={`h-8 w-8 ${meta?.iconClass}`} />}
            </div>
            {/* Glow effect for category icons */}
            <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${meta?.gradient} opacity-20 blur-2xl`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
                {category.name}
              </h2>
              {category.name === "Intelligence" && (
                <Sparkles className="h-6 w-6 text-emerald-500 animate-pulse" />
              )}
            </div>
            <p className="text-base text-neutral-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {meta?.description}
            </p>
          </div>
        </div>
        
        {/* Decorative line */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200 dark:border-slate-700" />
          </div>
          <div className="relative flex justify-start">
            <div className={`bg-gradient-to-r ${meta?.iconClass.includes('blue') ? 'from-blue-500 to-blue-600' : 
              meta?.iconClass.includes('emerald') ? 'from-emerald-500 to-emerald-600' :
              meta?.iconClass.includes('orange') ? 'from-orange-500 to-orange-600' :
              meta?.iconClass.includes('amber') ? 'from-amber-500 to-amber-600' :
              meta?.iconClass.includes('cyan') ? 'from-cyan-500 to-cyan-600' :
              meta?.iconClass.includes('fuchsia') ? 'from-fuchsia-500 to-fuchsia-600' :
              meta?.iconClass.includes('teal') ? 'from-teal-500 to-teal-600' :
              meta?.iconClass.includes('violet') ? 'from-violet-500 to-violet-600' :
              'from-slate-500 to-slate-600'} h-1 w-24 rounded-full`} />
          </div>
        </div>
      </div>
      
      {/* Enhanced Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {category.features.map((feature, index) => (
          <FeatureCard 
            key={`${category.name}-${feature.title}`} 
            feature={feature} 
            categoryName={category.name}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

export default function FeaturesPage() {
  return (
    <main className="relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <Container>
        <article className="relative mb-16">
          <div className="text-center mb-16">
            <PostTitle>Features</PostTitle>
            <p className="max-w-3xl mx-auto text-lg text-neutral-600 dark:text-slate-300 leading-8 mb-8">
              Built for speed, privacy, and control. Explore what you can do with MS Bridge today.
            </p>
            
            {/* Feature highlight stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">18+</div>
                <div className="text-sm text-neutral-600 dark:text-slate-300">Themes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">9</div>
                <div className="text-sm text-neutral-600 dark:text-slate-300">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">AI</div>
                <div className="text-sm text-neutral-600 dark:text-slate-300">Powered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">100%</div>
                <div className="text-sm text-neutral-600 dark:text-slate-300">Private</div>
              </div>
            </div>
          </div>
          
          {/* Features Sections */}
          <div className="space-y-16">
            {FEATURE_CATEGORIES.map((category, index) => (
              <FeatureCategorySection 
                key={category.name} 
                category={category} 
                sectionIndex={index}
              />
            ))}
          </div>

          {/* Enhanced Call to Action */}
          <div className="mt-24 text-center">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 shadow-2xl">
              <div className="relative rounded-3xl bg-white dark:bg-slate-900 p-12">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
                    Ready to transform your note-taking?
                  </h3>
                  <p className="text-lg text-neutral-600 dark:text-slate-300 mb-10 leading-relaxed">
                    Join thousands of users who&apos;ve already discovered the power of MS Bridge. 
                    Download today and experience the future of intelligent note-taking.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/downloads/latest"
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl transform"
                    >
                      <Download className="h-5 w-5 group-hover:animate-bounce" />
                      Download Now
                    </a>
                    <a
                      href="/versions"
                      className="inline-flex items-center gap-3 px-8 py-4 border-2 border-neutral-300 dark:border-slate-600 text-neutral-700 dark:text-slate-300 font-semibold rounded-2xl hover:bg-neutral-50 dark:hover:bg-slate-800 hover:border-neutral-400 dark:hover:border-slate-500 transition-all duration-300"
                    >
                      <Settings className="h-5 w-5" />
                      View Versions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
}

