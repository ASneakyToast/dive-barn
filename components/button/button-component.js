/**
 * Dive Barn Button Component
 * A reusable button web component using design tokens
 */
class DiveBarnButton extends HTMLElement {
    constructor() {
        super();
        // Don't use Shadow DOM to avoid CSS custom property inheritance issues
    }

    static get observedAttributes() {
        return ['variant', 'size', 'disabled', 'loading', 'icon'];
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
        const button = this.querySelector('button');
        
        // Forward click events
        button.addEventListener('click', (e) => {
            if (this.hasAttribute('disabled') || this.hasAttribute('loading')) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            
            // Dispatch custom event
            this.dispatchEvent(new CustomEvent('db-click', {
                bubbles: true,
                composed: true,
                detail: { originalEvent: e }
            }));
        });

        // Add ripple effect
        button.addEventListener('click', this.createRipple.bind(this));
    }

    createRipple(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
        `;

        // Remove existing ripples
        const existingRipples = button.querySelectorAll('.ripple');
        existingRipples.forEach(r => r.remove());

        button.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    get variant() {
        return this.getAttribute('variant') || 'primary';
    }

    get size() {
        return this.getAttribute('size') || 'normal';
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }

    get loading() {
        return this.hasAttribute('loading');
    }

    get icon() {
        return this.getAttribute('icon') || '';
    }

    render() {
        const variant = this.variant;
        const size = this.size;
        const disabled = this.disabled;
        const loading = this.loading;
        const icon = this.icon;
        const text = this.textContent || '';

        this.innerHTML = `
            <button 
                class="db-button db-button--${variant} db-button--${size} ${loading ? 'db-button--loading' : ''}"
                ${disabled ? 'disabled' : ''}
                ${loading ? 'aria-busy="true"' : ''}
            >
                ${loading ? '<span class="db-button__spinner" aria-hidden="true"></span>' : ''}
                ${icon && !loading ? `<span class="db-button__icon" aria-hidden="true">${icon}</span>` : ''}
                ${text ? `<span class="db-button__text">${text}</span>` : '<slot></slot>'}
            </button>
        `;
    }
}

// Register the custom element
customElements.define('db-button', DiveBarnButton);