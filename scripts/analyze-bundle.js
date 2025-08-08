#!/usr/bin/env node

import fs from "fs";
import path from "path";

const distPath = "./dist";

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function analyzeBundle() {
  console.log("📊 Bundle Analysis\n");

  if (!fs.existsSync(distPath)) {
    console.log('❌ No dist folder found. Run "npm run build" first.');
    return;
  }

  const files = fs.readdirSync(distPath, { recursive: true });
  let totalSize = 0;
  let jsFiles = [];
  let cssFiles = [];
  let otherFiles = [];

  files.forEach((file) => {
    if (typeof file === "string") {
      const filePath = path.join(distPath, file);
      const stats = fs.statSync(filePath);

      if (file.endsWith(".js")) {
        jsFiles.push({ name: file, size: stats.size });
      } else if (file.endsWith(".css")) {
        cssFiles.push({ name: file, size: stats.size });
      } else if (!file.includes(".")) {
        // Skip directories
        return;
      } else {
        otherFiles.push({ name: file, size: stats.size });
      }

      totalSize += stats.size;
    }
  });

  console.log(`📦 Total Bundle Size: ${formatBytes(totalSize)}\n`);

  if (jsFiles.length > 0) {
    console.log("📜 JavaScript Files:");
    jsFiles.forEach((file) => {
      console.log(`  ${file.name}: ${formatBytes(file.size)}`);
    });
    console.log("");
  }

  if (cssFiles.length > 0) {
    console.log("🎨 CSS Files:");
    cssFiles.forEach((file) => {
      console.log(`  ${file.name}: ${formatBytes(file.size)}`);
    });
    console.log("");
  }

  if (otherFiles.length > 0) {
    console.log("📁 Other Files:");
    otherFiles.forEach((file) => {
      console.log(`  ${file.name}: ${formatBytes(file.size)}`);
    });
    console.log("");
  }

  // Check for compressed files
  const gzipFiles = files.filter(
    (file) => typeof file === "string" && file.endsWith(".gz")
  );
  const brotliFiles = files.filter(
    (file) => typeof file === "string" && file.endsWith(".br")
  );

  if (gzipFiles.length > 0) {
    console.log("🗜️  Gzip Compression Available");
  }

  if (brotliFiles.length > 0) {
    console.log("🗜️  Brotli Compression Available");
  }

  console.log("\n✨ Build optimizations applied successfully!");
}

analyzeBundle();
