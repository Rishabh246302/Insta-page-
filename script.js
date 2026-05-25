// =============================================================
//  SCRIPT.JS — Shared utility functions
//  Each HTML page has its own inline script for page-specific logic.
//  This file provides common helpers used across pages.
// =============================================================

/**
 * Utility: Smooth scroll to top of page
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Utility: Add 'loaded' class to body after DOM is ready
 * This can be used for CSS-based entrance animations
 */
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
});

/**
 * Utility: Debounce function for resize/scroll handlers
 * @param {Function} func - The function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

/**
 * Utility: Check if element is in viewport
 * @param {HTMLElement} el - Element to check
 * @returns {boolean}
 */
function isInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right > 0
    );
}

/**
 * Accessibility: Ensure all buttons and links have proper
 * keyboard focus styling
 */
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard focus ring only (not on mouse click)
    document.body.addEventListener('mousedown', function() {
        document.body.classList.add('using-mouse');
    });
    document.body.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.remove('using-mouse');
        }
    });
});
