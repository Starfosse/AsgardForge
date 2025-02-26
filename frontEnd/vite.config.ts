import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
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
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      overlay: true,
    },
    proxy: {
      "/api/": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/api/auth": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/api/customers": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/api/products": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/api/category": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/api/reviews": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/api/contact": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
