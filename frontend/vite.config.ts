import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path, { resolve } from 'path';

const rootPath = path.resolve(__dirname, "src");

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000/',
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.relative(__dirname, "./src"),
      "lib": resolve(rootPath, "./lib"),
      "api": resolve(rootPath, "./api"),
      "components": resolve(rootPath, "components"),
      "constants": resolve(rootPath, "constants"),
      "hooks": resolve(rootPath, "hooks"),
      "pages": resolve(rootPath, "pages"),
      "assets": resolve(rootPath, "assets"),
      "types": resolve(rootPath, "types"),
      "utils": resolve(rootPath, "utils"),
      "defines": resolve(rootPath, "defines"),
      "services": resolve(rootPath, "services"),
    },
  }
},)
