import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://abdelrahman-mh.github.io/age-calculator/",
  css: {
    preprocessorOptions: {
      sass: {
        outputStyle: 'compressed',
        sourceMap: true,
        includePaths: ['src/styles'],
        precision: 6,
      },
    },
  },
})
