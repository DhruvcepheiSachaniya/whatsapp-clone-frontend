import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
  plugins: [
    react(),
    NodeGlobalsPolyfillPlugin({
      process: true,
      buffer: true,
    }),
  ],
  server: {
    host: "0.0.0.0", // Listen on all interfaces
    port: 5176, // Default port, can be changed if needed
  },
  define: {
    global: "window",
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
    },
  },
});
