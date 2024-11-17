import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl';
import { resolve } from 'path'

export default defineConfig({
  plugins: [glsl()],
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
    open: true
  },
  build: {
    minify: true,
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        project: resolve(__dirname, 'src/project.js')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]'
      }
    }
  },
})
