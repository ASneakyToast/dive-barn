/**
 * Navigation Scroll Handler
 * Handles scroll-based navigation behavior including background changes and active link highlighting
 */
class NavScrollHandler {
  constructor(options = {}) {
    this.options = {
      navElement: null,
      sectionSelector: 'section[id]',
      linkSelector: '.nav__link',
      scrollThreshold: 100,
      activeClass: 'nav__link--active',
      sectionOffset: 100,
      trackSections: null, // Auto-discover if null
      ...options
    };

    // State
    this.navElement = null;
    this.sections = [];
    this.navLinks = [];
    this.ticking = false;
    this.boundScrollHandler = this.handleScroll.bind(this);
    
    this.init();
  }

  init() {
    // Find navigation element
    this.navElement = this.options.navElement || document.querySelector('.nav');
    if (!this.navElement) {
      console.warn('NavScrollHandler: Navigation element not found');
      return;
    }

    // Discover sections and links
    this.discoverElements();
    
    // Start listening to scroll events
    this.bindEvents();
  }

  discoverElements() {
    // Find all sections to track
    if (this.options.trackSections) {
      // Use specified sections
      this.sections = this.options.trackSections
        .map(id => document.getElementById(id))
        .filter(section => section !== null);
    } else {
      // Auto-discover sections
      this.sections = Array.from(document.querySelectorAll(this.options.sectionSelector));
    }

    // Find navigation links
    this.navLinks = Array.from(this.navElement.querySelectorAll(this.options.linkSelector));
    
    console.log(`NavScrollHandler: Tracking ${this.sections.length} sections and ${this.navLinks.length} nav links`);
  }

  bindEvents() {
    window.addEventListener('scroll', this.boundScrollHandler, { passive: true });
  }

  unbindEvents() {
    window.removeEventListener('scroll', this.boundScrollHandler);
  }

  handleScroll() {
    if (!this.ticking) {
      requestAnimationFrame(() => this.updateOnScroll());
      this.ticking = true;
    }
  }

  updateOnScroll() {
    const scrollY = window.scrollY;
    
    // Update navigation background based on scroll position
    this.updateNavBackground(scrollY);
    
    // Update active navigation link based on current section
    this.updateActiveLink(scrollY);
    
    this.ticking = false;
  }

  updateNavBackground(scrollY) {
    if (!this.navElement) return;

    if (scrollY > this.options.scrollThreshold) {
      this.navElement.style.background = 'var(--component-navigation-background-solid, rgba(255, 255, 255, 1))';
      this.navElement.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
      this.navElement.style.background = 'var(--component-navigation-background, rgba(255, 255, 255, 0.95))';
      this.navElement.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    }
  }

  updateActiveLink(scrollY) {
    // Find the current section
    let currentSection = '';
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - this.options.sectionOffset) {
        currentSection = section.getAttribute('id');
      }
    });

    // Update link states
    this.navLinks.forEach(link => {
      link.classList.remove('active', this.options.activeClass);
      link.removeAttribute('aria-current');
      
      const href = link.getAttribute('href');
      if (href === `#${currentSection}`) {
        link.classList.add('active', this.options.activeClass);
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  // Public method to force update (useful for dynamic content)
  forceUpdate() {
    this.discoverElements();
    this.updateOnScroll();
  }

  // Public method to update configuration
  updateConfig(newOptions) {
    this.options = { ...this.options, ...newOptions };
    this.discoverElements();
  }

  // Cleanup method
  destroy() {
    this.unbindEvents();
    this.navElement = null;
    this.sections = [];
    this.navLinks = [];
  }
}

// Export for both module and script environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavScrollHandler;
} else if (typeof window !== 'undefined') {
  window.NavScrollHandler = NavScrollHandler;
}