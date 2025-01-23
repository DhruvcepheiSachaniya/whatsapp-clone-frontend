// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Listen on all interfaces
    port: 5177, // Default port, can be changed if needed
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
