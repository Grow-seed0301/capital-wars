import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

// ビルド後に _routes.json を静的ファイル除外設定で上書きするプラグイン
function patchRoutesPlugin() {
  return {
    name: 'patch-routes-json',
    closeBundle() {
      const routes = {
        version: 1,
        include: ['/*'],
        exclude: [
          '/static/*',
          '/favicon*.png',
          '/favicon.svg',
          '/apple-touch-icon.png',
          '/manifest.json',
          '/ogp.png',
          '/ogp.svg',
        ]
      }
      writeFileSync(
        resolve(__dirname, 'dist/_routes.json'),
        JSON.stringify(routes)
      )
    }
  }
}

export default defineConfig({
  plugins: [
    build(),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    }),
    patchRoutesPlugin()
  ]
})
