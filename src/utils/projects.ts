// Project pages live at /projects/<slug>/ (one generated HTML file each, see vite.config.ts).
export const projectPath = (slug: string): string => `/projects/${slug}/`;

// The slug of the project page at `pathname`, or undefined for any other page.
export const projectSlugFromPath = (pathname: string): string | undefined =>
  /^\/projects\/([a-z0-9-]+)\/?$/.exec(pathname)?.[1];
