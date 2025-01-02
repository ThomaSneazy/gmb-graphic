import './styles/style.css'
import gsap from 'gsap'
import Lenis from '@studio-freight/lenis'

// Fonction pour l'animation
const playPageAnimation = () => {
  gsap.set('.page-wrapper', {
    opacity: 0,
    scale: 0.8
  })
  // Commenté : animation du nom et prénom
  /*gsap.set(['.name-prenom__wrapper', '.info__text__wrapper'], {
    opacity: 0,
  })*/

  gsap.timeline()
    .to('.page-wrapper', {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out'
    })
    /* Commenté : animation du nom et prénom
    .to(['.name-prenom__wrapper', '.info__text__wrapper'], {
      opacity: 1,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power2.out'
    }, '-=0.4')
    */
}

// Animation de sortie
const playExitAnimation = () => {
  return gsap.timeline()
    .to('.infinite-wrapper', {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "power3.inOut"
    })
}

// Gestion du bouton retour
window.addEventListener('popstate', async (e) => {
  e.preventDefault()
  await playExitAnimation()
  history.go(-1)
})

// Animation au chargement initial
window.addEventListener('load', playPageAnimation)

// Animation lors du retour sur la page
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    playPageAnimation()
  }
})

// Fonction pour ajouter les event listeners de navigation
const addNavigationListeners = (element) => {
  element.querySelectorAll('.link__nav.grid').forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault()
      const href = e.currentTarget.href
      await playExitAnimation()
      window.location.href = href
    })
  })
}

// Ajout du code pour le tooltip
const tooltip = document.getElementById('tooltip');

// Variable pour suivre l'état de l'animation
let tooltipAnimation;

// Fonction pour ajouter les event listeners des tooltips
const addTooltipListeners = (element) => {
  const hoverables = element.querySelectorAll('.hoverable, .tooltip, .esc, .back, .follow, .watch, .next, .last, .switch');
  
  hoverables.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      if (tooltipAnimation) tooltipAnimation.kill();

      let tooltipText;
      if (el.classList.contains('tooltip')) {
        tooltipText = 'click';
      } else if (el.classList.contains('esc')) {
        tooltipText = 'PRESS OR CLICK';
      } else if (el.classList.contains('back')) {
        tooltipText = 'BACK TO HOME';
      } else if (el.classList.contains('follow')) {
        tooltipText = 'let\'s FOLLOW';
      } else if (el.classList.contains('watch')) {
        tooltipText = 'ENJOY ☻';
      } else if (el.classList.contains('next')) {
        tooltipText = 'Next Work';
      } else if (el.classList.contains('next')) {
        tooltipText = 'Spam';
      } else if (el.classList.contains('last')) {
        tooltipText = 'Next Work';
      } else {
        tooltipText = el.dataset.tooltip;
      }

      tooltip.textContent = tooltipText;
      tooltip.style.display = 'block';

      // Calcul de la position relative à la vue
      const rect = el.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      gsap.set(tooltip, {
        x: e.clientX + 10,
        y: e.clientY + 10,
        position: 'fixed' // Ajout de position fixed
      });

      tooltipAnimation = gsap.to(tooltip, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true
      });
    });

    el.addEventListener('mouseleave', () => {
      if (tooltipAnimation) tooltipAnimation.kill();

      tooltipAnimation = gsap.to(tooltip, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (tooltip.style.opacity === '0') {
            tooltip.style.display = 'none';
          }
        }
      });
    });
  });
};

// Configuration simple de Lenis pour le smooth scroll
// const setupSmoothScroll = () => {
//   const lenis = new Lenis({
//     duration: 1.2,
//     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//     direction: 'vertical',
//     gestureDirection: 'vertical',
//     smooth: true,
//     smoothTouch: false,
//     touchMultiplier: 2
//   })

//   function raf(time) {
//     lenis.raf(time)
//     requestAnimationFrame(raf)
//   }

//   requestAnimationFrame(raf)
// }

// // Fonction pour gérer les hovers des projets
// const setupProjectHover = () => {
//   const btnItems = document.querySelectorAll('.list-project__btn.last .list-project__btn-item')
//   const imgItems = document.querySelectorAll('.list-project__img .list-project__img-item')
  
//   // Mettre toutes les images en opacity 0 par défaut
//   imgItems.forEach(img => {
//     gsap.set(img, { opacity: 0 })
//   })

//   btnItems.forEach(btn => {
//     btn.addEventListener('mouseenter', () => {
//       const projectName = btn.getAttribute('data-name-project')
      
//       // Trouver l'image correspondante
//       const matchingImg = document.querySelector(`.list-project__img-item[data-name-project="${projectName}"]`)
//       if (matchingImg) {
//         gsap.set(matchingImg, { opacity: 1 })
//       }
//     })

//     btn.addEventListener('mouseleave', () => {
//       const projectName = btn.getAttribute('data-name-project')
      
//       // Trouver l'image correspondante
//       const matchingImg = document.querySelector(`.list-project__img-item[data-name-project="${projectName}"]`)
//       if (matchingImg) {
//         gsap.set(matchingImg, { opacity: 0 })
//       }
//     })
//   })
// }

// Initialisation
window.addEventListener('load', () => {
  addTooltipListeners(document)
  addNavigationListeners(document)
  playPageAnimation()
  setupSmoothScroll()
//   setupProjectHover()
})

