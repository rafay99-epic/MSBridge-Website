"use client";

import { useEffect, useState } from 'react';
import Container from "@/app/_components/container";
import { PostTitle } from "@/app/_components/post-title";
import Link from "next/link";
import { QuillDeltaToHtmlConverter, DeltaInsertOp } from 'quill-delta-to-html';


function deltaToHtml(content: string) {
  try {
    const json = JSON.parse(content);
    let ops = null;
    if (Array.isArray(json)) {
      ops = json;
    } else if (json && Array.isArray(json.ops)) {
      ops = json.ops;
    }
    
    if (ops) {
      // Use the quill-delta-to-html package
      const converter = new QuillDeltaToHtmlConverter(ops, {
        paragraphTag: 'p',
        encodeHtml: true,
        multiLineBlockquote: true,
        multiLineCodeblock: true,
        listItemTag: 'li',
        linkTarget: '_blank',


        // Custom CSS classes for different elements
        customCssClasses: (op: DeltaInsertOp) => {
          const classes: string[] = [];
          
          if (op.attributes) {
            // Headers
            if (op.attributes.header) {
              classes.push('font-bold', 'mb-4', 'mt-6', 'first:mt-0');
            }
            
            // Lists
            if (op.attributes.list) {
              if (op.attributes.list === 'bullet') {
                classes.push('mb-1');
              } else if (op.attributes.list === 'ordered') {
                classes.push('mb-1');
              }
            }
            
            // Inline code
            if (op.attributes.code) {
              classes.push('bg-neutral-100', 'dark:bg-slate-800', 'px-2', 'py-1', 'rounded', 'text-sm');
            }
            
            // Links
            if (op.attributes.link) {
              classes.push('text-blue-600', 'dark:text-blue-400', 'hover:underline');
            }
          }
          
          return classes;
        }
      });
      
      let html = converter.convert();
      
      // Post-process the HTML to add our custom styling
      html = html
        // Add classes to paragraphs
        .replace(/<p>/g, '<p class="mb-4 leading-relaxed">')
        // Add classes to lists
        .replace(/<ul>/g, '<ul class="list-disc space-y-1 mb-4 pl-5">')
        .replace(/<ol>/g, '<ol class="list-decimal space-y-1 mb-4 pl-5">')
        // Add classes to headers - make them bigger and more prominent
        .replace(/<h1>/g, '<h1 class="text-4xl font-bold mb-6 mt-8 first:mt-0 text-neutral-900 dark:text-slate-100">')
        .replace(/<h2>/g, '<h2 class="text-3xl font-bold mb-5 mt-7 first:mt-0 text-neutral-900 dark:text-slate-100">')
        .replace(/<h3>/g, '<h3 class="text-2xl font-bold mb-4 mt-6 first:mt-0 text-neutral-900 dark:text-slate-100">')
        .replace(/<h4>/g, '<h4 class="text-xl font-bold mb-4 mt-6 first:mt-0 text-neutral-900 dark:text-slate-100">')
        .replace(/<h5>/g, '<h5 class="text-lg font-bold mb-4 mt-6 first:mt-0 text-neutral-900 dark:text-slate-100">')
        .replace(/<h6>/g, '<h6 class="text-base font-bold mb-4 mt-6 first:mt-0 text-neutral-900 dark:text-slate-100">')
        // Add classes to blockquotes
        .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-neutral-300 dark:border-slate-600 pl-4 py-2 mb-4 italic text-neutral-700 dark:text-neutral-300">')
        // Add classes to code blocks
        .replace(/<pre>/g, '<pre class="bg-neutral-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto mb-4">')
        // Add classes to inline code
        .replace(/<code>/g, '<code class="bg-neutral-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">');
      
      return html || '<p class="text-neutral-500 dark:text-neutral-400">No content available</p>';
    }
  } catch (e) {
    console.error('Error parsing content:', e);
    // Fallback: treat as plain text with basic formatting
    return `<p class="mb-4 leading-relaxed">${content.replace(/\n/g, '</p><p class="mb-4 leading-relaxed">')}</p>`;
  }
  
  // Fallback for non-JSON content
  return `<p class="mb-4 leading-relaxed">${content.replace(/\n/g, '</p><p class="mb-4 leading-relaxed">')}</p>`;
}


interface NoteData {
    title: string;
    content: string;
    updatedAt: number;
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
