import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log('command：', command)
  console.log('mode：', mode)

  return {
    base: './',
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 65233,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:65244',
          changeOrigin: true,
        },
      },
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
    },
  }
})
