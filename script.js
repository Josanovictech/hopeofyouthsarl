/* ========================================
   HOPE OF YOUTH SARL - Main JavaScript
   ======================================== */

/* ========== DOCUMENT READY ========== */
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/* ========== INITIALIZE APP ========== */
function initializeApp() {
    setupSmoothScrolling();
    setupNavigation();
    setupButtonActions();
    setupFormValidation();
    setupAnimations();
    setupPricingModal();
}

/* ========== SMOOTH SCROLLING ========== */
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ========== NAVIGATION ========== */
function setupNavigation() {
    const nav = document.querySelector('nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add active class to nav links based on scroll position
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
                const activeLink = document.querySelector(`nav a[href="#${section.id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });

        lastScrollTop = scrollTop;
    });
}

/* ========== BUTTON ACTIONS ========== */
function setupButtonActions() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
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
}

/* ========== FORM VALIDATION ========== */
function setupFormValidation() {
    // This function can be expanded if you add forms to your site
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                showNotification('Veuillez remplir tous les champs correctement.', 'error');
            }
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }

        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
    });

    return isValid;
}

/* ========== ANIMATIONS ========== */
function setupAnimations() {
    // Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to all cards and sections
    document.querySelectorAll('.card, section').forEach(element => {
        observer.observe(element);
    });
}

/* ========== NOTIFICATIONS ========== */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* ========== UTILITY FUNCTIONS ========== */

// Debounce function for resize events
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Get element by ID
function getElement(id) {
    return document.getElementById(id);
}

// Get elements by class
function getElements(className) {
    return document.querySelectorAll('.' + className);
}

// Add class to element
function addClass(element, className) {
    if (element) element.classList.add(className);
}

// Remove class from element
function removeClass(element, className) {
    if (element) element.classList.remove(className);
}

// Toggle class on element
function toggleClass(element, className) {
    if (element) element.classList.toggle(className);
}

/* ========== DYNAMIC CONTACT FORM ========== */
function createContactForm() {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const formHTML = `
        <div class="contact-form">
            <h3>Envoyez-nous un message</h3>
            <form id="contactForm">
                <div class="form-group">
                    <input type="text" id="name" name="name" placeholder="Votre Nom" required>
                </div>
                <div class="form-group">
                    <input type="email" id="email" name="email" placeholder="Votre Email" required>
                </div>
                <div class="form-group">
                    <input type="tel" id="phone" name="phone" placeholder="Votre Téléphone">
                </div>
                <div class="form-group">
                    <textarea id="message" name="message" placeholder="Votre Message" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn">Envoyer</button>
            </form>
        </div>
    `;

    const formContainer = document.createElement('div');
    formContainer.innerHTML = formHTML;
    contactSection.appendChild(formContainer.firstElementChild);

    document.getElementById('contactForm').addEventListener('submit', handleContactForm);
}

function handleContactForm(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };

    // Validate form
    if (validateForm(this)) {
        console.log('Form Data:', formData);
        showNotification('Merci! Votre message a été envoyé avec succès.', 'success');
        this.reset();
    }
}

/* ========== SCROLL TO TOP BUTTON ========== */
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTopBtn';
    button.textContent = '↑';
    button.title = 'Retour au haut';
    button.className = 'scroll-to-top';

    document.body.appendChild(button);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    });

    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ========== PAGE LOAD PERFORMANCE ========== */
window.addEventListener('load', function() {
    // Create scroll-to-top button
    createScrollToTopButton();

    // Uncomment below if you want to add a contact form
    // createContactForm();

    // Log page load time
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page load time: ' + pageLoadTime + 'ms');
});

/* ========== ERROR HANDLING ========== */
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
});

/* ========== OFFLINE DETECTION ========== */
window.addEventListener('offline', function() {
    showNotification('Vous êtes hors ligne.', 'error');
});

window.addEventListener('online', function() {
    showNotification('Vous êtes de retour en ligne.', 'success');
});

/* ========== PRICING MODAL ========== */
function setupPricingModal() {
    const pricingBtn = document.querySelector('.pricing-btn');
    if (!pricingBtn) return;

    pricingBtn.addEventListener('click', function() {
        openPricingModal();
    });
}

function openPricingModal() {
    // Create modal HTML
    const modalHTML = `
        <div class="pricing-modal" id="pricingModal">
            <div class="pricing-modal-content">
                <button class="modal-close" onclick="closePricingModal()">&times;</button>
                <div class="modal-carousel">
                    <div class="carousel-slide active" data-image="switch">
                        <img src="images/switch.png" alt="Switch">
                        <h3>Switch Network</h3>
                    </div>
                    <div class="carousel-slide" data-image="switch1">
                        <img src="images/switch1.png" alt="Switch 1">
                        <h3>Switch 1 Advanced</h3>
                    </div>
                </div>
                <div class="carousel-controls">
                    <button class="carousel-btn prev" onclick="prevSlide()">&lsaquo;</button>
                    <span class="carousel-dots">
                        <span class="dot active" onclick="goToSlide(0)"></span>
                        <span class="dot" onclick="goToSlide(1)"></span>
                    </span>
                    <button class="carousel-btn next" onclick="nextSlide()">&rsaquo;</button>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if present
    const existingModal = document.getElementById('pricingModal');
    if (existingModal) existingModal.remove();

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Show modal with animation
    const modal = document.getElementById('pricingModal');
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    // Auto-advance slides every 4 seconds
    window.modalSlideInterval = setInterval(nextSlide, 4000);

    // Close modal on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closePricingModal();
        }
    });

    // Keyboard controls
    document.addEventListener('keydown', handleModalKeyboard);
}

