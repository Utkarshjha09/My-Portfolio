// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
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

// Scroll reveal animation
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
    const elementsToReveal = document.querySelectorAll('.section-title, .about-content, .project-card, .skill-category, .contact-content');
    elementsToReveal.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const particles = document.querySelector('.particles');
    
    if (hero && particles) {
        const rate = scrolled * -0.5;
        particles.style.transform = `translateY(${rate}px)`;
    }
});

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

// Floating cards animation
function animateFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });
}

// Initialize floating cards animation
document.addEventListener('DOMContentLoaded', animateFloatingCards);

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const form = e.target;
        const token = grecaptcha.getResponse(); // Get the reCAPTCHA token
        if (!token) {
            alert('Please complete the reCAPTCHA.');
            return;
        }
        const data = {
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value,
            recaptcha: token
        };
        const res = await fetch('https://my-portfolio-eizv.onrender.com/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            alert('Message sent! Check your email for confirmation.');
            form.reset();
            grecaptcha.reset(); // Reset reCAPTCHA
        } else {
            alert('There was an error sending your message.');
        }
    });
}

// Skill items hover effect
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Project cards hover effect
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
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

// Cursor trail effect (optional)
let mouseX = 0;
let mouseY = 0;
let trail = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create trail element
    const trailElement = document.createElement('div');
    trailElement.className = 'cursor-trail';
    trailElement.style.left = mouseX + 'px';
    trailElement.style.top = mouseY + 'px';
    document.body.appendChild(trailElement);
    
    // Remove trail element after animation
    setTimeout(() => {
        if (trailElement.parentNode) {
            trailElement.parentNode.removeChild(trailElement);
        }
    }, 1000);
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
      const res = await fetch('https://my-portfolio-eizv.onrender.com/contact', {
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