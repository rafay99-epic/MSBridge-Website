"use client";

import { useEffect, useState } from 'react';
import Container from "@/app/_components/container";
import { PostTitle } from "@/app/_components/post-title";
import AudioPlayer from "@/app/_components/audio-player";
import Link from "next/link";
import { VoiceNoteResponse } from "@/interfaces/voice-note";

export default function VoiceNotePage({ params }: { params: Promise<{ shareId: string }> }) {
  const [voiceNote, setVoiceNote] = useState<VoiceNoteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    async function loadVoiceNote() {
      try {
        const { shareId } = await params;
        if (!shareId) {
          setError('Invalid link.');
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/voice-notes/${shareId}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError('This voice note does not exist or was disabled.');
          } else if (response.status === 403) {
            setError('This link is not viewable.');
          } else {
            setError('Failed to load voice note. Please try again.');
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        setVoiceNote(data);
        setLoading(false);
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'Unknown error';
        setError('Failed to load voice note: ' + errorMessage);
        setLoading(false);
      }
    }

    loadVoiceNote();
  }, [params]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast({ message: 'Link copied to clipboard!', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (e) {
      console.error(e);
      setToast({ message: 'Failed to copy link', type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Container>
      <article className="mb-32">
        {/* Header */}
        <div className="mb-16 text-center">
          <PostTitle>Shared Voice Note</PostTitle>
          <p className="text-lg text-neutral-600 dark:text-slate-300 max-w-2xl mx-auto">
            Listen to a voice note shared from MS Bridge App
          </p>
        </div>

        {/* Voice Note Content */}
        <div className="max-w-4xl mx-auto">
          {loading && (
            <div className="flex items-center justify-center gap-3 py-16">
              <div className="h-8 w-8 border-2 border-neutral-300 dark:border-slate-600 border-t-neutral-900 dark:border-t-slate-100 rounded-full animate-spin"></div>
              <div className="text-lg text-neutral-600 dark:text-slate-300">Loading voice note…</div>
            </div>
          )}
          
          {error && (
            <div className="text-center py-16">
              <div className="text-rose-500 text-lg mb-6">{error}</div>
              <Link 
                href="/" 
                className="inline-flex items-center px-6 py-3 bg-neutral-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-medium hover:bg-neutral-800 dark:hover:bg-slate-200 transition-colors"
              >
                Go Home
              </Link>
            </div>
          )}
          
          {voiceNote && (
            <>
              {/* Voice Note Info */}
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-slate-100 mb-3">
                  {voiceNote.title}
                </h2>
                {voiceNote.description && (
                  <p className="text-lg text-neutral-600 dark:text-slate-300 mb-4">
                    {voiceNote.description}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-slate-400">
                  <span>Shared • {new Date(voiceNote.updatedAt).toLocaleString()}</span>
                  <span>•</span>
                  <span>{formatDuration(voiceNote.duration)}</span>
                  <span>•</span>
                  <span>{formatFileSize(voiceNote.fileSize)}</span>
                  {voiceNote.ownerEmail && (
                    <>
                      <span>•</span>
                      <span>by {voiceNote.ownerEmail}</span>
                    </>
                  )}
                </div>
              </div>
              
              {/* Audio Player */}
              <div className="mb-8">
                <AudioPlayer
                  audioUrl={voiceNote.audioUrl}
                  title={voiceNote.title}
                  duration={voiceNote.duration}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center pt-8 border-t border-neutral-200 dark:border-slate-700">
                <button 
                  onClick={copyLink}
                  className="inline-flex items-center justify-center gap-3 rounded-xl px-6 py-3 bg-neutral-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium hover:bg-neutral-800 dark:hover:bg-slate-200 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy link
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <p className="text-sm text-neutral-500 dark:text-slate-400">
            This voice note was shared from MS Bridge, a modern note-taking app
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Link 
              href="/" 
              className="text-sm text-neutral-600 dark:text-slate-300 hover:text-neutral-900 dark:hover:text-slate-100 transition-colors"
            >
              Learn More
            </Link>
            <span className="text-neutral-400">•</span>
            <Link 
              href="/features" 
              className="text-sm text-neutral-600 dark:text-slate-300 hover:text-neutral-900 dark:hover:text-slate-100 transition-colors"
            >
              Features
            </Link>
          </div>
        </div>
      </article>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-xl shadow-2xl transition-all duration-300 border ${
          toast.type === 'success' 
            ? 'bg-white dark:bg-slate-800 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200' 
            : 'bg-white dark:bg-slate-800 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200'
        }`}>
          <div className="flex items-center gap-3">
            {toast.type === 'success' ? (
              <div className="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            ) : (
              <div className="flex-shrink-0 w-5 h-5 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <svg className="h-3 w-3 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <span className="font-medium text-sm">{toast.message}</span>
          </div>
        </div>
      )}
    </Container>
  );
}
