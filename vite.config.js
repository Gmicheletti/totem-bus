import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://mobile-l.sitbus.com.br:6060',
        changeOrigin: true,
        secure: false,
        rewrite: path => path, // <<< mantém o /api na URL
      }
    }
  }
})