function closePricingModal() {
    const modal = document.getElementById('pricingModal');
    if (modal) {
        modal.classList.remove('show');
        clearInterval(window.modalSlideInterval);
        document.removeEventListener('keydown', handleModalKeyboard);
        setTimeout(() => modal.remove(), 300);
    }
}

function nextSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    const currentSlide = document.querySelector('.carousel-slide.active');
    let nextSlideElement = currentSlide.nextElementSibling;
    
    if (!nextSlideElement) {
        nextSlideElement = slides[0];
    }
    
    currentSlide.classList.remove('active');
    nextSlideElement.classList.add('active');
    updateDots();
}

function prevSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    const currentSlide = document.querySelector('.carousel-slide.active');
    let prevSlideElement = currentSlide.previousElementSibling;
    
    if (!prevSlideElement) {
        prevSlideElement = slides[slides.length - 1];
    }
    
    currentSlide.classList.remove('active');
    prevSlideElement.classList.add('active');
    updateDots();
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    document.querySelector('.carousel-slide.active').classList.remove('active');
    slides[index].classList.add('active');
    updateDots();
}

function updateDots() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            dots[index].classList.add('active');
        } else {
            dots[index].classList.remove('active');
        }
    });
}

function handleModalKeyboard(e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'Escape') closePricingModal();
}

/* ========== YOUTUBE WIDGET ========== */
function closeYoutubeWidget() {
    const widget = document.getElementById('youtubeWidget');
    if (widget) {
        widget.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            widget.remove();
        }, 300);
    }
}

/* ========== YOUTUBE IFRAME API AUTOPLAY HELPERS ========== */
function loadYouTubeAPIAndPlay() {
    // load API if not present
    if (!document.getElementById('youtube-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
    }

    // ensure we try to create player when API is ready
    if (window.YT && window.YT.Player) {
        createYTPlayer();
    } else {
        // onYouTubeIframeAPIReady is called by the API when ready
        window.onYouTubeIframeAPIReady = function() {
            createYTPlayer();
        };
    }
}

function createYTPlayer() {
    try {
        const iframe = document.getElementById('youtubePlayer');
        if (!iframe) return;

        // If a player instance already exists, do nothing
        if (window.youtubePlayerInstance && typeof window.youtubePlayerInstance.playVideo === 'function') {
            // attempt to play again
            window.youtubePlayerInstance.mute();
            window.youtubePlayerInstance.playVideo();
            return;
        }

        window.youtubePlayerInstance = new YT.Player('youtubePlayer', {
            events: {
                onReady: function(event) {
                    // Mute and try to play (muted autoplay is generally allowed)
                    try {
                        event.target.mute();
                        event.target.playVideo();
                    } catch (err) {
                        console.warn('YT play attempt failed:', err);
                    }
                }
            },
            playerVars: {
                autoplay: 1,
                playsinline: 1,
                modestbranding: 1
            }
        });
    } catch (err) {
        console.warn('createYTPlayer error', err);
    }
}

// Try loading API shortly after page load
document.addEventListener('DOMContentLoaded', function() {
    // small delay to avoid blocking initial paint
    setTimeout(loadYouTubeAPIAndPlay, 300);

    // as a fallback, attempt to play on first user interaction
    const tryPlayOnInteraction = function() {
        if (window.youtubePlayerInstance && typeof window.youtubePlayerInstance.playVideo === 'function') {
            window.youtubePlayerInstance.mute();
            window.youtubePlayerInstance.playVideo();
        } else {
            loadYouTubeAPIAndPlay();
        }
        window.removeEventListener('click', tryPlayOnInteraction);
        window.removeEventListener('touchstart', tryPlayOnInteraction);
    };

    window.addEventListener('click', tryPlayOnInteraction, { once: true });
    window.addEventListener('touchstart', tryPlayOnInteraction, { once: true });
});
