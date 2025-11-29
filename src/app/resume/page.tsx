/*
 * Half-Blood Coder Portfolio
 * Copyright (c) 2025 Jayant Jeet Tomar
 * All Rights Reserved
 * 
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this software, via any medium, is strictly prohibited.
 * 
 * For licensing inquiries: https://www.halfbloodcoder.com/contact
 */

'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import react-pdf components with SSR disabled
const Document = dynamic(
  () => import('react-pdf').then((mod) => mod.Document),
  { ssr: false }
);

const Page = dynamic(
  () => import('react-pdf').then((mod) => mod.Page),
  { ssr: false }
);

export default function ResumePage() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [isClient, setIsClient] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Import CSS
    import('react-pdf/dist/Page/AnnotationLayer.css');
    import('react-pdf/dist/Page/TextLayer.css');
    
    // Set up the worker
    import('react-pdf').then((pdfjs) => {
      pdfjs.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.pdfjs.version}/build/pdf.worker.min.mjs`;
    });
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const handlePrint = () => {
    setIsPrinting(true);
    // Ensure UI updates before printing
    setTimeout(() => {
      globalThis.print();
    }, 0);
  };

  useEffect(() => {
    const afterPrint = () => setIsPrinting(false);
    globalThis.addEventListener('afterprint', afterPrint);
    return () => {
      globalThis.removeEventListener('afterprint', afterPrint);
    };
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: isPrinting ? '#ffffff' : '#525659',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      {/* Print-only styles */}
      <style>
        {`
        @media print {
          body { background: #ffffff !important; }
          .toolbar { display: none !important; }
          .viewer-wrap { padding: 0 !important; background: #ffffff !important; }
          .doc-container { box-shadow: none !important; }
        }
        `}
      </style>
      {/* Chrome-style Toolbar */}
      {!isPrinting && (
      <div className="toolbar" style={{
        backgroundColor: '#3c4043',
        padding: '0 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '48px',
        flexShrink: 0
      }}>
        {/* Left side - Menu and filename */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
          <button
            onClick={() => globalThis.history.back()}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#e8eaed',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5f6368'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onFocus={(e) => e.currentTarget.style.backgroundColor = '#5f6368'}
            onBlur={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            title="Back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          
          <span style={{ 
            color: '#e8eaed', 
            fontSize: '14px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            Jayant-Jeet-Tomar-Resume
          </span>
        </div>

        {/* Center - Page controls */}
        {numPages > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
              disabled={pageNumber <= 1}
              style={{
                background: 'transparent',
                border: 'none',
                color: pageNumber <= 1 ? '#9aa0a6' : '#e8eaed',
                cursor: pageNumber <= 1 ? 'default' : 'pointer',
                padding: '8px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px'
              }}
              onMouseOver={(e) => {
                if (pageNumber > 1) e.currentTarget.style.backgroundColor = '#5f6368';
              }}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              onFocus={(e) => {
                if (pageNumber > 1) e.currentTarget.style.backgroundColor = '#5f6368';
              }}
              onBlur={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              title="Previous page"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '0 8px'
            }}>
              <span style={{ 
                color: '#e8eaed', 
                fontSize: '14px',
                userSelect: 'none'
              }}>
                {pageNumber}
              </span>
              <span style={{ 
                color: '#9aa0a6', 
                fontSize: '14px',
                userSelect: 'none'
              }}>
                / {numPages}
              </span>
            </div>
            
            <button
              onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
              disabled={pageNumber >= numPages}
              style={{
                background: 'transparent',
                border: 'none',
                color: pageNumber >= numPages ? '#9aa0a6' : '#e8eaed',
                cursor: pageNumber >= numPages ? 'default' : 'pointer',
                padding: '8px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px'
              }}
              onMouseOver={(e) => {
                if (pageNumber < numPages) e.currentTarget.style.backgroundColor = '#5f6368';
              }}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              onFocus={(e) => {
                if (pageNumber < numPages) e.currentTarget.style.backgroundColor = '#5f6368';
              }}
              onBlur={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              title="Next page"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </div>
        )}

        {/* Right side - Zoom and actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', flex: 1, justifyContent: 'flex-end' }}>
          <button
            onClick={() => setScale(Math.max(0.25, scale - 0.25))}
            disabled={scale <= 0.25}
            style={{
              background: 'transparent',
              border: 'none',
              color: scale <= 0.25 ? '#9aa0a6' : '#e8eaed',
              cursor: scale <= 0.25 ? 'default' : 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px'
            }}
            onMouseOver={(e) => {
              if (scale > 0.25) e.currentTarget.style.backgroundColor = '#5f6368';
            }}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onFocus={(e) => {
              if (scale > 0.25) e.currentTarget.style.backgroundColor = '#5f6368';
            }}
            onBlur={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            title="Zoom out"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13H5v-2h14v2z"/>
            </svg>
          </button>
          
          <div style={{
            padding: '0 8px',
            minWidth: '60px',
            textAlign: 'center'
          }}>
            <span style={{ 
              color: '#e8eaed', 
              fontSize: '14px',
              userSelect: 'none'
            }}>
              {Math.round(scale * 100)}%
            </span>
          </div>
          
          <button
            onClick={() => setScale(Math.min(2, scale + 0.25))}
            disabled={scale >= 2}
            style={{
              background: 'transparent',
              border: 'none',
              color: scale >= 2 ? '#9aa0a6' : '#e8eaed',
              cursor: scale >= 2 ? 'default' : 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px'
            }}
            onMouseOver={(e) => {
              if (scale < 2) e.currentTarget.style.backgroundColor = '#5f6368';
            }}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onFocus={(e) => {
              if (scale < 2) e.currentTarget.style.backgroundColor = '#5f6368';
            }}
            onBlur={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            title="Zoom in"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </button>
          
          <button
            onClick={handlePrint}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#e8eaed',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              marginLeft: '4px'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5f6368'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onFocus={(e) => e.currentTarget.style.backgroundColor = '#5f6368'}
            onBlur={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            title="Print"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
            </svg>
          </button>
          
          <a
            href="/resume.pdf"
            download="Jayant-Jeet-Tomar-Resume.pdf"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#e8eaed',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              textDecoration: 'none'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5f6368'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onFocus={(e) => e.currentTarget.style.backgroundColor = '#5f6368'}
            onBlur={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            title="Download"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
          </a>

        </div>
      </div>
      )}

      {/* PDF Viewer */}
      <div className="viewer-wrap" style={{
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        padding: isPrinting ? '0' : '20px',
        backgroundColor: isPrinting ? '#ffffff' : '#525659'
      }}>
        <div className="doc-container" style={{
          backgroundColor: 'white',
          boxShadow: isPrinting ? 'none' : '0 2px 8px rgba(0,0,0,0.3)',
          display: 'inline-block'
        }}>
          {isClient && (
            <Document
              file="/resume.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div style={{
                  padding: '4rem 8rem',
                  textAlign: 'center',
                  color: '#e8eaed',
                  backgroundColor: '#525659'
                }}>
                  Loading resume...
                </div>
              }
              error={
                <div style={{
                  padding: '4rem 8rem',
                  textAlign: 'center',
                  color: '#ea4335',
                  backgroundColor: '#525659'
                }}>
                  Failed to load resume. Please try downloading it instead.
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </Document>
          )}
        </div>
      </div>
    </div>
  );
}
