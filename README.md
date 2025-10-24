# 🚀 Half-Blood Coder Portfolio

[![Live Demo](https://img.shields.io/badge/Live-halfbloodcoder.com-orange?style=for-the-badge)](https://www.halfbloodcoder.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg?style=for-the-badge)](LICENSE)

> A modern, interactive portfolio website showcasing my journey as a Full-Stack Developer. Built with cutting-edge technologies and featuring beautiful animations, responsive design, and an integrated blog system.

**Live Website:** [https://www.halfbloodcoder.com/](https://www.halfbloodcoder.com/)

---

## ✨ Features

### 🎨 **Interactive UI/UX**
- **3D Animations** - Powered by Three.js and React Three Fiber
- **Glare Card Effects** - Eye-catching hover animations on profile cards
- **Smooth Scrolling** - Infinite skill carousel with auto-scroll
- **Responsive Design** - Seamless experience across all devices
- **Dark Theme** - Modern gradient-based color scheme

### 📝 **Blog System**
- Markdown-based content management
- Dynamic routing with slug-based URLs
- Category and tag filtering
- Reading time estimation
- Draft/publish functionality
- SEO optimized with metadata

### 💼 **Project Showcase**
- Filterable project gallery (Featured, Frontend, Backend, ML, etc.)
- Live demos and GitHub links
- Technology stack badges
- Detailed project descriptions
- Category-based organization

### 🛠️ **Tech Stack Display**
- Animated skills carousel
- Categorized technologies (Languages, Frontend, Backend, DevOps, etc.)
- Icon-based visual representation
- 20+ technologies showcased

### 📧 **Contact Integration**
- Direct email functionality with Nodemailer
- Contact form with validation
- Resume download link
- Social media integration

### 🎯 **Side Pages**
- **Cron-jutsu** - Interactive cron expression learning tool
- **Offer Checkout** - Fun offer summary generator with email export

---

## 🏗️ Project Structure

```
my-portfolio/
├── public/                 # Static assets (images, icons)
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes (contact, email)
│   │   ├── blog/          # Blog pages and layouts
│   │   ├── projects/      # Projects showcase
│   │   ├── contact/       # Contact page
│   │   ├── cron-jutsu/    # Cron expression tool
│   │   ├── offer-checkout/ # Offer generator
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # Reusable React components
│   │   ├── ui/            # UI components (GlareCard, etc.)
│   │   ├── navbar.tsx     # Navigation component
│   │   └── skills-scroll.tsx # Skills carousel
│   ├── lib/               # Utility functions & data
│   │   └── blog-data.ts   # Blog posts data
│   └── types/             # TypeScript type definitions
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jayant-Jeet/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the portfolio in action.

### Build for Production

```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack

### Core Technologies
- **Framework:** [Next.js 15.2](https://nextjs.org/) - React framework with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/) - Utility-first CSS framework

### Libraries & Tools
- **3D Graphics:** [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [Three.js](https://threejs.org/)
- **Animations:** [Motion](https://motion.dev/) (Framer Motion)
- **Icons:** [@tabler/icons-react](https://tabler.io/icons)
- **Email:** [Nodemailer](https://nodemailer.com/)
- **Image Export:** [html-to-image](https://github.com/bubkoo/html-to-image)
- **SDK:** [Poper React SDK](https://poper.ai/)

### Development Tools
- **Linting:** ESLint with Next.js config
- **Build Tool:** Turbopack (--turbopack flag)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🎯 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Landing page with hero section and CTA buttons |
| **Projects** | `/projects` | Filterable showcase of all projects |
| **Blog** | `/blog` | Blog listing with categories and search |
| **Blog Post** | `/blog/[slug]` | Individual blog post pages |
| **Contact** | `/contact` | Contact form with email integration |
| **Cron-jutsu** | `/cron-jutsu` | Interactive cron expression tool |
| **Offer Checkout** | `/offer-checkout` | Offer summary generator |

---

## 🌐 Deployment

This portfolio is deployed on **Vercel** and is live at [https://www.halfbloodcoder.com/](https://www.halfbloodcoder.com/).

---

## 📧 Contact & Social

- **Website:** [halfbloodcoder.com](https://www.halfbloodcoder.com/)
- **Email:** Available through the [contact form](https://www.halfbloodcoder.com/contact)
- **GitHub:** [@Jayant-Jeet](https://github.com/Jayant-Jeet)
- **Resume:** [Download PDF](https://www.dropbox.com/scl/fi/z5ozog90lye842589npwo/Resume-Jayant-Jeet-Tomar-Java-Full-Stack-Developer-Sept25.pdf?rlkey=r06suw3wkotmao7yk42cgzdio&st=xx6x8s2u&dl=0)

---

## 🤝 Contributing

This is a personal portfolio repository. While I appreciate your interest:
- **Issues**: Feel free to report bugs or suggest improvements
- **Pull Requests**: Not accepted (proprietary codebase)
- **Feedback**: Always welcome through my [contact form](https://www.halfbloodcoder.com/contact)

If you'd like to collaborate or discuss licensing opportunities, please reach out!

---

## 📄 License & Usage Rights

### ⚠️ Important Notice

This repository is **NOT open source**. All rights reserved.

**Creative Assets** (designs, images, branding) are licensed under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/)  
**Source Code** is proprietary with restricted personal use only.

### What This Means:

#### ❌ You CANNOT:
- Use this portfolio as a template for your own site
- Copy the design, layout, or visual style
- Use any assets, images, or branding elements
- Deploy or host copies of this code
- Use for commercial purposes
- Create derivative works
- Patent any implementations or algorithms
- Redistribute or sell any part of this work

#### ✅ You CAN:
- View the code for learning purposes
- Study the architecture and patterns
- Get inspired to build your own unique portfolio
- Reference techniques in your original work

### 🔒 Protected Side Projects

The following projects are proprietary and may be patent-pending:
- **Cron-jutsu** - All rights reserved
- **Offer Checkout** - All rights reserved

Commercial licensing inquiries: [Contact Form](https://www.halfbloodcoder.com/contact)

### 📜 Full License

See the [LICENSE](LICENSE) file for complete terms and conditions.

**© 2025 Jayant Jeet Tomar (Half-Blood Coder). All Rights Reserved.**

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components inspired by modern design trends
- Icons from [@tabler/icons-react](https://tabler.io/icons)
- Deployed on [Vercel](https://vercel.com/)

---

<div align="center">

**Made with ❤️ by Jayant Jeet Tomar (Half-Blood Coder)**

⭐ Star this repo if you find it inspiring! (But please build your own unique portfolio! 🎨)

**© 2025 All Rights Reserved**

</div>
