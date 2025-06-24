import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName: '[local]__[hash:base64:5]',
    }
  }
});
