import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// El sitio se sirve desde la raíz del dominio en Vercel, por eso base es '/'.
// (Antes era '/Haku-Winay-Noa-Jayatai/' porque GitHub Pages lo publicaba dentro
// de una subcarpeta con el nombre del repo. Si se retoma Pages, hay que volver
// a poner esa subruta aquí o los assets darán 404.)
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      // Convención shadcn/ui: `@/…` apunta a `src/…`
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
