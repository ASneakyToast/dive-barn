/**
 * Dive Barn Modal Component
 * A reusable modal web component using design tokens
 */
class DiveBarnModal extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.previouslyFocusedElement = null;
    }

    static get observedAttributes() {
        return ['open', 'title', 'size'];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'open') {
                this.handleOpenChange();
            } else {
                this.render();
            }
        }
    }

    setupEventListeners() {
        // Close button click
        this.addEventListener('click', (e) => {
            if (e.target.classList.contains('db-modal__close')) {
                this.close();
            }
        });

        // Backdrop click
        this.addEventListener('click', (e) => {
            if (e.target.classList.contains('db-modal')) {
                this.close();
                this.dispatchEvent(new CustomEvent('db-backdrop-click', {
                    bubbles: true,
                    composed: true
                }));
            }
        });

        // ESC key handling
        this.handleKeyDown = this.handleKeyDown.bind(this);
        document.addEventListener('keydown', this.handleKeyDown);
    }

    disconnectedCallback() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(e) {
        if (this.isOpen && e.key === 'Escape') {
            this.close();
        }

        // Focus trap
        if (this.isOpen && e.key === 'Tab') {
            this.trapFocus(e);
        }
    }

    trapFocus(e) {
        const focusableElements = this.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    handleOpenChange() {
        const isOpen = this.hasAttribute('open');
        
        if (isOpen && !this.isOpen) {
            this.open();
        } else if (!isOpen && this.isOpen) {
            this.close();
        }
    }

    open() {
        this.isOpen = true;
        this.previouslyFocusedElement = document.activeElement;
        
        // Add modal to DOM visibility
        this.style.display = 'flex';
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus management
        requestAnimationFrame(() => {
            const closeButton = this.querySelector('.db-modal__close');
            if (closeButton) {
                closeButton.focus();
            }
        });

        // Dispatch open event
        this.dispatchEvent(new CustomEvent('db-open', {
            bubbles: true,
            composed: true
        }));
    }

    close() {
        this.isOpen = false;
        this.removeAttribute('open');
        
        // Hide modal
        this.style.display = 'none';
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Restore focus
        if (this.previouslyFocusedElement) {
            this.previouslyFocusedElement.focus();
            this.previouslyFocusedElement = null;
        }

        // Dispatch close event
        this.dispatchEvent(new CustomEvent('db-close', {
            bubbles: true,
            composed: true
        }));
    }

    get title() {
        return this.getAttribute('title') || '';
    }

    get size() {
        return this.getAttribute('size') || 'normal';
    }


    render() {
        const title = this.title;
        const size = this.size;
        const isOpen = this.hasAttribute('open');

        // Only render if modal wrapper doesn't exist yet
        if (!this.querySelector('.db-modal')) {
            this.innerHTML = `
                <div class="db-modal db-modal--${size}" style="display: ${isOpen ? 'flex' : 'none'}" role="dialog" aria-modal="true" ${title ? `aria-labelledby="modal-title-${this.id || 'default'}"` : ''}>
                    <div class="db-modal__content" onclick="event.stopPropagation()">
                        ${title ? `
                            <div class="db-modal__header">
                                <h3 class="db-modal__title" id="modal-title-${this.id || 'default'}">${title}</h3>
                                <button class="db-modal__close" type="button" aria-label="Close modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        ` : `
                            <button class="db-modal__close db-modal__close--no-header" type="button" aria-label="Close modal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        `}
                        
                        <div class="db-modal__body">
                            <slot></slot>
                        </div>
                        
                        <div class="db-modal__footer">
                            <slot name="footer"></slot>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Just update existing modal properties
            const modal = this.querySelector('.db-modal');
            const titleEl = this.querySelector('.db-modal__title');
            
            if (modal) {
                modal.className = `db-modal db-modal--${size}`;
                modal.style.display = isOpen ? 'flex' : 'none';
            }
            
            if (titleEl && title) {
                titleEl.textContent = title;
            }
        }

        // Set initial open state
        if (isOpen && !this.isOpen) {
            this.open();
        }
    }
}

// Register the custom element
customElements.define('db-modal', DiveBarnModal);