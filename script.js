

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ========== PROJECT TOGGLE WITH KEYBOARD SUPPORT ==========
  function toggleProject(element) {
    const isActive = element.classList.contains('is-active');
    
    // Close all other projects
    document.querySelectorAll('.featured-item').forEach(item => {
      if (item !== element) {
        item.classList.remove('is-active');
        item.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Toggle current project
    element.classList.toggle('is-active');
    element.setAttribute('aria-expanded', !isActive);
  }

  // Expose to global scope for onclick handlers
  window.toggleProject = toggleProject;

  // Keyboard support for project cards
  document.querySelectorAll('.featured-item').forEach(item => {
    item.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleProject(this);
      }
    });
  });

  // ========== SMOOTH SCROLLING ==========
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        // Update URL hash without scrolling
        history.pushState(null, null, this.getAttribute('href'));
      }
    });
  });

  // ========== STICKY NAVBAR WITH LOGO SWITCHING ==========
  const navbar = document.getElementById('navbar');
  const logoDefault = document.querySelector('.logo-default');
  const logoScrolled = document.querySelector('.logo-scrolled');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
      if (logoDefault) logoDefault.style.display = 'none';
      if (logoScrolled) logoScrolled.style.display = 'block';
    } else {
      navbar.classList.remove('scrolled');
      if (logoDefault) logoDefault.style.display = 'block';
      if (logoScrolled) logoScrolled.style.display = 'none';
    }
    
    lastScroll = currentScroll;
  });

  // ========== SCROLL SPY WITH DEBOUNCE ==========
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');

  function updateActiveLink() {
    let current = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    // Handle home section
    if (window.pageYOffset < 200) {
      navLinks.forEach(link => link.classList.remove('active'));
      const homeLink = document.querySelector('.nav-link[href="#home"]');
      if (homeLink) homeLink.classList.add('active');
    }
  }

  // Throttled scroll event for performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  window.addEventListener('load', updateActiveLink);

  // ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach((el) => {
    observer.observe(el);
  });

  // ========== MOBILE MENU TOGGLE ==========
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-menu a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close menu when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      hamburger.focus();
    }
  });

  // ========== FORM VALIDATION ==========
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const projectTypeInput = document.getElementById('projecttype');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const formFeedback = document.getElementById('form-feedback');
    const charCount = document.getElementById('char-count');
    const maxChars = 500;

    // Character counter for message
    messageInput.addEventListener('input', () => {
      const remaining = maxChars - messageInput.value.length;
      charCount.textContent = `${messageInput.value.length}/${maxChars}`;
      
      if (remaining < 50) {
        charCount.style.color = '#f13d79';
      } else {
        charCount.style.color = '#666';
      }
      
      if (remaining < 0) {
        messageInput.value = messageInput.value.substring(0, maxChars);
        charCount.textContent = `${maxChars}/${maxChars}`;
      }
    });

    // Real-time validation
    function validateField(input, errorElement, validationFn, errorMessage) {
      const value = input.value.trim();
      const isValid = validationFn(value);
      
      if (!isValid && value.length > 0) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
        return false;
      } else if (isValid && value.length > 0) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        return true;
      } else {
        input.classList.remove('invalid', 'valid');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        return false;
      }
    }

    // Validation functions
    const validators = {
      fullname: (value) => value.length >= 2,
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      projecttype: (value) => value !== '',
      message: (value) => value.length >= 10 && value.length <= maxChars,
    };

    const errorMessages = {
      fullname: 'Please enter your full name (at least 2 characters)',
      email: 'Please enter a valid email address',
      projecttype: 'Please select a project type',
      message: 'Please enter at least 10 characters',
    };

    // Add input event listeners for real-time validation
    fullnameInput.addEventListener('input', () => {
      validateField(fullnameInput, document.getElementById('fullname-error'), validators.fullname, errorMessages.fullname);
    });

    emailInput.addEventListener('input', () => {
      validateField(emailInput, document.getElementById('email-error'), validators.email, errorMessages.email);
    });

    projectTypeInput.addEventListener('change', () => {
      validateField(projectTypeInput, document.getElementById('projecttype-error'), validators.projecttype, errorMessages.projecttype);
    });

    messageInput.addEventListener('input', () => {
      validateField(messageInput, document.getElementById('message-error'), validators.message, errorMessages.message);
    });

    // Form submission
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Validate all fields
      const isFullnameValid = validateField(fullnameInput, document.getElementById('fullname-error'), validators.fullname, errorMessages.fullname);
      const isEmailValid = validateField(emailInput, document.getElementById('email-error'), validators.email, errorMessages.email);
      const isProjectTypeValid = validateField(projectTypeInput, document.getElementById('projecttype-error'), validators.projecttype, errorMessages.projecttype);
      const isMessageValid = validateField(messageInput, document.getElementById('message-error'), validators.message, errorMessages.message);

      if (isFullnameValid && isEmailValid && isProjectTypeValid && isMessageValid) {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').style.display = 'none';
        submitBtn.querySelector('.btn-loader').style.display = 'inline-block';
        formFeedback.style.display = 'none';

        try {
          // Submit form
          const formData = new FormData(contactForm);
          const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            // Success
            formFeedback.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
            formFeedback.className = 'form-feedback success';
            formFeedback.style.display = 'block';
            contactForm.reset();
            
            // Reset character count
            charCount.textContent = `0/${maxChars}`;
            charCount.style.color = '#666';
            
            // Remove validation classes
            [fullnameInput, emailInput, projectTypeInput, messageInput].forEach(input => {
              input.classList.remove('valid', 'invalid');
            });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
              formFeedback.style.display = 'none';
            }, 5000);
          } else {
            throw new Error('Submission failed');
          }
        } catch (error) {
          // Error
          formFeedback.textContent = '⚠ Something went wrong. Please try again or email me directly.';
          formFeedback.className = 'form-feedback error';
          formFeedback.style.display = 'block';
        } finally {
          // Reset button state
          submitBtn.disabled = false;
          submitBtn.querySelector('.btn-text').style.display = 'inline';
          submitBtn.querySelector('.btn-loader').style.display = 'none';
        }
      } else {
        // Scroll to first error
        const firstError = document.querySelector('.invalid');
        if (firstError) {
          firstError.focus();
        }
        
        formFeedback.textContent = '⚠ Please fix the errors above before submitting.';
        formFeedback.className = 'form-feedback error';
        formFeedback.style.display = 'block';
      }
    });
  }

  // ========== LAZY LOADING FOR IMAGES ==========
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }

  // ========== PERFORMANCE OPTIMIZATION ==========
  // Debounce function for performance
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

  // Optimized resize handler
  const handleResize = debounce(() => {
    // Recalculate any necessary dimensions
    updateActiveLink();
  }, 250);

  window.addEventListener('resize', handleResize);

  // ========== PRINT STYLES ==========
  window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
  });

  window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
  });

  // ========== ANALYTICS (OPTIONAL) ==========
  // Track section visibility for analytics
  const analyticsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        if (sectionId && window.gtag) {
          window.gtag('event', 'section_view', {
            'event_category': 'engagement',
            'event_label': sectionId,
          });
        }
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('section[id]').forEach(section => {
    analyticsObserver.observe(section);
  });

  // ========== ERROR HANDLING ==========
  window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // You could send this to an error tracking service
  });

  // ========== INITIALIZATION LOG ==========
  console.log('%c🚀 Portfolio Initialized Successfully %c| %cKylla Jen Beron %c© 2026', 
    'color: #f13d79; font-weight: bold;', 
    '', 
    'color: #000; font-weight: bold;',
    'color: #666;'
  );
});