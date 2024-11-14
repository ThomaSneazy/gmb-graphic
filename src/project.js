import './styles/style.css'
import gsap from 'gsap'

// Ajouter l'écouteur d'événements aux liens vers /projects
if (window.location.pathname.includes('/projects/')) {
    // Configuration initiale
    gsap.set('.overlay-load', { opacity: 1, display: 'block' });
    gsap.set('.section', { opacity: 0 });
    
    // Animation
    gsap.timeline()
      .to('.overlay-load', {
        display: 'none',
        opacity: 0,
        duration: 1
      })
      .to('.section', {
        opacity: 1,
        duration: 0.5
      });
  }