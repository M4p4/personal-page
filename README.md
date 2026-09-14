# jaroratz.com

My personal site with a blog, projects, and a contact form. Live at [jaroratz.com](https://jaroratz.com).

Built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, MDX, React Three Fiber, and Resend.

## Getting started

```bash
bun install
cp .env.example .env.local
bun dev
```

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `bun dev`        | Dev server on localhost:3000   |
| `bun run build`  | Production build, then sitemap |
| `bun start`      | Serve the production build     |
| `bun run lint`   | ESLint                         |
| `bun run format` | Prettier                       |

Set `PAGE_URL` for metadata and the sitemap, and `RESEND_API_KEY`, `CONTACT_MAIL`, `CONTACT_FROM` for the contact form.

## Blog posts

Add an `.mdx` file to `_posts/`, and the file name becomes the URL. Frontmatter takes `title`, `excerpt`, `date`, `readTime`, `coverImage`, `tags`, and `author`. Posts with `draft: true` only show up in `bun dev`.

Posts support highlighted code (`title="…"`, `{1-3}`, `showLineNumbers`), image captions (`![alt](src "caption")`), `<Badge type="gain">+5%</Badge>`, Mermaid code blocks, and GFM tables. `_posts/test-article-kitchen-sink.mdx` has an example of each.

## Projects

Projects are listed in `_data/projects.json`.
