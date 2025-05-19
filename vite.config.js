import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Optional: if using @/ for paths
    }
  },
  build: {
    outDir: 'dist'
  },
  // ✅ Make sure base is set correctly if deployed in subdir
  base: '/',
  server: {
    // ✅ This is the correct option for Vite (defaults are usually fine)
    fs: {
      strict: false
    }
  }
})
