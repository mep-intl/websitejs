// MEP International Technical Services - Enhanced Professional JavaScript
// Complete Interactive Experience for Technical Services Website

// Professional Configuration
const CONFIG = {
  animationDuration: 800,
  scrollOffset: 120,
  debounceDelay: 16,
  intersectionThreshold: 0.15,
  imageTransitionDelay: 5000,
};

// Professional Utility Functions
const utils = {
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  throttle: (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPhone: (phone) => {
    const phoneRegex = /^(\+971|00971|971|0)?[1-9]\d{8}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
    return phoneRegex.test(cleanPhone) || cleanPhone.length >= 9;
  },

  smoothScrollTo: (element, offset = 0) => {
    if (!element) {
      console.warn("Element not found for smooth scroll");
      return;
    }

    const headerHeight = document.querySelector(".header")?.offsetHeight || 80;
    const targetPosition = element.offsetTop - headerHeight - offset;

    console.log("Scrolling to:", element.id, "Position:", targetPosition);

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "smooth",
    });
  },

  preloadImages: (imageUrls) => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  },

  formatPhoneNumber: (phone) => {
    let cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("971")) {
      return "+" + cleaned;
    } else if (cleaned.startsWith("0") && cleaned.length > 1) {
      return "+971" + cleaned.substring(1);
    }
    return phone;
  },
};

// Enhanced Professional Notification System
class ProfessionalNotification {
  constructor() {
    this.notifications = [];
    this.container = null;
    this.createContainer();
  }

  createContainer() {
    this.container = document.createElement("div");
    this.container.className = "notification-container";
    this.container.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 12px;
            pointer-events: none;
        `;
    document.body.appendChild(this.container);
  }

  show(message, type = "info", duration = 5000) {
    const notification = this.createNotification(message, type);
    this.container.appendChild(notification);
    this.notifications.push(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = "translateX(0)";
      notification.style.opacity = "1";
    });

    // Auto remove
    setTimeout(() => {
      this.hide(notification);
    }, duration);

    // Add sound effect for important notifications
    if (type === "success" || type === "error") {
      this.playNotificationSound(type);
    }

    return notification;
  }

  createNotification(message, type) {
    const colors = {
      success: "#10b981",
      error: "#ef4444",
      warning: "#f59e0b",
      info: "#3b82f6",
    };

    const notification = document.createElement("div");
    notification.className = `professional-notification professional-notification--${type}`;

    notification.innerHTML = `
            <div class="notification__icon">${this.getIcon(type)}</div>
            <div class="notification__content">
                <span class="notification__message">${message}</span>
            </div>
            <button class="notification__close" aria-label="Close notification">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;

    notification.style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
            background: ${colors[type]};
            color: white;
            padding: 16px 20px;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.12);
            backdrop-filter: blur(20px);
            max-width: 400px;
            min-width: 300px;
            font-family: var(--font-family-base);
            font-size: 14px;
            line-height: 1.4;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: auto;
            border: 2px solid rgba(255, 255, 255, 0.2);
        `;

    const closeButton = notification.querySelector(".notification__close");
    closeButton.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
            border-radius: 8px;
            opacity: 0.8;
            transition: all 0.2s ease;
            flex-shrink: 0;
        `;

    closeButton.addEventListener("click", () => this.hide(notification));
    closeButton.addEventListener("mouseenter", () => {
      closeButton.style.opacity = "1";
      closeButton.style.background = "rgba(255, 255, 255, 0.2)";
    });
    closeButton.addEventListener("mouseleave", () => {
      closeButton.style.opacity = "0.8";
      closeButton.style.background = "none";
    });

    return notification;
  }

  getIcon(type) {
    const icons = {
      success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 12l2 2 4-4"/>
                        <circle cx="12" cy="12" r="10"/>
                      </svg>`,
      error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                     <circle cx="12" cy="12" r="10"/>
                     <line x1="15" y1="9" x2="9" y2="15"/>
                     <line x1="9" y1="9" x2="15" y2="15"/>
                   </svg>`,
      warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                       <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                       <line x1="12" y1="9" x2="12" y2="13"/>
                       <line x1="12" y1="17" x2="12.01" y2="17"/>
                     </svg>`,
      info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>`,
    };
    return icons[type] || icons.info;
  }

  playNotificationSound(type) {
    // Create subtle audio feedback using Web Audio API
    try {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Different frequencies for different notification types
      const frequencies = {
        success: 800,
        error: 400,
        warning: 600,
        info: 500,
      };

      oscillator.frequency.setValueAtTime(
        frequencies[type],
        audioContext.currentTime
      );
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.3
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      // Silently fail if audio context is not available
      console.log("Audio context not available for notification sound");
    }
  }

  hide(notification) {
    notification.style.transform = "translateX(100%)";
    notification.style.opacity = "0";

    setTimeout(() => {
      if (this.container.contains(notification)) {
        this.container.removeChild(notification);
        this.notifications = this.notifications.filter(
          (n) => n !== notification
        );
      }
    }, 400);
  }

  clear() {
    this.notifications.forEach((notification) => this.hide(notification));
  }
}

// Initialize Enhanced Notification System
const notification = new ProfessionalNotification();

