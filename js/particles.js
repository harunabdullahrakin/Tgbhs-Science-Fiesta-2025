document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'starry-background';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    const numberOfParticles = 40;

    let resizeTimeout;
    window.addEventListener('resize', function() {
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                init(); 

            }, 250);
        }
    });

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

            return 'rgba(135, 206, 235, ' + (Math.random() * 0.5 + 0.2) + ')';
        }

        update() {

            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;

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

    function init() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function connectParticles() {
        const connectDistance = 80; 

        ctx.strokeStyle = 'rgba(100, 149, 237, 0.1)';
        ctx.lineWidth = 0.3;

        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;

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

    let animationId;
    function animate() {

        ctx.fillStyle = 'rgba(10, 22, 40, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }

        if (mouse.x) {
            connectParticles();
        }

        animationId = requestAnimationFrame(animate);
    }

    init();
    animate();

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
});
