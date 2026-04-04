# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Type-check + build (tsc -b && vite build)
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

No test runner is configured.

## Architecture

Single-page portfolio app built with React 19 + TypeScript + Vite.

**Providers (wrapping order in `App.tsx`):**
- `LanguageProvider` (outer) — i18n, `en`/`pt`, stored in `localStorage`
- `ThemeProvider` (inner) — dark/light theme, stored in `localStorage`

Both expose their own hooks: `useTranslation()` and `useTheme()`.

**Content flow:**
- All user-visible text lives in `src/i18n/locales/en.json` and `pt.json`, accessed via `t('key')` from `useTranslation()`
- Skill data is the only structured data file: `src/data/skills.ts`
- Experience/education/certification content is hardcoded in their section components, with keys delegated to the locale files

**Styling:**
- `styled-components` is the primary approach — all component styles use theme tokens via `theme.colors.*`, `theme.shadows.*` (see `src/theme/index.ts` for the full token set)
- Tailwind CSS v4 is available for utility classes
- Global styles and variables in `src/styles/`
- Use `$propName` (transient props) when passing boolean/state props to styled-components to avoid DOM forwarding

**Scroll animations:**
- `useScrollAnimation` hook (`src/hooks/useScrollAnimation.ts`) uses `IntersectionObserver` and returns `{ ref, isVisible }`
- Each section wraps its content in a styled component with `$visible` prop to animate on entry

**Path alias:** `@/` resolves to `src/`

**Deployment:** Push to `master` triggers GitHub Actions → `npm run build` → deploys `dist/` to `gh-pages` branch → served via custom domain (configured in `public/CNAME`). `vite.config.ts` has `base: '/'` for the custom domain — change to `'/Portifolio/'` if deploying without it.