// Professional Loading Manager
class LoadingManager {
  static show(element, text = "Loading...") {
    if (!element) return;

    element.classList.add("loading");
    element.disabled = true;

    const originalText = element.textContent;
    element.setAttribute("data-original-text", originalText);
    element.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            ${text}
        `;

    const spinner = element.querySelector("svg");
    if (spinner) {
      spinner.style.animation = "spin 1s linear infinite";
    }
  }

  static hide(element) {
    if (!element) return;

    element.classList.remove("loading");
    element.disabled = false;

    const originalText = element.getAttribute("data-original-text");
    if (originalText) {
      element.textContent = originalText;
      element.removeAttribute("data-original-text");
    }
  }
}

// Enhanced Animation Controller with Image Management
class AnimationController {
  constructor() {
    this.observers = new Map();
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.initializeHeroImageRotation();
    this.preloadCriticalImages();
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: "0px 0px -100px 0px",
      threshold: CONFIG.intersectionThreshold,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe all animatable elements with enhanced selectors
    const elements = document.querySelectorAll(`
            .fade-in, .slide-up, .service-card, .value-card, .industry-category, 
            .process-step, .contact-card, .package-card, .reason-card, 
            .stat-item, .mission-vision__item, .faq-item
        `);

    elements.forEach((el) => {
      el.classList.add("fade-in");
      observer.observe(el);
    });

    this.observers.set("intersection", observer);
  }

  animateElement(element) {
    element.classList.add("visible");

    // Add stagger effect for groups with enhanced timing
    const parent = element.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(
        (child) =>
          child.classList.contains("fade-in") ||
          child.classList.contains("slide-up")
      );

      if (siblings.length > 1) {
        const index = siblings.indexOf(element);
        element.style.transitionDelay = `${index * 150}ms`;

        // Remove delay after animation completes
        setTimeout(() => {
          element.style.transitionDelay = "";
        }, CONFIG.animationDuration + index * 150);
      }
    }
  }

  initializeHeroImageRotation() {
    const villaImages = document.querySelectorAll(".hero__villa-image");
    if (villaImages.length === 0) return;

    let currentIndex = 0;

    // Set initial state
    villaImages[0].style.opacity = "0.15";
    villaImages[0].style.zIndex = "1";

    const rotateImages = () => {
      const current = villaImages[currentIndex];
      const next = villaImages[(currentIndex + 1) % villaImages.length];

      // Fade out current
      current.style.transition = "opacity 1.5s ease-in-out";
      current.style.opacity = "0";

      // Fade in next
      setTimeout(() => {
        next.style.transition = "opacity 1.5s ease-in-out";
        next.style.opacity = "0.15";
        next.style.zIndex = "1";
        current.style.zIndex = "0";

        currentIndex = (currentIndex + 1) % villaImages.length;
      }, 750);
    };

    // Start rotation
    setInterval(rotateImages, CONFIG.imageTransitionDelay);
  }

  preloadCriticalImages() {
    const criticalImages = [
      // Hero villa images
      "https://pplx-res.cloudinary.com/image/upload/v1755751263/pplx_project_search_images/1ee51259e5b1005fdb6f28e9330dcced677ca6b2.png",
      "https://pplx-res.cloudinary.com/image/upload/v1755751263/pplx_project_search_images/e0fb5de68a07f6a161c5621679a583c64bb469a8.png",
      "https://pplx-res.cloudinary.com/image/upload/v1755751263/pplx_project_search_images/acdba03a2f462a3cc91bf23168dcd0600fb56ea2.png",
      // Service images
      "https://pplx-res.cloudinary.com/image/upload/v1755702302/pplx_project_search_images/87155878b6093bc81bc6964840b440eca9c71d6a.png",
      "https://pplx-res.cloudinary.com/image/upload/v1755751263/pplx_project_search_images/780a62f140e000a0d90113651735fba85e7f1568.png",
      "https://pplx-res.cloudinary.com/image/upload/v1755751263/pplx_project_search_images/38aeb151f66c0060e19a17da7873f24e0eeffb60.png",
    ];

    utils.preloadImages(criticalImages);
    console.log("Critical images preloaded for better performance");
  }

  setupScrollAnimations() {
    const parallaxElements = document.querySelectorAll("[data-parallax]");

    if (parallaxElements.length === 0) return;

    const handleScroll = utils.throttle(() => {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach((element) => {
        const rate = parseFloat(element.dataset.parallax) || 0.5;
        const yPos = -(scrolled * rate);
        element.style.transform = `translateY(${yPos}px)`;
      });
    }, CONFIG.debounceDelay);

    window.addEventListener("scroll", handleScroll, { passive: true });
  }
}

// Enhanced Navigation Controller
class NavigationController {
  constructor() {
    this.header = document.querySelector(".header");
    this.nav = document.getElementById("nav");
    this.menuToggle = document.getElementById("menuToggle");
    this.navLinks = document.querySelectorAll(".nav__link");
    this.sections = document.querySelectorAll("section[id]");

    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupActiveNavigation();
    this.setupHeaderEffects();
    this.setupKeyboardNavigation();

    console.log(
      "Navigation initialized with sections:",
      Array.from(this.sections).map((s) => s.id)
    );
  }

  setupMobileMenu() {
    if (!this.menuToggle || !this.nav) return;

    this.menuToggle.addEventListener("click", () => {
      const isActive = this.nav.classList.contains("active");

      if (isActive) {
        this.closeMobileMenu();
      } else {
        this.openMobileMenu();
      }
    });

    // Enhanced outside click detection
    document.addEventListener("click", (e) => {
      if (
        !this.header.contains(e.target) &&
        this.nav.classList.contains("active")
      ) {
        this.closeMobileMenu();
      }
    });

    // Enhanced keyboard support
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.nav.classList.contains("active")) {
        this.closeMobileMenu();
        this.menuToggle.focus();
      }
    });

    // Focus trap for accessibility
    this.nav.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && this.nav.classList.contains("active")) {
        const focusableElements = this.nav.querySelectorAll(".nav__link");
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  openMobileMenu() {
    this.nav.classList.add("active");
    this.menuToggle.classList.add("active");
    document.body.style.overflow = "hidden";

    // Enhanced animation for menu items
    const links = this.nav.querySelectorAll(".nav__link");
    links.forEach((link, index) => {
      link.style.opacity = "0";
      link.style.transform = "translateX(-30px)";

      setTimeout(() => {
        link.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        link.style.opacity = "1";
        link.style.transform = "translateX(0)";
      }, index * 75);
    });

    // Set focus to first nav link for accessibility
    setTimeout(() => {
      const firstLink = this.nav.querySelector(".nav__link");
      if (firstLink) firstLink.focus();
    }, 300);

    notification.show("Navigation menu opened", "info", 2000);
  }

  closeMobileMenu() {
    this.nav.classList.remove("active");
    this.menuToggle.classList.remove("active");
    document.body.style.overflow = "";

    // Reset link styles
    const links = this.nav.querySelectorAll(".nav__link");
    links.forEach((link) => {
      link.style.opacity = "";
      link.style.transform = "";
      link.style.transition = "";
    });
  }

  setupSmoothScrolling() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href");
        console.log(
          "Navigation clicked:",
          link.textContent.trim(),
          "Target:",
          targetId
        );

        if (!targetId || !targetId.startsWith("#")) {
          console.warn("Invalid target ID:", targetId);
          return;
        }

        const targetSection = document.querySelector(targetId);
        console.log(
          "Target section found:",
          targetSection ? targetSection.id : "NOT FOUND"
        );

        if (!targetSection) {
          console.error("Section not found:", targetId);
          notification.show(`Section ${targetId} not found`, "error");
          return;
        }

        // Close mobile menu if open
        if (this.nav.classList.contains("active")) {
          this.closeMobileMenu();
        }

        // Add delay for mobile menu animation
        const delay = this.nav.classList.contains("active") ? 300 : 0;
        setTimeout(() => {
          utils.smoothScrollTo(targetSection, 20);

          // Update URL without jumping
          history.replaceState(null, null, targetId);

          // Show navigation feedback
          const sectionName = link.textContent.trim();
          notification.show(`Navigating to ${sectionName}`, "info", 2500);

          // Update active link
          this.updateActiveLink(targetId);
        }, delay);
      });
    });

    // Enhanced CTA button handling
    this.setupCTAButtons();
  }

  setupCTAButtons() {
    // Contact form buttons
    document
      .querySelectorAll('a[href="#contact"], .btn[href="#contact"]')
      .forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          const contactSection = document.getElementById("contact");
          if (contactSection) {
            utils.smoothScrollTo(contactSection, 20);
            notification.show("Opening contact form", "info", 2000);

            // Focus on name field after scroll
            setTimeout(() => {
              const nameField = document.getElementById("name");
              if (nameField) nameField.focus();
            }, 1000);
          }
        });
      });

    // AMC buttons
    document
      .querySelectorAll('a[href="#amc"], .btn[href="#amc"]')
      .forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          const amcSection = document.getElementById("amc");
          if (amcSection) {
            utils.smoothScrollTo(amcSection, 20);
            notification.show("Viewing maintenance contracts", "info", 2000);
          }
        });
      });

    // Services buttons
    document
      .querySelectorAll('a[href="#services"], .btn[href="#services"]')
      .forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          const servicesSection = document.getElementById("services");
          if (servicesSection) {
            utils.smoothScrollTo(servicesSection, 20);
            notification.show("Exploring our services", "info", 2000);
          }
        });
      });
  }

  setupActiveNavigation() {
    const updateActiveNav = utils.throttle(() => {
      let current = "";
      const scrollPosition = window.scrollY + CONFIG.scrollOffset;

      // Enhanced section detection
      this.sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop - 200 &&
          scrollPosition < sectionTop + sectionHeight - 100
        ) {
          current = section.getAttribute("id");
        }
      });

      this.updateActiveLink(`#${current}`);
    }, CONFIG.debounceDelay);

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav(); // Initial call
  }

  updateActiveLink(targetId) {
    this.navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === targetId && targetId) {
        link.classList.add("active");
      }
    });
  }

  setupHeaderEffects() {
    if (!this.header) return;

    const handleHeaderScroll = utils.throttle(() => {
      const scrolled = window.scrollY;

      if (scrolled > 50) {
        this.header.classList.add("scrolled");
      } else {
        this.header.classList.remove("scrolled");
      }
    }, CONFIG.debounceDelay);

    window.addEventListener("scroll", handleHeaderScroll, { passive: true });
  }

  setupKeyboardNavigation() {
    // Enhanced keyboard support for navigation
    document.addEventListener("keydown", (e) => {
      // Alt + number keys for quick section navigation
      if (e.altKey && e.key >= "1" && e.key <= "9") {
        e.preventDefault();
        const index = parseInt(e.key) - 1;
        const navLink = this.navLinks[index];
        if (navLink) {
          navLink.click();
        }
      }
    });
  }
}

