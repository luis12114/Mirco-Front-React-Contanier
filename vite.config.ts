import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

const remoteUrl = process.env.VITE_MICROAPP_URL || 'http://localhost:4173/assets/remoteEntry.js';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "container",
      remotes: {
        microapp: remoteUrl
      },
      shared: ["react", "react-dom"]
    })
  ],

  build: {
    target: "esnext"
  },

  optimizeDeps: {
    exclude: ["microapp/App"]
  },

  server: {
    cors: true, // habilita CORS para todos los orígenes
    port: 5001,
    host: true
  }

});