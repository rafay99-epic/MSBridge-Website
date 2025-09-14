import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

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
  request: NextRequest,
  { params }: { params: Promise<{ shareId: string }> }
) {
  try {
    const { shareId } = await params;
    
    if (!shareId) {
      return NextResponse.json(
        { error: 'Invalid share ID' },
        { status: 400 }
      );
    }

    const docRef = doc(db, 'shared_voice_notes', shareId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: 'Voice note not found' },
        { status: 404 }
      );
    }

    const data = docSnap.data();
    
    if (!data.viewOnly) {
      return NextResponse.json(
        { error: 'Voice note not viewable' },
        { status: 403 }
      );
    }

    // Convert Firestore timestamps to numbers
    const createdAt = data.createdAt ? (data.createdAt.toDate ? data.createdAt.toDate().getTime() : data.createdAt) : Date.now();
    const updatedAt = data.updatedAt ? (data.updatedAt.toDate ? data.updatedAt.toDate().getTime() : data.updatedAt) : Date.now();

    // Return the voice note data
    return NextResponse.json({
      title: data.title || 'Untitled Voice Note',
      description: data.description || '',
      audioUrl: data.audioUrl || '',
      duration: data.duration || 0,
      fileSize: data.fileSize || 0,
      createdAt,
      updatedAt,
      ownerEmail: data.ownerEmail || '',
      viewOnly: data.viewOnly
    });

  } catch (error) {
    console.error('Error fetching voice note:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