// Enhanced Form Controller
class FormController {
  constructor() {
    this.contactForm = document.getElementById("contactForm");
    this.validationRules = new Map();
    this.init();
  }

  init() {
    if (!this.contactForm) return;

    this.setupFormValidation();
    this.setupFormSubmission();
    this.setupFieldEnhancements();
    this.setupAutoSave();

    console.log("Enhanced form controller initialized");
  }

  setupFormValidation() {
    const fields = this.contactForm.querySelectorAll(".form-control");

    // Setup validation rules
    this.validationRules.set("name", {
      required: true,
      minLength: 2,
      pattern: /^[a-zA-Z\s\-'\.]+$/,
      message:
        "Please enter a valid name (letters, spaces, hyphens, apostrophes, and dots only)",
    });

    this.validationRules.set("email", {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    });

    this.validationRules.set("phone", {
      required: true,
      pattern: /^(\+971|00971|971|0)?[1-9]\d{8}$/,
      message: "Please enter a valid UAE phone number",
    });

    fields.forEach((field) => {
      // Real-time validation
      field.addEventListener(
        "input",
        utils.debounce(() => {
          this.validateField(field, false);
        }, 300)
      );

      field.addEventListener("blur", () => this.validateField(field, true));
      field.addEventListener("focus", () => this.clearFieldError(field));
    });
  }

  validateField(field, showError = true) {
    const fieldName = field.name || field.id;
    const value = field.value.trim();
    const rules = this.validationRules.get(fieldName);

    let isValid = true;
    let errorMessage = "";

    if (rules) {
      if (rules.required && !value) {
        isValid = false;
        errorMessage = "This field is required";
      } else if (value && rules.minLength && value.length < rules.minLength) {
        isValid = false;
        errorMessage = `Must be at least ${rules.minLength} characters long`;
      } else if (value && rules.pattern && !rules.pattern.test(value)) {
        isValid = false;
        errorMessage = rules.message;
      }
    }

    // Special validation for phone numbers
    if (fieldName === "phone" && value && !utils.isValidPhone(value)) {
      isValid = false;
      errorMessage = "Please enter a valid UAE phone number (+971XXXXXXXXX)";
    }

    if (showError) {
      this.displayFieldValidation(field, isValid, errorMessage);
    }

    return isValid;
  }

  displayFieldValidation(field, isValid, errorMessage) {
    this.clearFieldError(field);

    if (!isValid) {
      field.style.borderColor = "#ef4444";
      field.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.1)";

      const errorDiv = document.createElement("div");
      errorDiv.className = "field-error";
      errorDiv.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                ${errorMessage}
            `;
      errorDiv.style.cssText = `
                color: #ef4444;
                font-size: 12px;
                margin-top: 6px;
                display: flex;
                align-items: center;
                gap: 6px;
                animation: slideIn 0.3s ease;
            `;

      field.parentElement.appendChild(errorDiv);
    } else if (field.value.trim()) {
      field.style.borderColor = "#10b981";
      field.style.boxShadow = "0 0 0 3px rgba(16, 185, 129, 0.1)";

      // Add success icon
      const successDiv = document.createElement("div");
      successDiv.className = "field-success";
      successDiv.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"/>
                    <circle cx="12" cy="12" r="10"/>
                </svg>
            `;
      successDiv.style.cssText = `
                color: #10b981;
                font-size: 12px;
                margin-top: 6px;
                display: flex;
                align-items: center;
                gap: 6px;
            `;

      field.parentElement.appendChild(successDiv);
    }
  }

  clearFieldError(field) {
    field.style.borderColor = "";
    field.style.boxShadow = "";
    const errorDiv = field.parentElement.querySelector(".field-error");
    const successDiv = field.parentElement.querySelector(".field-success");
    if (errorDiv) errorDiv.remove();
    if (successDiv) successDiv.remove();
  }

  setupFormSubmission() {
    this.contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!this.validateForm()) {
        notification.show(
          "Please correct the errors in the form",
          "error",
          4000
        );
        this.focusFirstError();
        return;
      }

