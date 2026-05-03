# Sales Call Coach - Acceptance Test Report

Date: 2026-05-04
Build: production (`npm run build`)
Server: `npm run start -- -p 3004`

## Acceptance Checks

- [x] `npm run build` exit 0 - **PASS** (Next.js 16.2.4, 21 static pages including 16 SSG call/[id])
- [x] Route `/` returns 200 - **PASS** (60435 bytes)
- [x] Route `/scorecard` returns 200 - **PASS** (92210 bytes)
- [x] Route `/call/c-2841` returns 200 - **PASS** (88257 bytes; first id from src/data/calls.ts)
- [x] All routes >= 5000 chars - **PASS**
- [x] No stub strings (Lorem ipsum / Item 1 / TODO) - **PASS** (only Lucide icon class `lucide-list-todo` which is a real product icon name)
- [x] At least one `<main>` per route - **PASS** (3/3)
- [x] At least one `<h1>` per route - **PASS** (3/3)
- [x] Identity hygiene (no claude/anthropic/co-authored-by leaks) - **PASS**

## Screenshots Captured

- `public/screenshots/hero.png` - `/` (Call queue)
- `public/screenshots/dashboard.png` - `/scorecard`
- `public/screenshots/detail.png` - `/call/c-2841`

Viewport 1440x900 @ 2x DPR via puppeteer.
