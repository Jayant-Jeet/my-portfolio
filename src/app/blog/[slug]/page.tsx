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
              {renderContent(post.content)}
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
// Render full content with support for multi-line constructs like tables
function renderContent(content: string): React.ReactNode[] {
  const lines = content.split('\n');
  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Multi-line Markdown table: header, separator, body rows
    if (isTableHeader(line) && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const headerCells = parseTableRow(line);
      i += 2; // skip header + separator
      const bodyRows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i])) {
        bodyRows.push(parseTableRow(lines[i]));
        i++;
      }
      const tableKey = `table-${i}`;
      nodes.push(
        <div key={`${tableKey}-wrap`} className="table-wrapper">
          <table className="prose-table real-table">
            <thead>
              <tr>
                {headerCells.map((c, idx) => (
                  <th key={`${tableKey}-h-${idx}`}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, r) => (
                <tr key={`${tableKey}-r-${r}`}>
                  {row.map((c, cIdx) => (
                    <td key={`${tableKey}-r-${r}-c-${cIdx}`}>{linkify(c, `${tableKey}-cell-${r}-${cIdx}`)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue; // skip default handling for consumed lines
    }

    // Default single-line render
    nodes.push(renderParagraph(line, i));
    i++;
  }
  return nodes;
}

function isTableRow(line: string): boolean {
  return /^\|.*\|\s*$/.test(line);
}

function isTableHeader(line: string): boolean {
  return isTableRow(line);
}

function isTableSeparator(line: string): boolean {
  // Matches | --- | :---: | ---: | patterns across columns
  return /^\|\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|\s*$/.test(line);
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|\s*$/, '')
    .split('|')
    .map((c) => c.trim());
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Helper to render a single paragraph/line of blog content with low complexity
function renderParagraph(paragraph: string, index: number) {
  const trimmed = paragraph.trim();
  const key = trimmed === '' ? `empty-${index}` : `${paragraph.substring(0, 20)}-${index}`;

  if (trimmed === '') return <br key={key} />;
  if (trimmed === '---') return <hr key={key} className="page-break" />;

  const renderers: Array<(p: string, t: string, k: string) => React.ReactNode | null> = [
  renderTableNode,
    renderHeadingNode,
    renderDefinitionListItem,
    renderBulletListItem,
    renderCodeFenceNode,
    renderInlineCodeNode,
    renderParagraphNode,
  ];

  for (const r of renderers) {
    const node = r(paragraph, trimmed, key);
    if (node) return node;
  }
  return null;
}

// Basic Markdown table renderer: header, separator, and body rows
function renderTableNode(paragraph: string, _trimmed: string, key: string): React.ReactNode | null {
  // Detect a table header line like: | h1 | h2 |
  if (!/^\|.+\|\s*$/.test(paragraph)) return null;
  const header = paragraph;
  const cells = header.split('|').slice(1, -1).map((c) => c.trim());
  // The next paragraph (separator) and subsequent rows are not available here since we render line-by-line.
  // To keep complexity low, only render single-line "pseudo tables" gracefully as a definition-style list fallback.
  // Full multi-line table support would require a pre-pass; implement a minimal, usable behavior:
  return (
    <div key={key} className="prose-table pseudo-table">
      {cells.map((c, i) => (
        <span key={`${key}-cell-${i}`} className="pseudo-cell">
          {c}
        </span>
      ))}
    </div>
  );
}

function renderHeadingNode(paragraph: string, _trimmed: string, key: string): React.ReactNode | null {
  const m = /^(#{1,3})\s+(.*)/.exec(paragraph);
  if (!m) return null;
  const level = m[1].length;
  const text = m[2];
  if (level === 1) return <h1 key={key} className="prose-h1">{text}</h1>;
  if (level === 2) return <h2 key={key} className="prose-h2">{text}</h2>;
  return <h3 key={key} className="prose-h3">{text}</h3>;
}

function renderDefinitionListItem(paragraph: string, trimmed: string, key: string): React.ReactNode | null {
  if (!(trimmed.startsWith('- **') && trimmed.includes('**:'))) return null;
  const regex = /- \*\*(.*?)\*\*:\s*(.*)/;
  const match = regex.exec(paragraph);
  if (!match) return null;
  return (
    <li key={key} className="prose-li">
  <strong>{match[1]}</strong>: {linkify(match[2], `${key}-def`)}
    </li>
  );
}

function renderBulletListItem(paragraph: string, trimmed: string, key: string): React.ReactNode | null {
  if (!trimmed.startsWith('- ')) return null;
  const content = paragraph.substring(2);
  return (
    <li key={key} className="prose-li">
      {linkify(content, `${key}-li`)}
    </li>
  );
}

function renderCodeFenceNode(paragraph: string, trimmed: string, key: string): React.ReactNode | null {
  if (!trimmed.startsWith('```')) return null;
  const isClosing = trimmed === '```';
  return (
    <div key={key} className={isClosing ? 'code-block-end' : 'code-block-start'}>
      {!isClosing && <code>{paragraph.substring(3)}</code>}
    </div>
  );
}

function renderInlineCodeNode(paragraph: string, trimmed: string, key: string): React.ReactNode | null {
  if (!(paragraph.includes('`') && !trimmed.startsWith('```'))) return null;
  const parts = paragraph.split('`');
  return (
    <p key={key} className="prose-p">
      {parts.map((part, i) => (
        i % 2 === 0 ? part : <code key={`${key}-code-${i}`} className="inline-code">{part}</code>
      ))}
    </p>
  );
}

function renderParagraphNode(paragraph: string, _trimmed: string, key: string): React.ReactNode | null {
  return (
    <p key={key} className="prose-p">
      {linkify(paragraph, `${key}-p`)}
    </p>
  );
}

// Convert URLs in text into clickable hyperlinks
function linkify(text: string, keyBase: string): React.ReactNode[] {
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  const parts = text.split(urlRegex);
  const nodes: React.ReactNode[] = [];
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (i % 2 === 1) {
      // This is a URL match
      // Trim trailing punctuation that commonly follows links
      const match = /(.*?)([.,!?)]*)$/.exec(part);
      const href = match ? match[1] : part;
      const trailing = match ? match[2] : '';
      nodes.push(
        <a key={`${keyBase}-link-${i}`} href={href} target="_blank" rel="noopener noreferrer" className="prose-link">{href}</a>
      );
      if (trailing) nodes.push(trailing);
    } else if (part) {
      nodes.push(part);
    }
  }
  return nodes;
}
