// FAQ Toggle
document.querySelectorAll('.faq__question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        
        // Toggle this FAQ item
        faqItem.classList.toggle('active');
        question.setAttribute('aria-expanded', !isExpanded);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navigation scroll behavior and active states
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');
const nav = document.querySelector('nav');
const ctaSection = document.getElementById('rsvp-cta');
const floatingBtn = document.querySelector('.floating-rsvp');

// Throttled scroll handler for better performance
let ticking = false;

function updateOnScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Update navigation background
    if (scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 1)';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    }

    // Update active navigation link based on scroll position
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // Hide floating RSVP button when near the CTA section
    if (ctaSection && floatingBtn) {
        const ctaTop = ctaSection.offsetTop;
        const ctaHeight = ctaSection.offsetHeight;
        const scrollBottom = scrollY + windowHeight;
        
        // Hide button when CTA section is visible
        if (scrollBottom >= ctaTop && scrollY <= ctaTop + ctaHeight) {
            floatingBtn.style.opacity = '0';
            floatingBtn.style.pointerEvents = 'none';
        } else {
            floatingBtn.style.opacity = '1';
            floatingBtn.style.pointerEvents = 'auto';
        }
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}, { passive: true });

// Modern scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Stop observing this element to prevent memory leaks
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize reveal animations (moved delays to CSS for better performance)
document.addEventListener('DOMContentLoaded', () => {
    // Observe cards for staggered animations
    document.querySelectorAll('.info__card, .festival__card').forEach(card => {
        card.classList.add('reveal-ready');
        observer.observe(card);
    });

    // Observe sections
    document.querySelectorAll('section:not(#hero)').forEach(section => {
        section.classList.add('reveal-ready', 'reveal-section');
        observer.observe(section);
    });
});

// Cleanup function for when the page is unloaded
window.addEventListener('beforeunload', () => {
    observer.disconnect();
});

// Dynamic Floating Action Button - Event Day Detection
function isEventDay() {
    const now = new Date();
    const eventDate = new Date('2025-10-13'); // October 13, 2025
    
    // Check for manual override via URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('event-mode') === 'true') {
        return true;
    }
    
    // Check if it's event day (with 6 hour buffer before and after)
    const eventStart = new Date(eventDate);
    eventStart.setHours(6, 0, 0, 0); // 6 AM event day
    
    const eventEnd = new Date(eventDate);
    eventEnd.setDate(eventEnd.getDate() + 1);
    eventEnd.setHours(6, 0, 0, 0); // 6 AM next day
    
    return now >= eventStart && now <= eventEnd;
}

function updateFloatingButton() {
    const floatingBtn = document.querySelector('.floating-rsvp');
    if (!floatingBtn) return;
    
    const textElement = floatingBtn.querySelector('.floating-rsvp__text');
    const iconElement = floatingBtn.querySelector('.floating-rsvp__icon');
    
    if (isEventDay()) {
        // Event day mode: Link to schedule
        floatingBtn.href = 'schedule.html';
        floatingBtn.setAttribute('aria-label', 'View festival schedule');
        floatingBtn.target = '_self'; // Remove external link behavior
        floatingBtn.removeAttribute('rel');
        
        if (textElement) textElement.textContent = 'Schedule';
        if (iconElement) iconElement.textContent = '📅';
        
        // Add event day styling
        floatingBtn.classList.add('floating-rsvp--event-day');
    } else {
        // Normal mode: Link to RSVP
        floatingBtn.href = 'https://partiful.com/e/Ft3EJk5f8OUREaoQKtBo';
        floatingBtn.setAttribute('aria-label', 'RSVP for Dive Barn 2025');
        floatingBtn.target = '_blank';
        floatingBtn.setAttribute('rel', 'noopener');
        
        if (textElement) textElement.textContent = 'RSVP';
        if (iconElement) iconElement.textContent = '→';
        
        // Remove event day styling
        floatingBtn.classList.remove('floating-rsvp--event-day');
    }
}

// Initialize floating button on page load
document.addEventListener('DOMContentLoaded', () => {
    updateFloatingButton();
    
    // Only update every 5 minutes to reduce unnecessary processing
    setInterval(updateFloatingButton, 300000);
});

// Simplified button hover effects (replaced expensive magnetic effects with CSS-only)

