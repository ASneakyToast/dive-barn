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

  // Create a theme toggle button
  createToggleButton(container = document.body) {
    const button = document.createElement('button');
    button.className = 'theme-toggle';
    button.setAttribute('aria-label', 'Toggle theme');
    button.innerHTML = `
      <span class="theme-toggle__icon">
        <span class="theme-toggle__sun">☀️</span>
        <span class="theme-toggle__moon">🌙</span>
      </span>
    `;

    button.addEventListener('click', () => {
      this.toggleTheme();
      this.updateToggleButton(button);
    });

    this.updateToggleButton(button);
    container.appendChild(button);
    return button;
  }

  updateToggleButton(button) {
    const isDark = this.theme === 'dark';
    button.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
  }
}

// CSS for the toggle button (inject into page)
const toggleCSS = `
.theme-toggle {
  position: fixed;
  top: var(--spacing-md);
  right: var(--spacing-md);
  z-index: 1000;
  background: var(--color-surface);
  border: 2px solid var(--color-border-default);
  border-radius: var(--border-radius-full);
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--effects-transition-duration-normal) var(--effects-transition-easing-ease-out);
  box-shadow: var(--effects-shadow-md);
}

.theme-toggle:hover {
  background: var(--color-interactive-hover);
  transform: scale(1.05);
  box-shadow: var(--effects-shadow-lg);
}

.theme-toggle:focus-visible {
  outline: 3px solid var(--color-interactive-focus);
  outline-offset: 2px;
}

.theme-toggle__icon {
  font-size: 1.25rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle__sun,
.theme-toggle__moon {
  position: absolute;
  transition: all var(--effects-transition-duration-normal) var(--effects-transition-easing-ease-out);
}

:root .theme-toggle__sun {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

:root .theme-toggle__moon {
  opacity: 0;
  transform: rotate(180deg) scale(0);
}

[data-theme="dark"] .theme-toggle__sun {
  opacity: 0;
  transform: rotate(180deg) scale(0);
}

[data-theme="dark"] .theme-toggle__moon {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

@media (max-width: 768px) {
  .theme-toggle {
    top: var(--spacing-sm);
    right: var(--spacing-sm);
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .theme-toggle__icon {
    font-size: 1rem;
  }
}
`;

// Inject CSS
if (!document.getElementById('theme-toggle-styles')) {
  const style = document.createElement('style');
  style.id = 'theme-toggle-styles';
  style.textContent = toggleCSS;
  document.head.appendChild(style);
}

// Initialize theme switcher
const themeSwitcher = new ThemeSwitcher();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeSwitcher;
} else if (typeof window !== 'undefined') {
  window.ThemeSwitcher = ThemeSwitcher;
  window.themeSwitcher = themeSwitcher;
}