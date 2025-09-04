/**
 * Theme Switcher Module
 * Handles light/dark theme switching with system preference detection
 */
class ThemeSwitcher {
  constructor() {
    this.theme = this.getStoredTheme() || this.getSystemTheme();
    this.init();
  }

  init() {
    // Apply initial theme
    this.applyTheme(this.theme);
    
    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!this.getStoredTheme()) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  getStoredTheme() {
    return localStorage.getItem('theme');
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.theme = theme;
    
    // Dispatch theme change event for web components
    document.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme }
    }));
  }

  setTheme(theme) {
    this.applyTheme(theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    return newTheme;
  }

  clearStoredTheme() {
    localStorage.removeItem('theme');
    this.setTheme(this.getSystemTheme());
  }

}

// Note: Theme toggle UI is now handled by the db-theme-toggle web component:
// components/theme-switcher/theme-toggle-component.js

// Initialize theme switcher
const themeSwitcher = new ThemeSwitcher();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeSwitcher;
} else if (typeof window !== 'undefined') {
  window.ThemeSwitcher = ThemeSwitcher;
  window.themeSwitcher = themeSwitcher;
}