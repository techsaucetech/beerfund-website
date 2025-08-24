// Waitlist Modal Functions
function openWaitlist() {
    document.getElementById('waitlistModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeWaitlist() {
    document.getElementById('waitlistModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('waitlistModal');
    if (event.target === modal) {
        closeWaitlist();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeWaitlist();
    }
});

// Waitlist Form Submission
document.getElementById('waitlistForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    
    if (email) {
        // Here you would typically send the email to your backend
        // For now, we'll just show the success modal
        console.log('Email submitted:', email);
        
        // Show success message
        openWaitlist();
        
        // Clear the form
        document.getElementById('email').value = '';
        
        // You could add analytics tracking here
        if (typeof gtag !== 'undefined') {
            gtag('event', 'waitlist_signup', {
                'event_category': 'engagement',
                'event_label': 'waitlist_form'
            });
        }
    }
});

// Smooth scroll to App Store section (placeholder)
function scrollToAppStore() {
    // For now, scroll to the waitlist section
    // When you have the App Store link, you can update this
    document.querySelector('.waitlist').scrollIntoView({
        behavior: 'smooth'
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.step, .challenge-card, .benefit');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to challenge cards
    const challengeCards = document.querySelectorAll('.challenge-card');
    
    challengeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add hover effects to steps
    const steps = document.querySelectorAll('.step');
    
    steps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Progress bar animation for the phone mockup
function animateProgressBar() {
    const progressBar = document.querySelector('.progress');
    if (progressBar) {
        // Animate from 0 to 75%
        progressBar.style.width = '0%';
        setTimeout(() => {
            progressBar.style.width = '75%';
        }, 1000);
    }
}

// Initialize progress bar animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateProgressBar, 500);
});

// Add loading state to buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    
    return function() {
        button.textContent = originalText;
        button.disabled = false;
    };
}

// Enhanced form submission with loading state
document.getElementById('waitlistForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const resetLoading = addLoadingState(submitButton);
    
    const email = document.getElementById('email').value;
    
    if (email) {
        // Simulate API call delay
        setTimeout(() => {
            resetLoading();
            openWaitlist();
            document.getElementById('email').value = '';
        }, 1000);
    }
});

// Add some fun micro-interactions
document.addEventListener('DOMContentLoaded', function() {
    // Bounce effect on logo hover
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
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
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 