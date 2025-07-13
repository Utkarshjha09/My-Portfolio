// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    // Prevent body scroll when menu is open
    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Add offset for fixed navbar
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Touch-friendly interactions for mobile
function addTouchInteractions() {
    // Add touch feedback to buttons
    const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .btn-grad');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add touch feedback to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add touch feedback to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize touch interactions
document.addEventListener('DOMContentLoaded', addTouchInteractions);

// Scroll reveal animation with better mobile performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe elements for scroll reveal
document.addEventListener('DOMContentLoaded', () => {
    const elementsToReveal = document.querySelectorAll('.section-title, .about-content, .project-card, .skill-category, .contact-content, .certificate-item, .timeline-item');
    elementsToReveal.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
});

// Parallax effect for hero section (disabled on mobile for better performance)
function handleParallax() {
    if (window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const particles = document.querySelector('.particles');
        
        if (hero && particles) {
            const rate = scrolled * -0.5;
            particles.style.transform = `translateY(${rate}px)`;
        }
    }
}

window.addEventListener('scroll', handleParallax);

// Typing effect for hero title
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

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title .highlight');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
});

// Floating cards animation (disabled on mobile)
function animateFloatingCards() {
    if (window.innerWidth > 768) {
        const cards = document.querySelectorAll('.floating-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.5}s`;
        });
    }
}

// Initialize floating cards animation
document.addEventListener('DOMContentLoaded', animateFloatingCards);

// Form submission handling for contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission
        const form = e.target;
        const sendButton = form.querySelector('button[type="submit"]');
        // Set loading state on button
        if (sendButton) {
            sendButton.disabled = true;
            sendButton.textContent = 'Sending...';
        }
        // Get reCAPTCHA token
        const token = grecaptcha.getResponse();
        if (!token) {
            alert('Please complete the reCAPTCHA.');
            if (sendButton) {
                sendButton.disabled = false;
                sendButton.textContent = 'Send Message';
            }
            return;
        }
        // Prepare form data
        const data = {
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value,
            recaptcha: token
        };
        // Use a single backend URL for both local and production
        const BACKEND_URL = window.location.hostname === 'localhost' ? 'http://localhost:3001/contact' : 'https://my-portfolio-eizv.onrender.com/contact';
        try {
            const res = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                alert('Message sent! Check your email for confirmation.');
                form.reset();
                grecaptcha.reset(); // Reset reCAPTCHA
            } else {
                // Try to get error message from backend
                let errorMsg = 'There was an error sending your message.';
                try {
                    const errData = await res.json();
                    if (errData && errData.error) errorMsg = errData.error;
                } catch {}
                alert(errorMsg);
            }
        } catch (err) {
            // Log error for debugging
            console.error('Network or server error:', err);
            alert('Network error. Please try again later.');
        } finally {
            // Reset button state
            if (sendButton) {
                sendButton.disabled = false;
                sendButton.textContent = 'Send Message';
            }
        }
    });
}

// Skill items hover effect (desktop only)
function addSkillHoverEffects() {
    if (window.innerWidth > 768) {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-10px) scale(1.05)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Project cards hover effect (desktop only)
function addProjectHoverEffects() {
    if (window.innerWidth > 768) {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Initialize hover effects
document.addEventListener('DOMContentLoaded', () => {
    addSkillHoverEffects();
    addProjectHoverEffects();
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
            const count = parseInt(counter.textContent);
            const increment = target / speed;
            
            if (count < target) {
                counter.textContent = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.textContent = target;
            }
        };
        updateCount();
    });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Handle window resize
window.addEventListener('resize', () => {
    // Reinitialize touch interactions
    addTouchInteractions();
    
    // Reinitialize hover effects
    addSkillHoverEffects();
    addProjectHoverEffects();
    
    // Reinitialize floating cards
    animateFloatingCards();
    
    // Close mobile menu if screen becomes large
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    }
});

// Add CSS for cursor trail
const style = document.createElement('style');
style.textContent = `
    .cursor-trail {
        position: fixed;
        width: 6px;
        height: 6px;
        background: rgba(37, 99, 235, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: trail 1s linear forwards;
    }
    
    @keyframes trail {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style); 

const roles = [
  "Data Scientist",
  "Web Developer",
  "Embedded System Engineer"
];
let roleIndex = 0;
let charIndex = 0;
const roleElement = document.getElementById("animated-role");
let typing = true;

function typeRole() {
  if (!roleElement) return;
  if (typing) {
    if (charIndex <= roles[roleIndex].length) {
      roleElement.textContent = roles[roleIndex].slice(0, charIndex);
      charIndex++;
      setTimeout(typeRole, 180); // Typing speed
    } else {
      typing = false;
      setTimeout(typeRole, 1200); // Pause before erasing
    }
  } else {
    if (charIndex > 0) {
      charIndex--;
      roleElement.textContent = roles[roleIndex].slice(0, charIndex);
      setTimeout(typeRole, 120); // Erasing speed
    } else {
      typing = true;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 400); // Pause before typing next
    }
  }
}

if (roleElement) typeRole(); 

document.querySelectorAll('.gooey-btn-container').forEach(container => {
  const effect = container.querySelector('.gooey-effect');
  container.addEventListener('mousedown', () => {
    if (effect) {
      effect.classList.remove('active');
      void effect.offsetWidth; // Force reflow to restart animation
      effect.classList.add('active');
    }
  });
}); 

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const form = e.target;
      const data = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
      };
      const res = await fetch('http://localhost:3001/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        alert('Message sent! Check your email for confirmation.');
        form.reset();
      } else {
        alert('There was an error sending your message.');
      }
    });
  }
}); 