      await this.submitForm();
    });
  }

  validateForm() {
    const fields = this.contactForm.querySelectorAll(".form-control");
    let isFormValid = true;
    let firstErrorField = null;

    fields.forEach((field) => {
      const isFieldValid = this.validateField(field, true);
      if (!isFieldValid && !firstErrorField) {
        firstErrorField = field;
      }
      isFormValid = isFormValid && isFieldValid;
    });

    return isFormValid;
  }

  focusFirstError() {
    const firstError = this.contactForm.querySelector(".field-error");
    if (firstError) {
      const field = firstError.parentElement.querySelector(".form-control");
      if (field) {
        field.focus();
        field.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }

  async submitForm() {
    const submitButton = this.contactForm.querySelector(
      'button[type="submit"]'
    );
    const formData = new FormData(this.contactForm);

    try {
      LoadingManager.show(submitButton, "Sending Message...");

      // Simulate form processing with realistic delay
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Format phone number
      const phone = formData.get("phone");
      const formattedPhone = utils.formatPhoneNumber(phone);

      // Create enhanced email content
      const emailData = {
        name: formData.get("name")?.trim(),
        email: formData.get("email")?.trim(),
        phone: formattedPhone,
        service: formData.get("service") || "General Consultation",
        message:
          formData.get("message")?.trim() || "No specific details provided",
      };

      const emailSubject = `🏗️ Professional Consultation Request - ${emailData.name}`;
      const emailBody = `
MEP International Technical Services - New Client Inquiry
═══════════════════════════════════════════════════════

CLIENT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Full Name: ${emailData.name}
📧 Email Address: ${emailData.email}
📞 Phone Number: ${emailData.phone}
🔧 Service Interest: ${emailData.service}

PROJECT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${emailData.message}

FOLLOW-UP ACTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Contact client within 2-4 hours
• Schedule free consultation if appropriate
• Send relevant service brochures
• Add to CRM system

SUBMISSION DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Date: ${new Date().toLocaleDateString("en-AE")}
⏰ Time: ${new Date().toLocaleTimeString("en-AE")}
🌐 Source: MEP International Professional Website
📍 Location: UAE

═══════════════════════════════════════════════════════
MEP International Technical Services L.L.C.
Building Excellence Across the UAE
📞 +971 50 3446652 | 📧 sales@mepinttec.com
            `;

      // Create enhanced mailto link
      const mailtoLink = `mailto:sales@mepinttec.com?cc=rony@mepinttec.com&subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody)}`;

      // Open email client
      window.open(mailtoLink);

      // Enhanced success feedback
      notification.show(
        "✅ Thank you for your consultation request! We'll contact you within 2-4 hours to discuss your project.",
        "success",
        8000
      );

      // Clear auto-saved data
      this.clearAutoSave();

      // Reset form with animation
      this.resetFormWithAnimation();

      // Track form submission (if analytics available)
      this.trackFormSubmission(emailData);
    } catch (error) {
      console.error("Form submission error:", error);
      notification.show(
        "❌ There was an error sending your message. Please try again or call us directly.",
        "error",
        6000
      );
    } finally {
      LoadingManager.hide(submitButton);
    }
  }

  resetFormWithAnimation() {
    // Reset form data
    this.contactForm.reset();

    // Clear all validation states
    const fields = this.contactForm.querySelectorAll(".form-control");
    fields.forEach((field) => {
      this.clearFieldError(field);
      field.style.borderColor = "";
      field.style.boxShadow = "";
    });

    // Animate form groups
    const formGroups = this.contactForm.querySelectorAll(".form-group");
    formGroups.forEach((group, index) => {
      setTimeout(() => {
        group.style.opacity = "0.3";
        group.style.transform = "scale(0.98)";
        setTimeout(() => {
          group.style.transition = "all 0.4s ease";
          group.style.opacity = "1";
          group.style.transform = "scale(1)";
          setTimeout(() => {
            group.style.transition = "";
          }, 400);
        }, 150);
      }, index * 100);
    });
  }

  setupFieldEnhancements() {
    // Enhanced phone number formatting
    const phoneField = this.contactForm.querySelector('input[type="tel"]');
    if (phoneField) {
      phoneField.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.startsWith("971")) {
          value = "+" + value;
        } else if (value.startsWith("0") && value.length > 1) {
          value = "+971" + value.substring(1);
        } else if (value && !value.startsWith("+971") && value.length >= 9) {
          value = "+971" + value;
        }
        e.target.value = value;
      });

      // Add placeholder enhancement
      phoneField.placeholder = "+971 XX XXX XXXX";
    }

    // Enhanced service selection
    const serviceField = this.contactForm.querySelector(
      'select[name="service"]'
    );
    const messageField = this.contactForm.querySelector(
      'textarea[name="message"]'
    );

    if (serviceField && messageField) {
      serviceField.addEventListener("change", (e) => {
        if (e.target.value && !messageField.value.trim()) {
          const serviceTexts = {
            "aluminum-glass":
              "I'm interested in aluminum and glass work for my property. Please provide information about energy-efficient facade solutions, pricing, and timeline for implementation.",
            "metal-fabrication":
              "I need custom metal fabrication services. Please provide details about your capabilities, materials used, and project timeline.",
            carpentry:
              "I require carpentry and flooring services. Please provide information about materials, finishes available, and installation timeline.",
            plumbing:
              "I need plumbing and water system services for my property. Please provide details about your solutions, compliance with DEWA standards, and pricing.",
            waterproofing:
              "I need waterproofing services for my building. Please provide information about your advanced membrane systems and concrete repair solutions.",
            hvac: "I require HVAC services for my property. Please provide information about energy-efficient cooling solutions, maintenance packages, and pricing.",
            insulation:
              "I'm interested in thermal insulation to reduce cooling costs. Please provide details about insulation types, expected savings, and installation process.",
            "floor-coatings":
              "I need advanced floor coating services. Please provide information about epoxy systems, durability, and application process.",
            painting:
              "I require painting and interior finishing services. Please provide details about materials, finishes available, and project timeline.",
            maintenance:
              "I'm interested in building maintenance services. Please provide information about service packages and response times.",
            amc: "I'm interested in your Annual Maintenance Contract services. Please provide detailed information about packages, pricing, and service levels.",
            consultation:
              "I would like to schedule a free consultation to discuss my property's technical requirements and explore the best solutions for my needs.",
          };

          const selectedText = serviceTexts[e.target.value];
          if (selectedText) {
            messageField.value = selectedText;
            // Animate the text appearance
            messageField.style.opacity = "0.5";
            setTimeout(() => {
              messageField.style.transition = "opacity 0.3s ease";
              messageField.style.opacity = "1";
              setTimeout(() => {
                messageField.style.transition = "";
              }, 300);
            }, 100);
          }
        }
      });
    }

    // Character count for message field
    if (messageField) {
      const maxLength = 1000;
      const counter = document.createElement("div");
      counter.className = "character-counter";
      counter.style.cssText = `
                font-size: 12px;
                color: #64748b;
                text-align: right;
                margin-top: 4px;
                transition: color 0.3s ease;
            `;

      const updateCounter = () => {
        const remaining = maxLength - messageField.value.length;
        counter.textContent = `${remaining} characters remaining`;

        if (remaining < 100) {
          counter.style.color = "#f59e0b";
        } else if (remaining < 50) {
          counter.style.color = "#ef4444";
        } else {
          counter.style.color = "#64748b";
        }
      };

      messageField.addEventListener("input", updateCounter);
      messageField.parentElement.appendChild(counter);
      updateCounter();
    }
  }

  setupAutoSave() {
    // Auto-save form data to prevent loss
    const fields = this.contactForm.querySelectorAll(".form-control");
    const autoSaveKey = "mep-contact-form-autosave";

    // Load saved data
    try {
      const savedData = JSON.parse(localStorage.getItem(autoSaveKey) || "{}");
      Object.keys(savedData).forEach((key) => {
        const field = this.contactForm.querySelector(`[name="${key}"]`);
        if (field && savedData[key]) {
          field.value = savedData[key];
        }
      });
    } catch (error) {
      console.log("No auto-saved data available");
    }

    // Save data on input
    const saveData = utils.debounce(() => {
      const formData = {};
      fields.forEach((field) => {
        if (field.value.trim()) {
          formData[field.name] = field.value;
        }
      });

      try {
        localStorage.setItem(autoSaveKey, JSON.stringify(formData));
      } catch (error) {
        console.log("Could not auto-save form data");
      }
    }, 1000);

    fields.forEach((field) => {
      field.addEventListener("input", saveData);
    });
  }

  clearAutoSave() {
    try {
      localStorage.removeItem("mep-contact-form-autosave");
    } catch (error) {
      console.log("Could not clear auto-saved data");
    }
  }

  trackFormSubmission(data) {
    // Track form submission for analytics (if available)
    if (typeof gtag !== "undefined") {
      gtag("event", "form_submission", {
        event_category: "Contact",
        event_label: data.service,
        value: 1,
      });
    }

    console.log("Form submission tracked:", data.service);
  }
}

