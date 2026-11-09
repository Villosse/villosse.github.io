# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start dev server (localhost:5173)
yarn build      # Type-check, build the resume PDF, then bundle to dist/
yarn resume     # Generate resume/resume.typ from config.yaml and compile public/lenny_chiadmi-delage_resume.pdf (needs typst)
yarn lint       # Run ESLint
yarn preview    # Preview the production build locally
```

Package manager is **yarn** (not npm). There are no tests.

## Architecture

This is a **data-driven portfolio site**: all visible content lives in `config.yaml` at the repo root, plus one `projects/<name>.yaml` per project. The React app reads that file at build time, validates it with Zod, and renders it — no database, no API.

### Data flow

```
config.yaml + projects/*.yaml  →  src/config/load.ts  (js-yaml parse, merge, Zod validation)
                        ↓
             src/config/index.ts  (site: files via ?raw / import.meta.glob)
                        ↓
             src/App.tsx  →  Portfolio.tsx (home) or ProjectPage.tsx (/projects/<name>/)
```

`loadConfig` in `src/config/load.ts` is shared by the site, `scripts/resume.ts` and `vite.config.ts`, each passing in how to read the files. `config.yaml`'s `projects` is an ordered list of names; each name loads `projects/<name>.yaml` and becomes that project's `slug` (unlisted files are drafts and are not published). The merged result is validated against `PortfolioSchema` in `src/config/schema.ts`. A schema error at startup crashes the app with a Zod message — this is intentional.

### Adding or changing content

Edit `config.yaml` (and `projects/*.yaml`). The schema (`src/config/schema.ts`) defines what fields are accepted:

- `personal` — name, title, image path (must start with `/`), description; `url` and `ogImage` feed the link-preview tags
- `contact` — known keys (`email`, `github`, `linkedin`, `phone`, `twitter`, `discord`, `telegram`, `resume`, `website`) plus arbitrary custom keys; all optional. Custom keys are rendered with a capitalized label and no icon.
- `projects`, `experience`, `education`, `volunteering` — arrays; see schema for required fields. Each entry may have `highlights` (bullets, optionally `{ text, items }` for sub-bullets) and `resume: false` to appear on the website only.
- Projects: one file each in `projects/`, named after the page URL `/projects/<name>/`, listed in `config.yaml`. They may have `details` (paragraphs) and `images` (`{ src, alt, caption }`, files in `public/assets/projects/<name>/`), shown only on the project page.
- `skills` — named groups of skills `{ name, items }`, shown on the site and as the resume's Skills section.
- Text fields accept `**bold**` and `[label](url)` (`src/utils/richtext.ts` converts to Typst and React).

### Resume PDF

`scripts/resume.ts` validates `config.yaml`, writes `resume/resume.typ` (gitignored), which applies the layout in `resume/template.typ`; `typst compile` turns it into `public/lenny_chiadmi-delage_resume.pdf` (gitignored) using the vendored XCharter fonts in `resume/fonts/`. The resume uses `highlights`, not `description`. The phone number is never committed: it comes from the `RESUME_PHONE` env var (a `.env` file locally, a GitHub Actions secret in CI) and is omitted when unset.

The `head-from-config` plugin in `vite.config.ts` writes the `<title>`, favicon link, meta description and Open Graph tags into the HTML from the config, so they are present without JavaScript. At build time it also emits `dist/projects/<name>/index.html` per project (same app, project-specific head), so GitHub Pages serves project URLs directly. Routing is a plain `location.pathname` check in `App.tsx` (`src/utils/projects.ts`); links are ordinary page loads.

Static assets (avatar, etc.) go in `public/assets/` and are referenced as `/assets/filename`.

### UI components

`src/components/ui/` holds `ContactIcon` (inline SVG per contact type), `RichText` (renders the inline markup) and `Highlights` (nested bullet lists).

Utility logic lives in:
- `src/utils/contacts.ts` — maps the contact record to typed `ContactItem[]` for rendering
- `src/utils/richtext.ts` — inline markup parser, Typst escaping, and the `--` → en dash conversion

Styling is plain CSS in `src/styles/global.css`, themed with CSS variables. The `@` alias resolves to `src/`.

## Deployment

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`), which runs `yarn lint`, installs Typst, runs `yarn build` (with the `RESUME_PHONE` secret) and deploys `dist/` to GitHub Pages. The Vite `base` is `/` (not a sub-path). `.github/workflows/ci.yml` runs the same lint and build on pull requests and other branches, without deploying.
