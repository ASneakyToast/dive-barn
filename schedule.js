/* ==========================================================================
   SCHEDULE PAGE FUNCTIONALITY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // Optional: Add animation delay for schedule items
    const scheduleItems = document.querySelectorAll('.schedule__item');
    scheduleItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});