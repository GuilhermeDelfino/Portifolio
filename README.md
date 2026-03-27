# Guilherme Narciso — Portfolio

Personal portfolio website built with React + Vite + TypeScript.

## Stack

- **React 19** + **TypeScript**
- **Vite 8** — build tool
- **Tailwind CSS v4** — utility-first styling
- **Styled Components** — theme-aware component styling
- **Sass** — global styles, variables, mixins
- **react-icons** — icon library

## Features

- Dark / Light mode (OS preference + toggle)
- Bilingual: English / Portuguese (browser preference + toggle)
- Responsive — mobile-first, tested at 400px+
- Collapsible skill groups and experience details on mobile
- Download CV button (correct language version)
- Docker + nginx deployment with SSL support
- GitHub Actions workflow for GitHub Pages

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build
```

## Adding your profile photo

Place `profile.jpg` in the `public/` folder. Recommended: square image, minimum 400×400px.

> The image is referenced via `import.meta.env.BASE_URL` to ensure correct path resolution on GitHub Pages.

## Certification links

Update the credential URLs in `src/components/sections/Certifications.tsx`:

```ts
credentialUrl: 'https://www.credly.com/badges/your-badge-id',   // AWS
credentialUrl: 'https://learn.microsoft.com/...',                // Azure
```

## Docker

```bash
# Build and run
docker build -t portfolio .
docker run -p 80:80 portfolio

# Or with docker-compose
docker compose up
```

## GitHub Pages deployment

1. Push to a GitHub repository
2. Go to **Settings → Pages → Source → GitHub Actions**
3. Push to `master` — the workflow in `.github/workflows/deploy.yml` handles the rest

If deploying to `github.com/username/repo-name` (without custom domain), set `base` in `vite.config.ts`:

```ts
base: '/repo-name/',
```

For a custom domain, keep `base: '/'` and add a `CNAME` file to `public/` with your domain.

**Live:** https://guilhermedelfino.github.io/Portifolio/

## Project structure

```
src/
├── components/
│   ├── layout/     # Navbar, Footer
│   ├── sections/   # Hero, About, Experience, Skills, Education, Certifications, Contact
│   └── ui/         # Button, Card, SkillBadge, SectionTitle
├── data/           # skills.ts
├── hooks/          # useScrollAnimation
├── i18n/           # LanguageContext, en.json, pt.json
├── styles/         # global.scss, _variables.scss, _animations.scss, tailwind.css
└── theme/          # ThemeContext, light/dark theme objects
nginx/
├── default.conf        # production nginx config
└── ssl.conf.template   # SSL/HTTPS template for Certbot
```
