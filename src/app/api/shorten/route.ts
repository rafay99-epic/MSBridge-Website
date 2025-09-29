
import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

let app: App;
if (!getApps().length) {
  app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    }),
  });
} else {
  app = getApps()[0]!;
}
const db = getFirestore(app);

type ShortenRequest = { shareId: string; type: 'note' | 'voice'; originalUrl: string; };

function validateApiKey(apiKey: string | null): boolean {
  const requiredKey = process.env.MS_BRIDGE_API_KEY;
  return !!requiredKey && apiKey === requiredKey;
}

function isValidPayload(body: unknown): body is ShortenRequest {
  if (!body || typeof body !== 'object') return false;
  const { shareId, type, originalUrl } = body as Record<string, unknown>;
  return typeof shareId === 'string' && !!shareId.trim()
    && (type === 'note' || type === 'voice')
    && typeof originalUrl === 'string' && originalUrl.startsWith('http');
}

function generateShortCode(length = 7): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) result += alphabet[Math.floor(Math.random() * alphabet.length)];
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');
    if (!validateApiKey(apiKey)) {
      return NextResponse.json({ error: 'Invalid or missing API key' }, { status: 401 });
    }

    const body = await request.json();
    if (!isValidPayload(body)) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
    }

    const { shareId, type, originalUrl } = body as ShortenRequest;
    const indexId = `${type}_${shareId}`;
    const indexRef = db.collection('short_links_index').doc(indexId);
    const indexSnap = await indexRef.get();

    let code: string | null = indexSnap.exists ? (indexSnap.data()?.code as string | undefined) || null : null;

    if (!code) {
      for (let attempts = 0; attempts < 5; attempts++) {
        const candidate = generateShortCode();
        const codeRef = db.collection('short_links').doc(candidate);
        try {
          await codeRef.create({
            shareId,
            type,
            originalUrl,
            clickCount: 0,
            createdAt: new Date(),
          });
          await indexRef.set({ code: candidate, shareId, type }, { merge: true });
          code = candidate;
          break;
        } catch (error) {
          console.error('Error in shorten:', error);
          // Collision or transient error; retry
          if (attempts === 4) {
            return NextResponse.json({ error: 'Failed to allocate code' }, { status: 500 });
          }
        }
      }
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    return NextResponse.json({ shortUrl: `${siteUrl}/r/${code}`, shortCode: code }, { status: 200 });
  } catch (error) {
    console.error('Error in shorten:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}