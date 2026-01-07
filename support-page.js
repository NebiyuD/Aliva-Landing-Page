// Support Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // FAQ Category Filter
    const categoryButtons = document.querySelectorAll('.faq-category');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;

            // Filter FAQ items
            faqItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
                // Close all items when switching categories
                item.classList.remove('active');
            });
        });
    });

    // Search Functionality
    const searchInput = document.getElementById('searchInput');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            // Reset category filter to "All"
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('.faq-category[data-category="all"]').classList.add('active');

            if (searchTerm === '') {
                // Show all FAQs when search is empty
                faqItems.forEach(item => {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                });
                return;
            }

            // Filter FAQs based on search term
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question span').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();

                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                    // Optionally expand matching items
                    if (searchTerm.length > 2) {
                        item.classList.add('active');
                    }
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            });
        });

        // Clear search on Escape
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
            }
        });
    }

    // Live Chat Simulation
    window.startLiveChat = function() {
        // In a real implementation, this would open a chat widget
        alert('Live chat feature coming soon! In the meantime, please email us at support@aliva.health or call 1-800-555-1234.');
    };

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
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
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

    // Observe elements for animation
    document.querySelectorAll('.quick-link-card, .faq-item, .contact-card, .doc-card').forEach(el => {
        observer.observe(el);
    });

    // Status update simulation (in production, this would fetch real data)
    function updateStatusTime() {
        const statusUpdated = document.querySelector('.status-updated');
        if (statusUpdated) {
            const now = new Date();
            const minutes = Math.floor(Math.random() * 5) + 1;
            statusUpdated.textContent = `Updated ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        }
    }

    // Update status time periodically
    setInterval(updateStatusTime, 60000);

    // Quick link card click effect
    document.querySelectorAll('.quick-link-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Add ripple effect
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

    // Documentation card hover animation
    document.querySelectorAll('.doc-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.doc-arrow').style.transform = 'translateX(4px)';
        });

        card.addEventListener('mouseleave', function() {
            this.querySelector('.doc-arrow').style.transform = 'translateX(0)';
        });
    });
});
