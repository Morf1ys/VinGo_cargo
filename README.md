# VinGo

> Working brand name — **provisional**, may change before launch.

Website for a moving and loader services company operating in Vinnytsia,
Ukraine. Primary goal is lead generation: phone calls, quote-form
submissions, Telegram, and Viber contacts.

## Current Status

Project foundation only. No design or website sections have been built yet.
See `PROJECT.md` for the current development phase.

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
- `motion`, `gsap`, `lenis`
- `react-hook-form`, `zod`, `@hookform/resolvers`

## Important Project Documents

- [`PROJECT.md`](./PROJECT.md) — business overview, goals, services, and
  design direction.
- [`CLAUDE.md`](./CLAUDE.md) — project-specific coding and content
  instructions.
- [`AGENTS.md`](./AGENTS.md) — agent workflow and Next.js version guidance.
- [`docs/DECISIONS.md`](./docs/DECISIONS.md) — approved decisions log.
