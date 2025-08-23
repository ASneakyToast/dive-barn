/**
 * Dive Barn Theme Toggle Component
 * A reusable theme toggle web component using design tokens
 */
class DbThemeToggle extends HTMLElement {
    constructor() {
        super();
        // Don't use Shadow DOM to avoid CSS custom property inheritance issues
        this.themeSwitcher = null;
    }

    static get observedAttributes() {
        return ['size', 'position', 'variant'];
    }

    connectedCallback() {
        this.initializeThemeSwitcher();
        this.render();
        this.setupEventListeners();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    initializeThemeSwitcher() {
        // Access the global theme switcher instance
        if (typeof window !== 'undefined' && window.themeSwitcher) {
            this.themeSwitcher = window.themeSwitcher;
        } else {
            console.warn('ThemeSwitcher not available. Make sure theme-switcher.js is loaded before theme-toggle-component.js');
        }
    }

    setupEventListeners() {
        const button = this.querySelector('.db-theme-toggle');
        if (!button) return;

        // Handle theme toggle
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (this.themeSwitcher) {
                const newTheme = this.themeSwitcher.toggleTheme();
                this.updateToggleState();
                
                // Dispatch custom event
                this.dispatchEvent(new CustomEvent('db-theme-change', {
                    bubbles: true,
                    composed: true,
                    detail: { theme: newTheme }
                }));
            }
        });

        // Listen for external theme changes
        document.addEventListener('themechange', () => {
            this.updateToggleState();
        });

        // Initial state update
        this.updateToggleState();
    }

    updateToggleState() {
        const button = this.querySelector('.db-theme-toggle');
        if (!button || !this.themeSwitcher) return;

        const currentTheme = this.themeSwitcher.theme;
        const isDark = currentTheme === 'dark';
        
        button.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
        button.setAttribute('data-theme', currentTheme);
    }

    get size() {
        return this.getAttribute('size') || 'normal';
    }

    get position() {
        return this.getAttribute('position') || 'fixed';
    }

    get variant() {
        return this.getAttribute('variant') || 'default';
    }

    render() {
        const size = this.size;
        const position = this.position;
        const variant = this.variant;

        this.innerHTML = `
            <button 
                class="db-theme-toggle db-theme-toggle--${size} db-theme-toggle--${position} db-theme-toggle--${variant}"
                type="button"
                aria-label="Toggle theme"
                role="button"
            >
                <span class="db-theme-toggle__icon">
                    <span class="db-theme-toggle__sun" aria-hidden="true">☀️</span>
                    <span class="db-theme-toggle__moon" aria-hidden="true">🌙</span>
                </span>
            </button>
        `;
    }
}

// Register the custom element
customElements.define('db-theme-toggle', DbThemeToggle);