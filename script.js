// 🚀 Intersection Observer (60fps smooth)
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('nav a');
const skipLink = document.querySelector('.skip-link');

let currentSection = 'about';

// Smooth active nav highlighting
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentSection = entry.target.id;
      updateActiveNav();
    }
  });
}, { 
  threshold: 0.3, 
  rootMargin: '-80px 0px -20% 0px' 
});

sections.forEach(section => observer.observe(section));

// Update active nav link
function updateActiveNav() {
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Smooth scrolling for anchor links
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

// Focus management for skip link
skipLink.addEventListener('blur', () => {
  skipLink.style.top = '-40px';
});

// Performance: Remove listener on unload
window.addEventListener('beforeunload', () => {
  observer.disconnect();
});