/**
 * Dive Barn Navigation Component
 * A reusable navigation web component for all pages
 */
class DiveBarnNav extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        // Get current page for link determination
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const isIndexPage = currentPage === 'index.html' || currentPage === '';
        
        // Determine link destinations based on current page
        const getNavLink = (section) => {
            if (isIndexPage) {
                return `#${section}`;
            } else {
                return `index.html#${section}`;
            }
        };

        // Determine if we should show the home link differently on index
        const barnLink = isIndexPage ? '#hero' : 'index.html';
        const barnLabel = isIndexPage ? 'Go to Dive Barn home section' : 'Go to Dive Barn home page';

        this.innerHTML = `
            <!-- Navigation -->
            <nav class="nav" role="navigation" aria-label="Main navigation">
                <ul class="nav__list">
                    <li><a href="${barnLink}" class="nav__link" aria-label="${barnLabel}">Barn</a></li>
                    <li><a href="${getNavLink('festival')}" class="nav__link" aria-label="Go to festival information section">Festival</a></li>
                    <li><a href="${getNavLink('info')}" class="nav__link" aria-label="Go to essential details section">Info</a></li>
                    <li><a href="${getNavLink('faq')}" class="nav__link" aria-label="Go to frequently asked questions section">FAQ</a></li>
                </ul>
            </nav>
        `;
    }
}

// Register the custom element
customElements.define('dive-barn-nav', DiveBarnNav);