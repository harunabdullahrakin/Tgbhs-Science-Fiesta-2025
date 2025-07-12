// Animation and interactive elements for TGBHS Science Fiesta website

document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');

    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPos = window.scrollY;
            hero.style.backgroundPosition = `center ${scrollPos * 0.5}px`;
        });
    }

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.event-card, .wiki-card, .section-title, .section-subtitle');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // If element is in viewport
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    };

    // Add animation class to CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .event-card, .wiki-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animated {
            opacity: 1;
            transform: translateY(0);
        }

        .section-title.animated, .section-subtitle.animated {
            transform: scale(1);
        }

        @keyframes float-element {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);

    // Initial check for elements in view
    animateOnScroll();

    // Check for elements on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Create pulsing effect for CTA buttons
    const ctaButtons = document.querySelectorAll('.primary-btn');

    ctaButtons.forEach(button => {
        setInterval(() => {
            button.classList.add('pulse');
            setTimeout(() => {
                button.classList.remove('pulse');
            }, 1000);
        }, 3000);
    });

    // Add pulse animation
    const pulseStyle = document.createElement('style');
    pulseStyle.innerHTML = `
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(52, 152, 219, 0); }
            100% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0); }
        }

        .pulse {
            animation: pulse 1s;
        }
    `;
    document.head.appendChild(pulseStyle);

    // Particle effect for the background (simple version)
    const createParticleEffect = function() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        document.body.appendChild(particleContainer);

        // Add styles for particles
        const particleStyle = document.createElement('style');
        particleStyle.innerHTML = `
            .particle-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
            }

            .particle {
                position: absolute;
                background-color: rgba(52, 152, 219, 0.7);
                border-radius: 50%;
                animation: float-random linear infinite;
            }

            @keyframes float-random {
                0% { transform: translate(0, 0); opacity: 0; }
                50% { opacity: 0.5; }
                100% { transform: translate(var(--end-x), var(--end-y)); opacity: 0; }
            }
        `;
        document.head.appendChild(particleStyle);

        // Create particles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createParticle(particleContainer);
            }, i * 1000);
        }

        setInterval(() => {
            createParticle(particleContainer);
        }, 1000);
    };

    const createParticle = function(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        // Random size
        const size = Math.random() * 5 + 2;

        // Random end position
        const endX = (Math.random() - 0.5) * 200;
        const endY = (Math.random() - 0.5) * 200;

        // Random duration
        const duration = Math.random() * 10 + 10;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.setProperty('--end-x', `${endX}px`);
        particle.style.setProperty('--end-y', `${endY}px`);

        container.appendChild(particle);

        // Remove particle after animation completes
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    };

    createParticleEffect();
});
