// Main JavaScript for TGBHS Science Fiesta website

document.addEventListener('DOMContentLoaded', function() {
    // Add sequential animation indices to nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.style.setProperty('--i', index + 1);
    });

    // Mobile menu toggle with consistent behavior across pages
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && e.target !== mobileMenu && !mobileMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        }
    });
    
    // Add scientific particle effect to the navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Create a container for particles to prevent layout shifts
        const particleContainer = document.createElement('div');
        particleContainer.classList.add('nav-particle-container');
        particleContainer.style.position = 'absolute';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.overflow = 'hidden';
        particleContainer.style.zIndex = '1';
        
        const particleCount = 5;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('nav-particle');
            
            // Random position and size
            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation duration and delay
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            particle.style.animation = `floatParticle ${duration}s ${delay}s infinite alternate`;
            
            particleContainer.appendChild(particle);
        }
        
        navbar.insertBefore(particleContainer, navbar.firstChild);
    }
    
    // Close mobile menu when a nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Add hover effect animation
        link.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        link.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
    });
    
    // Add active class to current nav link
    const currentLocation = window.location.pathname;
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        if (linkPath === currentLocation || 
            (linkPath !== '/' && currentLocation.startsWith(linkPath))) {
            link.classList.add('active');
        } else if (currentLocation === '/' && linkPath === '/') {
            link.classList.add('active');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Simple countdown timer for upcoming event (if needed)
    const setupCountdown = function() {
        const countdownElement = document.querySelector('.countdown');
        
        if (countdownElement) {
            // Set event date (December 15, 2025 - same as in registration page)
            const eventDate = new Date('2025-08-15T09:00:00').getTime();
            
            const updateCountdown = function() {
                const now = new Date().getTime();
                const distance = eventDate - now;
                
                if (distance < 0) {
                    countdownElement.innerHTML = "Event has started!";
                    return;
                }
                
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                countdownElement.innerHTML = `
                    <div class="countdown-item">
                        <span class="countdown-number">${days}</span>
                        <span class="countdown-label">Days</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${hours}</span>
                        <span class="countdown-label">Hours</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${minutes}</span>
                        <span class="countdown-label">Minutes</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${seconds}</span>
                        <span class="countdown-label">Seconds</span>
                    </div>
                `;
            };
            
            // Update countdown every second
            updateCountdown();
            setInterval(updateCountdown, 1000);
        }
    };
    
    setupCountdown();
});
