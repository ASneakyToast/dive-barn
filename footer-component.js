/**
 * Dive Barn Footer Component
 * A reusable footer web component for all pages
 */
class DiveBarnFooter extends HTMLElement {
    constructor() {
        super();
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
                            <h3 class="footer__title">Dive Barn 2025</h3>
                            <p class="footer__text">Building an unforgettable music and arts experience through community support and transparency.</p>
                        </div>
                        
                        <div class="footer__section">
                            <h4 class="footer__subtitle">Quick Links</h4>
                            <ul class="footer__links">
                                <li><a href="index.html" class="footer__link ${currentPage === 'index.html' ? 'footer__link--active' : ''}">Home</a></li>
                                <li><a href="schedule.html" class="footer__link ${currentPage === 'schedule.html' ? 'footer__link--active' : ''}">Schedule</a></li>
                                <li><a href="yorkville-schoolhouse-ranch.html" class="footer__link ${currentPage === 'yorkville-schoolhouse-ranch.html' ? 'footer__link--active' : ''}">Venue</a></li>
                                <li><a href="financial-transparency.html" class="footer__link ${currentPage === 'financial-transparency.html' ? 'footer__link--active' : ''}">Transparency</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer__section">
                            <h4 class="footer__subtitle">Get In Touch</h4>
                            <div class="footer__contact">
                                <p class="footer__contact-item">
                                    <strong>Email:</strong> 
                                    <a href="mailto:hello@divebarn.com" class="footer__contact-link">hello@divebarn.com</a>
                                </p>
                                <p class="footer__contact-item">
                                    <strong>Phone:</strong> 
                                    <a href="tel:" class="footer__contact-link">(xxx) xxx-xxxx</a>
                                </p>
                                <div class="footer__social-links">
                                    <a href="#" class="footer__social-link" title="Instagram" aria-label="Follow us on Instagram">📷</a>
                                    <a href="mailto:hello@divebarn.com" class="footer__social-link" title="Email" aria-label="Send us an email">✉️</a>
                                    <a href="tel:" class="footer__social-link" title="Phone" aria-label="Call us">📞</a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="footer__section">
                            <h4 class="footer__subtitle">Support Us</h4>
                            <div class="footer__donation-links">
                                <a href="https://venmo.com/dive-barn" class="footer__donation-link" target="_blank" rel="noopener">Venmo</a>
                                <a href="https://paypal.me/divebarn" class="footer__donation-link" target="_blank" rel="noopener">PayPal</a>
                                <a href="https://cash.app/$DiveBarn" class="footer__donation-link" target="_blank" rel="noopener">Cash App</a>
                            </div>
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