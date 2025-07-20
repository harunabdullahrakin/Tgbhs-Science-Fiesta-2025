// Science-themed animations with performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on desktop to reduce effects
    const isDesktop = window.innerWidth >= 769;
    
    // Reduce animations on desktop for better performance
    if (isDesktop) {
        // Reduced number of particles
        createScienceParticles(5);
        
        // Static formulas instead of animated ones
        addStaticFormulas();
    } else {
        // Normal animations for mobile
        createScienceParticles(8);
        addScientificFormulas();
    }
    
    // Optimize electron animation (less frequent)
    animateElectrons();
});

// Function to create floating particles that look like molecules
function createScienceParticles(count) {
    const card = document.querySelector('.card-content');
    if (!card) return;
    
    // Use a fragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Create particles in batch
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('science-particle');
        
        // Simplified with fewer variations
        const size = Math.random() * 3 + 2; // Smaller size range
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Spaced out within the card
        const posX = 20 + (i * 60 / count); // More evenly distributed
        const posY = Math.random() * 80 + 10;
        particle.style.left = posX + '%';
        particle.style.top = posY + '%';
        
        // Simpler animation timing
        particle.style.animationDuration = '20s'; // Fixed duration
        
        // Add to fragment
        fragment.appendChild(particle);
    }
    
    // Append once to minimize reflows
    card.appendChild(fragment);
}

// Function to add static formulas instead of animated ones
function addStaticFormulas() {
    const card = document.querySelector('.card-content');
    if (!card) return;
    
    const formulas = ['PV = nRT', 'E = hf'];
    const fragment = document.createDocumentFragment();
    
    // Create all formulas at once
    formulas.forEach((text, i) => {
        const formula = document.createElement('div');
        formula.classList.add('science-formula');
        formula.textContent = text;
        
        // Fixed positions
        formula.style.left = (30 + i * 40) + '%';
        formula.style.top = (30 + i * 30) + '%';
        formula.style.opacity = '0.15';
        
        fragment.appendChild(formula);
    });
    
    card.appendChild(fragment);
}

// Function to add animated formulas (used on mobile only)
function addScientificFormulas() {
    const card = document.querySelector('.card-content');
    if (!card) return;
    
    const formulas = [
        'PV = nRT',
        'F = G(m₁m₂/r²)',
        'E = hf'
    ];
    
    // Add all formulas at once with progressive delays
    formulas.forEach((text, i) => {
        const formula = document.createElement('div');
        formula.classList.add('science-formula');
        formula.textContent = text;
        
        // Randomize positions
        const posX = 20 + (i * 25); // More evenly distributed
        const posY = 20 + (i * 20);
        
        formula.style.left = posX + '%';
        formula.style.top = posY + '%';
        formula.style.opacity = '0';
        
        card.appendChild(formula);
        
        // Staggered fade in
        setTimeout(() => {
            formula.style.opacity = '0.15';
        }, i * 1000); // 1 second delay between each formula
    });
}

// Function to animate electrons more efficiently
function animateElectrons() {
    const electrons = document.querySelectorAll('.electron');
    if (electrons.length === 0) return;
    
    // Instead of individual intervals for each electron,
    // use one animation cycle for all electrons
    let pulseIndex = 0;
    
    // Only animate one electron at a time, cycling through them
    const pulseInterval = setInterval(() => {
        // Reset index if we've gone through all electrons
        if (pulseIndex >= electrons.length) {
            pulseIndex = 0;
        }
        
        // Pulse current electron
        const electron = electrons[pulseIndex];
        electron.classList.add('electron-pulse');
        
        setTimeout(() => {
            electron.classList.remove('electron-pulse');
        }, 500);
        
        pulseIndex++;
    }, 3000); // One pulse every 3 seconds
    
    // Clean up interval if page changes
    window.addEventListener('beforeunload', () => {
        clearInterval(pulseInterval);
    });
}

// Add styles using a style tag only once
if (!document.getElementById('science-animation-styles')) {
    const style = document.createElement('style');
    style.id = 'science-animation-styles';
    style.textContent = `
        .science-particle {
            position: absolute;
            background: var(--secondary-color);
            border-radius: 50%;
            opacity: 0.2;
            z-index: 1;
            pointer-events: none;
            animation: float-particle 20s linear infinite;
            will-change: transform;
        }
        
        @keyframes float-particle {
            0% { transform: translate(0, 0); }
            50% { transform: translate(0, 20px); }
            100% { transform: translate(0, 0); }
        }
        
        .electron-pulse {
            animation: pulse 0.5s ease-in-out;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.5); opacity: 0.8; }
            100% { transform: scale(1); }
        }
        
        .science-formula {
            position: absolute;
            color: var(--secondary-color);
            opacity: 0.15;
            font-size: 0.8rem;
            font-family: var(--title-font);
            pointer-events: none;
            transition: opacity 1s ease-in;
        }
    `;
    document.head.appendChild(style);
}