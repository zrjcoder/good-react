import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/': path.join(__dirname, 'src/'),
    },
  },
  define: {
    'process.env': process.env,
  },
  optimizeDeps: {
    exclude: ['googleapis'],
  },
})
