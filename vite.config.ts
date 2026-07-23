import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// El sitio se sirve desde https://<usuario>.github.io/Haku-Winay-Noa-Jayatai/
// por eso la ruta base debe coincidir con el nombre del repositorio.
export default defineConfig({
  base: '/Haku-Winay-Noa-Jayatai/',
  plugins: [react()],
  resolve: {
    alias: {
      // Convención shadcn/ui: `@/…` apunta a `src/…`
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
