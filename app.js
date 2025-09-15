// Portfolio JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when about section is visible
                if (entry.target.id === 'about') {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements
    function setupScrollAnimations() {
        // Hero section elements
        const heroText = document.querySelector('.hero-text');
        const heroAvatar = document.querySelector('.hero-avatar');
        if (heroText) {
            heroText.classList.add('slide-in-left');
            observer.observe(heroText);
        }
        if (heroAvatar) {
            heroAvatar.classList.add('slide-in-right');
            observer.observe(heroAvatar);
        }

        // Section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            title.classList.add('fade-in');
            observer.observe(title);
        });

        // About section
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            observer.observe(aboutSection);
        }

        // Project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });

        // Timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.classList.add('slide-in-left');
            item.style.transitionDelay = `${index * 0.2}s`;
            observer.observe(item);
        });

        // Education cards
        const educationCards = document.querySelectorAll('.education-card, .certification-card, .achievement-card');
        educationCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });

        // Contact section
        const contactInfo = document.querySelector('.contact-info');
        const contactForm = document.querySelector('.contact-form');
        if (contactInfo) {
            contactInfo.classList.add('slide-in-left');
            observer.observe(contactInfo);
        }
        if (contactForm) {
            contactForm.classList.add('slide-in-right');
            observer.observe(contactForm);
        }
    }

    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.style.width;
                bar.style.width = '0%';
                bar.offsetHeight; // Force reflow
                bar.style.width = width;
            }, index * 100);
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease',
            maxWidth: '400px',
            wordWrap: 'break-word'
        });
        
        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.background = 'var(--color-success)';
                break;
            case 'error':
                notification.style.background = 'var(--color-error)';
                break;
            case 'warning':
                notification.style.background = 'var(--color-warning)';
                break;
            default:
                notification.style.background = 'var(--color-info)';
        }
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
        
        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
    }

    // Typing animation for hero section
    function initTypewriterEffect() {
        const heroTitle = document.querySelector('.hero-title .name');
        if (!heroTitle) return;
        
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--color-primary)';
        
        let index = 0;
        const typeSpeed = 100;
        
        function typeChar() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, typeSpeed);
            } else {
                // Remove cursor after typing is done
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeChar, 1000);
    }

    // Parallax effect for hero section
    function initParallaxEffect() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // Add some interactive hover effects
    function initHoverEffects() {
        // Project cards tilt effect
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) rotateX(5deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0)';
            });
        });
        
        // Skill bars glow effect on hover
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const progressBar = this.querySelector('.skill-progress');
                if (progressBar) {
                    progressBar.style.boxShadow = '0 0 20px rgba(50, 184, 198, 0.5)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const progressBar = this.querySelector('.skill-progress');
                if (progressBar) {
                    progressBar.style.boxShadow = 'none';
                }
            });
        });
    }

    // Initialize all functionality
    setupScrollAnimations();
    initTypewriterEffect();
    initHoverEffects();
    
    // Optional: Add parallax effect (commented out for performance)
    // initParallaxEffect();
    
    // Add some loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function throttleScroll(callback) {
        return function() {
            if (!ticking) {
                requestAnimationFrame(callback);
                ticking = true;
            }
        };
    }
    
    // Apply throttling to scroll-heavy functions
    window.addEventListener('scroll', throttleScroll(function() {
        ticking = false;
        // Scroll-dependent functions are already attached above
    }));
    
    console.log('Portfolio website loaded successfully! 🚀');
});