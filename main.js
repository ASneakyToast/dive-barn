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

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
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
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop - 100) {
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
});

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

// Initialize reveal animations
document.addEventListener('DOMContentLoaded', () => {
    // Observe cards for staggered animations
    document.querySelectorAll('.info__card, .festival__card').forEach((card, index) => {
        card.classList.add('reveal-ready');
        card.style.transitionDelay = `${index * 0.1}s`;
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

// Add magnetic button effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// RSVP Modal functionality
const modal = document.getElementById('rsvp-modal');
const rsvpBtn = document.getElementById('rsvp-btn');
const rsvpForm = document.getElementById('rsvp-form');
const rsvpSuccess = document.getElementById('rsvp-success');

// Open modal
rsvpBtn?.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Focus first form input for accessibility
    const firstInput = modal.querySelector('.form__input');
    setTimeout(() => firstInput?.focus(), 100);
});

// Close modal
document.addEventListener('click', (e) => {
    if (e.target.matches('[data-modal="close"]') || e.target === modal.querySelector('.modal__overlay')) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    // Reset form when closing
    rsvpForm.reset();
    rsvpForm.style.display = '';
    rsvpSuccess.hidden = true;
    // Clear any error messages
    document.querySelectorAll('.form__error').forEach(error => {
        error.textContent = '';
    });
}

// Form submission
rsvpForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic form validation
    const formData = new FormData(rsvpForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    
    let isValid = true;
    
    // Validate name
    if (!name) {
        showError('name-error', 'Name is required');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('email-error', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('email-error', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate form submission
        const submitBtn = document.getElementById('submit-rsvp');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        // In a real app, you'd send this data to your server
        setTimeout(() => {
            rsvpForm.style.display = 'none';
            rsvpSuccess.hidden = false;
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit RSVP';
        }, 1000);
    }
});

function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}