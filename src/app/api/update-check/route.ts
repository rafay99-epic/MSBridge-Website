import { NextRequest, NextResponse } from 'next/server';
import { getLatestVersion, getAllVersions } from '@/lib/versions';
import { SITE_URL } from '@/lib/constants';

// Cache control - allow caching for 5 minutes since version data doesn't change frequently
export const dynamic = 'force-dynamic';
export const revalidate = 300; // 5 minutes

interface UpdateCheckRequest {
  version?: string;
  buildNumber?: number;
}

// Simple API key validation
function validateApiKey(apiKey: string | null): boolean {
  if (!apiKey) return false;
  
  const validApiKey = process.env.MS_BRIDGE_API_KEY;
  if (!validApiKey) {
    console.error('MS_BRIDGE_API_KEY environment variable not set');
    return false;
  }
  
  return apiKey === validApiKey;
}

// Check if version exists in our versions list
function versionExists(version: string, buildNumber: number): boolean {
  const allVersions = getAllVersions();
  return allVersions.some(v => v.version === version && v.buildNumber === buildNumber);
}

interface UpdateCheckResponse {
  status: 'live';
  latestVersion: {
    version: string;
    buildNumber: number;
    downloadUrl: string;
    changelog?: string;
    releaseDate: string;
  };
  updateAvailable: boolean;
  currentVersion?: {
    version: string;
    buildNumber: number;
  };
  message?: string;
}

export async function GET(request: NextRequest) {
  try {
    // API key validation
    const apiKey = request.headers.get('x-api-key') || request.nextUrl.searchParams.get('apiKey');
    if (!validateApiKey(apiKey)) {
      return NextResponse.json(
        { error: 'Invalid or missing API key' },
        { status: 401 }
      );
    }

    // Extract version and build number from query parameters
    const { searchParams } = new URL(request.url);
    const clientVersion = searchParams.get('version');
    const clientBuildNumber = searchParams.get('buildNumber');

    // Get the latest version from our versions data
    const latestVersion = getLatestVersion();
    
    if (!latestVersion) {
      return NextResponse.json(
        { error: 'No versions available' },
        { status: 500 }
      );
    }

    // Convert download URL to absolute URL if it's relative
    const downloadUrl = latestVersion.downloadUrl.startsWith('http') 
      ? latestVersion.downloadUrl 
      : `${SITE_URL}${latestVersion.downloadUrl}`;

    const response: UpdateCheckResponse = {
      status: 'live',
      latestVersion: {
        version: latestVersion.version,
        buildNumber: latestVersion.buildNumber,
        downloadUrl,
        changelog: latestVersion.changelog,
        releaseDate: latestVersion.releaseDate,
      },
      updateAvailable: false,
    };

    // If client provided version info, check for updates
    if (clientVersion && clientBuildNumber) {
      const clientBuild = parseInt(clientBuildNumber, 10);
      
      if (!isNaN(clientBuild)) {
        response.currentVersion = {
          version: clientVersion,
          buildNumber: clientBuild,
        };

        // Check if the client version exists in our versions list
        if (!versionExists(clientVersion, clientBuild)) {
          response.message = 'Invalid version detected. Please download the latest version.';
          response.updateAvailable = true;
        } else if (clientBuild < latestVersion.buildNumber) {
          response.updateAvailable = true;
          response.message = `New version ${latestVersion.version} is available!`;
        } else if (clientBuild === latestVersion.buildNumber) {
          response.message = 'You are running the latest version.';
        } else {
          response.message = 'Your app is already updated to the latest version.';
        }
      }
    }

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // 5 min cache, 10 min stale
      },
    });

  } catch (error) {
    console.error('Error in update check API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // API key validation
    const apiKey = request.headers.get('x-api-key');
    if (!validateApiKey(apiKey)) {
      return NextResponse.json(
        { error: 'Invalid or missing API key' },
        { status: 401 }
      );
    }

    const body: UpdateCheckRequest = await request.json();
    
    // Get the latest version from our versions data
    const latestVersion = getLatestVersion();
    
    if (!latestVersion) {
      return NextResponse.json(
        { error: 'No versions available' },
        { status: 500 }
      );
    }

    // Convert download URL to absolute URL if it's relative
    const downloadUrl = latestVersion.downloadUrl.startsWith('http') 
      ? latestVersion.downloadUrl 
      : `${SITE_URL}${latestVersion.downloadUrl}`;

    const response: UpdateCheckResponse = {
      status: 'live',
      latestVersion: {
        version: latestVersion.version,
        buildNumber: latestVersion.buildNumber,
        downloadUrl,
        changelog: latestVersion.changelog,
        releaseDate: latestVersion.releaseDate,
      },
      updateAvailable: false,
    };

    // If client provided version info, check for updates
    if (body.version && body.buildNumber) {
      response.currentVersion = {
        version: body.version,
        buildNumber: body.buildNumber,
      };

      // Check if the client version exists in our versions list
      if (!versionExists(body.version, body.buildNumber)) {
        response.message = 'Invalid version detected. Please download the latest version.';
        response.updateAvailable = true;
      } else if (body.buildNumber < latestVersion.buildNumber) {
        response.updateAvailable = true;
        response.message = `New version ${latestVersion.version} is available!`;
      } else if (body.buildNumber === latestVersion.buildNumber) {
        response.message = 'You are running the latest version.';
      } else {
        response.message = 'Your app is already updated to the latest version.';
      }
    }

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // 5 min cache, 10 min stale
      },
    });

  } catch (error) {
    console.error('Error in update check API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
