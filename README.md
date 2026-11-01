# VinGo

> Working brand name — **provisional**, may change before launch.

Website for a moving and loader services company operating in Vinnytsia,
Ukraine. Primary goal is lead generation: phone calls, quote-form
submissions, Telegram, and Viber contacts.

## Current Status

Landing page is complete and being prepared for launch. See `PROJECT.md`
for the phase overview and `docs/DECISIONS.md` for approved decisions.

## Local Development

```bash
npm run dev      # start the dev server (Turbopack)
npm run lint     # run ESLint
npx tsc --noEmit # type-check
npm run build    # production build
npm run start    # run the production build
```

## Main Stack

- Next.js 16 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS 4
- `clsx`, `tailwind-merge`, `class-variance-authority`
- `lucide-react`
- `motion`
- `react-hook-form`, `zod`, `@hookform/resolvers`

## Important Project Documents

- [`PROJECT.md`](./PROJECT.md) — business overview, goals, services, and
  design direction.
- [`CLAUDE.md`](./CLAUDE.md) — project-specific coding and content
  instructions.
- [`AGENTS.md`](./AGENTS.md) — agent workflow and Next.js version guidance.
- [`docs/DECISIONS.md`](./docs/DECISIONS.md) — approved decisions log.

## Environment Variables

Copy `.env.example` to `.env.local` for local development and set the same
variables in the hosting dashboard for deploys:

| Variable | Purpose |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Bot that delivers order-form submissions |
| `TELEGRAM_CHAT_ID` | Chat/group ID(s) that receive orders (comma-separated) |
| `NEXT_PUBLIC_SITE_URL` | Production URL without trailing slash — canonical, sitemap, social previews |
