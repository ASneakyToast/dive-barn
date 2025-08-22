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
            <section class="section section--cta section--cta-${variant}">
                <div class="cta__container">
                    <div class="cta__content">
                        <h2 class="cta__title">${title}</h2>
                        ${text ? `<p class="cta__text">${text}</p>` : ''}
                    </div>
                    <a href="${buttonUrl}" 
                       class="btn btn--primary btn--large" 
                       target="${target}"
                       ${rel ? `rel="${rel}"` : ''}>
                        ${buttonText}
                    </a>
                </div>
            </section>
        `;
    }
}

// Register the custom element
customElements.define('dive-barn-cta', DiveBarnCTA);