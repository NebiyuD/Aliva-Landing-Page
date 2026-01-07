// Sales Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Form handling
    const salesForm = document.getElementById('salesForm');
    const successOverlay = document.getElementById('successOverlay');

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = '(' + value;
                } else if (value.length <= 6) {
                    value = '(' + value.slice(0, 3) + ') ' + value.slice(3);
                } else {
                    value = '(' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6, 10);
                }
            }
            e.target.value = value;
        });
    }

    // Form submission
    if (salesForm) {
        salesForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Clear previous errors
            clearErrors();

            // Validate form
            if (!validateForm()) {
                return;
            }

            // Get submit button elements
            const submitBtn = salesForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            const btnIcon = submitBtn.querySelector('svg:not(.spinner)').parentElement === submitBtn ? submitBtn.querySelector('svg:not(.spinner)') : null;

            // Show loading state
            submitBtn.disabled = true;
            if (btnText) btnText.textContent = 'Submitting...';
            if (btnLoader) btnLoader.style.display = 'inline-flex';
            if (btnIcon) btnIcon.style.display = 'none';

            // Collect form data
            const formData = new FormData(salesForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            try {
                // Simulate API call (replace with actual endpoint)
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Show success overlay
                showSuccessOverlay();

                // Reset form
                salesForm.reset();

            } catch (error) {
                console.error('Form submission error:', error);
                alert('There was an error submitting the form. Please try again.');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                if (btnText) btnText.textContent = 'Contact Sales';
                if (btnLoader) btnLoader.style.display = 'none';
                if (btnIcon) btnIcon.style.display = 'inline';
            }
        });
    }

    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = salesForm.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showError(field, 'This field is required');
                isValid = false;
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                showError(field, 'Please enter a valid email address');
                isValid = false;
            } else if (field.id === 'phone' && !isValidPhone(field.value)) {
                showError(field, 'Please enter a valid phone number');
                isValid = false;
            }
        });

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        return phoneRegex.test(phone);
    }

    function showError(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('error');

        // Remove existing error message if any
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);

        // Remove error on input
        field.addEventListener('input', function() {
            formGroup.classList.remove('error');
            const error = formGroup.querySelector('.error-message');
            if (error) error.remove();
        }, { once: true });
    }

    function clearErrors() {
        const errorGroups = salesForm.querySelectorAll('.form-group.error');
        errorGroups.forEach(group => {
            group.classList.remove('error');
            const error = group.querySelector('.error-message');
            if (error) error.remove();
        });
    }

    // Success overlay functions
    function showSuccessOverlay() {
        if (successOverlay) {
            successOverlay.style.display = 'flex';
            // Trigger reflow to enable animation
            successOverlay.offsetHeight;
            successOverlay.classList.add('active');
        }
    }

    // Close success overlay - exposed globally
    window.closeSuccessOverlay = function() {
        if (successOverlay) {
            successOverlay.classList.remove('active');
            setTimeout(() => {
                successOverlay.style.display = 'none';
            }, 300);
        }
    };

    // Close overlay on background click
    if (successOverlay) {
        successOverlay.addEventListener('click', function(e) {
            if (e.target === successOverlay) {
                closeSuccessOverlay();
            }
        });
    }

    // Close overlay on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successOverlay && successOverlay.classList.contains('active')) {
            closeSuccessOverlay();
        }
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

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

    // Observe elements with animation classes
    document.querySelectorAll('.benefit-item, .enterprise-stat, .trust-badge').forEach(el => {
        observer.observe(el);
    });

    // Button ripple effect
    document.querySelectorAll('.btn-primary, .btn-secondary, .success-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
});
