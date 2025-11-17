// ========================================
// LOADING SCREEN
// ========================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'visible';
        initAnimations();
    }, 2000);
});

// ========================================
// NAVIGATION
// ========================================
const hamburger = document.getElementById('hamburger');
const navLeft = document.getElementById('nav-left');
const navRight = document.getElementById('nav-right');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navLeft.classList.toggle('active');
    navRight.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close if clicking on dropdown toggle
        if (link.classList.contains('dropdown-toggle')) {
            e.preventDefault();
            const dropdown = link.closest('.dropdown');
            dropdown.classList.toggle('active');
        } else {
            navLeft.classList.remove('active');
            navRight.classList.remove('active');
            hamburger.classList.remove('active');
            // Close any open dropdowns
            document.querySelectorAll('.dropdown').forEach(dd => dd.classList.remove('active'));
        }
    });
});

// Handle mega menu on mobile
const servicesDropdown = document.getElementById('services-dropdown');
const dropdownToggle = document.querySelector('.dropdown-toggle');

if (dropdownToggle && window.innerWidth <= 768) {
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        servicesDropdown.classList.toggle('active');
    });
}

// Close mega menu when clicking outside
document.addEventListener('click', (e) => {
    if (!servicesDropdown.contains(e.target)) {
        servicesDropdown.classList.remove('active');
    }
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// SMOOTH SCROLLING
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ACTIVE NAVIGATION LINK
// ========================================
function updateActiveLink() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ========================================
// TECHNOLOGIES TAB SWITCHING
// ========================================
const techTabs = document.querySelectorAll('.tech-tab');
const techPanels = document.querySelectorAll('.tech-panel');
let isTransitioning = false;

techTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Prevent rapid clicking during transition
        if (isTransitioning) return;
        
        const targetPanel = document.getElementById(tab.dataset.tab);
        const currentActivePanel = document.querySelector('.tech-panel.active');
        
        // If clicking the same tab, do nothing
        if (currentActivePanel === targetPanel) return;
        
        isTransitioning = true;
        
        // Remove active class from all tabs
        techTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Remove active from all panels
        techPanels.forEach(p => p.classList.remove('active'));
        
        // Add active to target panel after a short delay
        setTimeout(() => {
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
            isTransitioning = false;
        }, 300);
    });
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