// Enhanced Service Card Controller
class ServiceCardController {
  constructor() {
    this.serviceCards = document.querySelectorAll(".service-card");
    this.init();
  }

  init() {
    this.setupCardInteractions();
    this.setupServiceSelection();
    this.setupImagePreloading();
    console.log("Enhanced service card controller initialized");
  }

  setupCardInteractions() {
    this.serviceCards.forEach((card, index) => {
      // Enhanced hover effects
      card.addEventListener("mouseenter", () => this.enhanceCard(card));
      card.addEventListener("mouseleave", () => this.resetCard(card));
      card.addEventListener("click", () => this.selectService(card));

      // Add loading animation for images
      const img = card.querySelector(".service-image img");
      if (img) {
        if (!img.complete) {
          img.addEventListener("load", () => {
            img.style.opacity = "1";
            img.style.transform = "scale(1)";
          });
          img.style.opacity = "0";
          img.style.transform = "scale(1.1)";
          img.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        }
      }

      // Staggered entrance animation
      card.style.opacity = "0";
      card.style.transform = "translateY(50px)";

      setTimeout(() => {
        card.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 200 + index * 100);
    });
  }

  enhanceCard(card) {
    card.style.transform = "translateY(-15px) scale(1.02)";
    card.style.zIndex = "10";
    card.style.boxShadow = "0 25px 50px rgba(30, 58, 138, 0.15)";

    // Enhanced image effect
    const img = card.querySelector(".service-image img");
    if (img) {
      img.style.transform = "scale(1.08)";
    }

    // Enhanced overlay effect
    const overlay = card.querySelector(".service-image-overlay");
    if (overlay) {
      overlay.style.background =
        "linear-gradient(135deg, rgba(30, 58, 138, 0.5) 0%, rgba(59, 130, 246, 0.3) 100%)";
    }

    // Add subtle glow effect
    card.style.filter = "drop-shadow(0 10px 20px rgba(30, 58, 138, 0.1))";
  }

  resetCard(card) {
    card.style.transform = "";
    card.style.zIndex = "";
    card.style.boxShadow = "";
    card.style.filter = "";

    const img = card.querySelector(".service-image img");
    if (img) {
      img.style.transform = "";
    }

    const overlay = card.querySelector(".service-image-overlay");
    if (overlay) {
      overlay.style.background = "";
    }
  }

  selectService(card) {
    const serviceType = card.dataset.service;
    const serviceName = card.querySelector(".service-card__title")?.textContent;

    if (serviceType) {
      // Visual feedback
      card.style.transform = "scale(0.98)";
      setTimeout(() => {
        card.style.transform = "";
      }, 150);

      // Navigate to contact form
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        utils.smoothScrollTo(contactSection, 20);
        notification.show(
          `Selected: ${serviceName} - Redirecting to contact form...`,
          "info",
          3000
        );

        // Pre-fill service in form with delay
        setTimeout(() => {
          const serviceSelect = document.getElementById("service");
          if (serviceSelect) {
            serviceSelect.value = serviceType;
            serviceSelect.dispatchEvent(new Event("change"));

            // Visual indication of selection
            serviceSelect.style.borderColor = "#10b981";
            setTimeout(() => {
              serviceSelect.style.borderColor = "";
            }, 2000);
          }

          // Focus on name field
          const nameField = document.getElementById("name");
          if (nameField) {
            setTimeout(() => nameField.focus(), 500);
          }
        }, 1000);
      }
    }
  }

