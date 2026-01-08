import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const repoName = 'media-personal-vault'
export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
