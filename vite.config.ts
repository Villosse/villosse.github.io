import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import { PortfolioSchema } from './src/config/schema'
import { withSmartDashes } from './src/utils/richtext'

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Put the title, favicon and link-preview metadata from config.yaml into
// index.html, so crawlers see them without running JavaScript.
const headFromConfig = (): Plugin => ({
  name: 'head-from-config',
  transformIndexHtml(html) {
    const { personal } = withSmartDashes(
      PortfolioSchema.parse(load(readFileSync(path.resolve(__dirname, 'config.yaml'), 'utf8'))),
    )
    const fullName = `${personal.name} ${personal.surname}`
    const title = `${personal.nickname} | ${fullName}`
    const meta = (attr: string, key: string, content: string) =>
      `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`
    const tags = [
      `<title>${escapeHtml(title)}</title>`,
      `<link rel="icon" href="${escapeHtml(personal.favicon)}" sizes="any" />`,
      meta('name', 'description', personal.description),
      meta('property', 'og:type', 'website'),
      meta('property', 'og:title', fullName),
      meta('property', 'og:description', personal.description),
      personal.url && meta('property', 'og:url', personal.url),
      personal.url && personal.ogImage && meta('property', 'og:image', new URL(personal.ogImage, personal.url).href),
      meta('name', 'twitter:card', 'summary'),
    ].filter(Boolean)
    return html.replace('</head>', `  ${tags.join('\n    ')}\n  </head>`)
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
