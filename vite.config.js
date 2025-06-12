import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // 👈 ensures correct asset paths on Netlify
  plugins: [react()],
})
