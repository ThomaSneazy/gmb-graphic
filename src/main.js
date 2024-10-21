import './styles/style.css'
import gsap from 'gsap'

console.log('Hello KEZ')


const tooltip = document.getElementById('tooltip');
const hoverables = document.querySelectorAll('.hoverable');

hoverables.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        tooltip.style.display = 'block';
        tooltip.textContent = el.dataset.tooltip;
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY + 10 + 'px';
    });

    el.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
});


document.querySelectorAll('.grid__item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    document.querySelectorAll('.grid__item').forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.style.opacity = '0.1';
      }
    });
  });

  item.addEventListener('mouseleave', () => {
    document.querySelectorAll('.grid__item').forEach(otherItem => {
      otherItem.style.opacity = '1';
    });
  });
});

///////////GMB GRAPHIC GRID////////////////
const grid = document.querySelector('.grid__project');
const wrapper = document.querySelector('.page-wrapper');

let maxMoveX = (grid.offsetWidth - wrapper.offsetWidth) / 2;
let maxMoveY = (grid.offsetHeight - wrapper.offsetHeight) / 2;

let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;

let isAnimationEnabled = false;

wrapper.addEventListener('mousemove', (e) => {
  if (!isAnimationEnabled) return;

  let mousePercentX = e.clientX / wrapper.offsetWidth;
  let mousePercentY = e.clientY / wrapper.offsetHeight;
  
  targetX = (mousePercentX - 0.5) * maxMoveX * 2.2;
  targetY = (mousePercentY - 0.5) * maxMoveY * 2.2;
});

function animate() {
  if (isAnimationEnabled) {
    currentX += (targetX - currentX) * 0.09;
    currentY += (targetY - currentY) * 0.09;
    
    grid.style.transform = `translate(-50%, -50%) translate(${-currentX}px, ${-currentY}px)`;
  }
  
  requestAnimationFrame(animate);
}

animate();

// function adjustGridItemSizes() {
//   const gridItems = document.querySelectorAll('.grid__item');
  
//   gridItems.forEach((item, index) => {
//     const aspect = item.getAttribute('data-aspect');
//     let gridArea = item.style.gridArea.split(' / ');
    
//     if (aspect === 'portrait') {
//       gridArea[2] = 'span 5';
//       gridArea[3] = 'span 3';
//     } else if (aspect === 'landscape') {
//       gridArea[2] = 'span 4';
//       gridArea[3] = 'span 5';
//     }
    
//     item.style.gridArea = gridArea.join(' / ');
//   });
// }

// Ajoutez cette nouvelle fonction pour l'animation du prénom et du nom
function animatePrenomNomWrapper() {
  const prenomWrapper = document.querySelector('.prenom__wrapper');
  const prenom = prenomWrapper.querySelector('.prenom');
  const nomWrapper = document.querySelector('.nom__wrapper');
  const nom = nomWrapper.querySelector('.nom');
  const gridItems = document.querySelectorAll('.grid__item');
  const grid = document.querySelector('.grid__project');

  // Centrer tous les éléments de la grille
  gsap.set(gridItems, { 
    opacity: 0,
    scale: 0.5,
    xPercent: -50,
    yPercent: -50,
    left: '50%',
    top: '50%',
    position: 'absolute'
  });

  gsap.timeline({
    defaults: { duration: 1.2, ease: "power3.inOut" },
    onComplete: () => {
      // Créer l'effet de flip pour chaque élément de la grille
      gridItems.forEach((item) => {
        const bounds = item.getBoundingClientRect();
        const flipFrom = {
          x: window.innerWidth / 2 - bounds.left - bounds.width / 2,
          y: window.innerHeight / 2 - bounds.top - bounds.height / 2,
          opacity: 0,
          scale: 0.5
        };
        
        gsap.fromTo(item, flipFrom, {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          clearProps: "all"
        });
      });

      // Activer l'animation de la grille une fois tout en place
      setTimeout(() => {
        isAnimationEnabled = true;
      }, 1500);
    }
  })
  .set(prenomWrapper, { 
    position: 'relative',
    overflow: 'hidden'
  })
  .set(prenom, { 
    position: 'absolute',
    left: 'auto',
    right: 'auto',
    top: 'auto',
    bottom: '0%',
    transform: 'translateY(-0%)'
  })
  .set(nomWrapper, {
    position: 'relative',
    overflow: 'hidden'
  })
  .set(nom, {
    position: 'absolute',
    top: '0%',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
  })
  .to(prenom, { 
    left: '0%',
    right: 'auto',
    bottom: '0%',
    duration: 1.5
  })
  .to(nom, {
    right: '0%',
    top: '0%',
    duration: 1.5
  }, "<")
  .to(prenom, { 
    top: '0%',
    transform: 'translateY(0)',
    duration: 1.5
  }, "+=0.5")
  .to(nom, {
    top: 'auto',
    bottom: '0%',
    duration: 1.5
  }, "<")
}

// Modifiez l'événement DOMContentLoaded pour utiliser la nouvelle fonction
document.addEventListener('DOMContentLoaded', () => {
  // adjustGridItemSizes();
  animatePrenomNomWrapper();
});
