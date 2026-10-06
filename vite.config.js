import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    // Three.js is intentionally isolated and lazy-loaded; its vendor chunk is
    // expected to be larger than the default threshold.
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined

          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) {
            return 'vendor-react'
          }
          if (id.includes('/framer-motion/') || id.includes('\\framer-motion\\')) return 'vendor-motion'
          if (id.includes('/swiper/') || id.includes('\\swiper\\')) return 'vendor-swiper'
          if (id.includes('/lucide-react/') || id.includes('\\lucide-react\\')) return 'vendor-icons'
          if (id.includes('/@supabase/') || id.includes('\\@supabase\\')) return 'vendor-supabase'
          if (id.includes('/three/') || id.includes('\\three\\')) return 'vendor-three'

          return undefined
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
