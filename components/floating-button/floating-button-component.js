/**
 * Dive Barn Floating Button Component
 * A reusable floating action button web component
 */
class DiveBarnFloatingButton extends HTMLElement {
    constructor() {
        super();
        // Don't use Shadow DOM to avoid CSS custom property inheritance issues
    }

    static get observedAttributes() {
        return ['href', 'text', 'icon', 'variant', 'aria-label', 'target', 'position', 'rel'];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    setupEventListeners() {
        const href = this.getAttribute('href');
        const target = this.getAttribute('target') || '_self';
        const rel = this.getAttribute('rel') || '';
        
        if (href) {
            // Convert to link behavior
            this.style.cursor = 'pointer';
            this.setAttribute('tabindex', '0');
            this.setAttribute('role', 'link');
            
            this.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (target === '_blank') {
                    window.open(href, '_blank', rel.includes('noopener') ? 'noopener' : '');
                } else if (e.metaKey || e.ctrlKey) {
                    // Allow opening in new tab with cmd/ctrl+click
                    window.open(href, '_blank', 'noopener');
                } else {
                    window.location.href = href;
                }
            });

            this.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    
                    if (target === '_blank' || e.metaKey || e.ctrlKey) {
                        window.open(href, '_blank', 'noopener');
                    } else {
                        window.location.href = href;
                    }
                }
            });
        }
    }

    get href() {
        return this.getAttribute('href') || '';
    }

    get text() {
        return this.getAttribute('text') || 'RSVP';
    }

    get icon() {
        return this.getAttribute('icon') || '→';
    }

    get variant() {
        return this.getAttribute('variant') || 'default';
    }

    get position() {
        return this.getAttribute('position') || 'bottom-right';
    }

    get ariaLabel() {
        return this.getAttribute('aria-label') || `${this.text} button`;
    }

    get target() {
        return this.getAttribute('target') || '_self';
    }

    get rel() {
        return this.getAttribute('rel') || '';
    }

    render() {
        const text = this.text;
        const icon = this.icon;
        const variant = this.variant;
        const position = this.position;
        const ariaLabel = this.ariaLabel;

        // Build CSS classes
        let cssClasses = `db-floating-button db-floating-button--${variant} db-floating-button--${position}`;

        this.className = cssClasses;
        this.setAttribute('aria-label', ariaLabel);

        // Build the content structure using attributes
        this.innerHTML = `
            <span class="db-floating-button__text">${text}</span>
            <span class="db-floating-button__icon">${icon}</span>
        `;
    }
}

// Register custom element
customElements.define('db-floating-button', DiveBarnFloatingButton);