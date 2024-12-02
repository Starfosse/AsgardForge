import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // à retirer avant le push
    watch: {
      usePolling: true, // Utiliser le polling pour vérifier les changements de fichiers
      interval: 1000, // Intervalle de polling en millisecondes
    },
    hmr: {
      overlay: true, // Afficher une superposition sur les erreurs de HMR
    },
  },
});
