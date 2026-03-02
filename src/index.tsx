import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { cors } from 'hono/cors'
import { gameRouter } from './routes/game'
import { mainPage } from './pages/main'

const app = new Hono()

app.use('/api/*', cors())

// 静的ファイル（/static/* は _routes.json の exclude で直接配信）
// favicon, manifest, ogp も _routes.json で除外済み → Cloudflare Pages が直接配信
app.use('/static/*', serveStatic({ root: './' }))

// API routes
app.route('/api/game', gameRouter)

// Main page
app.get('*', (c) => {
  const html = mainPage().replace(/SCRIPT_END/g, '</script>')
  return c.html(html)
})

export default app
