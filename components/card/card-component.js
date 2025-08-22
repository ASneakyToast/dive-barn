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
        return ['variant', 'hoverable', 'clickable', 'elevated', 'href'];
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
        
        if (href) {
            // Convert to link behavior
            this.style.cursor = 'pointer';
            this.setAttribute('tabindex', '0');
            this.setAttribute('role', 'link');
            
            this.addEventListener('click', (e) => {
                if (e.metaKey || e.ctrlKey) {
                    // Allow opening in new tab with cmd/ctrl+click
                    window.open(href, '_blank');
                } else {
                    window.location.href = href;
                }
            });

            this.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (e.metaKey || e.ctrlKey) {
                        window.open(href, '_blank');
                    } else {
                        window.location.href = href;
                    }
                }
            });
        } else if (this.hasAttribute('clickable')) {
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
        this.className = 'db-card__header';
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
        this.className = 'db-card__content';
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
        this.className = 'db-card__footer';
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
        this.className = 'db-card__icon';
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
        this.className = 'db-card__title';
        if (!this.querySelector('h4')) {
            const heading = document.createElement('h4');
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
        this.className = 'db-card__text';
    }
}

/**
 * Card Link Component
 */
class DiveBarnCardLink extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.className = 'db-card__link';
        this.setAttribute('role', 'link');
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
customElements.define('db-card-link', DiveBarnCardLink);