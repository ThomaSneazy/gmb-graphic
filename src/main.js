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

  // Modification pour cibler les images à l'intérieur des .img-item avec smooth et delay
  const imgItems = document.querySelectorAll('.img-item img');
  imgItems.forEach((img, index) => {
    const moveX = (0.5 - mousePercentX) * 20;
    const moveY = (0.5 - mousePercentY) * 20;
    gsap.to(img, {
      x: moveX,
      y: moveY,
      duration: 0.3, // Durée de l'animation pour un effet smooth
      // ease: "power2.out", // Easing function pour un mouvement fluide
    });
  });
});

function animate() {
  if (isAnimationEnabled) {
    currentX += (targetX - currentX) * 0.09;
    currentY += (targetY - currentY) * 0.09;
    
    gsap.to(grid, {
      x: -currentX,
      y: -currentY,
      duration: 0.6,
      ease: "power2.out" 
    });
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
  const projectDescWrappers = document.querySelectorAll('.project__desc__wrapper');

  gsap.set(gridItems, { 
    xPercent: -50,
    yPercent: -50,
    left: '50%',
    top: '50%',
    position: 'absolute'
  });

  gsap.set('.grid__item:not(:nth-child(1))', {
    height: 0
  });

  gsap.set('.grid__item:nth-child(1)', {
    opacity: 1
  });

  gsap.set(projectDescWrappers, {
    yPercent: -20,
    opacity: 0,
    overflow: 'hidden'
  });

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
      // gsap.to('.link__wrapper', {
      //   display: 'flex',
      //   opacity: 1,
      //   duration: 0.6,
      //   stagger: 0.1
      // });
      const lastAnimation = gsap.to('.grid__item:last-child', {
        width: '100%',
        duration: 1,
        onComplete: () => {
          isAnimationEnabled = true;
          // Afficher toutes les descriptions de projet un peu avant la fin des animations
          gsap.to(projectDescWrappers, {
            yPercent: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      });
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
  }, "<") 
  .to('.grid__item:not(:nth-child(1))', { 
    height: '100%',
    duration: 1,
    stagger: {
      amount: 0.5,
      from: "random"
    },
    ease: "power2.inOut"
  }, "+=0.1") 
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

// document.addEventListener('DOMContentLoaded', () => {
//   const imgItems = document.querySelectorAll('.img-item');
//   const gridItemLoad = document.querySelector('.grid__item__load');

//   imgItems.forEach((item, index) => {
//     if (!item.closest('.grid__project:nth-child(1)')) {
//       item.style.position = 'absolute';
//       gridItemLoad.appendChild(item);
//     }
//   });
// });


// Gestion des clics sur les liens de navigation
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.link__nav');
  const gridProject = document.querySelector('.grid__project');
  const gridItems = document.querySelectorAll('.grid__item');
  const listWrapper = document.querySelector('.list__wrapper');
  const nomWrapper = document.querySelector('.nom__wrapper');
  const prenomWrapper = document.querySelector('.prenom__wrapper');
  const nom = nomWrapper.querySelector('.nom');

  // Cacher la list__wrapper au chargement
  gsap.set(listWrapper, { display: 'none', height: 0 });
  
  // Positionner .nom initialement
  gsap.set(nom, { position: 'absolute', bottom: 0, top: 'auto' });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      if (link.classList.contains('list')) {
        const tl = gsap.timeline({defaults: {ease: "power3.inOut"}});

        tl.to(gridProject, {
          x: 0,
          y: 0,
          duration: 0.6
        })
        .to(gridItems, {
          opacity: 0,
          duration: 0.6,
          stagger: 0.05,
          onComplete: () => gsap.set(gridItems, {display: 'none'})
        }, "<")
        .to(nomWrapper, {
          height: '100vh',
          duration: 0.8
        })
        .to(prenomWrapper, {
          height: '0vh',
          duration: 0.8
        }, "<")
        .to(nom, {
          top: 0,
          bottom: 'auto',
          duration: 0.6
        }, "+=0.2") // Décalage de 0.2s après l'animation précédente
        .set(listWrapper, {display: 'flex'})
        .to(listWrapper, {
          height: '100vh',
          duration: 0.8
        });

        isAnimationEnabled = false;
      } else if (link.classList.contains('grid')) {
        const tl = gsap.timeline({defaults: {ease: "power3.inOut"}});

        tl.to(listWrapper, {
          height: 0,
          duration: 0.6,
          onComplete: () => gsap.set(listWrapper, {display: 'none'})
        })
        .to(nomWrapper, {
          height: '50vh',
          duration: 0.8
        })
        .to(prenomWrapper, {
          height: '50vh',
          duration: 0.8
        }, "<")
        .to(nom, {
          top: 'auto',
          bottom: 0,
          duration: 0.6
        }, "+=0.2") // Décalage de 0.2s après l'animation précédente
        .set(gridItems, {display: 'flex'})
        .to(gridItems, {
          opacity: 1,
          duration: 0.6,
          stagger: 0.05
        });

        isAnimationEnabled = true;
      } else if (link.classList.contains('info')) {
        // Code existant pour 'info'
        // ...
      }
    });
  });
});



