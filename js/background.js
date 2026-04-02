document.addEventListener('DOMContentLoaded', function() {

    const isDesktop = window.innerWidth >= 769;

    if (document.querySelector('.space-background')) return;

    const spaceBackground = document.createElement('div');
    spaceBackground.className = 'space-background';
    document.body.insertBefore(spaceBackground, document.body.firstChild);

    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    spaceBackground.appendChild(starsContainer);

    const starCount = isDesktop ? 80 : 100;
    createStars(starsContainer, starCount);

    if (isDesktop) {

        createShootingStar(spaceBackground);

        createPlanet(spaceBackground, 60, 'right', 'bottom');
    } else {

        for (let i = 0; i < 2; i++) {
            createShootingStar(spaceBackground);
        }
        createPlanet(spaceBackground, 100, 'right', 'bottom');
        createPlanet(spaceBackground, 60, 'left', 'top');
        createNebula(spaceBackground, 'left');
    }

    function createStars(container, count) {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            const size = Math.random() * 1.5 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;

            star.style.animationDelay = `${Math.floor(Math.random() * 3)}s`;

            fragment.appendChild(star);
        }

        container.appendChild(fragment);
    }

    function createShootingStar(container) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';

        shootingStar.style.left = `${Math.random() * 50 + 25}%`;
        shootingStar.style.top = `${Math.random() * 30}%`;

        shootingStar.style.animationDelay = `${Math.floor(Math.random() * 10 + 5)}s`;
        shootingStar.style.animationDuration = '5s';

        container.appendChild(shootingStar);
    }

    function createPlanet(container, size, xPos, yPos) {
        const planet = document.createElement('div');
        planet.className = 'planet';

        planet.style.width = `${size}px`;
        planet.style.height = `${size}px`;

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

        nebula.style.width = '150px';
        nebula.style.height = '150px';

        nebula.style.background = 'rgba(52, 152, 219, 0.3)';

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
