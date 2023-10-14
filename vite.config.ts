import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from "autoprefixer"

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  build: {
    lib: {
      entry: 'src/main.ts',
      formats: ['es', 'umd'],
      fileName: 'fplayer',
      name: "FPlayer",
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins:[
        autoprefixer({
          overrideBrowserslist: ["Chrome > 40", "ff > 31"],
        }),
      ],
    }
  }
})