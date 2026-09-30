# Steven — Personal Portfolio

Built with Next.js (App Router), Tailwind CSS v4, and Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create a `.env.local` (never commit it) with:

| Variable                    | Used for                                          |
| --------------------------- | ------------------------------------------------- |
| `GITHUB_TOKEN`              | GitHub contribution graph (read-only token)       |
| `UPSTASH_REDIS_REST_URL`    | Page view counter (Upstash Redis)                 |
| `UPSTASH_REDIS_REST_TOKEN`  | Page view counter (Upstash Redis)                 |

Without `GITHUB_TOKEN` the GitHub section is skipped. Without the Upstash variables the view counter fails.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Deploy

Deployed on [Vercel](https://vercel.com). Add the environment variables above in the project settings before the first deploy.
