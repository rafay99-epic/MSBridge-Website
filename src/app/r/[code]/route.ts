import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc, increment } from 'firebase/firestore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

// Server-side Firebase config (not exposed to client)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase only if not already initialized
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    if (!code) {
      return NextResponse.redirect(new URL('/404', req.url), 302);
    }

    const docRef = doc(db, 'short_links', code);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.redirect(new URL('/404', req.url), 302);
    }

    const data = docSnap.data() as {
      shareId: string;
      type: 'note' | 'voice';
      originalUrl?: string;
    };

    // Fire and forget analytics update
    updateDoc(docRef, {
      clickCount: increment(1),
      lastClicked: new Date(),
    }).catch((e) => console.error('Failed to update analytics', e));

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const destination = data.type === 'voice'
      ? `${siteUrl}/voice/${data.shareId}`
      : `${siteUrl}/s/${data.shareId}`;

    return NextResponse.redirect(destination, 302);
  } catch (error) {
    console.error('Redirect error:', error);
    return NextResponse.redirect('/', 302);
  }
}