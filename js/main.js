// ========== LOADER ==========
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader-wrapper');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 1500);
  }
});

// ========== THEME TOGGLE ==========
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
};

const updateThemeIcon = (theme) => {
  const toggleBtn = document.querySelector('.theme-toggle');
  if (toggleBtn) {
    toggleBtn.innerHTML = theme === 'light' ? '🌙' : '☀️';
  }
};

// ========== CUSTOM CURSOR ==========
const initCustomCursor = () => {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Add hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .card, .gallery-item');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
};

// ========== PARTICLES ==========
const createParticles = () => {
  const particlesContainer = document.querySelector('.particles');
  if (!particlesContainer) return;

  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particlesContainer.appendChild(particle);
  }
};

// ========== PARALLAX EFFECT ==========
const initParallax = () => {
  const parallaxElements = document.querySelectorAll('.parallax-bg');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(el => {
      const speed = el.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  });
};

// ========== REVEAL ON SCROLL ==========
const initScrollReveal = () => {
  const reveals = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Check on load
};

// ========== STICKY HEADER ==========
const initStickyHeader = () => {
  const header = document.querySelector('header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
};

// ========== SMOOTH SCROLL ==========
const initSmoothScroll = () => {
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
};

// ========== 3D CARD EFFECT ==========
const init3DCards = () => {
  const cards = document.querySelectorAll('.card-3d');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
};

// ========== ANIMATED COUNTER ==========
const animateCounter = (element, target, duration = 2000) => {
  let start = 0;
  const increment = target / (duration / 16);
  
  const updateCounter = () => {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  
  updateCounter();
};

// ========== TYPING EFFECT ==========
const initTypingEffect = () => {
  const typingElements = document.querySelectorAll('.typing-effect');
  
  typingElements.forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    let i = 0;
    
    const type = () => {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
      }
    };
    
    // Start typing when element is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          type();
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(el);
  });
};

// ========== WAVE EFFECT ON CLICK ==========
const initWaveEffect = () => {
  document.querySelectorAll('.wave-effect').forEach(el => {
    el.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
};

// ========== GALLERY LIGHTBOX ==========
const initGalleryLightbox = () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <span class="close-lightbox">&times;</span>
        <img src="${img.src}" alt="${img.alt}">
      `;
      
      document.body.appendChild(lightbox);
      
      // Animate in
      setTimeout(() => lightbox.classList.add('active'), 10);
      
      // Close on click
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.className === 'close-lightbox') {
          lightbox.classList.remove('active');
          setTimeout(() => lightbox.remove(), 300);
        }
      });
    });
  });
};

// ========== INITIALIZE ALL ==========
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCustomCursor();
  createParticles();
  initParallax();
  initScrollReveal();
  initStickyHeader();
  initSmoothScroll();
  init3DCards();
  initTypingEffect();
  initWaveEffect();
  initGalleryLightbox();
  
  // Add theme toggle button if not exists
  if (!document.querySelector('.theme-toggle')) {
    const themeBtn = document.createElement('button');
    themeBtn.className = 'theme-toggle';
    themeBtn.onclick = toggleTheme;
    document.body.appendChild(themeBtn);
    updateThemeIcon(document.documentElement.getAttribute('data-theme'));
  }
  
  // Add custom cursor if not exists
  if (!document.querySelector('.custom-cursor')) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
  }
  
  // Add particles container if not exists
  if (!document.querySelector('.particles')) {
    const particles = document.createElement('div');
    particles.className = 'particles';
    document.body.appendChild(particles);
    createParticles();
  }
});

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce function for scroll events
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
  // Scroll-based animations
}, 10)); 