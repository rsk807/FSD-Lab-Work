// Navigation event listeners
function setupNavigationEventListeners() {
    const navLinks = document.querySelectorAll('.nav-link');
    console.log(`Setting up navigation effects for ${navLinks.length} links`);
    
    navLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        link.addEventListener('click', function() {
            console.log(`Nav link ${index + 1} clicked`);
        });
    });
    
    // Logo hover effect
    const logo = document.querySelector('.nav-logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            const shield = this.querySelector('i');
            if (shield) {
                shield.style.transform = 'rotate(15deg) scale(1.1)';
                shield.style.transition = 'all 0.3s ease';
            }
        });
        
        logo.addEventListener('mouseleave', function() {
            const shield = this.querySelector('i');
            if (shield) {
                shield.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    }
}

// Feature card hover effects
function setupFeatureCardHoverEffects() {
    const featureCards = document.querySelectorAll('.feature-card');
    console.log(`Setting up hover effects for ${featureCards.length} feature cards`);
    
    featureCards.forEach((card, index) => {
        console.log(`Setting up card ${index + 1}`);
        
        card.addEventListener('mouseenter', function() {
            console.log(`Card ${index + 1} hover enter`);
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
            this.style.transition = 'all 0.3s ease';
            
            // Animate the icon
            const icon = this.querySelector('.feature-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'all 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            console.log(`Card ${index + 1} hover leave`);
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
            
            const icon = this.querySelector('.feature-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        card.addEventListener('click', function() {
            console.log(`Card ${index + 1} clicked`);
            this.style.animation = 'pulse 0.6s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
}

// Button click effects
function setupButtonClickEffects() {
    const buttons = document.querySelectorAll('.btn, button');
    console.log(`Setting up click effects for ${buttons.length} buttons`);
    
    buttons.forEach((button, index) => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
        
        button.addEventListener('click', function() {
            console.log(`Button ${index + 1} clicked`);
            this.style.transform = 'translateY(-2px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1)';
            }, 150);
        });
    });
}

// Simple step animations
function setupSimpleStepAnimations() {
    const steps = document.querySelectorAll('.step');
    console.log(`Setting up step animations for ${steps.length} steps`);
    
    steps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            const stepNumber = this.querySelector('.step-number');
            const stepIcon = this.querySelector('.step-icon i');
            
            if (stepNumber) {
                stepNumber.style.transform = 'scale(1.1) rotate(5deg)';
                stepNumber.style.transition = 'all 0.3s ease';
            }
            
            if (stepIcon) {
                stepIcon.style.transform = 'scale(1.2) translateY(-3px)';
                stepIcon.style.transition = 'all 0.3s ease';
            }
            
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        step.addEventListener('mouseleave', function() {
            const stepNumber = this.querySelector('.step-number');
            const stepIcon = this.querySelector('.step-icon i');
            
            if (stepNumber) {
                stepNumber.style.transform = 'scale(1) rotate(0deg)';
            }
            
            if (stepIcon) {
                stepIcon.style.transform = 'scale(1) translateY(0)';
            }
            
            this.style.transform = 'translateX(0)';
        });
    });
}

// Shield animation
function setupShieldAnimation() {
    const securityAnimation = document.querySelector('.security-animation');
    const shieldIcon = document.querySelector('.shield-icon');
    const rings = document.querySelectorAll('.ring');
    const shield = document.querySelector('.shield-icon i');
    
    console.log('Setting up shield animation...');
    
    if (securityAnimation) {
        // Hover effect
        securityAnimation.addEventListener('mouseenter', function() {
            if (shield) {
                shield.style.transform = 'scale(1.2) rotate(15deg)';
                shield.style.transition = 'all 0.4s ease';
                shield.style.color = '#4f46e5';
            }
            
            rings.forEach((ring, index) => {
                ring.style.animationDuration = '1s';
                ring.style.animationIterationCount = '3';
            });
        });
        
        securityAnimation.addEventListener('mouseleave', function() {
            if (shield) {
                shield.style.transform = 'scale(1) rotate(0deg)';
                shield.style.color = '';
            }
            
            rings.forEach(ring => {
                ring.style.animationDuration = '';
                ring.style.animationIterationCount = '';
            });
        });
        
        // Click effect
        securityAnimation.addEventListener('click', function() {
            console.log('Shield clicked!');
            
            // Pulse the shield
            if (shield) {
                shield.style.animation = 'pulse 0.8s ease-out';
                setTimeout(() => {
                    shield.style.animation = '';
                }, 800);
            }
            
            // Animate rings in sequence
            rings.forEach((ring, index) => {
                setTimeout(() => {
                    ring.style.animation = 'securityPulse 1.2s ease-out';
                    setTimeout(() => {
                        ring.style.animation = '';
                    }, 1200);
                }, index * 150);
            });
        });
    }
    
    // Make it focusable for keyboard users
    if (securityAnimation) {
        securityAnimation.setAttribute('tabindex', '0');
        securityAnimation.style.cursor = 'pointer';
        
        securityAnimation.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = {
        setupNavigationEventListeners,
        setupFeatureCardHoverEffects,
        setupButtonClickEffects,
        setupSimpleStepAnimations,
        setupShieldAnimation
    };
} else {
    // Browser environment - attach to window object
    window.EventListeners = {
        setupNavigationEventListeners,
        setupFeatureCardHoverEffects,
        setupButtonClickEffects,
        setupSimpleStepAnimations,
        setupShieldAnimation
    };
}