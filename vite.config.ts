import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@hooks': '/src/hooks',
      '@pages': '/src/routes',
      '@utils': '/src/utils',
      '@assets': '/src/assets',
      '@context': '/src/context',
      '@services': '/src/services',
      '@components': '/src/components',
    },
  },
})
