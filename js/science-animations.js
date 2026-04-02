document.addEventListener('DOMContentLoaded', function() {

    const isDesktop = window.innerWidth >= 769;

    if (isDesktop) {

        createScienceParticles(5);

        addStaticFormulas();
    } else {

        createScienceParticles(8);
        addScientificFormulas();
    }

    animateElectrons();
});

function createScienceParticles(count) {
    const card = document.querySelector('.card-content');
    if (!card) return;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('science-particle');

        const size = Math.random() * 3 + 2; 

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        const posX = 20 + (i * 60 / count); 

        const posY = Math.random() * 80 + 10;
        particle.style.left = posX + '%';
        particle.style.top = posY + '%';

        particle.style.animationDuration = '20s'; 

        fragment.appendChild(particle);
    }

    card.appendChild(fragment);
}

function addStaticFormulas() {
    const card = document.querySelector('.card-content');
    if (!card) return;

    const formulas = ['PV = nRT', 'E = hf'];
    const fragment = document.createDocumentFragment();

    formulas.forEach((text, i) => {
        const formula = document.createElement('div');
        formula.classList.add('science-formula');
        formula.textContent = text;

        formula.style.left = (30 + i * 40) + '%';
        formula.style.top = (30 + i * 30) + '%';
        formula.style.opacity = '0.15';

        fragment.appendChild(formula);
    });

    card.appendChild(fragment);
}

function addScientificFormulas() {
    const card = document.querySelector('.card-content');
    if (!card) return;

    const formulas = [
        'PV = nRT',
        'F = G(m₁m₂/r²)',
        'E = hf'
    ];

    formulas.forEach((text, i) => {
        const formula = document.createElement('div');
        formula.classList.add('science-formula');
        formula.textContent = text;

        const posX = 20 + (i * 25); 

        const posY = 20 + (i * 20);

        formula.style.left = posX + '%';
        formula.style.top = posY + '%';
        formula.style.opacity = '0';

        card.appendChild(formula);

        setTimeout(() => {
            formula.style.opacity = '0.15';
        }, i * 1000); 

    });
}

function animateElectrons() {
    const electrons = document.querySelectorAll('.electron');
    if (electrons.length === 0) return;

    let pulseIndex = 0;

    const pulseInterval = setInterval(() => {

        if (pulseIndex >= electrons.length) {
            pulseIndex = 0;
        }

        const electron = electrons[pulseIndex];
        electron.classList.add('electron-pulse');

        setTimeout(() => {
            electron.classList.remove('electron-pulse');
        }, 500);

        pulseIndex++;
    }, 3000); 

    window.addEventListener('beforeunload', () => {
        clearInterval(pulseInterval);
    });
}

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
