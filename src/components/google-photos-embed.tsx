'use client';

import React from 'react';
import './google-photos-embed.css';

interface GooglePhotosEmbedProps {
  albumUrl: string;
  title?: string;
  description?: string;
}

export default function GooglePhotosEmbed({ 
  albumUrl, 
  title = "View album on Google Photos",
  description = "Click below to explore the photo album"
}: GooglePhotosEmbedProps) {
  return (
    <div className="google-photos-embed-container">
      <div className="google-photos-embed-wrapper">
        <div className="google-photos-preview">
          <div className="google-photos-icon">
            <svg viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Camera icon">
              <rect x="10" y="18" width="44" height="30" rx="6" ry="6" fill="none" stroke="#2ec4b6" strokeWidth="3" />
              <rect x="22" y="12" width="12" height="8" rx="2" ry="2" fill="none" stroke="#2ec4b6" strokeWidth="3" />
              <circle cx="32" cy="33" r="10" fill="none" stroke="#fdfffc" strokeWidth="3" />
              <circle cx="32" cy="33" r="4" fill="#2ec4b6" />
              <circle cx="48" cy="24" r="2.5" fill="#2ec4b6" />
            </svg>
          </div>
          <h3 className="google-photos-title">{title}</h3>
          <p className="google-photos-description">{description}</p>
                <a 
                  href={albumUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Open Album in Google Photos ↗
                </a>
        </div>
      </div>
    </div>
  );
}
