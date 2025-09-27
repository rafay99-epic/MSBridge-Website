import { AppVersion } from "@/interfaces/version";

export const EXAMPLE_PATH = "MS Bridge";
export const CMS_NAME = "MS Bridge";
export const HOME_OG_IMAGE_URL =
  "/assets/blog/org/msbridge.png";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const Stable_MSBridge_URL = `${SITE_URL}/downloads/ms-bridge-stable.apk`;
export const beta_MSBridge_URL = `${SITE_URL}/downloads/ms-bridge-beta.apk`;

export const versions: AppVersion[] = [
  {
    version: "8.1.0",
    buildNumber: 19,
    releaseDate: "2025-09-26",
    changelog:
      "Version 8.1  is a big updating adding new Features, like reading mode with it's own complex setting for user making sure that reading each note is easy and enjoyable. Now with Voice Notes we have added Streak system so no matter which notes it is you are not bound to make only one type of note.",
    downloadUrl: "/downloads/ms-bridge-8.1.0.apk",
  },
  {
    version: "8.0.0",
    buildNumber: 18,
    releaseDate: "2025-09-14",
    changelog:
      "Version 8.0 is a major update with new features and improvements, including voice notes, privacy and security, be able to export or import your voice notes, share your notes using a secure link.",
    downloadUrl: "/downloads/ms-bridge-8.0.0.apk",
  },
  {
    version: "7.10.0",
    buildNumber: 17,
    releaseDate: "2025-09-13",
    changelog:
      "Version 7.10 is a major update for keep your app upto date without repling on google play store or anyother app store, stright from our server, the latest and secure version of the app.",
    downloadUrl: "/downloads/ms-bridge-7.10.0.apk",
  },
  {
    version: "7.9.0",
    buildNumber: 16,
    releaseDate: "2025-09-12",
    changelog:
      "Defines your note-taking flow with a refreshed UI, smarter file exports, and improved stability. From streamlined permissions to Markdown/PDF filename sanitization, plus a simpler notes experience without pin clutter—this release makes the app smoother and more reliable than ever.",
    downloadUrl: "/downloads/ms-bridge-7.9.0.apk",
  },
  {
    version: "7.8.0",
    buildNumber: 15,
    releaseDate: "2025-09-10",
    changelog:
      "Faster, safer, smoother, PIN lock overhaul, enhanced security, improved app lifecycle management, logic separation, and development process improvements",
    downloadUrl: "/downloads/ms-bridge-7.8.0.apk",
  },
  {
    version: "7.7.0",
    buildNumber: 14,
    releaseDate: "2025-08-30",
    changelog:
      "PIN lock overhaul, enhanced security, improved app lifecycle management, logic separation, and development process improvements",
    downloadUrl: "/downloads/ms-bridge-7.7.0.apk",
  },
  {
    version: "7.6.0",
    buildNumber: 13,
    releaseDate: "2025-08-30",
    changelog:
      "AI image upload, chat history, streak notifications, PIN lock sync, email verification, advanced search tools, performance improvements, security enhancements",
    downloadUrl: "/downloads/ms-bridge-7.6.0.apk",
  },
  {
    version: "7.5.0",
    buildNumber: 12,
    releaseDate: "2025-08-26",
    changelog:
      "Settings sync, note templates, advanced search, background sync controls, markdown & diagram rendering, redesigned note UI, cloud-first streak refresh, major dependency and Flutter upgrade",
    downloadUrl: "/downloads/ms-bridge-7.5.0.apk",
  },
  {
    version: "7.4.0",
    buildNumber: 11,
    releaseDate: "2025-08-20",
    changelog:
      "Major UI/UX overhaul: redesigned app info, contact page, authentication screens, splash screen, custom text fields, theme system integration, accessibility and performance improvements",
    downloadUrl: "/downloads/ms-bridge-7.4.0.apk",
  },
  {
    version: "7.3.0",
    buildNumber: 10,
    releaseDate: "2025-08-19",
    changelog:
      "Full version history with diffs, restore/download, cleanup, cloud sync for versions, conflict resolution, streak sync, modernized error experience, Crashlytics logging improvements",
    downloadUrl: "/downloads/ms-bridge-7.3.0.apk",
  },
  {
    version: "7.2.0",
    buildNumber: 9,
    releaseDate: "2025-08-10",
    changelog:
      "Streak system with reminders and notifications, searchable modular settings UI, quick actions, profile header, reusable bottom sheets, notification integration, logout dialog redesign",
    downloadUrl: "/downloads/ms-bridge-7.2.0.apk",
  },
  {
    version: "7.1.0",
    buildNumber: 8,
    releaseDate: "2025-08-05",
    changelog:
      "Chat history with save/load/clear, About Author page, appearance settings, PIN settings bottom sheet, AI chat model persistence, improved AI summaries, backup/export improvements, performance optimizations",
    downloadUrl: "/downloads/ms-bridge-7.1.0.apk",
  },
  {
    version: "7.0.0",
    buildNumber: 7,
    releaseDate: "2025-08-01",
    changelog:
      "AI chat assistant, shareable view-only links, dynamic link handling, note tagging and folders, shared notes management, backup export/import, auto-sync scheduler, PIN lock, profile editing, dynamic themes, redesigned core screens",
    downloadUrl: "/downloads/ms-bridge-7.0.0.apk",
  },
  {
    version: "6.0.0",
    buildNumber: 6,
    releaseDate: "2025-07-20",
    changelog:
      "Fingerprint and Face ID authentication, in-app updates, update management UI, feature-flagged auto-save, refined note-taking and to-do UI, improved error handling, build and deployment automation",
    downloadUrl: "/downloads/ms-bridge-6.0.0.apk",
  },
  {
    version: "5.0.0",
    buildNumber: 5,
    releaseDate: "2025-07-10",
    changelog:
      "AI-powered note summarization, bottom sheet summaries with typing effect, AI model selection, auto-save, improved CreateNote with AI integration, app info page, dependency upgrades",
    downloadUrl: "/downloads/ms-bridge-5.0.0.apk",
  },
  {
    version: "4.0.0",
    buildNumber: 4,
    releaseDate: "2025-07-01",
    changelog:
      "Export notes to PDF/Markdown, task management screens, expandable action button, privacy policy and terms pages, bug report/feature request templates, improved media/storage access",
    downloadUrl: "/downloads/ms-bridge-4.0.0.apk",
  },
  {
    version: "3.0.0",
    buildNumber: 3,
    releaseDate: "2025-06-20",
    changelog:
      "Recycle bin for deleted notes, notes settings section, connectivity provider, pull-to-refresh, improved note formatting, error handling, settings layout simplification",
    downloadUrl: "/downloads/ms-bridge-3.0.0.apk",
  },
  {
    version: "2.0.0",
    buildNumber: 2,
    releaseDate: "2025-06-10",
    changelog:
      "Customizable settings tiles, animated splash screen with intro pages, CreateNote widget with rich text, NoteList widget, connectivity and admin settings, improved error handling and UI consistency",
    downloadUrl: "/downloads/ms-bridge-2.0.0.apk",
  },
  {
    version: "1.0.0",
    buildNumber: 1,
    releaseDate: "2025-05-01",
    changelog:
      "Initial release with splash screen, user registration, forgot password, settings, delete account, logout, app info, home, search, tags, danger screen, change password, contact us, Firebase auth, notes API, Hive local DB, auth gate, internet service, CMS web view",
    downloadUrl: "/downloads/ms-bridge-1.0.0.apk",
  },
];


