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
    id: '4',
    slug: 'my-hacktoberfest-2025-journey',
    title: 'My Hacktoberfest 2025 Journey — Code, Community, and Collaboration',
    titlePrefix: '✨',
    excerpt: 'Participated in Hacktoberfest 2025 — contributions, lessons learned, and gratitude for open-source maintainers.',
  content: `
Hey there!
I solemnly swear that I am up to no good.
---
October has always been a month of vibrant energy in the developer community, and this year was no exception. I had the privilege of participating in Hacktoberfest 2025, an annual celebration of open-source software organized by the incredible team at DigitalOcean.
As a Java Full-Stack Developer, I believe in the power of collaboration and the magic of open-source. Hacktoberfest gave me a perfect platform to contribute, learn, and connect with maintainers and developers across the globe.
## 🌟 Projects I Contributed To
Here are three standout projects I had the pleasure of contributing to:
---
### 📝 WordWizard
A sleek, accessible text editor focused on simplicity and keyboard-first interactions.
🔗 Live Demo: https://wordwizard-texteditor.netlify.app/
👨‍💻 Maintainer: Palchhi Parihar [https://github.com/palchhinparihar]
---
### 🛠️ FreeDevTools
A curated collection of free developer tools that make life easier for coders and creators.
🔗 Live Demo: https://hexmos.com/freedevtools/
👨‍💻 Maintainer: Maneshwar Athreya [https://github.com/lovestaco]
---
### 📡 Tech‑Fest‑Radar
A dynamic radar for discovering upcoming tech fests and events across India.
🔗 Live Demo: https://techfest-sigma.vercel.app/
👨‍💻 Maintainer: Vishal Tiwari [https://github.com/Vishal772-pixel]
---
## 🙌 Gratitude to the Maintainers
A huge shoutout to Palchhi, Maneshwar, and Vishal for not only building these projects but for welcoming contributors with open arms. Your feedback and guidance made the experience truly enriching.
## 💡 What I Learned
- Navigating diverse codebases and different architectural styles
- Collaborating asynchronously with maintainers and fellow contributors
- Improving my Git workflow and contribution etiquette
- Reinforcing the value of community‑driven development
## 🚀 Final Thoughts
Hacktoberfest isn’t just about pull requests — it’s about people, passion, and progress. I’m grateful for the opportunity to give back, and I’m excited to continue contributing beyond October.
If you’re a developer looking to grow, connect, and make an impact — open-source is the way forward.
---
Happy coding! 🚀
Cheers,
The Half-Blood Coder
Nox!
  `,
    date: '21st October, 2025',
    category: 'Community',
    tags: ['hacktoberfest', 'open-source', 'contributions'],
    image: '/hacktoberfest2k25.png' ,
    readTime: 4,
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
  {
    id: '5',
    slug: 'sih-2025-grand-finale',
    title: 'SIH 2025 Grand Finale – My Experience as a UI/UX Mentor & Evaluator',
    titlePrefix: '🏆',
    excerpt: 'From participant to mentor to evaluator — my journey at SIH 2025 Grand Finale at IIT Kharagpur, mentoring innovators and evaluating solutions for a challenging gold assaying problem statement.',
    content: `
Hey there!
I solemnly swear that I am up to no good.
---
Some invites don't need deliberation. When the mail for the Smart India Hackathon (SIH) 2025 Grand Finale at IIT Kharagpur landed in my inbox, I accepted instantly. Hackathons have been a constant thread in my journey — from winning the SIH 2020 Grand Finale, leading a team at the ASEAN India Hackathon, to mentoring at the UNESCO India Africa Hackathon. SIH, initiated by AICTE and the Ministry of Innovation Council (MIC), has always been special to me because it gives students the chance to solve real-world problems faced by industries and public organizations.
This year, my role was unique: UI/UX Mentor cum Evaluator for the problem statement SIH25056 – Exploring new/alternative assaying methods to the fire assay method for testing gold jewellery and artefacts through non-destructive testing. A mouthful, yes — but also one of the most challenging and fascinating problem statements I've seen.
## 📸 SIH 2025 Moments
[photos-album title="SIH 2025 Photo Album" description="View memories from the Smart India Hackathon 2025 Grand Finale at IIT Kharagpur"]https://photos.app.goo.gl/h4qw8AzRGn2nKidJ8[/photos-album]
## 🏟️ The Grand Finale Atmosphere
The IIT Kharagpur campus was alive with energy. The organizing committee was warm and welcoming, making my stay comfortable and memorable. Local students added their own charm — we had candid conversations on everything from Bitcoin to religions to local cultures, usually over plates of delicious food at nearby eateries. These moments reminded me that hackathons are not just about code and slides; they're about people, ideas, and shared experiences.
## 🎨 Mentoring the Innovators
As a UI/UX Mentor, I was spellbound by the students' creativity. Their dedication to understanding complex problem statements, their willingness to research with field visits, and their sheer innovative approach was inspiring.
My role was to help them present their solutions better — to highlight the niche USPs, structure their narrative, and ensure their brilliance wasn't lost in translation when facing the evaluation panel. Having walked the path myself — from participant to mentor to evaluator — I knew exactly where presentations often fall short. Guiding them to bridge those gaps felt like passing on lessons I had once learned the hard way.
## 🧙‍♂️ Wearing the Evaluator Hat
Evaluation, however, was the tougher part. I'll admit — I was a bit harsh during the final rounds. But it wasn't criticism for the sake of it; it was because I wanted the teams to push their limits and deliver their absolute best.
Behind the scenes, I was rooting for them. In jury discussions, I stood up for their efforts, acknowledging the sheer difficulty of the problem statement. It required industrial-level expertise, which most students hadn't had access to before arriving at the finale. Yet, they persevered, and their resilience made me proud. Every team that presented was a testament to what student innovation can achieve when given the right platform.
## 🤝 Learning from the Best
One of the highlights of SIH 2025 was meeting and interacting with brilliant minds:
- Jury members from BIS: Dr. Chandan K Rao, Dr. Vipul Bohara, Dr. Ajay Soni, Mr. Chetan Bhandari.
- Industry leaders like Dr. Sujeet Naik and Sachin Jayashekhar.
- And my fellow jury mate, Mr. Pathikrit Sarkar, who shared my tenure spirit.
Their humility and kindness, despite their stature, left a lasting impression. I walked away with a deeper understanding of the gold industry in India, something I hadn't expected when I first signed up for this role.
## 🔚 Closing Reflections
Looking back, SIH 2025 wasn't just another hackathon for me. It was a celebration of innovation, mentorship, and collaboration. I'm grateful to AICTE and MIC for inviting me, and proud of every student who dared to tackle such a tough challenge.
Hackathons, for me, have never been about just winning or losing. They're about the journey — the sleepless nights, the candid conversations, the mentorship, and the spark of ideas that might one day change industries. SIH 2025 reminded me of that spark, and it will remain one of the highlights of 2025.
---
Happy coding! 🚀
Cheers,
The Half-Blood Coder
Nox!
    `,
    date: '12th January, 2025',
    category: 'Hackathon',
    tags: ['sih', 'hackathon', 'mentor', 'evaluator', 'innovation'],
    image: '/sih-2025/sih3.jpg',
    readTime: 10,
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
