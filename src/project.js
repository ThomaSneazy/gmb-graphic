import './styles/style.css'
import gsap from 'gsap'

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
  const hoverables = element.querySelectorAll('.hoverable, .tooltip, .esc, .back, .follow, .watch, .next');
  
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

// Mise à jour de setupInfiniteScroll
const setupInfiniteScroll = () => {
  if (window.innerWidth <= 991) return;

  const pageWrapper = document.querySelector('.infinite-wrapper');
  const section = document.querySelector('.section');
  const nameWrapper = document.querySelector('.name-prenom__wrapper');

  const sectionClone = section.cloneNode(true);
  const nameWrapperClone = nameWrapper.cloneNode(true);
  
  // Ajouter les event listeners aux éléments clonés
  addTooltipListeners(sectionClone);
  addTooltipListeners(nameWrapperClone);
  addNavigationListeners(sectionClone);
  addNavigationListeners(nameWrapperClone);
  
  pageWrapper.appendChild(nameWrapperClone);
  pageWrapper.appendChild(sectionClone);

  const totalHeight = pageWrapper.scrollHeight / 2;
  let isScrolling = false;

  window.addEventListener('scroll', () => {
    if (isScrolling) return;
    
    const currentScroll = window.scrollY;
    
    if (currentScroll >= totalHeight) {
      isScrolling = true;
      window.scrollTo({
        top: 1,
        behavior: 'instant' // Utilisation de 'instant' au lieu de 'auto' pour éviter les saccades
      });
      isScrolling = false;
    } else if (currentScroll <= 0) {
      isScrolling = true;
      window.scrollTo({
        top: totalHeight - 1,
        behavior: 'instant'
      });
      isScrolling = false;
    }
  });
}

// Mise à jour de l'initialisation pour gérer le redimensionnement
window.addEventListener('load', () => {
  addTooltipListeners(document);
  addNavigationListeners(document);
  playPageAnimation();
  
  // Configuration initiale du scroll infini
  setupInfiniteScroll();
  
  // Réinitialiser lors du redimensionnement
  window.addEventListener('resize', () => {
    // Supprimer les clones si la largeur est <= 991px
    if (window.innerWidth <= 991) {
      const clones = document.querySelectorAll('.section:not(:first-child), .name-prenom__wrapper:not(:first-child)');
      clones.forEach(clone => clone.remove());
    } else {
      setupInfiniteScroll();
    }
  });
});