  setupServiceSelection() {
    // Enhanced CTA buttons for each service
    this.serviceCards.forEach((card) => {
      const content = card.querySelector(".service-card__content");
      if (content) {
        const ctaButton = document.createElement("button");
        ctaButton.className = "service-cta btn btn--outline btn--sm";
        ctaButton.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    Get Quote
                `;

        ctaButton.style.cssText = `
                    margin-top: 20px;
                    opacity: 0;
                    transform: translateY(15px);
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    width: 100%;
                    justify-content: center;
                `;

        content.appendChild(ctaButton);

        // Show/hide button on hover
        card.addEventListener("mouseenter", () => {
          ctaButton.style.opacity = "1";
          ctaButton.style.transform = "translateY(0)";
        });

        card.addEventListener("mouseleave", () => {
          ctaButton.style.opacity = "0";
          ctaButton.style.transform = "translateY(15px)";
        });

        // Button click handler
        ctaButton.addEventListener("click", (e) => {
          e.stopPropagation();
          this.selectService(card);
        });
      }
    });
  }

  setupImagePreloading() {
    // Preload service images when they come into view
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
            }
            imageObserver.unobserve(img);
          }
        });
      },
      { rootMargin: "50px" }
    );

    document.querySelectorAll(".service-image img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

// Enhanced FAQ Controller
class FAQController {
  constructor() {
    this.faqItems = document.querySelectorAll(".faq-item");
    this.init();
  }

  init() {
    this.setupFAQInteractions();
    this.setupKeyboardNavigation();
    console.log("Enhanced FAQ controller initialized");
  }

  setupFAQInteractions() {
    this.faqItems.forEach((item, index) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");

      if (question && answer) {
        // Set initial ARIA attributes
        question.setAttribute("aria-expanded", "false");
        question.setAttribute("aria-controls", `faq-answer-${index}`);
        answer.id = `faq-answer-${index}`;
        answer.setAttribute("aria-labelledby", `faq-question-${index}`);
        question.id = `faq-question-${index}`;

        question.addEventListener("click", () => {
          const isActive = item.classList.contains("active");

          // Close all other FAQ items with animation
          this.faqItems.forEach((otherItem) => {
            if (otherItem !== item && otherItem.classList.contains("active")) {
              this.closeFAQItem(otherItem);
            }
          });

          // Toggle current item
          if (isActive) {
            this.closeFAQItem(item);
          } else {
            this.openFAQItem(item);
          }
        });

        // Enhanced visual feedback
        question.addEventListener("mouseenter", () => {
          if (!item.classList.contains("active")) {
            question.style.backgroundColor = "rgba(30, 58, 138, 0.03)";
          }
        });

        question.addEventListener("mouseleave", () => {
          if (!item.classList.contains("active")) {
            question.style.backgroundColor = "";
          }
        });
      }
    });
  }

  openFAQItem(item) {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    item.classList.add("active");
    question.setAttribute("aria-expanded", "true");

    // Smooth height transition
    answer.style.maxHeight = answer.scrollHeight + "px";
    answer.style.paddingBottom = "24px";

    // Visual feedback
    question.style.backgroundColor = "rgba(30, 58, 138, 0.05)";

    // Scroll into view if needed
    setTimeout(() => {
      const rect = item.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.bottom > viewportHeight - 100) {
        item.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, 300);

    notification.show("FAQ expanded", "info", 2000);
  }

  closeFAQItem(item) {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    item.classList.remove("active");
    question.setAttribute("aria-expanded", "false");

    // Smooth height transition
    answer.style.maxHeight = "0";
    answer.style.paddingBottom = "0";

    // Visual feedback
    question.style.backgroundColor = "";
  }

  setupKeyboardNavigation() {
    this.faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");

      question.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          question.click();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          this.focusNextFAQ(item);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          this.focusPreviousFAQ(item);
        }
      });
    });
  }

  focusNextFAQ(currentItem) {
    const currentIndex = Array.from(this.faqItems).indexOf(currentItem);
    const nextIndex = (currentIndex + 1) % this.faqItems.length;
    const nextQuestion =
      this.faqItems[nextIndex].querySelector(".faq-question");
    nextQuestion.focus();
  }

  focusPreviousFAQ(currentItem) {
    const currentIndex = Array.from(this.faqItems).indexOf(currentItem);
    const prevIndex =
      currentIndex === 0 ? this.faqItems.length - 1 : currentIndex - 1;
    const prevQuestion =
      this.faqItems[prevIndex].querySelector(".faq-question");
    prevQuestion.focus();
  }
}

// Enhanced Statistics Counter
class StatisticsController {
  constructor() {
    this.stats = document.querySelectorAll(".stat-number");
    this.hasAnimated = false;
    this.init();
  }

  init() {
    if (this.stats.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.animateCounters();
            this.hasAnimated = true;
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe the stats container
    const statsContainer = document.querySelector(".hero__stats");
    if (statsContainer) {
      observer.observe(statsContainer);
    }
  }

  animateCounters() {
    this.stats.forEach((stat, index) => {
      setTimeout(() => {
        this.animateCounter(stat);
      }, index * 200);
    });
  }

  animateCounter(element) {
    const finalValue = element.textContent;
    const hasNumber = /\d/.test(finalValue);

    if (!hasNumber) {
      // For non-numeric values, just animate the appearance
      element.style.opacity = "0";
      element.style.transform = "scale(0.5)";
      setTimeout(() => {
        element.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
        element.style.opacity = "1";
        element.style.transform = "scale(1)";
      }, 100);
      return;
    }

    const duration = 2500;
    const number = parseInt(finalValue.replace(/\D/g, ""));

    if (isNaN(number)) return;

    const increment = number / (duration / 16);
    let current = 0;

    element.style.color = "var(--professional-blue)";

    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        current = number;
        clearInterval(timer);

        // Final styling
        element.style.color = "var(--professional-navy)";
        element.style.transform = "scale(1.05)";
        setTimeout(() => {
          element.style.transform = "scale(1)";
        }, 200);
      }

      element.textContent = finalValue.replace(
        /\d+/,
        Math.floor(current).toString()
      );
    }, 16);
  }
}

// Enhanced Scroll Effects Controller
class ScrollEffectsController {
  constructor() {
    this.init();
  }

  init() {
    this.setupParallaxEffects();
    this.setupScrollProgress();
    this.setupScrollToTop();
    console.log("Enhanced scroll effects controller initialized");
  }

  setupParallaxEffects() {
    const heroBackground = document.querySelector(".hero__background");

    if (!heroBackground) return;

    const handleScroll = utils.throttle(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.2; // Reduced for subtlety

      heroBackground.style.transform = `translateY(${rate}px)`;
    }, CONFIG.debounceDelay);

    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  setupScrollProgress() {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #1e3a8a, #3b82f6, #60a5fa);
            z-index: 10001;
            transition: width 0.1s ease;
            border-radius: 0 2px 2px 0;
        `;

    document.body.appendChild(progressBar);

    const updateProgress = utils.throttle(() => {
      const scrolled = window.pageYOffset;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrolled / maxScroll) * 100, 100);

      progressBar.style.width = `${progress}%`;

      // Add glow effect when nearing completion
      if (progress > 90) {
        progressBar.style.boxShadow = "0 0 10px rgba(30, 58, 138, 0.5)";
      } else {
        progressBar.style.boxShadow = "";
      }
    }, CONFIG.debounceDelay);

    window.addEventListener("scroll", updateProgress, { passive: true });
  }

  setupScrollToTop() {
    const scrollButton = document.createElement("button");
    scrollButton.className = "scroll-to-top";
    scrollButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="18,15 12,9 6,15"/>
            </svg>
        `;
    scrollButton.setAttribute("aria-label", "Scroll to top");

    scrollButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--professional-navy) 0%, var(--professional-blue) 100%);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(30, 58, 138, 0.3);
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 1000;
            backdrop-filter: blur(10px);
        `;

    scrollButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      notification.show("Scrolling to top", "info", 2000);
    });

