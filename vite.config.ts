import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    base: "/villosse.github.io/",
    assetsInclude: ['**/*.yml', '**/*.yaml'],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    }
})
