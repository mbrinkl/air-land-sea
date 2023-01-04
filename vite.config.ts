import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  test: {
    globals: true,
  },
  define: {
    'process.env': process.env,
  },
});
