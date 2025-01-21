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
      "/auth": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/user": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/products": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/category": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
