/**
 * Dive Barn Card Component
 * A reusable card web component using design tokens
 */
class DiveBarnCard extends HTMLElement {
    constructor() {
        super();
        // Don't use Shadow DOM to avoid CSS custom property inheritance issues
    }

    static get observedAttributes() {
        return ['variant', 'hoverable', 'clickable', 'elevated'];
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
        if (this.hasAttribute('clickable')) {
            this.style.cursor = 'pointer';
            
            this.addEventListener('click', (e) => {
                this.dispatchEvent(new CustomEvent('db-card-click', {
                    bubbles: true,
                    composed: true,
                    detail: { originalEvent: e }
                }));
            });

            // Add keyboard support
            this.setAttribute('tabindex', '0');
            this.setAttribute('role', 'button');
            
            this.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
    }

    get variant() {
        return this.getAttribute('variant') || 'default';
    }

    get hoverable() {
        return this.hasAttribute('hoverable');
    }

    get clickable() {
        return this.hasAttribute('clickable');
    }

    get elevated() {
        return this.hasAttribute('elevated');
    }

    render() {
        const variant = this.variant;
        const hoverable = this.hoverable;
        const clickable = this.clickable;
        const elevated = this.elevated;

        this.className = `db-card db-card--${variant} ${hoverable ? 'db-card--hoverable' : ''} ${clickable ? 'db-card--clickable' : ''} ${elevated ? 'db-card--elevated' : ''}`;
    }
}

/**
 * Card Header Component
 */
class DiveBarnCardHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.className = 'card__header';
    }
}

/**
 * Card Content Component
 */
class DiveBarnCardContent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.className = 'card__content';
    }
}

/**
 * Card Footer Component
 */
class DiveBarnCardFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.className = 'card__footer';
    }
}

/**
 * Card Icon Component
 */
class DiveBarnCardIcon extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.className = 'card__icon';
        this.setAttribute('aria-hidden', 'true');
    }
}

/**
 * Card Title Component
 */
class DiveBarnCardTitle extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.className = 'card__title';
        if (!this.querySelector('h1, h2, h3, h4, h5, h6')) {
            const level = this.getAttribute('level') || '3';
            const heading = document.createElement(`h${level}`);
            heading.innerHTML = this.innerHTML;
            this.innerHTML = '';
            this.appendChild(heading);
        }
    }
}

/**
 * Card Text Component
 */
class DiveBarnCardText extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.className = 'card__text';
    }
}

// Register all custom elements
customElements.define('db-card', DiveBarnCard);
customElements.define('db-card-header', DiveBarnCardHeader);
customElements.define('db-card-content', DiveBarnCardContent);
customElements.define('db-card-footer', DiveBarnCardFooter);
customElements.define('db-card-icon', DiveBarnCardIcon);
customElements.define('db-card-title', DiveBarnCardTitle);
customElements.define('db-card-text', DiveBarnCardText);