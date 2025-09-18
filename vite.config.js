import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.has('profile')) {
          // Para fotos de perfil - más compresión
          return new URLSearchParams({
            format: 'webp',
            quality: '75',
            width: '80',
            height: '80'
          })
        }
        if (url.searchParams.has('logo')) {
          // Para logos - mantener calidad pero optimizar
          return new URLSearchParams({
            format: 'webp',
            quality: '85',
            width: '200'
          })
        }
        if (url.searchParams.has('illustration')) {
          // Para ilustraciones - balancear calidad y tamaño
          return new URLSearchParams({
            format: 'webp',
            quality: '80',
            width: '500'
          })
        }
        // Default para otras imágenes
        return new URLSearchParams({
          format: 'webp',
          quality: '80'
        })
      }
    })
  ],
})