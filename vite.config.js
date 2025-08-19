import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://fly.io/apps/back-rough-dream-3049", // 👈 your local backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
