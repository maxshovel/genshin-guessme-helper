import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Warn when individual chunk becomes too large
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split chunks smartly
        manualChunks: {
          vendor: ['react', 'react-dom', 'prop-types'],
          data: ['./src/data/characters.js']
        }
      }
    },
    // Optimize assets
    assetsInlineLimit: 4096, // 4kb
    // Minify
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // Simple React optimizations without jsxInject
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment'
  }
})
