/**
 * Dive Barn Navigation Component
 * A reusable navigation web component using design tokens
 */
class DiveBarnNav extends HTMLElement {
    constructor() {
        super();
        // Don't use Shadow DOM to avoid CSS custom property inheritance issues
        this.scrollHandler = null;
    }

    connectedCallback() {
        this.render();
        this.setupNavigation();
    }

    setupNavigation() {
        // Initialize scroll handler for background changes and active link highlighting
        this.initializeScrollHandler();
        
        // Add initial active link highlighting
        this.highlightActiveLink();
        
        // Listen for theme changes
        document.addEventListener('themechange', () => {
            // Component will automatically inherit CSS custom properties
        });
        
        // Listen for hash changes to update active links
        window.addEventListener('hashchange', () => {
            this.highlightActiveLink();
        });
    }

    initializeScrollHandler() {
        // Check if NavScrollHandler is available
        if (typeof NavScrollHandler !== 'undefined') {
            this.scrollHandler = new NavScrollHandler({
                navElement: this.querySelector('.nav'),
                sectionSelector: 'section[id]',
                linkSelector: '.nav__link',
                scrollThreshold: 100,
                activeClass: 'nav__link--active',
                sectionOffset: 100
            });
        } else {
            console.warn('NavScrollHandler not available. Make sure nav-scroll-handler.js is loaded before nav-component.js');
        }
    }

    disconnectedCallback() {
        // Clean up scroll handler when component is removed
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
    }

    highlightActiveLink() {
        const currentHash = window.location.hash;
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        const links = this.querySelectorAll('.nav__link');
        links.forEach(link => {
            link.classList.remove('nav__link--active');
            
            // Check if this link matches current page/section
            const href = link.getAttribute('href');
            if (href === currentHash || 
                (currentPath !== 'index.html' && href.includes(currentPath)) ||
                (currentPath === 'index.html' && href === '#hero' && !currentHash)) {
                link.classList.add('nav__link--active');
            }
        });
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