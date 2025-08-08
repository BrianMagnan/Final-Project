import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // Gzip compression for production
    mode === "production" &&
      compression({
        algorithm: "gzip",
        ext: ".gz",
      }),
    // Brotli compression for production
    mode === "production" &&
      compression({
        algorithm: "brotliCompress",
        ext: ".br",
      }),
    // Bundle analyzer for analyze mode
    mode === "analyze" &&
      visualizer({
        filename: "dist/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),

  build: {
    // Enable source maps for debugging (disable in production for smaller bundles)
    sourcemap: false,

    // Optimize chunk size
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunk for third-party libraries
          vendor: ["react", "react-dom", "react-router-dom"],
          // UI components chunk
          ui: ["react-icons"],
        },
        // Optimize chunk naming for better caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split("/").pop().replace(".jsx", "")
            : "chunk";
          return `js/${facadeModuleId}-[hash].js`;
        },
        // Optimize asset naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },

    // Enable minification
    minify: "terser",
    terserOptions: {
      compress: {
        // Remove console.log in production
        drop_console: true,
        drop_debugger: true,
      },
    },

    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,

    // Enable CSS code splitting
    cssCodeSplit: true,

    // Optimize assets
    assetsInlineLimit: 4096, // 4kb
  },

  // Development optimizations
  server: {
    // Enable HMR (Hot Module Replacement)
    hmr: true,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "react-icons"],
  },

  // Performance optimizations
  esbuild: {
    // Remove console.log in development too (optional)
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
}));
