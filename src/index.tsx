import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { cors } from 'hono/cors'
import { gameRouter } from './routes/game'
import { mainPage } from './pages/main'

const app = new Hono()

app.use('/api/*', cors())
app.use('/static/*', serveStatic({ root: './' }))

// favicon
app.get('/favicon.svg', (c) => {
  return c.body(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💰</text></svg>',
    200,
    { 'Content-Type': 'image/svg+xml' }
  )
})

// API routes
app.route('/api/game', gameRouter)

// Main page
app.get('/', (c) => {
  return c.html(mainPage())
})

export default app
