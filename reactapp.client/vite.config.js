import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
         port: 5009,
         proxy: {
             '/api': {
                 target: 'http://localhost:5093', // backend dev URL
                 changeOrigin: true,
                 secure: false
             }
         }
     }
})
