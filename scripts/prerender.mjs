// Build-time prerendering: renders each route to static HTML so crawlers
// that don't execute JavaScript (GPTBot, ClaudeBot, PerplexityBot, etc.)
// see the real page content. Humans still get the normal SPA — React
// mounts over the prerendered markup on load.
//
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const template = readFileSync(resolve(root, 'dist/index.html'), 'utf-8')
const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'))

// route -> output file inside dist/. Flat .html files (privacy.html) are
// served for /privacy by Cloudflare's asset handling without a redirect.
const ROUTES = [
  { url: '/', out: 'dist/index.html', useHelmetHead: false },
  { url: '/privacy', out: 'dist/privacy.html', useHelmetHead: true },
  { url: '/terms', out: 'dist/terms.html', useHelmetHead: true },
]

for (const route of ROUTES) {
  const { html, helmet } = render(route.url)

  let page = template.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`,
  )

  if (route.useHelmetHead && helmet) {
    // Subpages carry their own title/description/canonical via Helmet.
    // Swap out the homepage defaults so bots don't see duplicates.
    const helmetTitle = helmet.title.toString()
    if (helmetTitle) {
      page = page.replace(/<title>.*?<\/title>/, helmetTitle)
    }
    page = page.replace(/^\s*<link rel="canonical"[^>]*\/>\n/m, '')
    page = page.replace(/^\s*<meta name="description"[^>]*\/>\n/m, '')
    const injected = [helmet.meta.toString(), helmet.link.toString()]
      .filter(Boolean)
      .join('\n    ')
    if (injected) {
      page = page.replace('</head>', `    ${injected}\n  </head>`)
    }
  }

  writeFileSync(resolve(root, route.out), page)
  console.log(`[prerender] ${route.url} -> ${route.out} (${(page.length / 1024).toFixed(1)} kB)`)
}
