import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})
//quando chamo a url acima, ele nao deixa acessar o http por que o servidor do front roda https

     