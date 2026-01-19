import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set the correct base path for GitHub Pages so built assets resolve (avoid 404 on main.tsx)
  base: '/Pentathlon_26/',
})
