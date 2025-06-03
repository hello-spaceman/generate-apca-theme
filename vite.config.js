import { defineConfig } from 'vite'

export default defineConfig({
   outDir: './dist',
   build: {
      lib: {
         entry: './src/index.js',
         name: 'generateAPCATheme',
         formats: ['es', 'cjs'],
         fileName: (format) => `generate-apca-theme.${format}.js`
      },
   }
});