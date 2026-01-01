// Demo Form Handling
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('demoForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success!
                showSuccessAnimation();
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            alert('Oops! There was a problem submitting your form. Please try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
    const successMessage = document.getElementById('successMessage');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const requiredFields = ['firstName', 'lastName', 'email', 'organization', 'role'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    input.style.borderColor = '#EF4444';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailInput = document.getElementById('email');
            if (!emailRegex.test(emailInput.value)) {
                emailInput.style.borderColor = '#EF4444';
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <svg class="spinner" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" opacity="0.3"/>
                    <path d="M10 2C5.58172 2 2 5.58172 2 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Submitting...
            `;
            
            // Add spinner animation
            const style = document.createElement('style');
            style.textContent = `
                .spinner {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Log the data (in production, send to your backend)
                console.log('Demo Request Submitted:', data);
                
                // Here you would typically send the data to your backend:
                // fetch('/api/demo-request', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(data)
                // })
                // .then(response => response.json())
                // .then(result => {
                //     // Handle success
                // })
                // .catch(error => {
                //     // Handle error
                // });
                
                // Show success message
                form.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Optional: Reset button after showing success
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                
                // Optional: Send to email or integrate with your backend
                // You can also integrate with services like:
                // - Formspree
                // - EmailJS
                // - Your own backend API
                // - Firebase
                // - Netlify Forms
                
            }, 2000); // Simulate network delay
        });
        
        // Clear error styling on input
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            e.target.value = value;
        });
    }
    
    // Add animation on scroll for helpful links
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.link-category').forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(category);
    });
});

// Form validation helper
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
}

console.log('🏥 Aliva Demo Page loaded successfully!');

function showSuccessAnimation() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';
    
    // Create success card
    const successCard = document.createElement('div');
    successCard.className = 'success-card';
    
    successCard.innerHTML = `
        <div class="success-checkmark">
            <svg class="checkmark" viewBox="0 0 52 52">
                <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
        </div>
        <h2 class="success-title">Request Submitted!</h2>
        <p class="success-message">Thank you for your interest in Aliva. Our team will reach out to you within 24 hours to schedule your personalized demo.</p>
        <button class="success-button" onclick="closeSuccessAnimation()">Got it</button>
    `;
    
    overlay.appendChild(successCard);
    document.body.appendChild(overlay);
    
    // Trigger animation
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
}

function closeSuccessAnimation() {
    const overlay = document.querySelector('.success-overlay');
    overlay.classList.remove('active');
    setTimeout(() => {
        overlay.remove();
    }, 300);
}