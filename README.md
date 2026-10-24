# Ergito Vilanculos — Blog & Portfolio

Personal site of Ergito Vilanculos, a senior backend engineer: technical articles, career reflections, projects and professional experience, published in **English** and **Portuguese**.

**Live:** [ergito.vercel.app](https://ergito.vercel.app)

## Features

- Bilingual content (`en` / `pt`) with a language switcher that keeps the same post
- Blog written in MDX: code highlighting, math (KaTeX), citations, GitHub-style alerts
- Projects, experience timeline and an interactive terminal page
- Search and command palette (`Ctrl+K`)
- Light / dark theme
- Comments (Giscus), contact form (Formspree), view counter (Upstash Redis)
- SEO: sitemap, RSS feed, Open Graph, JSON-LD, Google Analytics 4 and Search Console

## Tech stack

| Area      | Tools                                                                                    |
| --------- | ---------------------------------------------------------------------------------------- |
| Framework | [Next.js 15](https://nextjs.org) (App Router), [React 19](https://react.dev), TypeScript |
| Content   | [Contentlayer2](https://github.com/timlrx/contentlayer2) + MDX, remark/rehype plugins    |
| Styling   | [Tailwind CSS 3](https://tailwindcss.com), Framer Motion                                 |
| i18n      | i18next / react-i18next                                                                  |
| Services  | Giscus, Formspree, Upstash Redis, Google Analytics 4                                     |
| Hosting   | [Vercel](https://vercel.com)                                                             |

## Getting started

Requirements: **Node.js 18.18+** (developed on Node 22) and **Yarn 1.x**.

```bash
git clone https://github.com/realrgt/blog.git
cd blog
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

The site runs without any environment variables, but comments, the view counter and analytics won't work, and the contact buttons fall back to `mailto:`.

### Environment variables

Create a `.env` file in the project root:

| Variable                                                                                                                       | Used for                                                        |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| `NEXT_PUBLIC_GISCUS_REPO`, `NEXT_PUBLIC_GISCUS_REPOSITORY_ID`, `NEXT_PUBLIC_GISCUS_CATEGORY`, `NEXT_PUBLIC_GISCUS_CATEGORY_ID` | Post comments ([giscus.app](https://giscus.app))                |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID`                                                                                                | Contact form; without it, contact buttons open a `mailto:` link |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`                                                                           | Post view counter ([Upstash](https://upstash.com/redis))        |
| `NEXT_PUBLIC_GA_ID`                                                                                                            | Google Analytics 4 (production builds only)                     |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`                                                                                         | Google Search Console verification meta tag                     |

## Scripts

| Command        | Description                                   |
| -------------- | --------------------------------------------- |
| `yarn dev`     | Start the development server                  |
| `yarn build`   | Production build, then generate the RSS feeds |
| `yarn serve`   | Serve the production build                    |
| `yarn lint`    | Lint and auto-fix                             |
| `yarn format`  | Format with Prettier                          |
| `yarn analyze` | Build with the bundle analyzer                |

## Project structure

```
app/[locale]/        Routes per language, i18n setup and translation files
components/          UI components (comments, search, terminal, theme, ...)
layouts/             Page and post layouts
data/blog/{en,pt}/   Blog posts in MDX (same file name in both languages)
data/                Site metadata, authors, projects, experience, bibliography
lib/                 Server utilities (view counter)
public/static/       Images and other static assets
scripts/             Post-build scripts (RSS)
```

## Writing a post

Add the post as `data/blog/en/<slug>.mdx` and `data/blog/pt/<slug>.mdx`, using the **same slug** in both languages so the language switcher and comments work across translations. Images go in `public/static/images/blog/<slug>/`. The frontmatter fields are defined in [`contentlayer.config.ts`](contentlayer.config.ts).

## Credits

Built on top of [tailwind-nextjs-starter-blog-i18n](https://github.com/PxlSyl/tailwind-nextjs-starter-blog-i18n) by PxlSyl, itself based on [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) by Timothy Lin.

## License

[MIT](LICENSE) © Ergito Vilanculos
