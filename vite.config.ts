import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Using '/' for root domains like pradeepatwork.github.io
  base: '/', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Use esbuild (default) to fix the 'terser not found' error
    minify: 'esbuild',
    sourcemap: false,
  }
});
