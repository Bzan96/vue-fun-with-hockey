import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const BASE_URL = 'https://api.nhle.com'
const BASE_WEB_URL = 'https://api.nhle.com'
const LOCALE = 'en'

const proxyOptions = {
  changeOrigin: true,
  secure: false,
  ws: true,
  rewrite: () => '', // rewrites the proxy path to not include the vite path name
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api/teams': {
        target: `${BASE_URL}/stats/rest/${LOCALE}/team`,
        ...proxyOptions,
      },
      '/api/player-spotlight': {
        // target: `${BASE_WEB_URL}/v1/player-spotlight`,
        target: `https://api-web.nhle.com/v1/player-spotlight`,
        ...proxyOptions,
      },
    },
  },
})
