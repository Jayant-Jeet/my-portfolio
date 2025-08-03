import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar';
import { getBlogPost, blogPosts } from '@/lib/blog-data';

interface BlogPostPageProps {
  readonly params: Promise<{
    readonly slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <Navbar />
      
      <main style={{ 
        padding: '2rem', 
        paddingTop: '100px', 
        minHeight: '100vh'
      }}>
        <div className="container">
          <div className="blog-post-header">
            {/* <Link href="/blog" className="back-link">
              ← Back to All Posts
            </Link> */}
            
            <div className="blog-post-meta">
              <Link href="/blog" className="back-link">
                <Image src="/back-link.png" alt="Back to All Posts" width={24} height={24} title="Back to All Posts" />
              </Link>
              <time className="blog-date">{post.date}</time>
              <span className="blog-category">{post.category}</span>
              <span className="read-time">{post.readTime} min read</span>
            </div>
            
            <h1 className="blog-post-title">
              {post.titlePrefix && <span className="title-prefix">{post.titlePrefix} </span>}
              <span className="gradient-text">{post.title}</span>
            </h1>
            
            <div className="blog-post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <article className="blog-post-content">
            <div className="prose">
              {post.content.split('\n').map((paragraph, index) => {
                const uniqueKey = paragraph.trim() === '' ? `empty-${index}` : `${paragraph.substring(0, 20)}-${index}`;
                
                if (paragraph.trim() === '') {
                  return <br key={uniqueKey} />;
                }
                
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={uniqueKey} className="prose-h1">
                      {paragraph.substring(2)}
                    </h1>
                  );
                }
                
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={uniqueKey} className="prose-h2">
                      {paragraph.substring(3)}
                    </h2>
                  );
                }
                
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={uniqueKey} className="prose-h3">
                      {paragraph.substring(4)}
                    </h3>
                  );
                }
                
                if (paragraph.startsWith('- **') && paragraph.includes('**:')) {
                  const regex = /- \*\*(.*?)\*\*:\s*(.*)/;
                  const match = regex.exec(paragraph);
                  if (match) {
                    return (
                      <li key={uniqueKey} className="prose-li">
                        <strong>{match[1]}</strong>: {match[2]}
                      </li>
                    );
                  }
                }
                
                if (paragraph.startsWith('- ')) {
                  return (
                    <li key={uniqueKey} className="prose-li">
                      {paragraph.substring(2)}
                    </li>
                  );
                }
                
                if (paragraph.startsWith('```')) {
                  const isClosing = paragraph === '```';
                  return (
                    <div key={uniqueKey} className={isClosing ? 'code-block-end' : 'code-block-start'}>
                      {!isClosing && <code>{paragraph.substring(3)}</code>}
                    </div>
                  );
                }
                
                if (paragraph.includes('`') && !paragraph.startsWith('```')) {
                  const parts = paragraph.split('`');
                  return (
                    <p key={uniqueKey} className="prose-p">
                      {parts.map((part, i) => 
                        i % 2 === 0 ? part : <code key={`${uniqueKey}-code-${i}`} className="inline-code">{part}</code>
                      )}
                    </p>
                  );
                }
                
                return (
                  <p key={uniqueKey} className="prose-p">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </article>

          <div className="blog-post-footer">
            <div className="blog-navigation">
              <div className="blog-nav-links">
                <Link href="/blog" className="btn-secondary">
                  ← Back to All Posts
                </Link>
                <Link href="/contact" className="btn-primary">
                  Discuss This Post
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
