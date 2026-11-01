import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // Relative paths so the build works from a sub-folder (e.g. GitHub Pages) as well as a domain root.
  base: './',
  plugins: [react(), tailwindcss()],
  // منفذ ثابت: LocalStorage مرتبط بالعنوان، وتغيّر المنفذ يُظهر التقدم فارغًا.
  server: { port: 5173, strictPort: true },
  preview: { port: 5173, strictPort: true },
})
