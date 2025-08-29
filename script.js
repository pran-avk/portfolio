// Enhanced portfolio interactions and animations

// Add smooth hover tracking for enhanced effects
document.addEventListener('mousemove', (e) => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            section.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            section.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        }
    });
});

// Add intersection observer for loading animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0s';
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.1 });

// Observe all sections for scroll animations
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Enhanced navbar interactions
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            item.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Smooth scrolling for navigation (if you add anchors later)
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add dynamic background color based on scroll position
let ticking = false;

function updateBackground() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    document.body.style.background = `linear-gradient(135deg, 
        hsl(${240 + rate * 0.01}, 20%, ${5 + Math.abs(rate) * 0.01}%) 0%, 
        hsl(${250 + rate * 0.01}, 25%, ${10 + Math.abs(rate) * 0.01}%) 100%)`;
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateBackground);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Add parallax effect to sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        const rate = scrolled * -0.1;
        const yPos = rate * (index * 0.1);
        section.style.transform = `translateY(${yPos}px)`;
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    const focusedElement = document.activeElement;
    
    if (e.key === 'Enter' || e.key === ' ') {
        if (focusedElement.classList.contains('section')) {
            focusedElement.click();
            e.preventDefault();
        }
    }
});

// Make sections focusable for accessibility
document.querySelectorAll('.section').forEach(section => {
    section.setAttribute('tabindex', '0');
    section.setAttribute('role', 'button');
});

// Add performance optimization for animations
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.body.classList.add('reduce-motion');
}

// Add CSS for reduced motion
const style = document.createElement('style');
style.textContent = `
    .reduce-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .nav-item.active::after {
        width: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add touch support for mobile devices
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Add swipe gestures if needed
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 50) {
            // Swipe right
            console.log('Swiped right');
        } else if (deltaX < -50) {
            // Swipe left
            console.log('Swiped left');
        }
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to body
    document.body.classList.add('loaded');
    
    // Animate sections in sequence
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.animation = `fadeInUp 0.6s ease forwards`;
        }, index * 100);
    });
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // Recalculate section positions if needed
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        // Reset any transforms that might break on resize
        section.style.transform = '';
    });
});