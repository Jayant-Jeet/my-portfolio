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
  {
    id: '2',
    slug: 'frontend-vs-backend-deployments',
    title: '🚀 Frontend Deployments Are a Dream. Backend? A Whole Saga.',
    excerpt: 'Frontend deployments are a breeze with platforms like Vercel and Netlify. Backend deployments? A whole different story.',
    content: `
Hey there! 
I solemnly swear that I am up to no good. 
So I recently built this full-stack app called L&TT SME Planner for a hackathon (shout-out to caffeine and weekend hustle). The frontend part? Smooth sailing. I pushed the code to GitHub, plugged it into Vercel—and boom, it was live. Like, ten minutes tops.
But then came the backend. That’s when things got real.
## 🧁 Frontend = Easy Mode
Whether it’s Angular, React, or Next.js, deploying your frontend these days is honestly just vibes and a few clicks:
- Platforms like Vercel, Netlify, and Render do all the heavy lifting.
- CI/CD? Handled. Previews? Automatically set up. CDN + SSL? They’ve got you.
Honestly, it feels like magic. Even folks just starting out can get their projects online without reading a hundred tutorials.
I love that.
## 🔧 Backend = Boss Level Challenge
Now the backend. Mine was built with Spring Boot and MySQL, and I thought: “Can’t I just upload my .jar file somewhere and call it a day?” Turns out—nope.
- Platforms that do support JAR uploads usually come with a high price tag or confusing setup.
- You need to manage databases, environment variables, ports, and suddenly you’re knee-deep in documentation and dashboards.
It’s just not as intuitive. Feels like you need a mini DevOps degree to deploy a basic backend.
## 🐳 Discovered Docker… and I’m Hooked
In the middle of all this chaos, I stumbled on Docker, and man—it’s brilliant.
- You can containerize everything: your app, your database, your hopes and dreams (okay, not that last one).
- With a few files (Dockerfile and docker-compose.yaml), you spin up your entire stack locally or in the cloud.
- It’s organized, scalable, and kinda fun to mess around with.
So yeah, I’m diving into the Docker rabbit hole—learning how containers work, building multi-container setups, and figuring out where I can deploy these things without selling a kidney.
## 🛠️ What’s Next?
I’ll be sharing what I learn as I go: tips, code snippets, maybe even a tutorial series for fellow full-stack builders who love clean UI and clean infrastructure.
Stay tuned. If you’ve got deployment war stories or Docker wisdom, hit me up—I’m all ears (well, metaphorically speaking 😄).
Happy coding! 🚀
Cheers,
The Half-Blood Coder
Nox!
    `,
    date: '2nd August, 2025',
    category: 'Development',
    tags: ['frontend', 'backend', 'docker', 'deployment'],
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    readTime: 5,
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
