/**
 * Dive Barn Timeline Item Component
 * A reusable timeline item web component for schedule events and history items
 */
class DiveBarnTimelineItem extends HTMLElement {
    constructor() {
        super();
        // Don't use Shadow DOM to avoid CSS custom property inheritance issues
    }

    static get observedAttributes() {
        return ['time', 'date', 'year', 'venue', 'title', 'description', 'category', 'category-variant', 'type', 'highlight', 'clickable', 'href'];
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
                this.dispatchEvent(new CustomEvent('db-timeline-click', {
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

    get timeDisplay() {
        const time = this.getAttribute('time');
        const date = this.getAttribute('date');
        const year = this.getAttribute('year');
        
        return year || date || time || '';
    }

    get type() {
        return this.getAttribute('type') || 'schedule';
    }

    get highlight() {
        return this.hasAttribute('highlight');
    }

    get clickable() {
        return this.hasAttribute('clickable');
    }

    render() {
        const timeDisplay = this.timeDisplay;
        const venue = this.getAttribute('venue');
        const title = this.getAttribute('title');
        const description = this.getAttribute('description');
        const category = this.getAttribute('category');
        const categoryVariant = this.getAttribute('category-variant');
        const type = this.type;
        const highlight = this.highlight;
        const clickable = this.clickable;

        // Build CSS classes
        let cssClasses = `db-timeline-item db-timeline-item--${type}`;
        if (highlight) cssClasses += ' db-timeline-item--highlight';
        if (clickable) cssClasses += ' db-timeline-item--clickable';

        this.className = cssClasses;

        // Build the content structure using attributes
        this.innerHTML = `
            <div class="db-timeline-item__time">
                <span class="db-timeline-item__time-text">${timeDisplay || ''}</span>
            </div>
            <div class="db-timeline-item__content">
                ${venue ? `<span class="db-timeline-item__venue">${venue}</span>` : ''}
                <div class="db-timeline-item__body">
                    ${title ? `<div class="db-timeline-item__title"><h3>${title}</h3></div>` : ''}
                    ${description ? `<div class="db-timeline-item__description"><p>${description}</p></div>` : ''}
                    ${category ? `<div class="db-timeline-item__category db-timeline-item__category--${categoryVariant || 'default'}">${category}</div>` : ''}
                </div>
            </div>
        `;
    }
}

// Register custom element
customElements.define('db-timeline-item', DiveBarnTimelineItem);