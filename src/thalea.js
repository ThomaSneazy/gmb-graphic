import './styles/style.css'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(Flip, ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.hp-slider-nav-link')
  const slideActive = document.querySelector('.hp-slide-active')
  const slideSecond = document.querySelector('.hp-slide-second')
  const slideThird = document.querySelector('.hp-slide-third')
  const slideBckActive = document.querySelector('.hp-slide-bck-active')
  const slideBckSecond = document.querySelector('.hp-slide-bck-second')
  const slideBckThird = document.querySelector('.hp-slide-bck-third')

  if (!slideActive || !slideSecond || !slideThird || !slideBckActive || !slideBckSecond || !slideBckThird) {
    console.error("Un ou plusieurs éléments sont manquants.")
    return
  }

  let isAnimating = false
  let activeLink = navLinks[0] // Supposons que le premier lien est actif au départ

  const updateActiveLink = (newActiveLink) => {
    if (activeLink) {
      activeLink.classList.remove('active')
      activeLink.style.pointerEvents = 'auto'
    }
    newActiveLink.classList.add('active')
    newActiveLink.style.pointerEvents = 'none'
    activeLink = newActiveLink
  }

  const animateSlider = (targetTab, clickedLink) => {
    if (window.innerWidth <= 991) {
      // Animation simplifiée pour mobile
      const images = document.querySelectorAll('.img-first, .img-second, .img-third')
      images.forEach(img => {
        gsap.to(img, { 
          opacity: img.classList.contains(`img-${targetTab}`) ? 1 : 0, 
          duration: 0.5 
        })
      })
      // Ajouter cette ligne pour mettre à jour le lien actif en mode mobile
      updateActiveLink(clickedLink)
    } else {
      // Animation Flip pour desktop
      const targetImage = document.querySelector(`.img-${targetTab}`)
      if (targetImage) {
        const currentActiveImage = slideActive.querySelector('div[class^="img-"]')
        const currentSecondImage = slideSecond.querySelector('div[class^="img-"]')
        const currentThirdImage = slideThird.querySelector('div[class^="img-"]')

        const state = Flip.getState([currentActiveImage, currentSecondImage, currentThirdImage, targetImage])

        slideThird.appendChild(currentActiveImage)
        slideSecond.appendChild(currentThirdImage)
        slideActive.appendChild(targetImage)

        Flip.from(state, {
          duration: 1,
          ease: 'power2.inOut',
          absolute: true,
          scale: true,
          onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0.9}, {opacity: 1, scale: 1, duration: 1}),
          onLeave: elements => gsap.to(elements, {opacity: 0, scale: 0.9, duration: 1}),
          onComplete: () => {
            isAnimating = false
            updateActiveLink(clickedLink)
          }
        })

        // Remplacer cette partie
        // Animer les fonds
        deactivateAllBackgrounds()
        activateBackground(slideBckActive, targetImage.classList[0].split('-')[1])
        activateBackground(slideBckSecond, currentThirdImage.classList[0].split('-')[1])
        activateBackground(slideBckThird, currentActiveImage.classList[0].split('-')[1])

        // Par celle-ci :
        resetAndAnimateBackgrounds(
          targetImage.classList[0].split('-')[1],
          currentThirdImage.classList[0].split('-')[1],
          currentActiveImage.classList[0].split('-')[1]
        )
      }
    }

    // Animer le contenu textuel correspondant
    animateTextContent(targetTab)
  }

  const animateTextContent = (activeTab) => {
    const allTextElements = [
      ...document.querySelectorAll('.font-size-25rem.first, .font-size-25rem.second, .font-size-25rem.third'),
      ...document.querySelectorAll('.p-first, .p-second, .p-third'),
      ...document.querySelectorAll('.services_words-flex.tt-uppercase.first, .services_words-flex.tt-uppercase.second, .services_words-flex.tt-uppercase.third')
    ]

    const activeTextElements = [
      document.querySelector(`.font-size-25rem.${activeTab}`),
      document.querySelector(`.p-${activeTab}`),
      document.querySelector(`.services_words-flex.tt-uppercase.${activeTab}`)
    ].filter(Boolean)

    gsap.set(allTextElements, { opacity: 0 })

    if (window.innerWidth > 991) {
      // Ajouter un délai de 500ms pour desktop
      gsap.to(activeTextElements, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
        delay: 0.5 // Délai de 500ms
      })
    } else {
      // Pas de délai pour mobile
      gsap.to(activeTextElements, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut'
      })
    }
  }

  // Fonction pour initialiser l'opacité des textes
  const initializeTextOpacity = () => {
    const allTextElements = [
      ...document.querySelectorAll('.font-size-25rem.second, .font-size-25rem.third'),
      ...document.querySelectorAll('.p-second, .p-third'),
      ...document.querySelectorAll('.services_words-flex.tt-uppercase.second, .services_words-flex.tt-uppercase.third')
    ]

    gsap.set(allTextElements, { opacity: 0 })
  }

  // Appeler la fonction d'initialisation
  initializeTextOpacity()

  // Fonction pour activer le bon fond
  const activateBackground = (container, tabLink) => {
    const bg = container.querySelector(`[hp-tab-link="${tabLink}"]`)
    if (bg) {
      gsap.to(bg, { width: '100%', duration: 0.9, ease: 'power1.inOut' })
    }
  }

  const deactivateAllBackgrounds = () => {
    [slideBckActive, slideBckSecond, slideBckThird].forEach(container => {
      const allBgs = container.querySelectorAll('[hp-tab-link]')
      allBgs.forEach(bg => {
        gsap.to(bg, { width: '0%', duration: 0.5, ease: 'power1.inOut' })
      })
    })
  }

  // Activer le fond initial pour "first"
  activateBackground(slideBckActive, 'first')

  // Modifier la fonction setupScrollTrigger
  const setupScrollTrigger = () => {
    if (window.innerWidth > 991) {
      const secondLink = document.querySelector('.hp-slider-nav-link[hp-tab-link="second"]')
      if (!secondLink) {
        console.error("Le lien 'second' est introuvable.")
        return
      }
      ScrollTrigger.create({
        trigger: '.hp-slider-nav-link',
        start: 'bottom bottom+=30%',
        onEnter: () => {
          if (!isAnimating && activeLink !== secondLink) {
            secondLink.click()
          }
        },
        once: true
      })
    }
  }

  // Configurer les écouteurs d'événements
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetTab = link.getAttribute('hp-tab-link')
      animateSlider(targetTab, link)
    })
  })

  // Initialiser le premier lien comme actif
  updateActiveLink(activeLink)

  // Configurer le ScrollTrigger
  setupScrollTrigger()

  // Modifier la gestion du redimensionnement
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 991) {
      // Réinitialiser les positions pour le mode mobile
      [slideActive, slideSecond, slideThird].forEach(slide => {
        gsap.set(slide, { clearProps: 'all' })
      })
      // Réinitialiser l'opacité des slides
      gsap.set([slideSecond, slideThird], { opacity: 0 })
      gsap.set(slideActive, { opacity: 1 })
    } else {
      // ... code existant pour le redimensionnement en desktop ...
    }
    // Reconfigurer le ScrollTrigger
    ScrollTrigger.getAll().forEach(st => st.kill())
    setupScrollTrigger()
  })

  // Initialiser l'état pour mobile
  const initializeMobileState = () => {
    if (window.innerWidth <= 991) {
      const images = document.querySelectorAll('.img-first, .img-second, .img-third')
      images.forEach(img => {
        gsap.set(img, { opacity: img.classList.contains('img-first') ? 1 : 0 })
      })
    }
  }

  // Appeler l'initialisation au chargement
  initializeMobileState()

  // Gérer le redimensionnement
  window.addEventListener('resize', initializeMobileState)

  console.log('Hello Thalea')
})

// Ajouter cette nouvelle fonction
const resetAndAnimateBackgrounds = (activeTab, secondTab, thirdTab) => {
  const containers = [slideBckActive, slideBckSecond, slideBckThird]
  const tabs = [activeTab, secondTab, thirdTab]
  
  containers.forEach((container, index) => {
    const allBgs = container.querySelectorAll('[hp-tab-link]')
    allBgs.forEach(bg => {
      gsap.set(bg, { width: '0%' })
    })
    
    const bgToActivate = container.querySelector(`[hp-tab-link="${tabs[index]}"]`)
    if (bgToActivate) {
      gsap.to(bgToActivate, { width: '100%', duration: 0.9, ease: 'power1.inOut' })
    }
  })
}