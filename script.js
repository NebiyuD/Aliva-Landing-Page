// Modern Interactive Landing Page

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animated counter
function animateCounter(element) {
    const target = parseFloat(element.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current * 10) / 10;
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate stats
            if (entry.target.classList.contains('stat-item')) {
                const number = entry.target.querySelector('.stat-number');
                animateCounter(number);
                entry.target.classList.add('animated');
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Handle dropdown on mobile
        const dropdowns = navLinks.querySelectorAll('.nav-dropdown');
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.nav-dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });
    }

    // Observe stats
    document.querySelectorAll('.stat-item').forEach(stat => {
        observer.observe(stat);
    });
    
    // Demo tabs
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoPanels = document.querySelectorAll('.demo-panel');
    
    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const demoType = tab.dataset.demo;
            
            // Update tabs
            demoTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update panels
            demoPanels.forEach(p => p.classList.remove('active'));
            document.getElementById(`${demoType}Demo`).classList.add('active');
        });
    });
    
    // Chat suggestions
    const suggestions = document.querySelectorAll('.suggestion-chip');
    const demoInput = document.getElementById('demoInput');
    const demoMessages = document.getElementById('demoMessages');
    
    suggestions.forEach(chip => {
        chip.addEventListener('click', () => {
            const question = chip.textContent;
            
            // Add user message
            addMessage('user', question);
            
            // Simulate AI response
            setTimeout(() => {
                const response = getAIResponse(question);
                addMessage('ai', response);
            }, 1000);
        });
    });
    
    // Send button (only on index page)
    const sendBtn = document.querySelector('.send-btn');
    if (sendBtn && demoInput) {
        sendBtn.addEventListener('click', sendMessage);
        demoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    function sendMessage() {
        const message = demoInput.value.trim();
        if (!message) return;
        
        addMessage('user', message);
        demoInput.value = '';
        
        setTimeout(() => {
            const response = getAIResponse(message);
            addMessage('ai', response);
        }, 1000);
    }
    
    function addMessage(type, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        if (type === 'ai') {
            avatar.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="white"><circle cx="8" cy="8" r="6"/></svg>';
        }
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = text;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        demoMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        demoMessages.scrollTop = demoMessages.scrollHeight;
    }
    
    function getAIResponse(question) {
        const q = question.toLowerCase();
        
        if (q.includes('vital')) {
            return 'Latest vitals: BP 120/80 mmHg, HR 72 bpm, Temp 98.6°F, SpO2 98%. All parameters within normal range.';
        } else if (q.includes('lab')) {
            return 'Recent labs show: CBC normal, Glucose 102 mg/dL (slightly elevated), Creatinine 0.9 mg/dL (normal). HbA1c at 6.2% indicates prediabetes.';
        } else if (q.includes('med')) {
            return 'Current medications: Lisinopril 10mg daily, Metformin 500mg BID, Aspirin 81mg daily. No known drug interactions detected.';
        } else if (q.includes('interact')) {
            return 'No critical drug interactions detected. Current medications are compatible. Continue monitoring glucose levels due to prediabetic status.';
        } else {
            return 'I can help you analyze patient vitals, lab results, medications, and detect potential drug interactions. What would you like to know?';
        }
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Add parallax effect to shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.3;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add interactive hover effects to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--primary)';
        const icon = this.querySelector('.feature-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--border)';
        const icon = this.querySelector('.feature-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn-hero, .btn-primary, .btn-cta').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('🚀 Aliva - Modern AI Landing Page Ready');
