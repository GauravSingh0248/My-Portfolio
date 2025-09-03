/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*=============== SCROLL REVEAL ANIMATION ===============*/
// Custom scroll reveal using Intersection Observer (vanilla JS)
function createScrollReveal() {
    const revealElements = document.querySelectorAll('.home__data, .home__card, .home__particles, .about__img, .contact__content:first-child, .about__data, .contact__content:last-child, .skills__content, .projects__card, .footer__container');
    
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        // Stagger the animations
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize scroll reveal when page loads
window.addEventListener('load', createScrollReveal);

/*=============== MOBILE MENU TOGGLE ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Validate if constants exist */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MOBILE MENU ===============*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== SMOOTH SCROLLING FOR ANCHOR LINKS ===============*/
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

/*=============== FORM VALIDATION ===============*/
const contactForm = document.querySelector('.contact__form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // If validation passes, you can handle the form submission here
        // For now, we'll just show a success message
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/*=============== INTERSECTION OBSERVER FOR SCROLL REVEAL ===============*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .projects__card, .about__box, .skills__data').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

/*=============== PARALLAX EFFECT FOR PARTICLES ===============*/
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        particle.style.transform = `translateY(${yPos}px)`;
    });
});

/*=============== TYPING EFFECT FOR HERO TITLE ===============*/
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect to hero title when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.home__title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

/*=============== SKILLS ANIMATION ON HOVER ===============*/
document.querySelectorAll('.skills__data').forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-10px)';
    });
    
    skill.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

/*=============== PROJECTS CARD HOVER EFFECTS ===============*/
document.querySelectorAll('.projects__card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

/*=============== BACK TO TOP SMOOTH SCROLL ===============*/
document.getElementById('scroll-up').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/*=============== NAVIGATION BACKGROUND ON SCROLL ===============*/
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(11, 15, 23, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.backgroundColor = 'rgba(11, 15, 23, 0.95)';
        header.style.boxShadow = 'none';
    }
});

/*=============== LAZY LOADING FOR IMAGES ===============*/
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

/*=============== PERFORMANCE OPTIMIZATION ===============*/
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollActive = debounce(scrollActive, 10);
const debouncedScrollUp = debounce(scrollUp, 10);

window.removeEventListener('scroll', scrollActive);
window.removeEventListener('scroll', scrollUp);
window.addEventListener('scroll', debouncedScrollActive);
window.addEventListener('scroll', debouncedScrollUp);

/*=============== ACCESSIBILITY IMPROVEMENTS ===============*/
// Add focus indicators for keyboard navigation
document.querySelectorAll('a, button, input, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--first-color)';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Skip to main content link for screen readers
const skipLink = document.createElement('a');
skipLink.href = '#main';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--first-color);
    color: var(--white-color);
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 10000;
    transition: top 0.3s;
`;
skipLink.addEventListener('focus', function() {
    this.style.top = '6px';
});
skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

/*=============== ERROR HANDLING ===============*/
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can add error reporting logic here
});

/*=============== SERVICE WORKER REGISTRATION (OPTIONAL) ===============*/
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Resume download test function
function testResumeDownload() {
    const resumePath = './resume/newResumeGaurav.pdf';
    
    // Test if the file exists
    fetch(resumePath)
        .then(response => {
            if (response.ok) {
                console.log('✅ Resume file is accessible');
                console.log('File size:', response.headers.get('content-length'), 'bytes');
                console.log('Content type:', response.headers.get('content-type'));
            } else {
                console.error('❌ Resume file not found:', response.status, response.statusText);
            }
        })
        .catch(error => {
            console.error('❌ Error accessing resume file:', error);
        });
}

// Add click event listeners to resume download buttons
document.addEventListener('DOMContentLoaded', function() {
    const resumeButtons = document.querySelectorAll('a[href*="newResumeGaurav.pdf"]');
    
    resumeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('🖱️ Resume download button clicked');
            console.log('Button href:', this.href);
            
            // Test the download
            testResumeDownload();
            
            // Add a small delay to allow the download to start
            setTimeout(() => {
                console.log('⏱️ Download should have started by now');
            }, 1000);
        });
    });
    
    // Test resume accessibility on page load
    testResumeDownload();
});
