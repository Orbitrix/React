import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      theme: {
        extend: {
          backgroundImage: {
            'gradient-bg': 'var(--gradient-color-bg)', // 👈 used in the Header
          },
        },
      },
    }),
  ],
})
