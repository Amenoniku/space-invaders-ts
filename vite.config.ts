import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), imagetools()]
})
