// Lightweight starry background
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'starry-background';
    document.body.insertBefore(canvas, document.body.firstChild);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particlesArray = [];
    // Reduce number of particles for better performance
    const numberOfParticles = 40;
    
    // Resize event with throttling
    let resizeTimeout;
    window.addEventListener('resize', function() {
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                init(); // Reinitialize particles on resize
            }, 250);
        }
    });
    
    // Mouse position with throttling
    const mouse = {
        x: null,
        y: null,
        radius: 100
    };
    
    let mouseTimeout;
    window.addEventListener('mousemove', function(event) {
        if (!mouseTimeout) {
            mouseTimeout = setTimeout(function() {
                mouseTimeout = null;
                mouse.x = event.x;
                mouse.y = event.y;
            }, 10);
        }
    });
    
    // Simple Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = this.getColor();
        }
        
        getColor() {
            // Simplified to one color with opacity variation for better performance
            return 'rgba(135, 206, 235, ' + (Math.random() * 0.5 + 0.2) + ')';
        }
        
        update() {
            // Move particles
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap particles around screen
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
            
            // Simplified mouse interaction
            if (mouse.x) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    this.speedX -= Math.cos(angle) * 0.02;
                    this.speedY -= Math.sin(angle) * 0.02;
                }
            }
            
            // Minimal slowdown
            this.speedX *= 0.99;
            this.speedY *= 0.99;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    function init() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    // Connect nearby particles with lines - optimized
    function connectParticles() {
        const connectDistance = 80; // Reduced connection distance
        ctx.strokeStyle = 'rgba(100, 149, 237, 0.1)';
        ctx.lineWidth = 0.3;
        
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                // Use square distance for better performance (avoid square root)
                const squareDistance = dx * dx + dy * dy;
                
                if (squareDistance < connectDistance * connectDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop with performance optimization
    let animationId;
    function animate() {
        // Clear only what's needed
        ctx.fillStyle = 'rgba(10, 22, 40, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        // Only connect if we have mouse interaction
        if (mouse.x) {
            connectParticles();
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Initialize
    init();
    animate();
    
    // Add a visibility check to save resources when tab is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
});