import { NextRequest, NextResponse } from 'next/server';
import { getLatestVersion } from '@/lib/versions';
import { SITE_URL } from '@/lib/constants';

// Cache control - allow caching for 5 minutes since version data doesn't change frequently
export const dynamic = 'force-dynamic';
export const revalidate = 300; // 5 minutes

interface UpdateCheckRequest {
  version?: string;
  buildNumber?: number;
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

        // Check if update is available (client build number < latest build number)
        if (clientBuild < latestVersion.buildNumber) {
          response.updateAvailable = true;
          response.message = `New version ${latestVersion.version} is available!`;
        } else if (clientBuild === latestVersion.buildNumber) {
          response.message = 'You are running the latest version.';
        } else {
          response.message = 'You are running a newer version than what\'s officially released.';
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

      // Check if update is available (client build number < latest build number)
      if (body.buildNumber < latestVersion.buildNumber) {
        response.updateAvailable = true;
        response.message = `New version ${latestVersion.version} is available!`;
      } else if (body.buildNumber === latestVersion.buildNumber) {
        response.message = 'You are running the latest version.';
      } else {
        response.message = 'You are running a newer version than what\'s officially released.';
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
