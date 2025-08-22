/**
 * Dive Barn Heading Component
 * A reusable section header web component
 */
class DBHeading extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['title', 'subtitle'];
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
        return this.getAttribute('title') || '';
    }

    get subtitle() {
        return this.getAttribute('subtitle') || '';
    }

    render() {
        const title = this.title;
        const subtitle = this.subtitle;

        this.innerHTML = `
            <div class="section__header">
                <h2 class="section__title">${title}</h2>
                ${subtitle ? `<p class="section__subtitle">${subtitle}</p>` : ''}
            </div>
        `;
    }
}

// Register the custom element
customElements.define('db-heading', DBHeading);