type Feature = {
  title: string;
  description: string;
  badge?: string;
};

type FeatureCategory = {
  name: string;
  features: Feature[];
};

export const FEATURE_CATEGORIES: FeatureCategory[] = [
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
    name: "Voice Notes",
    features: [
      {
        title: "Effortless Recording",
        description: "Streamlined interface with auto-save protection for uninterrupted voice capture.",
      },
      {
        title: "Superior Audio Quality",
        description: "Multiple quality profiles from simple to lossless audio recording options.",
      },
      {
        title: "Rich Metadata",
        description: "Comprehensive details including size, timestamps, and storage information.",
      },
      {
        title: "Haptic Feedback",
        description: "Enhanced tactile interactions that respond to your touch.",
      },
      {
        title: "Secure Sharing",
        description: "Share voice notes via secure links with Firebase and Dynamic Links integration.",
      },
      {
        title: "Export & Download",
        description: "Export voice notes in multiple supported formats for external use.",
      },
      {
        title: "Privacy-First Design",
        description: "Complete local control with options to disable cloud features entirely.",
      },
      {
        title: "Open Source",
        description: "Full codebase available on GitHub for complete transparency and customization.",
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


//landing page images
export const phoneSets = [
  {
    center: "/assets/mobile_layout/intro1.webp",
    left: "/assets/mobile_layout/intro2.webp",
    right: "/assets/mobile_layout/intor3.webp",
  },
  {
    center: "/assets/mobile_layout/login.webp",
    left: "/assets/mobile_layout/create_account.webp",
    right: "/assets/mobile_layout/readNotes.webp",
  },
  {
    center: "/assets/mobile_layout/askAi.webp",
    left: "/assets/mobile_layout/setting.webp",
    right: "/assets/mobile_layout/searchNotes.webp",
  },
];
