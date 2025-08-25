export type AppVersion = {
  version: string;
  buildNumber: number;
  releaseDate: string; // ISO string
  changelog?: string;
  downloadUrl: string; // URL to APK
};

// In a real app this could be fetched from an API or CMS
const versions: AppVersion[] = [
  {
    version: "1.3.0",
    buildNumber: 130,
    releaseDate: "2025-08-15",
    changelog: "Performance improvements, dark mode polish, bug fixes",
    downloadUrl: "/downloads/ms-bridge-1.3.0.apk",
  },
  {
    version: "1.2.0",
    buildNumber: 120,
    releaseDate: "2025-07-10",
    changelog: "AI notes assistant, profile enhancements",
    downloadUrl: "/downloads/ms-bridge-1.2.0.apk",
  },
  {
    version: "1.1.0",
    buildNumber: 110,
    releaseDate: "2025-06-01",
    changelog: "New dashboard, settings revamp",
    downloadUrl: "/downloads/ms-bridge-1.1.0.apk",
  },
  {
    version: "1.0.0",
    buildNumber: 100,
    releaseDate: "2025-05-01",
    changelog: "Initial release",
    downloadUrl: "/downloads/ms-bridge-1.0.0.apk",
  },
];

export function getAllVersions(): AppVersion[] {
  return [...versions].sort((a, b) => b.buildNumber - a.buildNumber);
}

export function getLatestVersion(): AppVersion | undefined {
  return getAllVersions()[0];
}


