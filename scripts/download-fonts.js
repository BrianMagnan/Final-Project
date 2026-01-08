#!/usr/bin/env node

/**
 * Font Download Script for Vary Suite
 * Downloads Inter font family from Google Fonts
 */

import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fontsDir = path.join(__dirname, "../src/assets/fonts");

// Ensure fonts directory exists
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

// Inter font URLs from Google Fonts
const fontUrls = {
  "Inter-Regular.woff2":
    "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
  "Inter-Medium.woff2":
    "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
  "Inter-SemiBold.woff2":
    "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
  "Inter-Bold.woff2":
    "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
  "Inter-ExtraBold.woff2":
    "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
  "Inter-Black.woff2":
    "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
  "Inter-Light.woff2":
    "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
  "Inter-Thin.woff2":
    "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
};

function downloadFont(filename, url) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(fontsDir, filename);
    const file = fs.createWriteStream(filepath);

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(
            new Error(`Failed to download ${filename}: ${response.statusCode}`)
          );
          return;
        }

        response.pipe(file);

        file.on("finish", () => {
          file.close();
          console.log(`✅ Downloaded: ${filename}`);
          resolve();
        });

        file.on("error", (err) => {
          fs.unlink(filepath, () => {}); // Delete the file if there was an error
          reject(err);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

async function downloadAllFonts() {
  console.log("🚀 Starting font download...");
  console.log(`📁 Downloading to: ${fontsDir}`);

  try {
    for (const [filename, url] of Object.entries(fontUrls)) {
      await downloadFont(filename, url);
    }
    console.log("🎉 All fonts downloaded successfully!");
  } catch (error) {
    console.error("❌ Error downloading fonts:", error.message);
    console.log("\n💡 Manual download alternative:");
    console.log("1. Visit: https://fonts.google.com/specimen/Inter");
    console.log("2. Download the font family");
    console.log("3. Extract and copy .woff2 files to src/assets/fonts/");
  }
}

// Run the download
downloadAllFonts();
