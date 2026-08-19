# Harmanjot Singh — Portfolio

A modern, developer-focused portfolio website built with Next.js 14. It renders a
terminal-style visitor reconnaissance banner, skill/tech sections, project
showcase, and contact page — styled with Tailwind CSS.

## Tech Stack

- **[Next.js 14](https://nextjs.org/)** (App Router, React 18.3)
- **[Tailwind CSS](https://tailwindcss.com/)** v3
- **TypeScript**
- Self-hosted SEO assets (sitemap.xml, robots.txt, OG image, favicon)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone <repo-url>
cd <repo-name>
npm install
```

### Development

Run the dev server with hot-reload:

```bash
npm run dev
```

Open http://localhost:3000

### Build

Create an optimized production build (includes SEO asset generation):

```bash
npm run build
```

### Start (production)

```bash
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
.
├── app/
│   ├── api/
│   │   └── visitor/       # API route — returns visitor IP, host, browser, OS, locale, referrer
│   ├── data/
│   │   └── portfolio.ts   # All portfolio content (profile, skills, experience, projects, socials, nav links)
│   ├── globals.css
│   ├── layout.tsx         # Root layout — SEO metadata, JSON-LD, providers
│   └── page.tsx           # Main page component
├── components/            # UI components (Hero, About, Skills, Experience, Projects, Contact, Terminal, etc.)
├── lib/
│   └── seo.ts             # Structured data (JSON-LD) and SEO helpers
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── og.svg             # Open Graph / social preview
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── seo-gen.js         # Generates sitemap.xml and robots.txt during build
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Key Features

- **Dynamic Visitor Banner**: A Terminal component renders recon details (IP,
  browser, OS, language, referrer) fetched from `/api/visitor`.
- **Tech-Themed UI**: Particle background, scroll progress, command palette,
  system HUD, and reveal-on-scroll animations.
- **Theme Toggle**: Light/dark mode persistence via localStorage.
- **SEO-Optimized**: JSON-LD structured data (Person + WebSite), Open Graph tags,
  Twitter cards, sitemap.xml, and robots.txt.
- **Responsive**: Mobile-first design with drawer navigation.

## Environment Variables

No runtime environment variables are required. All content is defined in
[`app/data/portfolio.ts`](./app/data/portfolio.ts).

## License

[MIT](./LICENSE) — fork, tweak, and make it your own.
