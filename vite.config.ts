import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Using '/' for root domains like pradeepatwork.github.io
  base: '/', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure the index.html is as clean as possible
    minify: 'terser',
    sourcemap: false,
  }
  // Removed server.historyApiFallback as it is not supported in Vite's ServerOptions and Vite provides this functionality by default.
});
