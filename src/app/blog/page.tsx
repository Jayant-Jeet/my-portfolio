import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import { blogPosts } from '@/lib/blog-data';

export default function BlogPage() {
  // Sort blog posts by date (newest first)
  const sortedPosts = blogPosts.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div>
      <Navbar />
      
      <main style={{ 
        padding: '2rem', 
        paddingTop: '100px', 
        minHeight: '100vh'
      }}>
        <div className="container">
          <div className="blog-header">
            <h1 className="page-title">
                <span className="gradient-text">Halfblood Musings </span>🪄
            </h1>
            <p className="page-subtitle">
              Loosely typed thoughts and occasional rants from a Full-Stack Developer
            </p>
          </div>

          <div className="blog-grid">
            {sortedPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <Link href={`/blog/${post.slug}`} className="blog-card-link">
                  {post.image && (
                    <div className="blog-card-image">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={200}
                        style={{
                          objectFit: 'contain',
                          width: '100%',
                          height: '100%'
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <time className="blog-date">{post.date}</time>
                      <span className="blog-category">{post.category}</span>
                    </div>
                    
                    <h2 className="blog-card-title">
                      {post.titlePrefix && <span className="title-prefix">{post.titlePrefix} </span>}
                      <span className="gradient-text">{post.title}</span>
                    </h2>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    
                    <div className="blog-card-tags">
                      {post.tags.map((tag) => (
                        <span key={tag} className="blog-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="blog-card-footer">
                      <span className="read-time">{post.readTime} min read</span>
                      <span className="read-more">Read more →</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {sortedPosts.length === 0 && (
            <div className="empty-state">
              <h3>No blog posts yet</h3>
              <p>Check back soon for new content!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
