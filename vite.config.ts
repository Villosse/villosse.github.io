import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { existsSync, readFileSync } from 'fs'
import { loadConfig as parseConfig, type Config } from './src/config/load'
import { parseRichText } from './src/utils/richtext'
import { projectPath, projectSlugFromPath } from './src/utils/projects'

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const read = (file: string) => (existsSync(file) ? readFileSync(file, 'utf8') : undefined)
const loadConfig = () =>
  parseConfig(read(path.resolve(__dirname, 'config.yaml')) ?? '', (slug) => read(path.resolve(__dirname, 'projects', `${slug}.yaml`)))

// Title, favicon and link-preview tags for the home page, or for one project's page.
const headTags = ({ personal, projects }: Config, slug?: string): string => {
  const project = projects.find((p) => p.slug === slug)
  const fullName = `${personal.name} ${personal.surname}`
  const plain = (s: string) => parseRichText(s).map((t) => t.text).join('')
  const absolute = (p: string) => personal.url && new URL(p, personal.url).href

  const title = project ? `${project.title} | ${fullName}` : `${personal.nickname} | ${fullName}`
  const description = project ? plain(project.description) : personal.description
  const url = absolute(project ? projectPath(project.slug) : '/')
  const image = project?.images?.[0]?.src ?? personal.ogImage

  const meta = (attr: string, key: string, content: string) =>
    `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`
  return [
    `<title>${escapeHtml(title)}</title>`,
    `<link rel="icon" href="${escapeHtml(personal.favicon)}" sizes="any" />`,
    meta('name', 'description', description),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:title', project ? project.title : fullName),
    meta('property', 'og:description', description),
    url && meta('property', 'og:url', url),
    image && absolute(image) && meta('property', 'og:image', absolute(image) as string),
    meta('name', 'twitter:card', 'summary'),
  ].filter(Boolean).join('\n    ')
}

const withHead = (html: string, tags: string) => html.replace('</head>', `  ${tags}\n  </head>`)

// Put the head tags from config.yaml into the HTML so crawlers see them without
// running JavaScript, and emit projects/<slug>/index.html for each project so
// GitHub Pages serves the project pages directly.
const headFromConfig = (): Plugin => ({
  name: 'head-from-config',
  transformIndexHtml(html, ctx) {
    // In dev every path is served from index.html; pick the page from the URL.
    const slug = ctx.originalUrl ? projectSlugFromPath(ctx.originalUrl.split('?')[0]) : undefined
    return withHead(html, headTags(loadConfig(), slug))
  },
  generateBundle: {
    // After Vite has emitted the final index.html (with hashed asset tags).
    order: 'post',
    handler(_, bundle) {
      const index = bundle['index.html']
      if (index?.type !== 'asset') return
      const config = loadConfig()
      const home = String(index.source)
      for (const { slug } of config.projects) {
        this.emitFile({
          type: 'asset',
          fileName: `${projectPath(slug).slice(1)}index.html`,
          source: home.replace(headTags(config), headTags(config, slug)),
        })
      }
    },
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), headFromConfig()],
    base: '/',
    assetsInclude: ['**/*.yml', '**/*.yaml'],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    },
    publicDir: path.resolve(__dirname, './public'),
})