    // Enhanced hover effects
    scrollButton.addEventListener("mouseenter", () => {
      scrollButton.style.transform = "translateY(-5px) scale(1.1)";
      scrollButton.style.boxShadow = "0 8px 30px rgba(30, 58, 138, 0.4)";
    });

    scrollButton.addEventListener("mouseleave", () => {
      scrollButton.style.transform =
        window.pageYOffset > 300
          ? "translateY(0) scale(1)"
          : "translateY(20px) scale(1)";
      scrollButton.style.boxShadow = "0 4px 20px rgba(30, 58, 138, 0.3)";
    });

    document.body.appendChild(scrollButton);

    // Show/hide scroll button
    const toggleScrollButton = utils.throttle(() => {
      if (window.pageYOffset > 300) {
        scrollButton.style.opacity = "1";
        scrollButton.style.visibility = "visible";
        scrollButton.style.transform = "translateY(0)";
      } else {
        scrollButton.style.opacity = "0";
        scrollButton.style.visibility = "hidden";
        scrollButton.style.transform = "translateY(20px)";
      }
    }, 100);

    window.addEventListener("scroll", toggleScrollButton, { passive: true });
  }
}

// Enhanced MEP International App
class ProfessionalMEPApp {
  constructor() {
    this.controllers = new Map();
    this.isInitialized = false;
    this.performanceMetrics = new Map();
  }

  async init() {
    if (this.isInitialized) return;

    const startTime = performance.now();

    try {
      // Wait for DOM to be fully loaded
      if (document.readyState === "loading") {
        await new Promise((resolve) => {
          document.addEventListener("DOMContentLoaded", resolve);
        });
      }

      // Small delay for render completion
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Initialize all controllers with enhanced error handling
      await this.initializeControllers();

      // Setup global enhancements
      this.setupGlobalEvents();
      this.setupAccessibility();
      this.initializeProfessionalFeatures();

      // Performance tracking
      const loadTime = performance.now() - startTime;
      this.performanceMetrics.set("initTime", loadTime);

      this.isInitialized = true;

      // Success notification
      console.log(
        "🏗️ MEP International Professional Website Loaded Successfully"
      );
      console.log(`⚡ Initialization time: ${Math.round(loadTime)}ms`);
      console.log(
        "📍 Available sections:",
        Array.from(document.querySelectorAll("section[id]")).map((s) => s.id)
      );

      // Show welcome notification after short delay
      setTimeout(() => {
        notification.show(
          "✨ Welcome to MEP International! Ready to assist with your technical needs.",
          "success",
          4000
        );
      }, 1500);
    } catch (error) {
      console.error("❌ Error initializing MEP International App:", error);
      notification.show(
        "⚠️ Application initialization encountered issues. Some features may be limited.",
        "warning",
        6000
      );
    }
  }

  async initializeControllers() {
    const controllerInitializers = [
      { name: "animation", class: AnimationController },
      { name: "navigation", class: NavigationController },
      { name: "form", class: FormController },
      { name: "serviceCards", class: ServiceCardController },
      { name: "faq", class: FAQController },
      { name: "statistics", class: StatisticsController },
      { name: "scrollEffects", class: ScrollEffectsController },
    ];

    for (const { name, class: ControllerClass } of controllerInitializers) {
      try {
        this.controllers.set(name, new ControllerClass());
        console.log(`✅ ${name} controller initialized`);
      } catch (error) {
        console.error(`❌ Failed to initialize ${name} controller:`, error);
      }
    }
  }

