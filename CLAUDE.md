# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start dev server (localhost:5173)
yarn build      # Type-check, build the resume PDF, then bundle to dist/
yarn resume     # Generate resume/resume.typ from config.yaml and compile public/resume.pdf (needs typst)
yarn lint       # Run ESLint
yarn preview    # Preview the production build locally
```

Package manager is **yarn** (not npm). There are no tests.

## Architecture

This is a **data-driven portfolio site**: all visible content lives in `config.yaml` at the repo root. The React app reads that file at build time, validates it with Zod, and renders it — no database, no API.

### Data flow

```
config.yaml  →  src/config/index.ts  (js-yaml parse + Zod validation)
                        ↓
             src/components/Portflolio.tsx  (single-page render)
```

`config.yaml` is imported as a raw string via Vite's `?raw` suffix, parsed by `js-yaml`, then validated against `PortfolioSchema` in `src/config/schema.ts`. A schema error at startup crashes the app with a Zod message — this is intentional.

### Adding or changing content

Edit `config.yaml`. The schema (`src/config/schema.ts`) defines what fields are accepted:

- `personal` — name, title, image path (must start with `/`), description
- `contact` — known keys (`email`, `github`, `linkedin`, `phone`, `twitter`, `discord`, `telegram`, `resume`, `website`) plus arbitrary custom keys; all optional. Custom keys are rendered with a capitalized label and no icon.
- `skills` — each entry is either a plain string or an object with `name`, optional `level` (1–10), `years`, `description`. Level drives a color-coded progress bar.
- `projects`, `experience`, `education`, `volunteering` — arrays; see schema for required fields. Each entry may have `highlights` (bullets, optionally `{ text, items }` for sub-bullets) and `resume: false` to appear on the website only.
- `skillGroups` — named skill lists (shown on the site and as the resume's Skills section).
- Text fields accept `**bold**` and `[label](url)` (`src/utils/richtext.ts` converts to Typst and React).

### Resume PDF

`scripts/resume.ts` validates `config.yaml`, writes `resume/resume.typ` (gitignored), which applies the layout in `resume/template.typ`; `typst compile` turns it into `public/resume.pdf` (gitignored) using the vendored XCharter fonts in `resume/fonts/`. The resume uses `highlights`, not `description`. The phone number is never committed: it comes from the `RESUME_PHONE` env var (a `.env` file locally, a GitHub Actions secret in CI) and is omitted when unset.

Static assets (avatar, etc.) go in `public/assets/` and are referenced as `/assets/filename`.

### UI components

`src/components/ui/` holds `ContactIcon` (inline SVG per contact type) and `RichText` (renders the inline markup).

Utility logic lives in:
- `src/utils/contacts.ts` — maps the contact record to typed `ContactItem[]` for rendering
- `src/utils/skills.ts` — normalizes string/object skills
- `src/utils/richtext.ts` — inline markup parser, Typst escaping, and the `--` → en dash conversion

Styling is plain CSS in `src/styles/global.css`, themed with CSS variables. The `@` alias resolves to `src/`.

## Deployment

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`), which installs Typst, runs `yarn build` (with the `RESUME_PHONE` secret) and deploys `dist/` to GitHub Pages. The Vite `base` is `/` (not a sub-path).
