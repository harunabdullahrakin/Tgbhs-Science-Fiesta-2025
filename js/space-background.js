// Space Background Animation
document.addEventListener('DOMContentLoaded', function() {
    // Create stars for the star field
    const starField = document.getElementById('starField');
    if (!starField) return;
    
    // Create stars with different sizes
    generateStars(starField, 100, 'small-stars');
    generateStars(starField, 70, 'medium-stars');
    generateStars(starField, 30, 'large-stars');
    
    function generateStars(container, count, className) {
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = className;
            
            // Random position across 200% width to account for animation movement
            const xPos = Math.random() * 200;
            const yPos = Math.random() * 100;
            
            star.style.left = `${xPos}%`;
            star.style.top = `${yPos}%`;
            
            // Add random animation delay for twinkling effect
            if (className === 'large-stars') {
                star.style.animation = `starTwinkle ${Math.random() * 3 + 2}s infinite alternate`;
                star.style.animationDelay = `${Math.random() * 5}s`;
            }
            
            fragment.appendChild(star);
        }
        
        container.appendChild(fragment);
    }
});

// Add CSS rule for twinkling animation if not already in the CSS
if (!document.getElementById('star-twinkle-animation')) {
    const style = document.createElement('style');
    style.id = 'star-twinkle-animation';
    style.textContent = `
        @keyframes starTwinkle {
            0%, 100% { opacity: 0.4; box-shadow: 0 0 3px 1px rgba(255, 255, 255, 0.2); }
            50% { opacity: 1; box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.7); }
        }
    `;
    document.head.appendChild(style);
}