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

// Smooth scroll to download section
function scrollToDownload() {
    document.querySelector('.download-section')?.scrollIntoView({
        behavior: 'smooth'
    }) || document.querySelector('footer')?.scrollIntoView({
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
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.group, .animate-float');
    
    animatedElements.forEach(el => {
        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
        observer.observe(el);
    });
});

// Add interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to challenge cards
    const challengeCards = document.querySelectorAll('.bg-white.rounded-3xl');
    
    challengeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Progress bar animation for the reward screen
function animateRewardScreen() {
    const rewardScreen = document.querySelector('.animate-bounce-slow');
    if (rewardScreen) {
        rewardScreen.style.opacity = '0';
        rewardScreen.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            rewardScreen.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            rewardScreen.style.opacity = '1';
            rewardScreen.style.transform = 'scale(1)';
        }, 500);
    }
}

// Initialize reward screen animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateRewardScreen, 1000);
});

// Add some fun micro-interactions
document.addEventListener('DOMContentLoaded', function() {
    // Bounce effect on beer icon hover
    const beerIcon = document.querySelector('.animate-bounce-slow');
    if (beerIcon) {
        beerIcon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        beerIcon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
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
    button {
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

// Add floating elements animation enhancement
document.addEventListener('DOMContentLoaded', function() {
    const floatingElements = document.querySelectorAll('.animate-float');
    
    floatingElements.forEach((element, index) => {
        // Add random initial positions and delays for more natural movement
        element.style.animationDelay = `${index * 0.5}s`;
        
        // Add click interaction for fun
        element.addEventListener('click', function() {
            this.style.transform = 'scale(1.5) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 500);
        });
    });
});

// Add scroll-triggered animations
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.animate-float');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add loading state to download buttons
function addLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '⏳ Loading...';
    button.disabled = true;
    
    return function() {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('button');
    
    downloadButtons.forEach(button => {
        if (button.textContent.includes('Download') || button.textContent.includes('App Store')) {
            button.addEventListener('click', function(e) {
                const resetLoading = addLoadingState(this);
                
                // Simulate app store redirect delay
                setTimeout(() => {
                    resetLoading();
                    // Here you would typically redirect to the App Store
                    console.log('Redirecting to App Store...');
                }, 1500);
            });
        }
    });
});

// Add smooth reveal animations for sections
const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-12');
        }
    });
}, revealOptions);

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('opacity-0', 'translate-y-12', 'transition-all', 'duration-1000');
        revealObserver.observe(section);
    });
    
    // Hero section should be visible immediately
    const heroSection = document.querySelector('section:first-child');
    if (heroSection) {
        heroSection.classList.remove('opacity-0', 'translate-y-12');
        heroSection.classList.add('opacity-100', 'translate-y-0');
    }
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const waitlistForm = document.querySelector('form');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            
            if (emailInput && emailInput.value) {
                const resetLoading = addLoadingState(submitButton);
                
                // Simulate form submission
                setTimeout(() => {
                    resetLoading();
                    emailInput.value = '';
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'mt-4 p-4 bg-green-100 text-green-800 rounded-lg';
                    successMessage.textContent = '🎉 Thanks! You\'ve been added to our waitlist.';
                    
                    this.appendChild(successMessage);
                    
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 1000);
            }
        });
    }
}); 