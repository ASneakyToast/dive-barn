/* ==========================================================================
   SCHEDULE PAGE FUNCTIONALITY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Optional: Add animation delay for schedule items
    const scheduleItems = document.querySelectorAll('.schedule__item');
    scheduleItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});