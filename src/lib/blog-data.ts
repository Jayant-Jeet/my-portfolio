export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titlePrefix?: string;
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
---
Welcome to my blog—I'm thrilled you're here! Whether you're a seasoned developer, a coding enthusiast, or someone just starting your tech journey, this space is for you.
A little about me: I'm a Full-Stack Developer with over 4 years of experience creating robust, production-level applications. My journey in tech began with a curiosity about how websites and apps work, evolving into a passion that's driven my career forward. Throughout these years, I've explored various technologies like Java, SpringBoot, Angular, and SQL. I've built everything from dynamic web applications to intricate backend systems—and I've had my fair share of late-night debugging adventures, too!
This blog is my way of sharing the insights I've picked up along this path—useful tips, coding tricks, best practices, and some behind-the-scenes stories from projects I've tackled. But it's not just about what I know; it's also about discovery. We'll explore new tools and frameworks together whenever something exciting catches our eye.
Expect tutorials to sharpen your skills, real-life developer stories to keep things interesting, and yes, the occasional random thought or tech-related anecdote to keep things fun and engaging. My goal is to create a community where we can learn, share experiences, and grow together.
So don't be shy! Drop a comment, ask a question, or share your own developer adventures. I can't wait to connect with you all.
Let's code, connect, and build something amazing together!
---
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
    title: 'Frontend Deployments Are a Dream. Backend? A Whole Saga.',
    titlePrefix: '🚀',
    excerpt: 'Frontend deployments are a breeze with platforms like Vercel and Netlify. Backend deployments? A whole different story.',
    content: `
Hey there! 
I solemnly swear that I am up to no good. 
---
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
---
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
  {
    id: '3',
    slug: 'github-copilot-certified-gh-300-exam',
  title: 'I Got GitHub Copilot Certified : My GH-300 Weekend',
    titlePrefix: '🎓',
    excerpt: 'I spent the weekend earning my GitHub Copilot Certification (GH-300). Here’s how I prepared—balancing theory and hands-on practice—and the exact resources I used.',
  content: `
Hey there!
I solemnly swear that I am up to no good.
---
I went into this weekend with coffee, curiosity, and a quiet dare to myself: prove I can partner with AI intentionally, not just casually. 
Hitting “Submit” on the GH-300 felt less like an end and more like naming a shift I’d already begun—moving from “Copilot as autocomplete” to “Copilot as a disciplined collaborator.”
## 🎯 Why I Chose GH-300
- **Raise the bar**: I wanted a structured way to validate that my Copilot habits weren’t just “vibes,” but aligned with best practices.
- **Sharpen judgment**: The real skill isn’t accepting suggestions—it’s knowing when not to. Certification pushed that discernment.
- **Scale responsibly**: As a full-stack dev, I care about repeatable patterns my team can trust across Angular frontends and Spring Boot backends.
## 🧠 How I Prepared: From Practical Know-How to Deeper Mastery
Going into GH‑300, I wasn’t starting from scratch. I’d already been working with GitHub Copilot in real projects, so I knew my way around prompting for bug fixes and completing code blocks. What the study materials gave me was a peek behind the curtain—how Copilot actually transforms a prompt and surrounding context into suggestions.
That theoretical layer changed how I think about the tool:
- **Understanding the “Why” Behind Suggestions**: I learned the step‑by‑step flow Copilot follows: interpreting the immediate code, weighing contextual cues from the file and project, and then predicting the most likely completion. Knowing this made my prompts sharper and my evaluations more deliberate.
- **Expanding beyond my default use‑cases**: - The modules and practice drills pushed me past the “bug fix and boilerplate” comfort zone into:
  1. New feature scaffolding: Drafting starting points for entirely new modules or services, complete with relevant imports and patterns.
  2. Test generation: Quickly creating unit and integration tests that follow framework conventions, ready for refinement.
  3. Explaining legacy code: Breaking down unfamiliar or dense codebases into plain‑language explanations, accelerating onboarding and refactoring.
- **Linking Theory with My Stack**: Understanding how context affects predictions helped me feed Copilot richer cues—docstrings, inline comments, and clear function names—especially when working across Angular and Spring Boot. This turned Copilot into more of a design partner than a reactive tool.
This prep didn’t just make me exam-ready—it rewired how I collaborate with Copilot day to day.
## 🔄 Before vs After: Workflow Evolution
| Aspect | Before | After |
| --- | --- | --- |
| Use-cases | Bug fixes, boilerplate | Feature scaffolding, test generation, code explanation |
| Prompting style | Minimal, reactive | Intent-driven, contextual, iterative |
| Evaluation criteria | "Does it work?" | Correctness, readability, testability, security |
| Stack integration | Angular & Spring Boot basics | Full-stack synergy with rich context cues |
| Trust level | Occasional suggestions | Strategic collaboration |
## 📚 Study Resources I Used
- **Official course (structure and depth)**: https://learn.microsoft.com/en-us/training/courses/gh-300t00
- **Essentials pathway (everyday habits)**: https://resources.github.com/learn/pathways/copilot/essentials/essentials-of-github-copilot/
- **Practice tests (pressure simulation)**: https://ghcertified.com/practice_tests/copilot/
---
Happy coding! 🚀
Cheers,
The Half-Blood Coder
Nox!
  `,
    date: '15th August, 2025',
  category: 'Learning',
  tags: ['github copilot', 'gh-300', 'certification'],
  image: '/copilot_badge.png',
    readTime: 6,
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
