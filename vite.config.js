import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// vite.config.js
export default {
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api-totem-bus.onrender.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
}


     