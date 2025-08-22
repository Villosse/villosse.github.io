import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    base: process.env.NODE_ENV === 'production' ?
        '/villosse.github.io/'
        : '/',
    assetsInclude: ['**/*.yml', '**/*.yaml'],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    },
    publicDir: path.resolve(__dirname, './public'),
})
