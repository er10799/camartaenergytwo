/**
 * Camarta Energy - Main JavaScript
 * Enterprise Solar Company Website
 */

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Don't prevent default for href="#" or empty hrefs
    if (href === '#' || href === '') {
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Quote Form Validation and Submission
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Basic validation
    if (!quoteForm.checkValidity()) {
      e.stopPropagation();
      quoteForm.classList.add('was-validated');
      return;
    }

    // Get form data
    const formData = new FormData(quoteForm);
    const data = Object.fromEntries(formData.entries());

    // In a production environment, you would send this to your backend
    console.log('Quote Form Submitted:', data);

    // Show success message
    showSuccessMessage(quoteForm, 'Thank you! We\'ll contact you within 24 hours to discuss your solar project.');

    // Reset form
    quoteForm.reset();
    quoteForm.classList.remove('was-validated');
  });
}

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const emailInput = document.getElementById('newsletterEmail');

    if (!emailInput.checkValidity()) {
      emailInput.classList.add('is-invalid');
      return;
    }

    // In production, send to backend
    console.log('Newsletter Subscription:', emailInput.value);

    // Show success message
    showSuccessMessage(newsletterForm, 'Successfully subscribed! Check your email for confirmation.');

    // Reset form
    newsletterForm.reset();
    emailInput.classList.remove('is-invalid');
  });
}

// Helper function to show success messages
function showSuccessMessage(form, message) {
  // Remove any existing success messages
  const existingMessage = form.querySelector('.success-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create success message element
  const successDiv = document.createElement('div');
  successDiv.className = 'alert alert-success success-message mt-3';
  successDiv.setAttribute('role', 'alert');
  successDiv.innerHTML = `
    <i class="bi bi-check-circle-fill me-2"></i>${message}
  `;

  // Insert after form
  form.insertAdjacentElement('afterend', successDiv);

  // Remove message after 5 seconds
  setTimeout(() => {
    successDiv.style.transition = 'opacity 0.5s';
    successDiv.style.opacity = '0';
    setTimeout(() => successDiv.remove(), 500);
  }, 5000);
}

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 0) {
      if (value.length <= 3) {
        value = value;
      } else if (value.length <= 6) {
        value = value.slice(0, 3) + '-' + value.slice(3);
      } else {
        value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
      }
    }

    e.target.value = value;
  });
}

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.featurette, .testimonial-card, .feature-icon').forEach(el => {
  observer.observe(el);
});

// Add sticky header on scroll
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.classList.add('sticky-header');
  } else {
    header.classList.remove('sticky-header');
  }

  lastScroll = currentScroll;
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section[id]');

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Initialize tooltips if Bootstrap tooltips are used
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

console.log('Camarta Energy website initialized successfully!');
