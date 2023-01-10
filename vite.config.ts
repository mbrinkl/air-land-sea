import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/testUtil/setup.ts',
    coverage: {
      all: true,
      include: ['src'],
      exclude: [
        'src/main.tsx',
        'src/theme.ts',
        'src/testUtil',
        'src/**/*.test.*',
      ],
    },
  },
});
