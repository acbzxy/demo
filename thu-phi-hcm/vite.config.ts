import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://10.14.122.24:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/PHT_BE/api')
      }
    }
  },
});