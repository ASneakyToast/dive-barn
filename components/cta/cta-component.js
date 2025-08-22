/**
 * Dive Barn Call to Action Component
 * A reusable CTA banner web component
 */
class DiveBarnCTA extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['title', 'text', 'button-text', 'button-url', 'variant'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    get title() {
        return this.getAttribute('title') || 'Take Action';
    }

    get text() {
        return this.getAttribute('text') || '';
    }

    get buttonText() {
        return this.getAttribute('button-text') || 'Learn More';
    }

    get buttonUrl() {
        return this.getAttribute('button-url') || '#';
    }

    get variant() {
        return this.getAttribute('variant') || 'primary';
    }

    get target() {
        return this.getAttribute('target') || '_self';
    }

    get rel() {
        return this.getAttribute('rel') || '';
    }

    render() {
        const title = this.title;
        const text = this.text;
        const buttonText = this.buttonText;
        const buttonUrl = this.buttonUrl;
        const variant = this.variant;
        const target = this.target;
        const rel = this.rel;

        this.innerHTML = `
            <div class="db-cta db-cta--${variant}">
                <div class="db-cta__container">
                    <div class="db-cta__content">
                        <h2 class="db-cta__title">${title}</h2>
                        ${text ? `<p class="db-cta__text">${text}</p>` : ''}
                    </div>
                    <a href="${buttonUrl}" 
                       class="db-cta__button" 
                       target="${target}"
                       ${rel ? `rel="${rel}"` : ''}>
                        ${buttonText}
                    </a>
                </div>
            </div>
        `;
    }
}

// Register the custom element
customElements.define('db-cta', DiveBarnCTA);