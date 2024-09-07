import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
      },
    },
    cors: false,
  },
  base: "/score-card-app/",
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        404: "./public/404.html",
      },
    },
  },
});
