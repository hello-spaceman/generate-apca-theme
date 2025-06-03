import { defineConfig } from 'vite'

export default defineConfig({
   build: {
      lib: {
         entry: './src/index.js',
         name: 'generateAPCATheme',
         formats: ['es'],
         fileName: `generate-apca-theme`
      },
   }
});