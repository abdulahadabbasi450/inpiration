// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Navbar scroll effect
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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Order Modal Functions
function openOrderModal() {
  document.getElementById('orderModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  document.getElementById('orderModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('orderModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeOrderModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeOrderModal();
  }
});

// Order Form Submission
document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const name = formData.get('name');
  const phone = formData.get('phone');
  const area = formData.get('area');
  const message = formData.get('message');
  
  // Create WhatsApp message
  let whatsappMessage = `Hello! I'd like to order AntiSeep waterproofing solution.\n\n`;
  whatsappMessage += `Name: ${name}\n`;
  whatsappMessage += `Phone: ${phone}\n`;
  if (area) whatsappMessage += `Coverage Area: ${area} sq ft\n`;
  if (message) whatsappMessage += `Additional Details: ${message}\n`;
  whatsappMessage += `\nPlease provide pricing and availability information.`;
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappURL = `https://wa.me/923332815848?text=${encodedMessage}`;
  
  // Open WhatsApp
  window.open(whatsappURL, '_blank');
  
  // Reset form and close modal
  this.reset();
  closeOrderModal();
  
  // Show success message
  showNotification('Order request sent! We\'ll contact you soon.', 'success');
});

// Notification System
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button onclick="this.parentElement.parentElement.remove()">&times;</button>
    </div>
  `;
  
  // Add notification styles if not already added
  if (!document.querySelector('#notification-styles')) {
    const styles = document.createElement('style');
    styles.id = 'notification-styles';
    styles.textContent = `
      .notification {
        position: fixed;
        top: 90px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
      }
      .notification-success {
        border-left: 4px solid #10b981;
      }
      .notification-error {
        border-left: 4px solid #ef4444;
      }
      .notification-info {
        border-left: 4px solid #3b82f6;
      }
      .notification-content {
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }
      .notification-content button {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: #6b7280;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(styles);
  }
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.feature-card, .review-card, .gallery-item');
  animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});

// Gallery image lazy loading
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
});

// Performance optimization: Debounced scroll handler
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  scrollTimeout = setTimeout(() => {
    // Any scroll-dependent operations can go here
  }, 10);
});

// Add loading states for better UX
document.addEventListener('DOMContentLoaded', () => {
  // Remove any loading classes once page is fully loaded
  document.body.classList.add('loaded');
  
  // Add smooth transitions to all interactive elements
  const interactiveElements = document.querySelectorAll('button, a, .card, .feature-card, .review-card');
  interactiveElements.forEach(el => {
    el.style.transition = 'all 0.3s ease';
  });
});

// Error handling for images
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
      console.warn('Image failed to load:', this.src);
    });
  });
});

// Add click tracking for analytics (placeholder)
function trackClick(element, action) {
  // This is where you would integrate with analytics services
  console.log('Click tracked:', element, action);
}

// Add click tracking to important elements
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn-primary, .btn-secondary, .whatsapp-float a').forEach(el => {
    el.addEventListener('click', (e) => {
      trackClick(e.target, 'button_click');
    });
  });
});