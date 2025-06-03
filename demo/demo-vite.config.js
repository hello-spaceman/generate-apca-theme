import { defineConfig } from 'vite'

export default defineConfig({
   base: './',
   build: {
      outDir: './demo/dist',
      rollupOptions: {
         input: {
            demo: './demo/demo.js'
         },
         output: {
            entryFileNames: '[name].js'
         }
      }
   }
});