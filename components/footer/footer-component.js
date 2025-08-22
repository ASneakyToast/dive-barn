/**
 * Dive Barn Footer Component
 * A reusable footer web component using design tokens
 */
class DiveBarnFooter extends HTMLElement {
    constructor() {
        super();
        // No Shadow DOM - use existing CSS from main styles
    }

    connectedCallback() {
        this.render();
    }

    render() {
        // Get current page for active link highlighting
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Determine if we should show the transparency info
        const showTransparency = this.hasAttribute('show-transparency');
        
        this.innerHTML = `
            <footer class="footer">
                <div class="footer__container">
                    <div class="footer__content">
                        <div class="footer__section">
                            <h3 class="footer__title"><a href="index.html" class="footer__title-link">Dive Barn 2025</a></h3>
                            <p class="footer__text">Building an unforgettable music and arts experience at <a href="yorkville-schoolhouse-ranch.html" class="footer__inline-link">Yorkville Schoolhouse Ranch</a> through community support and transparency.</p>
                        </div>
                        
                        <div class="footer__section">
                            <h4 class="footer__subtitle">Get In Touch</h4>
                            <div class="footer__contact">
                                <p class="footer__contact-item">
                                    <strong>Email:</strong> 
                                    <a href="mailto:divebarnranch@gmail.com" class="footer__contact-link">divebarnranch@gmail.com</a>
                                </p>
                                <p class="footer__contact-item">
                                    <strong>Instagram:</strong> 
                                    <a href="https://instagram.com/divebarnranch" class="footer__contact-link" target="_blank" rel="noopener">@divebarnranch</a>
                                </p>
                            </div>
                        </div>
                        
                        <div class="footer__section">
                            <h4 class="footer__subtitle">Support Us</h4>
                            <div class="footer__donation-links">
                                <db-button variant="primary" size="small" onclick="window.open('https://venmo.com/dive-barn', '_blank', 'noopener')">Venmo</db-button>
                            </div>
                            <p class="footer__transparency-link">
                                <a href="financial-transparency.html" class="footer__link">Learn more about our financial transparency</a>
                            </p>
                        </div>
                    </div>
                    
                    <div class="footer__bottom">
                        <p class="footer__copyright">&copy; 2025 Dive Barn. All rights reserved.</p>
                        ${showTransparency ? `<p class="footer__transparency">Last updated: <span id="last-updated">${this.getAttribute('last-updated') || 'August 20, 2025'}</span></p>` : ''}
                    </div>
                </div>
                
            </footer>
        `;
    }
}

// Register the custom element
customElements.define('dive-barn-footer', DiveBarnFooter);