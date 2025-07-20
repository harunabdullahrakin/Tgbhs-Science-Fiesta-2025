// Custom animated space background with performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on desktop to apply lighter effects
    const isDesktop = window.innerWidth >= 769;
    
    // Only create the space background once
    if (document.querySelector('.space-background')) return;
    
    // Create container elements
    const spaceBackground = document.createElement('div');
    spaceBackground.className = 'space-background';
    document.body.insertBefore(spaceBackground, document.body.firstChild);
    
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    spaceBackground.appendChild(starsContainer);
    
    // Reduce number of stars on desktop to decrease lag
    const starCount = isDesktop ? 80 : 100;
    createStars(starsContainer, starCount);
    
    // Add fewer decorative elements on desktop
    if (isDesktop) {
        // Just one shooting star
        createShootingStar(spaceBackground);
        
        // Just one planet
        createPlanet(spaceBackground, 60, 'right', 'bottom');
    } else {
        // Mobile can have more elements since we're optimizing for desktop
        for (let i = 0; i < 2; i++) {
            createShootingStar(spaceBackground);
        }
        createPlanet(spaceBackground, 100, 'right', 'bottom');
        createPlanet(spaceBackground, 60, 'left', 'top');
        createNebula(spaceBackground, 'left');
    }
    
    // Create stars in batch with document fragment for better performance
    function createStars(container, count) {
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random size (smaller range for better performance)
            const size = Math.random() * 1.5 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // Random position
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            // Fewer animation variations
            star.style.animationDelay = `${Math.floor(Math.random() * 3)}s`;
            
            fragment.appendChild(star);
        }
        
        container.appendChild(fragment);
    }
    
    function createShootingStar(container) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        // Position
        shootingStar.style.left = `${Math.random() * 50 + 25}%`;
        shootingStar.style.top = `${Math.random() * 30}%`;
        
        // Simplified animation timing
        shootingStar.style.animationDelay = `${Math.floor(Math.random() * 10 + 5)}s`;
        shootingStar.style.animationDuration = '5s';
        
        container.appendChild(shootingStar);
    }
    
    function createPlanet(container, size, xPos, yPos) {
        const planet = document.createElement('div');
        planet.className = 'planet';
        
        planet.style.width = `${size}px`;
        planet.style.height = `${size}px`;
        
        // Simplified positioning
        if (xPos === 'left') {
            planet.style.left = '10%';
        } else {
            planet.style.right = '10%';
        }
        
        if (yPos === 'top') {
            planet.style.top = '15%';
        } else {
            planet.style.bottom = '15%';
        }
        
        container.appendChild(planet);
    }
    
    function createNebula(container, position) {
        const nebula = document.createElement('div');
        nebula.className = 'nebula';
        
        // Fixed size for better performance
        nebula.style.width = '150px';
        nebula.style.height = '150px';
        
        // Use a single color instead of random
        nebula.style.background = 'rgba(52, 152, 219, 0.3)';
        
        // Simplified positioning
        if (position === 'left') {
            nebula.style.left = '5%';
            nebula.style.top = '25%';
        } else {
            nebula.style.right = '5%';
            nebula.style.bottom = '25%';
        }
        
        container.appendChild(nebula);
    }
});