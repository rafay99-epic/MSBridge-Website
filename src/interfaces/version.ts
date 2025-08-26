export type AppVersion = {
    version: string;
    buildNumber: number;
    releaseDate: string; // ISO string
    changelog?: string;
    downloadUrl: string; // URL to APK
  };
  