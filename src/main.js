import './styles/style.css'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip';

// Enregistrez le plugin Flip avec GSAP
gsap.registerPlugin(Flip);

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
  const projectDesc = item.querySelector('.project__desc');

  if (projectDesc) {
    const projectName = item.getAttribute('data-project-name') || projectDesc.textContent;
    projectDesc.setAttribute('data-project-name', projectName);
    projectDesc.textContent = projectName; 
  }

  item.addEventListener('mouseenter', () => {
    document.querySelectorAll('.grid__item').forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.style.opacity = '0.1';
      }
    });
    if (projectDesc) {
      animateText(projectDesc);
    }
  });

  item.addEventListener('mouseleave', () => {
    document.querySelectorAll('.grid__item').forEach(otherItem => {
      otherItem.style.opacity = '1';
    });
    if (projectDesc) {
      cancelAnimationFrame(projectDesc.animationFrame);
      projectDesc.textContent = projectDesc.getAttribute('data-project-name');
    }
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

  gsap.set(gridItems, { 
    // opacity: 0,
    // scale: 0.5,
    xPercent: -50,
    yPercent: -50,
    left: '50%',
    top: '50%',
    position: 'absolute'
  });

  gsap.set('.grid__item:nth-child(1)', {
    opacity: 1
  });


  // Assurez-vous que les .link__nav sont en display: none au départ
  gsap.set('.link__nav', { display: 'none', opacity: 0 });

  gsap.timeline({
    defaults: { duration: 1.2, ease: "power3.inOut" },
    onComplete: () => {
      gridItems.forEach((item, index) => {
        if (index !== 0) { // Exclure le premier élément
          gsap.to(item, {
            opacity: 1,
            duration: 1.5,
            ease: "power3.out"
          });
        }
      });

      // Animation d'apparition des .link__nav
      gsap.to('.link__nav', {
        display: 'flex',
        opacity: 1,
        duration: 0.6,
        stagger: 0.1
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
    duration: 1
  })
  .to(nom, {
    right: '0%',
    top: '0%',
    duration: 1
  }, "<")
  .to(prenom, { 
    top: '0%',
    transform: 'translateY(0)',
    duration: 1
  }, "+=0.5")
  .to(nom, {
    top: 'auto',
    bottom: '0%',
    duration: 1
  }, "<")
  .to('.grid__item:nth-child(1)', {
    height: '100%',
    duration: 1
  }, "<") // Synchroniser avec le mouvement du prénom et du nom
}

  // Appeler la fonction d'animation du prénom et du nom
  animatePrenomNomWrapper();


// Ajoutez cette fonction pour générer des caractères aléatoires
function getRandomChar() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!';
  return chars[Math.floor(Math.random() * chars.length)];
}

// Ajoutez cette fonction pour animer le texte
function animateText(element) {
  const originalText = element.getAttribute('data-project-name');
  const textLength = originalText.length;
  let animationFrame;
  let startTime;
  let lastUpdateTime = 0;

  function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / 1000, 1); // Animation sur 3 secondes

    // Mettre à jour les caractères seulement toutes les 100ms
    if (currentTime - lastUpdateTime > 100) {
      const animatedText = originalText.split('').map((letter, index) => {
        return Math.random() > progress ? getRandomChar() : originalText[index];
      }).join('');

      element.textContent = animatedText;
      lastUpdateTime = currentTime;
    }

    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      element.textContent = originalText; // Assurez-vous que le texte final est correct
    }
  }

  cancelAnimationFrame(element.animationFrame);
  element.animationFrame = requestAnimationFrame(animate);
}

document.addEventListener('DOMContentLoaded', () => {
  const gridItems = document.querySelectorAll('.img-item');
  const gridItemLoad = document.querySelector('.grid__item__load');

  gridItems.forEach((item, index) => {
    if (!item.closest('.grid__item:nth-child(1)')) {
      item.style.position = 'absolute';
      gridItemLoad.appendChild(item);
    }
  });
});
