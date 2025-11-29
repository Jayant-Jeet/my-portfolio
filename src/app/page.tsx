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

import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import { GlareCard } from "../components/ui/glare-card";
import Navbar from "../components/navbar";
import SkillsScroll from "../components/skills-scroll";

function Home() {
  return (
    <div>
      <Navbar />

      <main style={{ 
        padding: '2rem', 
        paddingTop: '100px', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center' 
      }}>
        <div className="hero-container">
          <div className="hero-image">
            <GlareCard>
              <Image 
                src="/profile.png" 
                alt="Jayant Jeet Tomar - Java Full-Stack Developer in Gurugram" 
                width={260} 
                height={260} 
                style={{ 
                  borderRadius: '8px', 
                  objectFit: 'cover',
                  display: 'block'
                }} 
              />
            </GlareCard>
          </div>

          <div className="card hero-content">
            <div style={{ marginBottom: '2rem' }}>
              <h1 
                style={{ 
                  fontSize: '3rem', 
                  marginBottom: '0.5rem', 
                  fontWeight: 'bold',
                  color: 'var(--foreground)'
                }}
              >
                Hey, I&apos;m <span className="gradient-text">Jayant Jeet Tomar</span>
              </h1>
              
              <h2 
                style={{ 
                  fontSize: '1.5rem', 
                  marginBottom: '1rem', 
                  fontWeight: '300',
                  color: 'var(--teal)',
                  fontStyle: 'italic'
                }}
              >
                aka, the Half-Blood Coder
              </h2>
              
              <p 
                style={{ 
                  fontSize: '1.25rem', 
                  lineHeight: '1.6',
                  color: 'var(--foreground)',
                  opacity: '0.9',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}
              >
                I&apos;m a <span style={{ color: 'var(--orange)', fontWeight: 'bold' }}>Full-Stack Developer</span> who turns legacy systems into high-performing platforms—mentoring teams and delivering impact at scale.
              </p>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap' 
            }}>
              <Link href="/projects" className="btn-primary">
                View Projects
              </Link>
              <Link href="/blog" className="btn-secondary">
                My Blog
              </Link>
              <Link href="/resume" className="btn-success">
                View Resume
              </Link>
              <Link href="/contact" className="btn-secondary">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>

        <SkillsScroll />
        
      </main>
    </div>
  );
}

export default Home;
