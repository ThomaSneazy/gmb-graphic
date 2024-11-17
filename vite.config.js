import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl';

// vite.config.js
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
        main: './index.html',
        project: './project.html'
      }
    }
  },
})
