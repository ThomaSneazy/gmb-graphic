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
  // Nettoyer d'abord les clones existants
  const clones = document.querySelectorAll('.page-wrapper:nth-child(n+2)');
  clones.forEach(clone => clone.remove());

  // Si on est en mobile, on s'arrête ici
  if (window.innerWidth <= 991) return;

  const pageWrapper = document.querySelector('.infinite-wrapper');
  const content = document.querySelector('.page-wrapper');
  
  // Créer trois clones pour une transition plus fluide
  for (let i = 0; i < 3; i++) {
    const contentClone = content.cloneNode(true);
    addTooltipListeners(contentClone);
    addNavigationListeners(contentClone);
    pageWrapper.appendChild(contentClone);
  }

  // Calculer la hauteur d'une section
  const sectionHeight = content.offsetHeight;
  let isScrolling = false;

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        const maxScroll = sectionHeight * 2;

        if (currentScroll >= maxScroll) {
          // Revenir au premier tiers
          window.scrollTo(0, currentScroll - sectionHeight);
        } else if (currentScroll <= 0) {
          // Aller au deuxième tiers
          window.scrollTo(0, currentScroll + sectionHeight);
        }

        isScrolling = false;
      });
    }
    isScrolling = true;
  });

  // Position initiale au milieu
  window.scrollTo(0, sectionHeight);
}

// Initialisation
window.addEventListener('load', () => {
  addTooltipListeners(document);
  addNavigationListeners(document);  // Ajout des listeners de navigation initiaux
  playPageAnimation();
  setupInfiniteScroll();

  // Ajouter l'écouteur de redimensionnement
  window.addEventListener('resize', setupInfiniteScroll);
})

