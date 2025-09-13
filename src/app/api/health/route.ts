import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface HealthResponse {
  status: 'healthy';
  timestamp: string;
  uptime: number;
  version: string;
}

function validateApiKey(apiKey: string | null): boolean {
  if (!apiKey) return false;
  
  const validApiKey = process.env.MS_BRIDGE_API_KEY;
  if (!validApiKey) {
    console.error('MS_BRIDGE_API_KEY environment variable not set');
    return false;
  }
  
  return apiKey === validApiKey;
}

export async function GET(request: NextRequest) {
  try {
    // API key validation
    const apiKey = request.headers.get('x-api-key');
    if (!validateApiKey(apiKey)) {
      return NextResponse.json(
        { error: 'Invalid or missing API key' },
        { status: 401 }
      );
    }

    const response: HealthResponse = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '2.0.0', 
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (error) {
    console.error('Error in health check:', error);
    return NextResponse.json(
      { error: 'Health check failed' },
      { status: 500 }
    );
  }
}
