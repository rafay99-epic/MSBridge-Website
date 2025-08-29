"use client";

import { useEffect, useState } from 'react';
import Container from "@/app/_components/container";
import { PostTitle } from "@/app/_components/post-title";
import Link from "next/link";



function deltaToHtml(content: string) {
  try {
    const json = JSON.parse(content);
    let ops: QuillOp[] | null = null;
    if (Array.isArray(json)) {
      ops = json;
    } else if (json && Array.isArray(json.ops)) {
      ops = json.ops;
    }
    if (ops) {
      // Simple conversion for Quill Delta to HTML
      let html = '';
      ops.forEach((op: QuillOp) => {
        if (op.insert) {
          if (typeof op.insert === 'string') {
            let text = op.insert;
            if (op.attributes) {
              if (op.attributes.bold) text = `<strong>${text}</strong>`;
              if (op.attributes.italic) text = `<em>${text}</em>`;
              if (op.attributes.underline) text = `<u>${text}</u>`;
              if (op.attributes.link) text = `<a href="${op.attributes.link}" target="_blank" rel="noopener noreferrer">${text}</a>`;
              if (op.attributes['code-block']) text = `<pre><code>${text}</code></pre>`;
              else if (op.attributes.code) text = `<code>${text}</code>`;
            }
            html += text;
          }
        }
      });
      return html || '<p>No content</p>';
    }
  } catch (e) {
    console.error(e);
    return `<p>${content.replace(/\n/g, '<br/>')}</p>`;
  }
  // Fallback: treat as plain text with basic escaping
  return `<p>${content.replace(/\n/g, '<br/>')}</p>`;
}


interface NoteData {
    title: string;
    content: string;
    updatedAt: number;
  }
  
  interface QuillOp {
    insert: string;
    attributes?: {
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      link?: string;
      'code-block'?: boolean;
      code?: boolean;
    };
  }
export default function SharedNotePage({ params }: { params: Promise<{ shareId: string }> }) {
  const [note, setNote] = useState<NoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    async function loadNote() {
      try {
        const { shareId } = await params;
        if (!shareId) {
          setError('Invalid link.');
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/shared-notes/${shareId}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError('This shared note does not exist or was disabled.');
          } else if (response.status === 403) {
            setError('This link is not viewable.');
          } else {
            setError('Failed to load note. Please try again.');
          }
          setLoading(false);
          return;
        }

        const data = await response.json();

        setNote({
          title: data.title || 'Untitled',
          content: data.content || '',
          updatedAt: data.updatedAt ? (data.updatedAt.toDate ? data.updatedAt.toDate().getTime() : data.updatedAt) : Date.now()
        });
        setLoading(false);
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'Unknown error';
        setError('Failed to load note: ' + errorMessage);
        setLoading(false);
      }
    }

    loadNote();
  }, [params]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast({ message: 'Link copied to clipboard!', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (e) {
      console.error(e);
      console.error('Failed to copy link');
      setToast({ message: 'Failed to copy link', type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const copyNote = async () => {
    try {
      const content = document.getElementById('content')?.innerText || '';
      await navigator.clipboard.writeText(content);
      setToast({ message: 'Note copied to clipboard!', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (e) {
      console.error(e);
      console.error('Failed to copy note');
      setToast({ message: 'Failed to copy note', type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
      <Container>
        <article className="mb-32">
          {/* Header */}
          <div className="mb-16 text-center">
            <PostTitle>Shared Note</PostTitle>
            <p className="text-lg text-neutral-600 dark:text-slate-300 max-w-2xl mx-auto">
              View a note shared from MS Bridge App
            </p>
          </div>

          {/* Note Content */}
          <div className="max-w-4xl mx-auto">
            {loading && (
              <div className="flex items-center justify-center gap-3 py-16">
                <div className="h-8 w-8 border-2 border-neutral-300 dark:border-slate-600 border-t-neutral-900 dark:border-t-slate-100 rounded-full animate-spin"></div>
                <div className="text-lg text-neutral-600 dark:text-slate-300">Loading note…</div>
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
            
            {note && (
              <>
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-slate-100 mb-3">
                    {note.title}
                  </h2>
                  <div className="text-sm text-neutral-500 dark:text-slate-400">
                    Shared • {new Date(note.updatedAt).toLocaleString()}
                  </div>
                </div>
                
                <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                  <div 
                    id="content"
                    dangerouslySetInnerHTML={{ __html: deltaToHtml(note.content) }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-neutral-200 dark:border-slate-700">
                  <button 
                    onClick={copyLink}
                    className="inline-flex items-center justify-center gap-3 rounded-xl px-6 py-3 bg-neutral-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium hover:bg-neutral-800 dark:hover:bg-slate-200 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy link
                  </button>
                  
                  <button 
                    onClick={copyNote}
                    className="inline-flex items-center justify-center gap-3 rounded-xl px-6 py-3 border-2 border-neutral-300 dark:border-slate-600 text-neutral-700 dark:text-slate-300 font-medium hover:bg-neutral-50 dark:hover:bg-slate-800 hover:border-neutral-400 dark:hover:border-slate-500 transition-all duration-200"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Copy note
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-16 text-center">
            <p className="text-sm text-neutral-500 dark:text-slate-400">
              This note was shared from MS Bridge, a modern note-taking app
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