function initAnimations() {
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// SERVICE CARDS STAGGER ANIMATION
// ========================================
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.05}s`;
});

// ========================================
// CLIENTS CAROUSEL AUTO-SCROLL
// ========================================
const clientsCarousel = document.querySelector('.clients-carousel');
if (clientsCarousel) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let scrollInterval;
    let isPaused = false;

    // Auto-scroll functionality
    function startAutoScroll() {
        if (isPaused) return;
        
        scrollInterval = setInterval(() => {
            if (clientsCarousel.scrollLeft >= clientsCarousel.scrollWidth - clientsCarousel.clientWidth) {
                clientsCarousel.scrollLeft = 0;
            } else {
                clientsCarousel.scrollLeft += 1;
            }
        }, 20);
    }

    function stopAutoScroll() {
        clearInterval(scrollInterval);
    }

    // Start auto-scroll
    startAutoScroll();

    // Pause on hover
    clientsCarousel.addEventListener('mouseenter', () => {
        isPaused = true;
        stopAutoScroll();
    });

    clientsCarousel.addEventListener('mouseleave', () => {
        isPaused = false;
        startAutoScroll();
    });

    // Drag to scroll
    clientsCarousel.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - clientsCarousel.offsetLeft;
        scrollLeft = clientsCarousel.scrollLeft;
        clientsCarousel.style.cursor = 'grabbing';
        stopAutoScroll();
    });

    clientsCarousel.addEventListener('mouseleave', () => {
        isDown = false;
        clientsCarousel.style.cursor = 'grab';
    });

    clientsCarousel.addEventListener('mouseup', () => {
        isDown = false;
        clientsCarousel.style.cursor = 'grab';
    });

    clientsCarousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - clientsCarousel.offsetLeft;
        const walk = (x - startX) * 2;
        clientsCarousel.scrollLeft = scrollLeft - walk;
    });
}

// ========================================
// FORM SUBMISSION
// ========================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form button
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 2000);
    });
}

// ========================================
// NEWSLETTER FORM
// ========================================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        const button = newsletterForm.querySelector('button');
        const originalHTML = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i>';
            input.value = '';
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
            }, 2000);
        }, 1500);
    });
}

// ========================================
// PARALLAX EFFECT FOR HERO SECTION
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// ========================================
// ANIMATED COUNTER FOR STATS
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const number = entry.target.textContent.replace('+', '');
            animateCounter(entry.target, parseInt(number));
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ========================================
// BUTTON RIPPLE EFFECT
// ========================================
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to all buttons
document.querySelectorAll('button, .cta-button, .know-more-btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// ========================================
// TYPING EFFECT FOR HERO SUBTITLE
// ========================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// setTimeout(() => {
//     const subtitle = document.querySelector('.hero-subtitle');
//     if (subtitle) {
//         const text = subtitle.textContent;
//         typeWriter(subtitle, text);
//     }
// }, 2500);

// Tech icons - no special effects needed

// ========================================
// SERVICE CARD TILT EFFECT
// ========================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ========================================
// CLIENT CARD PARALLAX EFFECT
// ========================================
document.querySelectorAll('.client-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const moveX = (x - rect.width / 2) / 10;
        const moveY = (y - rect.height / 2) / 10;
        
        card.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-15px) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ========================================
// DYNAMIC YEAR IN FOOTER
// ========================================
const updateFooterYear = () => {
    const yearElements = document.querySelectorAll('.footer-bottom p');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(element => {
        element.textContent = element.textContent.replace(/\d{4}/, currentYear);
    });
};

updateFooterYear();

// ========================================
// CTA BUTTON ACTIONS - Now handled by anchor tags
// ========================================
// CTA buttons are now proper anchor links to pages

// ========================================
// KNOW MORE BUTTON - Now handled by anchor tag
// ========================================
// Know More button is now a proper anchor link to career.html

// ========================================
// LAZY LOADING IMAGES
// ========================================
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
let ticking = false;
let lastKnownScrollPosition = 0;

function doSomething(scrollPos) {
    // Update elements based on scroll position
    updateActiveLink();
}

window.addEventListener('scroll', () => {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            doSomething(lastKnownScrollPosition);
            ticking = false;
        });

        ticking = true;
    }
});

// ========================================
// KEYBOARD NAVIGATION
// ========================================
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && (navLeft.classList.contains('active') || navRight.classList.contains('active'))) {
        navLeft.classList.remove('active');
        navRight.classList.remove('active');
        hamburger.classList.remove('active');
    }
    
    // Ctrl/Cmd + K for search (placeholder)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Search functionality would go here');
    }
});

// ========================================
// PRELOAD CRITICAL RESOURCES
// ========================================
function preloadResources() {
    const links = ['styles.css'];
    links.forEach(link => {
        const preloadLink = document.createElement('link');
        preloadLink.href = link;
        preloadLink.rel = 'preload';
        preloadLink.as = 'style';
        document.head.appendChild(preloadLink);
    });
}

// ========================================
// CONSOLE EASTER EGG
// ========================================
console.log('%c👨‍💻 SpareCode Consulting', 'color: #4A90E2; font-size: 24px; font-weight: bold;');
console.log('%cWe\'re hiring! Check out our careers page.', 'color: #666; font-size: 14px;');
console.log('%cWebsite built with ❤️ using HTML, CSS, and JavaScript', 'color: #999; font-size: 12px;');

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================
// Add skip to content link
const skipLink = document.createElement('a');
skipLink.href = '#services';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #4A90E2;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 10001;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ========================================
// DARK MODE TOGGLE (BONUS FEATURE)
// ========================================
function createDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.className = 'dark-mode-toggle';
    toggle.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 998;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
    `;
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = toggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
    
    toggle.addEventListener('mouseenter', () => {
        toggle.style.transform = 'scale(1.1)';
    });
    
    toggle.addEventListener('mouseleave', () => {
        toggle.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(toggle);
}

// Uncomment to enable dark mode toggle
// createDarkModeToggle();

// ========================================
// INITIALIZE APP
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website initialized successfully!');
    preloadResources();
});

// ========================================
// ERROR HANDLING
// ========================================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.message);
});

// ========================================
// EXPORT FOR TESTING (IF NEEDED)
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        animateCounter,
        typeWriter,
        createRipple
    };
}
