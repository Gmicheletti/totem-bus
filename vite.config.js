import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
})


// export default defineConfig({
//   plugins: [react()], // <-- isso precisa estar ativo
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://mobile-l.sitbus.com.br:6060',
//         changeOrigin: true,
//         rewrite: path => path.replace(/^\/api/, '')
//       }
//     }
//   }
// })