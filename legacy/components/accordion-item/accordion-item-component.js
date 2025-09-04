/**
 * Dive Barn Accordion Item Component
 * A reusable accordion item web component using native details/summary elements
 */
class DiveBarnAccordionItem extends HTMLElement {
    constructor() {
        super();
        // Don't use Shadow DOM to avoid CSS custom property inheritance issues
    }

    static get observedAttributes() {
        return ['question', 'answer', 'open'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    get question() {
        return this.getAttribute('question') || '';
    }

    get answer() {
        return this.getAttribute('answer') || '';
    }

    get isOpen() {
        return this.hasAttribute('open');
    }

    render() {
        const question = this.question;
        const answer = this.answer;
        const isOpen = this.isOpen;

        // Create the details/summary structure
        this.innerHTML = `
            <details class="db-accordion-item" ${isOpen ? 'open' : ''}>
                <summary class="db-accordion-item__question">${question}</summary>
                <div class="db-accordion-item__answer">
                    <p>${answer}</p>
                </div>
            </details>
        `;
    }
}

// Register the custom element
customElements.define('db-accordion-item', DiveBarnAccordionItem);