  setupGlobalEvents() {
    // Enhanced keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.handleEscapeKey();
      } else if (e.ctrlKey || e.metaKey) {
        // Ctrl/Cmd shortcuts
        switch (e.key) {
          case "k":
            e.preventDefault();
            this.focusSearchOrContact();
            break;
        }
      }
    });

    // Enhanced link tracking
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link) {
        // Phone links
        if (link.href.startsWith("tel:")) {
          notification.show("📞 Opening phone dialer...", "info", 2000);
        }

        // Email links
        if (link.href.startsWith("mailto:")) {
          notification.show("📧 Opening email client...", "info", 2000);
        }

        // External links
        if (
          link.href.startsWith("http") &&
          !link.href.includes(window.location.hostname)
        ) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          notification.show("🔗 Opening external link...", "info", 2000);
        }
      }
    });

    // Enhanced error handling
    window.addEventListener("error", (e) => {
      console.error("Global error caught:", e.error);
      notification.show(
        "⚠️ An unexpected error occurred. The page may need to be refreshed.",
        "error",
        5000
      );
    });

    // Performance monitoring
    this.setupPerformanceMonitoring();
  }

  setupPerformanceMonitoring() {
    if ("performance" in window) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          try {
            const perfData = performance.getEntriesByType("navigation")[0];
            if (perfData) {
              const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
              const domContentLoaded =
                perfData.domContentLoadedEventEnd -
                perfData.domContentLoadedEventStart;

              this.performanceMetrics.set("pageLoadTime", loadTime);
              this.performanceMetrics.set(
                "domContentLoadedTime",
                domContentLoaded
              );

              if (loadTime > 3000) {
                console.warn(
                  "⚠️ Page load time is slower than expected:",
                  loadTime + "ms"
                );
              } else {
                console.log(
                  "⚡ Page performance is good:",
                  Math.round(loadTime) + "ms"
                );
              }
            }
          } catch (error) {
            console.log("Performance monitoring not available");
          }
        }, 100);
      });
    }
  }

  handleEscapeKey() {
    // Close mobile menu
    const nav = document.getElementById("nav");
    const menuToggle = document.getElementById("menuToggle");

    if (nav?.classList.contains("active")) {
      nav.classList.remove("active");
      menuToggle?.classList.remove("active");
      document.body.style.overflow = "";
      menuToggle?.focus();
      return;
    }

    // Close any open FAQ items
    const activeFAQ = document.querySelector(".faq-item.active");
    if (activeFAQ) {
      activeFAQ.classList.remove("active");
      const question = activeFAQ.querySelector(".faq-question");
      if (question) question.focus();
      return;
    }

    // Clear notifications
    notification.clear();
  }

  focusSearchOrContact() {
    const nameField = document.getElementById("name");
    if (nameField) {
      nameField.focus();
      utils.smoothScrollTo(nameField.closest("section"), 20);
      notification.show("🎯 Focused on contact form", "info", 2000);
    }
  }

  setupAccessibility() {
    // Enhanced skip to main content link
    const skipLink = document.createElement("a");
    skipLink.href = "#home";
    skipLink.textContent = "Skip to main content";
    skipLink.className = "sr-only";
    skipLink.style.cssText = `
            position: absolute;
            top: -50px;
            left: 10px;
            background: var(--professional-navy);
            color: white;
            padding: 12px 16px;
            text-decoration: none;
            border-radius: 8px;
            z-index: 10002;
            font-weight: 500;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        `;

    skipLink.addEventListener("focus", () => {
      skipLink.style.top = "10px";
      skipLink.style.border = "2px solid var(--professional-gold)";
    });

    skipLink.addEventListener("blur", () => {
      skipLink.style.top = "-50px";
      skipLink.style.border = "2px solid transparent";
    });

    skipLink.addEventListener("click", (e) => {
      e.preventDefault();
      const heroSection = document.querySelector(".hero");
      if (heroSection) {
        heroSection.focus();
        heroSection.scrollIntoView({ behavior: "smooth" });
      }
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Enhanced ARIA labels and roles
    const heroSection = document.querySelector(".hero");
    if (heroSection) {
      heroSection.setAttribute("role", "main");
      heroSection.setAttribute("aria-label", "Main content area");
    }

    // Add live region for notifications
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "sr-only";
    liveRegion.id = "live-region";
    document.body.appendChild(liveRegion);
  }

  initializeProfessionalFeatures() {
    // Enhanced image lazy loading
    this.setupImageLazyLoading();

    // Professional animations
    this.initializeProfessionalAnimations();

    // Enhanced FAQ functionality
    this.setupEnhancedFAQ();

    // Professional tooltips
    this.setupTooltips();
  }

  setupImageLazyLoading() {
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                img.classList.add("loaded");
              }
              imageObserver.unobserve(img);
            }
          });
        },
        { rootMargin: "100px" }
      );

      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    }
  }

  initializeProfessionalAnimations() {
    // Staggered entrance animations
    const elementsToAnimate = [
      { selector: ".hero__content > *", delay: 100, stagger: 150 },
      { selector: ".service-card", delay: 200, stagger: 100 },
      { selector: ".value-card", delay: 150, stagger: 100 },
      { selector: ".package-card", delay: 200, stagger: 150 },
      { selector: ".reason-card", delay: 180, stagger: 120 },
    ];

    elementsToAnimate.forEach(({ selector, delay, stagger }) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";

        setTimeout(() => {
          el.style.transition =
            "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";

          // Remove transition after animation
          setTimeout(() => {
            el.style.transition = "";
          }, 800);
        }, delay + index * stagger);
      });
    });
  }

  setupEnhancedFAQ() {
    // Search functionality for FAQs
    const faqSection = document.getElementById("faq");
    if (faqSection) {
      const searchInput = document.createElement("input");
      searchInput.type = "text";
      searchInput.placeholder = "Search frequently asked questions...";
      searchInput.className = "faq-search form-control";
      searchInput.style.cssText = `
                margin-bottom: 32px;
                max-width: 400px;
                margin-left: auto;
                margin-right: auto;
                display: block;
            `;

      const faqContent = faqSection.querySelector(".faq__content");
      if (faqContent) {
        faqContent.insertBefore(searchInput, faqContent.firstChild);

        searchInput.addEventListener(
          "input",
          utils.debounce((e) => {
            this.searchFAQs(e.target.value);
          }, 300)
        );
      }
    }
  }

  searchFAQs(searchTerm) {
    const faqItems = document.querySelectorAll(".faq-item");
    const term = searchTerm.toLowerCase().trim();

    faqItems.forEach((item) => {
      const question = item
        .querySelector(".faq-question span")
        .textContent.toLowerCase();
      const answer = item
        .querySelector(".faq-answer p")
        .textContent.toLowerCase();

      if (term === "" || question.includes(term) || answer.includes(term)) {
        item.style.display = "";
        item.style.opacity = "1";
      } else {
        item.style.display = "none";
        item.style.opacity = "0";
      }
    });

    if (term) {
      notification.show(`🔍 Searching FAQs for: "${searchTerm}"`, "info", 2000);
    }
  }

  setupTooltips() {
    // Add tooltips for stat items and other interactive elements
    const tooltipElements = document.querySelectorAll("[data-tooltip]");

    tooltipElements.forEach((element) => {
      element.addEventListener("mouseenter", (e) => {
        this.showTooltip(e.target, e.target.dataset.tooltip);
      });

      element.addEventListener("mouseleave", () => {
        this.hideTooltip();
      });
    });
  }

  showTooltip(element, text) {
    const tooltip = document.createElement("div");
    tooltip.className = "custom-tooltip";
    tooltip.textContent = text;
    tooltip.style.cssText = `
            position: absolute;
            background: var(--professional-navy);
            color: white;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 12px;
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;

    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.left =
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + "px";

    requestAnimationFrame(() => {
      tooltip.style.opacity = "1";
      tooltip.style.transform = "translateY(0)";
    });

    this.currentTooltip = tooltip;
  }

  hideTooltip() {
    if (this.currentTooltip) {
      this.currentTooltip.style.opacity = "0";
      this.currentTooltip.style.transform = "translateY(10px)";

      setTimeout(() => {
        if (this.currentTooltip && this.currentTooltip.parentNode) {
          this.currentTooltip.parentNode.removeChild(this.currentTooltip);
        }
        this.currentTooltip = null;
      }, 300);
    }
  }

  // Public API methods
  getPerformanceMetrics() {
    return Object.fromEntries(this.performanceMetrics);
  }

  refreshController(name) {
    if (this.controllers.has(name)) {
      console.log(`Refreshing ${name} controller...`);
      // Reinitialize controller if needed
    }
  }
}

// Initialize Enhanced MEP International Application
const app = new ProfessionalMEPApp();

// Enhanced initialization with better error handling
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    app.init().catch((error) => {
      console.error("Failed to initialize application:", error);
    });
  });
} else {
  app.init().catch((error) => {
    console.error("Failed to initialize application:", error);
  });
}

// Enhanced global API
window.MEPInternational = {
  app,
  notification,
  utils,
  LoadingManager,
  version: "2.0.0",

  // Public methods
  scrollTo: (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      utils.smoothScrollTo(section, 20);
      return true;
    }
    return false;
  },

  showNotification: (message, type = "info", duration = 5000) => {
    return notification.show(message, type, duration);
  },

  getPerformanceMetrics: () => app.getPerformanceMetrics(),

  isInitialized: () => app.isInitialized,
};

// Console welcome message
console.log(`
🏗️ MEP International Technical Services L.L.C.
Building Excellence Across the UAE

Version: 2.0.0
Loaded: ${new Date().toLocaleString()}
Performance: Optimized
Accessibility: Enhanced

Ready to serve your technical needs!
`);

// Export for potential module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = { app, notification, utils, LoadingManager };
}
