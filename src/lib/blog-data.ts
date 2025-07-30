export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  tags: string[];
  image?: string;
  readTime: number;
  published: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'welcome-to-my-blog',
    title: 'Welcome to My Blog',
    excerpt: 'Hello and welcome to my blog! This is where I\'ll be sharing my thoughts, tutorials, and insights about web development, programming, and best-practices.',
    content: `
Hey there! 
I solemnly swear that I am up to no good. 
Welcome to my blog—I'm thrilled you're here! Whether you're a seasoned developer, a coding enthusiast, or someone just starting your tech journey, this space is for you.
A little about me: I'm a Full-Stack Developer with over 4 years of experience creating robust, production-level applications. My journey in tech began with a curiosity about how websites and apps work, evolving into a passion that's driven my career forward. Throughout these years, I've explored various technologies like Java, SpringBoot, Angular, and SQL. I've built everything from dynamic web applications to intricate backend systems—and I've had my fair share of late-night debugging adventures, too!
This blog is my way of sharing the insights I've picked up along this path—useful tips, coding tricks, best practices, and some behind-the-scenes stories from projects I've tackled. But it's not just about what I know; it's also about discovery. We'll explore new tools and frameworks together whenever something exciting catches our eye.
Expect tutorials to sharpen your skills, real-life developer stories to keep things interesting, and yes, the occasional random thought or tech-related anecdote to keep things fun and engaging. My goal is to create a community where we can learn, share experiences, and grow together.
So don't be shy! Drop a comment, ask a question, or share your own developer adventures. I can't wait to connect with you all.
Let's code, connect, and build something amazing together!
Happy coding! 🚀
Cheers,
The Half-Blood Coder
Nox!
    `,
    date: '31st July, 2025',
    category: 'General',
    tags: ['welcome', 'introduction', 'blog'],
    image: '/welcome.png',
    readTime: 3,
    published: true
  },
];

// Helper function to get a blog post by slug
export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug && post.published);
}

// Helper function to get all published posts
export function getPublishedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.published);
}

// Helper function to get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category && post.published);
}

// Helper function to get posts by tag
export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tag) && post.published);
}
