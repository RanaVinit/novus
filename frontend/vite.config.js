import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],  // Remove the babel config
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "router": ["react-router-dom"],
          "icons": ["lucide-react"],
        },
      },
    },
    cssCodeSplit: true,
    minify: "esbuild",
    cssMinify: true,
    sourcemap: false,
    target: "esnext",
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  server: {
    preTransformRequests: ['.jsx', '.js'],
  },
});