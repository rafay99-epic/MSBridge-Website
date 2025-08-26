};
import { AppVersion } from "@/interfaces/version";
import { versions } from "@/lib/constants";

export function getAllVersions(): AppVersion[] {
  return [...versions].sort((a, b) => b.buildNumber - a.buildNumber);
}

export function getLatestVersion(): AppVersion | undefined {
  return getAllVersions()[0];
}


