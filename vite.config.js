import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
     extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  plugins: [react()],
  server:{
    port:3000,
  }
})
