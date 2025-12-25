// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

if (burger && nav) {
    burger.addEventListener('click', () => {
        // Toggle Nav
        const isActive = nav.classList.toggle('active');
        burger.setAttribute('aria-expanded', isActive);
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.setAttribute('aria-expanded', false);
        });
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.setAttribute('aria-expanded', false);
            burger.focus();
        }
    });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            // Move focus to target for keyboard accessibility
            target.focus();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and cards
const elementsToObserve = document.querySelectorAll('.project-card, .skill-category, .stat-item');
elementsToObserve.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Skill Bars Animation
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Contact Form Handling with Accessibility
const contactForm = document.querySelector('.contact-form');
const nameInput = document.getElementById('contact-name');
const emailInput = document.getElementById('contact-email');
const messageInput = document.getElementById('contact-message');

function showError(fieldId, message) {
    const errorElement = document.getElementById(`error-${fieldId}`);
    if (errorElement) {
        errorElement.textContent = message;
        const inputElement = document.getElementById(`contact-${fieldId}`);
        inputElement.setAttribute('aria-invalid', 'true');
        inputElement.setAttribute('aria-describedby', `error-${fieldId}`);
    }
}

function clearError(fieldId) {
    const errorElement = document.getElementById(`error-${fieldId}`);
    if (errorElement) {
        errorElement.textContent = '';
        const inputElement = document.getElementById(`contact-${fieldId}`);
        inputElement.setAttribute('aria-invalid', 'false');
    }
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    clearError('name');
    clearError('email');
    clearError('message');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = messageInput.value.trim();
    
    let isValid = true;
    
    // Validation
    if (!name) {
        showError('name', 'Le nom est requis.');
        isValid = false;
    }
    
    if (!email) {
        showError('email', 'L\'email est requis.');
        isValid = false;
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Veuillez entrer une adresse email valide.');
            isValid = false;
        }
    }
    
    if (!message) {
        showError('message', 'Le message est requis.');
        isValid = false;
    }
    
    if (isValid) {
        // Log form data
        console.log('Form Data:', { name, email, subject, message });
        
        // Create success announcement
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'alert');
        announcement.setAttribute('aria-live', 'polite');
        announcement.textContent = 'Merci pour votre message ! Je vous répondrai dans les plus brefs délais.';
        announcement.style.cssText = `
            position: fixed;
            top: 80px;
            left: 20px;
            right: 20px;
            padding: 1rem;
            background: #27ae60;
            color: white;
            border-radius: 5px;
            z-index: 2000;
        `;
        document.body.appendChild(announcement);
        
        // Remove announcement after 5 seconds
        setTimeout(() => {
            announcement.remove();
        }, 5000);
        
        // Reset form
        contactForm.reset();
    }
});

// Typing Effect for Hero Title (respects prefers-reduced-motion)
const heroTitle = document.querySelector('.hero-title');
const titleText = heroTitle.textContent;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
    heroTitle.textContent = '';

    let charIndex = 0;
    function typeWriter() {
        if (charIndex < titleText.length) {
            heroTitle.textContent += titleText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing effect when page loads
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 500);
    });
}

// Parallax Effect for Hero Section (respects prefers-reduced-motion)
if (!prefersReducedMotion) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-links a[href*="${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-links a[href*="${sectionId}"]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Dynamic Copyright Year
const footerYear = document.querySelector('.footer p');
if (footerYear && footerYear.textContent.includes('2025')) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = footerYear.textContent.replace('2025', currentYear);
}

// Scroll to Top Button with Accessibility
function createScrollTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.setAttribute('aria-label', 'Retourner en haut de la page');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
    scrollBtn.classList.add('scroll-to-top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        font-size: 1.2rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        min-height: 44px;
        min-width: 44px;
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('focus', () => {
        scrollBtn.style.outline = '2px solid #ff6b6b';
        scrollBtn.style.outlineOffset = '2px';
    });
    
    scrollBtn.addEventListener('blur', () => {
        scrollBtn.style.outline = 'none';
    });
}

// Initialize scroll to top button
createScrollTopButton();

// Console greeting
console.log('%c👋 Bienvenue sur mon portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cSi vous êtes ici, c\'est que vous aimez explorer le code. Contactez-moi pour collaborer!', 'color: #764ba2; font-size: 14px;');
