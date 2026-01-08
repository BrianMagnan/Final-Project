/**
 * Font Loading Utility for Vary Suite
 * Manages font loading states and provides fallback behavior
 */

class FontLoader {
  constructor() {
    this.fontsLoaded = false;
    this.fontsLoading = false;
    this.loadingPromise = null;
  }

  /**
   * Check if fonts are loaded
   */
  areFontsLoaded() {
    if ("fonts" in document) {
      return document.fonts.check("1em Inter");
    }
    return this.fontsLoaded;
  }

  /**
   * Wait for fonts to load
   */
  async waitForFonts() {
    if (this.fontsLoaded) {
      return Promise.resolve();
    }

    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = new Promise((resolve) => {
      if ("fonts" in document) {
        // Modern browsers with Font Loading API
        document.fonts.ready.then(() => {
          this.fontsLoaded = true;
          this.fontsLoading = false;
          this.loadingPromise = null;
          resolve();
        });
      } else {
        // Fallback for older browsers
        setTimeout(() => {
          this.fontsLoaded = true;
          this.fontsLoading = false;
          this.loadingPromise = null;
          resolve();
        }, 1000); // Assume fonts are loaded after 1 second
      }
    });

    return this.loadingPromise;
  }

  /**
   * Add font loading classes to body
   */
  addLoadingClasses() {
    if (this.fontsLoaded) {
      document.body.classList.add("fonts-loaded");
      document.body.classList.remove("fonts-loading");
    } else {
      document.body.classList.add("fonts-loading");
      document.body.classList.remove("fonts-loaded");
    }
  }

  /**
   * Initialize font loading
   */
  init() {
    this.addLoadingClasses();

    this.waitForFonts().then(() => {
      this.addLoadingClasses();
    });

    // Listen for font loading events
    if ("fonts" in document) {
      document.fonts.addEventListener("loading", () => {
        this.fontsLoading = true;
        this.addLoadingClasses();
      });

      document.fonts.addEventListener("loadingdone", () => {
        this.fontsLoaded = true;
        this.fontsLoading = false;
        this.addLoadingClasses();
      });
    }
  }
}

// Create singleton instance
const fontLoader = new FontLoader();

export default fontLoader;
