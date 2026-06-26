# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal homepage + blog built with **Next.js 16 (App Router) / React 19**, TypeScript, and **Tailwind CSS 4**. Features an MDX blog, a project showcase, a 3D voxel hero animation, and dark/light theming. Pages are statically prerendered (Server Components + `generateStaticParams`); the only runtime backend is the contact API route.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build; postbuild runs next-sitemap to generate sitemap.xml + robots.txt
npm start        # Serve the production build
npm run lint     # eslint . (flat config in eslint.config.mjs; `next lint` was removed in Next 16)
```

There is no test suite.

## Environment

Copy `.env.example` to `.env.local`:
- `PAGE_URL` — site URL, consumed by `next-sitemap.config.js` at build time (and `metadataBase` in the root layout).
- `RESEND_API_KEY`, `CONTACT_MAIL`, `CONTACT_FROM` — contact form delivery (see below). All server-side only.

## Architecture

**Imports use `baseUrl: "."`** (tsconfig), so absolute imports like `components/...`, `lib/...`, `types` resolve from the repo root — prefer these over relative paths.

**App Router structure.** Routes live in `app/`: `layout.tsx` (root `<html>`/`<body>`, Navbar/Footer shell, Inter via `next/font`, and an inline no-flash theme script), `template.tsx` (re-mounts per navigation to replay the enter animation), `page.tsx` (home), `blog/page.tsx`, `blog/[slug]/page.tsx`, `contact/page.tsx`, and `api/contact/route.ts`. Pages are **Server Components** that call the data layer directly — there is no `getStaticProps`/`getStaticPaths`.

**Server vs client.** Most pages are server components. Anything using hooks/state/motion is a `'use client'` component: `components/navbar/`, `components/contact/`, `components/ui/ThemeToggle.tsx`, `components/ui/PageTransition.tsx`, `components/ui/ImageSlider.tsx`, and the 3D animation. The home page's voxel hero uses `next/dynamic({ ssr: false })`, which is illegal in a server component — it's isolated in the `'use client'` wrapper `components/animation/VoxelHero.tsx`.

**Blog (MDX pipeline).** Posts are `.mdx` files in `_posts/`. `lib/MDXLoader.ts` is the data layer (plain fs + `gray-matter`, runs in Server Components):
- `getAllSlugs()` — filenames in `_posts/` minus extension; the slug *is* the filename.
- `getPostBySlug(slug, selection)` — `selection` is an allowlist of frontmatter fields (`'content'` and `'slug'` are special-cased).
- `getAllPosts(selection)` — all posts sorted by `date` descending.

`app/blog/[slug]/page.tsx` renders the body with `next-mdx-remote/rsc` `<MDXRemote>` (passing `MDXComponents` and `rehypeHighlight` via `options.mdxOptions.rehypePlugins`) — no `serialize()` call. It also exposes `generateStaticParams` and `generateMetadata`. Frontmatter shape: `title`, `excerpt`, `coverImage`, `date` (ISO), `readTime`, `author: { name, image }`, `ogImage: { url }`. To add a post, drop a new `.mdx` file in `_posts/` — no other wiring needed.

**Projects** are static data in `_data/projects.json` (typed by `Project` in `types/index.ts`), rendered by `components/project/`.

**Theming** is class-based dark mode. Tailwind 4 has no `tailwind.config.js`; config lives in `app/globals.css` via `@import 'tailwindcss'`, `@plugin '@tailwindcss/typography'`, `@custom-variant dark (&:where(.dark, .dark *))` (preserves the manual class toggle), and `@theme`. The no-flash script in `layout.tsx` sets `<html class="dark">` before paint; `ThemeToggle.tsx` reads/writes it via `useSyncExternalStore` + a `theme-change` event (no hydration mismatch). Style with `dark:` variants.

**3D hero.** `components/animation/` uses `@react-three/fiber` + `drei` (`useGLTF`) + `three` to render `public/animations/jaro.glb`. Heavy, client-only, loaded dynamically.

**Contact form.** `components/contact/index.tsx` (client) validates, includes a hidden honeypot (`botcheck`) field, and POSTs JSON to `app/api/contact/route.ts`. The route re-validates server-side, drops honeypot hits silently, and sends via **Resend** (`replyTo` = visitor's email). Recipient/sender/key come from env vars — never client-exposed.

**SEO** uses the App Router Metadata API (`export const metadata` / `generateMetadata`), not a Head component. `/contact` is `noindex`.

## Conventions

- Components are organized by feature/domain folders under `components/`, with shared primitives in `components/ui/`. Folder entry points are `index.tsx`.
- Use `classNames(...)` in `lib/helpers.ts` for conditional Tailwind classes; `blurImage()` generates base64 SVG placeholders for `next/image`.
- External image domains must be whitelisted in `next.config.mjs` (`images.remotePatterns`, currently `images.unsplash.com`).
- TS `isolatedModules` is on — import types with `import type { ... }` when the name could collide with a value.
