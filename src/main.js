// import { log } from 'three/webgpu';
import './styles/style.css'
import gsap from 'gsap'
// import barba from '@barba/core'



// barba.init({
//   transitions: [{
//     name: 'opacity-transition',
//     leave(data) {
//       return gsap.to(data.current.container.querySelector('.page-wrapper'), {
//         opacity: 0,
//         duration: 0.5
//       });
//     },
//     enter(data) {
//       return gsap.from(data.next.container.querySelector('.section'), {
//         opacity: 0,
//         duration: 0.5
//       });
//     }
//   }]
// });

// console.log('Hello KEZ')

// document.addEventListener('DOMContentLoaded', function() {
//   var player = videojs('my-video', {
//     controls: true,
//     autoplay: false,
//     preload: 'auto'
//   });
// });



document.querySelectorAll('.project__desc.date, .date-list').forEach(el => {
  el.textContent = el.textContent.replace(/\b20/, '');
});


const tooltip = document.getElementById('tooltip');
const hoverables = document.querySelectorAll('.hoverable, .tooltip, .esc, .link-to-social.serious, .link-to-social.cool, .watch, .switch');

let tooltipAnimation;

hoverables.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    if (tooltipAnimation) tooltipAnimation.kill();

    let tooltipText;
    if (el.classList.contains('tooltip')) {
      tooltipText = 'click';
    } else if (el.classList.contains('esc')) {
      tooltipText = 'PRESS OR CLICK';
    }  else if (el.classList.contains('switch')) {
        tooltipText = 'SPAM';
    } else if (el.classList.contains('serious')) {
      tooltipText = 'The serious me';
    } else if (el.classList.contains('cool')) {
      tooltipText = 'A little less serious';
    } else if (el.classList.contains('watch')) {
      tooltipText = 'ENJOY ☻';
    } else {
      tooltipText = el.dataset.tooltip;
    }

    tooltip.textContent = tooltipText;

    tooltip.style.display = 'block';

    gsap.set(tooltip, {
      x: e.pageX + 10,
      y: e.pageY + 10
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

  // console.log('Position de la souris:', {
  //   x: e.clientX,
  //   y: e.clientY,
  //   percentX: mousePercentX,
  //   percentY: mousePercentY,
  //   targetX: targetX,
  //   targetY: targetY
  // });

  // const imgItems = document.querySelectorAll('.img-item img');
  // imgItems.forEach((img, index) => {
  //   const moveX = (0.5 - mousePercentX) * 20;
  //   const moveY = (0.5 - mousePercentY) * 20;
  //   gsap.to(img, {
  //     x: moveX,
  //     y: moveY, 
  //     duration: 0.225, // Durée de l'animation pour un effet smooth
  //     // ease: "power2.out", // Easing function pour un mouvement fluide
  //   });
  // });
});

function animate() {
  if (isAnimationEnabled) {
    currentX += (targetX - currentX) * 0.325;
    currentY += (targetY - currentY) * 0.325;

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


function animatePrenomNomWrapper() {
  const prenomWrapper = document.querySelector('.prenom__wrapper');
  const prenom = prenomWrapper.querySelector('.prenom');
  const nomWrapper = document.querySelector('.nom__wrapper');
  const nom = nomWrapper.querySelector('.nom');
  const gridItems = document.querySelectorAll('.grid__item');
  const grid = document.querySelector('.grid__project');
  const projectDescWrappers = document.querySelectorAll('.project__desc__wrapper');
  const linkWrapperPrenom = document.querySelectorAll('.link__wrapper.is-home');
  const linkWrapperNom = document.querySelectorAll('.link__wrapper.is-filter');
  const bgWrapper = document.querySelector('.test-bg');

  if (window.innerWidth <= 991) {
    gsap.set([gridItems, grid], { display: 'none' });
    gsap.set(projectDescWrappers, {
      yPercent: -20,
      opacity: 0,
      overflow: 'hidden'
    });
    
    gsap.set([prenomWrapper, nomWrapper], {
      height: '50vh',
      display: 'flex',
      alignItems: 'flex-start'
    });
    
    gsap.set([prenom, nom], {
      opacity: 0,
      position: 'static',
      scale: 0.8
    });
    
    gsap.set('.link__wrapper.is-filter', {
      clearProps: "position,top,bottom,yPercent",
      display: 'none',
      opacity: 0
    });
    
    gsap.timeline({
      defaults: { duration: 1.2, ease: "power3.inOut" }
    })
      .to([prenom, nom], {
        opacity: 1,
        scale: 1,
        duration: 1
      })
      .to([prenomWrapper, nomWrapper], {
        height: '100vh',
        duration: 1
      }, "+=0.2")
      .to(bgWrapper, {
        backgroundColor: 'transparent',
        duration: 0
      })
      .to(linkWrapperPrenom, {
        display: 'flex',
        opacity: 1,
        duration: 0.4,
      })
      .to('.link__wrapper.is-filter', {
        display: 'flex',
        opacity: 1,
        duration: 0.4,
      })
      // .to(projectDescWrappers, {
      //   yPercent: 0,
      //   opacity: 1,
      //   duration: 0.4,
      //   ease: "power2.out",
      // });
  } else {
    gsap.set(gridItems, {
      xPercent: -50,
      yPercent: -50,
      left: '50%',
      top: '50%',
      position: 'absolute',
      display: 'flex'
    });

    gsap.set('.grid__item:not(:nth-child(1))', {
      height: 0
    });

    gsap.set('.grid__item:nth-child(1)', {
      opacity: 1,
      display: 'flex'
    });

    gsap.set(projectDescWrappers, {
      yPercent: -20,
      opacity: 0,
      overflow: 'hidden'
    });

    gsap.set(nom, {
      opacity: 0,
    });

    gsap.set(prenom, {
      opacity: 0,
    });

    gsap.set(bgWrapper, {
      opacity: 1,
    });

    gsap.timeline({
      defaults: { duration: 1.2, ease: "power3.inOut" },
      onComplete: () => {
        gridItems.forEach((item, index) => {
          if (index !== 0) { 
            gsap.to(item, {
              opacity: 1,
              duration: 1.5,
              ease: "power3.out"
            });
          }
        });
      }
    })
      .set(linkWrapperPrenom, {
        position: 'relative',
        display: 'none',
        yPercent: -20,
        opacity: 0,
      })
      .set(linkWrapperNom, {
        position: 'relative',
        display: 'none',
        opacity: 0,
      })
      .set(prenom, {
        scale: 0.8,
        position: 'absolute',
        left: 'auto',
        right: 'auto',
        top: 'auto',
        bottom: '0%',
      })
      .set(nomWrapper, {
        position: 'fixed',
        height: '50vh',
      })
      .set(nom, {
        scale: 0.8,
        position: 'absolute',
        left: 'auto',
        right: 'auto',
        bottom: 'auto',
        top: '0%',
      })
      .to(prenom, {
        left: '0%',
        scale: 1,
        opacity: 1,
        right: '0%',
        duration: 1
      })
      .to(nom, {
        right: '0%',
        bottom: '0%',
        opacity: 1,
        scale: 1,
        duration: 1
      }, "<")
      .to(prenom, {
        top: '0%',
        bottom: 'auto',
        duration: 1
      }, "+=0.2")
      .to(nom, {
        top: 'auto',
        bottom: '0%',
        duration: 1
      }, "<")
      .to('.grid__item:nth-child(1)', {
        height: '100%',
        duration: 1
      }, "<")
      .to(bgWrapper, {
        backgroundColor: 'transparent',
        duration: 0
      }, "<")
      .to(linkWrapperPrenom, {
        display: 'flex',
        yPercent: 0,
        opacity: 1,
        duration: 0.4,
      }, "+=0.1")
      .to([nomWrapper, prenomWrapper], {
        position: 'fixed',
        height: '100vh',
      }, "<")
      .to('.grid__item:not(:nth-child(1))', {
        height: 'auto', 
        duration: 0.8,
        transformOrigin: gsap.utils.random(['top', 'bottom']),
        stagger: {
          amount: 0.3,
          from: "random"
        },
        ease: "power2.inOut"
      }, "-=1")
      .to(projectDescWrappers, {
        yPercent: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      }, "+=0.1").eventCallback("onComplete", () => {
        isAnimationEnabled = true;
      });
  }
}
animatePrenomNomWrapper();


function getRandomChar() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!';
  return chars[Math.floor(Math.random() * chars.length)];
}

function animateText(element) {
  const originalText = element.getAttribute('data-project-name');
  const textLength = originalText.length;
  let animationFrame;
  let startTime;
  let lastUpdateTime = 0;

  function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / 1000, 1); 
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
      element.textContent = originalText; 
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


const navLinks = document.querySelectorAll('.link__wrapper.is-home .link__nav');
const gridProject = document.querySelector('.grid__project');
const gridItems = document.querySelectorAll('.grid__item');
const listWrapper = document.querySelector('.list__wrapper');
const nomWrapper = document.querySelector('.nom__wrapper');
// const prenomWrapper = document.querySelector('.prenom__wrapper');
const nom = nomWrapper.querySelector('.nom');
const linkWrapperNom = document.querySelectorAll('.link__wrapper.is-filter');


gsap.set(listWrapper, { display: 'none', height: 0 });

gsap.set(nom, { position: 'absolute', bottom: 0, top: 'auto' });
gsap.set(linkWrapperNom, { position: 'absolute',  top: 'auto' });
gsap.set('.img__list', { opacity: 0 });
gsap.set('.test-info', { display: 'none', opacity: 0 });
// gsap.set('.grid__item', { display: 'none', opacity: 0 });
// gsap.set('.video-showreel__wrapper', { display: 'none', opacity: 0 });




navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    document.body.style.cursor = 'progress';

    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    if (link.classList.contains('list')) {
      const tl = gsap.timeline({ 
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          document.body.style.cursor = 'default';
        }
      });

      if (document.querySelector('.test-info').style.display === 'block') {
        tl.to('.test-info', {
          opacity: 0,
          duration: 0.3,
          onComplete: () => gsap.set('.test-info', { display: 'none' })
        });
      }

      gsap.set('.list__link__item', {
        opacity: 0,
        x: 50
      });
      gsap.set(linkWrapperNom, {
        display: 'none',
        yPercent: -20,
        opacity: 0,
      });

      tl.to(gridProject, {
        x: 0,
        y: 0,
        duration: 0.6
      })
        .to(gridItems, {
          opacity: 0,
          duration: 0.6,
          stagger: 0.04,
          onComplete: () => gsap.set(gridItems, { display: 'none' })
        }, "<")
        .to(nom, {
          top: 0,
          bottom: 'auto',
          duration: 1,
          ease: "power3.inOut"
        })
        .set(listWrapper, { display: 'none', height: '100vh' })
        .to(listWrapper, {
          display: 'flex',
          opacity: 1,
          duration: 0.8
        })
        .to(linkWrapperNom, {
          display: 'flex',
          yPercent: 0,
          opacity: 1,
          duration: 0.8
        }, "<")
        .to('.list__link__item', {
          opacity: 0.4,
          x: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          onComplete: () => {
            function initializeListView() {
              const listItems = document.querySelectorAll('.list__link__item');
              const imgItems = document.querySelectorAll('.list__link__img__item');
              const links = document.querySelectorAll('.link__list.link-to-project');
              const goTextLinks = document.querySelectorAll('.go-text');

              if (window.innerWidth <= 991) {
                // Désactiver les liens principaux en mode mobile
                links.forEach(link => {
                  link.style.pointerEvents = 'none';
                });

                goTextLinks.forEach(link => {
                  link.style.pointerEvents = 'auto';
                });

                gsap.set(imgItems, {
                  opacity: 0
                });

                if (listItems[0]) {
                  listItems[0].classList.add('active');
                  gsap.to(listItems[0], { opacity: 1, duration: 0 });

                  const firstProjectId = listItems[0].getAttribute('data-list-project');
                  const firstImg = document.querySelector(`.list__link__img__item[data-list-project="${firstProjectId}"]`);
                  if (firstImg) {
                    firstImg.classList.add('active');
                    gsap.to(firstImg, { opacity: 0.5, duration: 0 });
                  }
                }

                listItems.forEach(item => {
                  item.addEventListener('click', (e) => {
                    if (e.target.closest('.go-text')) {
                      return;
                    }

                    e.preventDefault();
                    e.stopPropagation();
                    
                    const projectId = item.getAttribute('data-list-project');

                    listItems.forEach(otherItem => {
                      otherItem.classList.remove('active');
                      gsap.to(otherItem, { opacity: 0.5, duration: 0 });
                    });
                    imgItems.forEach(img => {
                      img.classList.remove('active');
                      gsap.to(img, { opacity: 0, duration: 0 });
                    });

                    item.classList.add('active');
                    gsap.to(item, { opacity: 1, duration: 0 });

                    const correspondingImg = document.querySelector(`.list__link__img__item[data-list-project="${projectId}"]`);
                    if (correspondingImg) {
                      correspondingImg.classList.add('active');
                      gsap.to(correspondingImg, { opacity: 0.5, duration: 0 });
                    }
                  });
                });
              } else {
                links.forEach(link => {
                  link.style.pointerEvents = 'auto';
                });

                gsap.set(listItems, {
                  opacity: 0.4
                });

                gsap.set(imgItems, {
                  opacity: 0
                });

                if (listItems[0]) {
                  listItems[0].classList.add('active');
                  gsap.to(listItems[0], { opacity: 1, duration: 0 });

                  const firstProjectId = listItems[0].getAttribute('data-list-project');
                  const firstImg = document.querySelector(`.list__link__img__item[data-list-project="${firstProjectId}"]`);
                  if (firstImg) {
                    firstImg.classList.add('active');
                    gsap.to(firstImg, { opacity: 1, duration: 0 });
                  }
                }

                listItems.forEach(item => {
                  item.addEventListener('mouseenter', () => {
                    const projectId = item.getAttribute('data-list-project');

                    listItems.forEach(otherItem => {
                      otherItem.classList.remove('active');
                      gsap.to(otherItem, { opacity: 0.4, duration: 0 });
                    });
                    imgItems.forEach(img => {
                      img.classList.remove('active');
                      gsap.to(img, { opacity: 0, duration: 0 });
                    });

                    item.classList.add('active');
                    gsap.to(item, { opacity: 1, duration: 0 });

                    const correspondingImg = document.querySelector(`.list__link__img__item[data-list-project="${projectId}"]`);
                    if (correspondingImg) {
                      correspondingImg.classList.add('active');
                      gsap.to(correspondingImg, { opacity: 1, duration: 0 });
                    }
                  });
                });
              }
            }
            initializeListView();
          }
        }, "-=0.4")
        .to('.img__list', {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        }, "+=0.01");

      isAnimationEnabled = false;
    } else if (link.classList.contains('grid')) {
      const tl = gsap.timeline({ 
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          document.body.style.cursor = 'default';
        }
      });

      if (document.querySelector('.test-info').style.display === 'block') {
        tl.to('.test-info', {
          opacity: 0,
          duration: 0.3,
          onComplete: () => gsap.set('.test-info', { display: 'none' })
        });
      }

      tl.to('.img__list', {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      })
        .to(nom, {
          y: '-100vh',
          duration: 0.8,
          ease: "power2.in"
        })
        .to('.list__link__item', {
          opacity: 0,
          x: 50,
          duration: 0.3,
          stagger: 0.05
        }, "<")
        .set(nom, {
          opacity: 0,
          y: '100%',
          position: 'absolute',
          bottom: 0,
          top: 'auto'
        })
        
        .to(linkWrapperNom, {
          yPercent: -20,
          opacity: 0,
          duration: 0.3,
          onComplete: () => gsap.set(linkWrapperNom, { display: 'none' })
        }, "<")
        .to(listWrapper, {
          height: 0,
          opacity: 0,
          duration: 1,
          onComplete: () => gsap.set(listWrapper, { display: 'none' })
        }, "<+=0.4")
        .to(nom, {
          y: '0%',
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        }, "<")
        .set(gridProject, { display: 'grid' })
        .set(gridItems, { display: 'flex' })
        .to(gridItems, {
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          onComplete: () => {
            isAnimationEnabled = true;
          }
        });
    } else if (link.classList.contains('info')) {
      const tl = gsap.timeline({ 
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          document.body.style.cursor = 'default';
        }
      });

      gsap.set('.info__text__block', {
        opacity: 0,
        y: -20
      });
      gsap.set('.img-info__wrapper img', {
        opacity: 0
      });

      if (listWrapper.style.display !== 'none') {
        tl.to('.img__list', {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out"
        })
        .to('.list__link__item', {
          opacity: 0,
          x: 50,
          duration: 0.2,
          stagger: 0.03,
        }, "<")
        .to(linkWrapperNom, {
          yPercent: -20,
          opacity: 0,
          duration: 0.2,
          onComplete: () => gsap.set(linkWrapperNom, { display: 'none' })
        })
        .to(listWrapper, {
          height: 0,
          opacity: 0,
          duration: 0.6,
          onComplete: () => gsap.set(listWrapper, { display: 'none' })
        }, "<");
      }
      else if (gridProject.style.display !== 'none') {
        tl.to(gridProject, {
          x: 0,
          y: 0,
          duration: 0.6
        })
        .to(gridItems, {
          opacity: 0,
          duration: 0.6,
          stagger: 0.04,
          onComplete: () => gsap.set(gridItems, { display: 'none' })
        }, "<")
        .to(nom, {
          top: 0,
          bottom: 'auto',
          duration: 1,
          ease: "power3.inOut"
        });
      }

      tl.set('.test-info', { display: 'block' })
        .to('.test-info', {
          opacity: 1,
          duration: 0.2
        })
        .to('.info__text__block', {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out"
        })
        .to('.img-info__wrapper img', {
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut"
        }, "-=0.3");

      isAnimationEnabled = false;
    }
  });
});





// function initializeListView() {
//   const listItems = document.querySelectorAll('.list__link__item');
//   const imgItems = document.querySelectorAll('.list__link__img__item');

//   // Activer le premier élément (index 0)
//   if (listItems[0]) {
//     listItems[0].classList.add('active');
//     const firstProjectId = listItems[0].getAttribute('data-list-project');
//     const firstImg = document.querySelector(`.list__link__img__item[data-list-project="${firstProjectId}"]`);
//     if (firstImg) {
//       firstImg.classList.add('active');
//     }
//   }

//   listItems.forEach(item => {
//     item.addEventListener('mouseenter', () => {
//       const projectId = item.getAttribute('data-list-project');

//       // Retirer la classe active de tous les éléments
//       listItems.forEach(otherItem => otherItem.classList.remove('active'));
//       imgItems.forEach(img => img.classList.remove('active'));

//       // Ajouter la classe active sur l'élément survolé et son image
//       item.classList.add('active');
//       const correspondingImg = document.querySelector(`.list__link__img__item[data-list-project="${projectId}"]`);
//       if (correspondingImg) {
//         correspondingImg.classList.add('active');
//       }
//     });
//   });
// }

// // S'assurer que la fonction est appelée après le chargement du DOM
// document.addEventListener('DOMContentLoaded', initializeListView);

// const soundContainer = document.querySelector('.sound-video');
// const soundBg = document.querySelector('.sound-bg');
// const soundHandle = document.querySelector('.sound-handle');
// const percentageText = document.querySelector('.pourcentage');
// let isDragging = false;

// const updateVolume = (e) => {
//   const rect = soundContainer.getBoundingClientRect();
//   const y = rect.bottom - e.clientY;
  
//   // Calcul du pourcentage (inversé car on part du bas)
//   let percentage = Math.max(0, Math.min(100, (y / rect.height) * 100));
  
//   // Mise à jour de la hauteur du bg
//   soundBg.style.height = `${percentage}%`;
  
//   // Mise à jour du texte du pourcentage
//   percentageText.textContent = `${Math.round(percentage)}%`;
  
//   // Mise à jour du volume de la vidéo (0 à 1)
//   player.volume(percentage / 100);
// };

// soundHandle.addEventListener('mousedown', () => {
//   isDragging = true;
// });

// document.addEventListener('mousemove', (e) => {
//   if (isDragging) {
//     e.preventDefault();
//     updateVolume(e);
//   }
// });

// document.addEventListener('mouseup', () => {
//   isDragging = false;
// });

// // Click direct sur le conteneur
// soundContainer.addEventListener('click', updateVolume);

// // Initialiser le volume à 70%
// soundBg.style.height = '70%';
// percentageText.textContent = '70%';
// player.volume(0.7);

// Sélectionner tous les éléments avec la classe video-grid
const videoGrids = document.querySelectorAll('.video-grid');
const videoShowreel = document.querySelector('.video__showreel__item');
const videoJs = document.querySelector('.videojs');
let player;

if (videoGrids.length > 0) {
  player = videojs('my-video', {
    controls: true,
    autoplay: false,
    preload: 'auto',
  });

  // Définir le volume par défaut à 70%
  player.volume(0.7);

  gsap.set('.video-showreel__wrapper', {
    display: 'none',
    opacity: 0
  });

  gsap.set(videoJs, {
    display: 'none',
    opacity: 0
  });

  const soundVideo = document.querySelector('.sound-video');
  const soundBg = document.querySelector('.sound-bg');
  gsap.set([videoJs, soundVideo, soundBg], {
    display: 'none',
    opacity: 0
  });

  videoGrids.forEach(videoGrid => {
    videoGrid.autoplay = false;
    videoGrid.muted = true;
    videoGrid.loop = true;

    const playFullVideo = () => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.inOut",
          duration: 1
        }
      });

      gsap.set('.video-showreel__wrapper', {
        display: 'flex',
        opacity: 1
      });

      gsap.set(videoShowreel, {
        display: 'flex',
        width: '0%',
        height: '0%'
      });

      tl.to(videoShowreel, {
        width: '100%',
        height: '1%'
      })
      .to(videoShowreel, {
        height: '100%',
        duration: 1
      })
      .set([videoJs, soundVideo, soundBg], {
        display: 'block'
      })
      .to([videoJs, soundVideo, soundBg], {
        opacity: 1,
        duration: 0.4,
        onComplete: () => {
          try {
            player.muted(true); 
            player.play()
              .then(() => {
                player.muted(false); 
              })
              .catch(error => {
                console.log('Erreur de lecture:', error);
                player.muted(true);
                player.play().catch(e => console.log('Échec même en muet:', e));
              });
          } catch (error) {
            console.log('Erreur lors de la tentative de lecture:', error);
          }
        }
      });
    };

    videoGrid.addEventListener('mouseenter', () => {
      videoGrid.play();
    });

    videoGrid.addEventListener('mouseleave', () => {
      videoGrid.pause();
    });

    videoGrid.addEventListener('click', playFullVideo);

    let touchStartTime = 0;
    
    videoGrid.addEventListener('touchstart', (e) => {
      touchStartTime = Date.now();
    }, { passive: false });

    videoGrid.addEventListener('touchend', (e) => {
      e.preventDefault();
      const touchDuration = Date.now() - touchStartTime;
      
      if (touchDuration < 200) {
        playFullVideo();
        
        try {
          const videoElement = player.el().querySelector('video');
          if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
          } else if (videoElement.webkitRequestFullscreen) {
            videoElement.webkitRequestFullscreen();
          } else if (videoElement.mozRequestFullScreen) {
            videoElement.mozRequestFullScreen();
          }
        } catch (error) {
          console.log('Erreur lors de la tentative de plein écran:', error);
        }
      }
    }, { passive: false });
  });

  const closeVideo = document.querySelector('.close-video');
  let mouseTimer;

  gsap.set(closeVideo, {
    opacity: 0,
    display: 'none'
  });

  const hideCloseButton = () => {
    gsap.to([closeVideo, soundVideo], {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.set([closeVideo, soundVideo], { display: 'none' });
      }
    });
  };

  videoShowreel.addEventListener('mousemove', () => {
    gsap.set([closeVideo, soundVideo], { display: 'flex' });
    gsap.to([closeVideo, soundVideo], {
      opacity: 1,
      duration: 0.3
    });

    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => {
      gsap.to([closeVideo, soundVideo], {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set([closeVideo, soundVideo], { display: 'none' });
        }
      });
    }, 2300);
  });

  videoShowreel.addEventListener('mouseleave', hideCloseButton);

  player.on('ended', () => {
    closeVideoWithAnimation();
  });

  const closeVideoWithAnimation = () => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.inOut",
        duration: 1
      }
    });

    tl.to([videoJs, soundVideo], {
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        player.pause();
        gsap.set([videoJs, soundVideo], { display: 'none' });
      }
    })
    .to(closeVideo, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.set(closeVideo, { display: 'none' });
      }
    })
    .to(videoShowreel, {
      height: '1%',
      duration: 1
    }, "-=0.2")
    .to(videoShowreel, {
      width: '0%',
      height: '0%',
      onComplete: () => {
        gsap.set(videoShowreel, { display: 'none' });
      }
    });
  };

  closeVideo.addEventListener('click', closeVideoWithAnimation);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoShowreel.style.display !== 'none') {
      closeVideoWithAnimation();
    }
  });

  let controlsTimer;

  function updateControlsVisibility() {
    const closeVideo = document.querySelector('.close-video');
    const soundVideo = document.querySelector('.sound-video');

    if (window.innerWidth <= 991) {
      player.controlBar.hide();
      videoShowreel.style.cursor = 'none';
      
      gsap.set(closeVideo, {
        display: 'flex',
        opacity: 1
      });
      
      gsap.set(soundVideo, {
        display: 'none',
        opacity: 0
      });
    } else {
      gsap.set([closeVideo, soundVideo], {
        opacity: 0,
        display: 'none'
      });

      videoShowreel.addEventListener('mousemove', () => {
        player.controlBar.show();
        videoShowreel.style.cursor = 'default';

        gsap.set([closeVideo, soundVideo], { 
          display: 'flex' 
        });
        gsap.to([closeVideo, soundVideo], {
          opacity: 1,
          duration: 0.3
        });

        clearTimeout(controlsTimer);
        controlsTimer = setTimeout(() => {
          player.controlBar.hide();
          videoShowreel.style.cursor = 'none';
          gsap.to([closeVideo, soundVideo], {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              gsap.set([closeVideo, soundVideo], { 
                display: 'none' 
              });
            }
          });
        }, 2300);
      });
    }
  }

  updateControlsVisibility();
  window.addEventListener('resize', updateControlsVisibility);

  videoShowreel.addEventListener('mouseleave', () => {
    if (window.innerWidth > 991) {
      player.controlBar.hide();
      videoShowreel.style.cursor = 'default';
      clearTimeout(controlsTimer);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && videoShowreel.style.display !== 'none') {
      e.preventDefault(); 
      if (player.paused()) {
        player.play();
      } else {
        player.pause();
      }
    }
  });
}

const bigPlayButton = player.getChild('BigPlayButton');

player.on('play', () => {
  bigPlayButton.el().textContent = '⏸';
});

player.on('pause', () => {
  bigPlayButton.el().textContent = '▶';
});

function initializeCategoryFilter() {
  const filterLinks = document.querySelectorAll('.link__wrapper.is-filter .link__nav');
  const listItems = document.querySelectorAll('.list__link__item');
  
  updateCategoryCounts();
  
  filterLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const filterWrapper = link.closest('.link__wrapper.is-filter');
      if (filterWrapper) {
        filterWrapper.querySelectorAll('.link__nav').forEach(fl => fl.classList.remove('active'));
        link.classList.add('active');
      }

      const selectedCategory = link.getAttribute('data-category').toLowerCase();
      
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" }
      });

      tl.to(listItems, {
        opacity: 0,
        x: 50,
        duration: 0.4,
        stagger: 0.03,
        onComplete: () => {
          listItems.forEach(item => {
            const categoryText = item.querySelector('.category-text');
            const itemCategory = categoryText ? categoryText.getAttribute('data-category').toLowerCase() : '';
            
            if (selectedCategory === 'all' || itemCategory === selectedCategory) {
              gsap.set(item, { display: 'flex' });
            } else {
              gsap.set(item, { display: 'none' });
            }
          });
        }
      })
      .to(listItems, {
        opacity: 0.4,
        x: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
        onComplete: () => {
          const visibleItems = Array.from(listItems).filter(item => item.style.display !== 'none');
          const firstVisibleItem = visibleItems[0];

          if (firstVisibleItem) {
            listItems.forEach(item => item.classList.remove('active'));
            firstVisibleItem.classList.add('active');
            gsap.to(firstVisibleItem, { opacity: 1, duration: 0.2 });

            const projectId = firstVisibleItem.getAttribute('data-list-project');
            const imgs = document.querySelectorAll('.list__link__img__item');
            imgs.forEach(img => {
              if (img.getAttribute('data-list-project') === projectId) {
                img.classList.add('active');
                gsap.to(img, { opacity: 1, duration: 0.2 });
              } else {
                img.classList.remove('active');
                gsap.to(img, { opacity: 0, duration: 0.2 });
              }
            });
          }
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeCategoryFilter();
  
  const allLink = document.querySelector('.link__nav.all.tooltip');
  if (allLink) {
    allLink.classList.add('active');
  }
});

function updateCategoryCounts() {
  const listItems = document.querySelectorAll('.list__link__item');
  const categoryCounts = {};
  
  listItems.forEach(item => {
    const categoryText = item.querySelector('.category-text');
    if (categoryText) {
      const category = categoryText.getAttribute('data-category').toLowerCase();
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }
  });
  
  document.querySelectorAll('.category-text.nb').forEach(counter => {
    const category = counter.getAttribute('data-category').toLowerCase();
    const count = categoryCounts[category] || 0;
    counter.textContent = count.toString().padStart(2, '0');
  });
}

function resetFilters() {
  const allLink = document.querySelector('.link__nav.all.tooltip');
  const listItems = document.querySelectorAll('.list__link__item');
  const imgs = document.querySelectorAll('.list__link__img__item');

  if (allLink) {
    document.querySelectorAll('.link__wrapper.is-filter .link__nav').forEach(link => {
      link.classList.remove('active');
    });
    allLink.classList.add('active');
  }

  listItems.forEach(item => {
    gsap.set(item, { display: 'flex', opacity: 0.4 });
  });

  if (listItems[0]) {
    listItems.forEach(item => item.classList.remove('active'));
    listItems[0].classList.add('active');
    gsap.to(listItems[0], { opacity: 1, duration: 0.2 });

    const firstProjectId = listItems[0].getAttribute('data-list-project');
    imgs.forEach(img => {
      if (img.getAttribute('data-list-project') === firstProjectId) {
        img.classList.add('active');
        gsap.to(img, { opacity: 1, duration: 0.2 });
      } else {
        img.classList.remove('active');
        gsap.to(img, { opacity: 0, duration: 0.2 });
      }
    });
  }
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); 

    const homeWrapper = link.closest('.link__wrapper.is-home');
    if (homeWrapper) {
      homeWrapper.querySelectorAll('.link__nav').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }

    if (link.classList.contains('grid')) {
      window.location.hash = '';
      // setTimeout(() => {
      //   resetFilters(); // Réinitialiser les filtres quand on retourne à la grille
      // }, 2000);
    } else if (link.classList.contains('list')) {
      window.location.hash = 'list';
    } else if (link.classList.contains('info')) {
      window.location.hash = 'info';
    }

  });
});

// // Gérer l'état initial basé sur le hash URL
// function handleInitialState() {
//   const hash = window.location.hash.slice(1); // Enlever le #
//   const navLink = document.querySelector(`.link__nav.${hash}`) || 
//                  document.querySelector('.link__nav.grid'); // Par défaut: grid

//   if (navLink) {
//     navLink.click(); // Simuler un clic sur le bon lien
//   }
// }

// Gérer les changements de hash
// window.addEventListener('hashchange', handleInitialState);

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  initializeCategoryFilter();
  // handleInitialState();
});

// Ajout du contrôle du son
// const soundContainer = document.querySelector('.sound-video');
// const soundBg = document.querySelector('.sound-bg');
// const soundHandle = document.querySelector('.sound-handle');
// const percentageText = document.querySelector('.pourcentage');
// let isDragging = false;

// // Fonction pour mettre à jour le volume
// const updateVolume = (e) => {
//   // Récupérer la position par rapport au sound-bg
//   const rect = soundBg.getBoundingClientRect();
//   const mouseY = e.clientY - rect.top;
//   const bgHeight = rect.height;
  
//   // Calcul du pourcentage depuis le haut
//   let percentage = Math.max(0, Math.min(100, (mouseY / bgHeight) * 100));
  
//   // Mise à jour de la position du handle depuis le haut
//   soundHandle.style.top = `${percentage}%`;
  
//   // Le volume est inversé (100% en bas, 0% en haut)
//   const volumePercentage = 100 - percentage;
  
//   // Mise à jour du texte du pourcentage
//   percentageText.textContent = `${Math.round(volumePercentage)}%`;
  
//   // Mise à jour du volume de la vidéo (0 à 1)
//   player.volume(volumePercentage / 100);
// };

// // Événement mousedown sur le handle
// soundHandle.addEventListener('mousedown', (e) => {
//   isDragging = true;
//   soundHandle.style.cursor = 'grabbing';
//   e.stopPropagation(); // Empêche la propagation au conteneur
// });

// // Événement mousemove sur le document
// document.addEventListener('mousemove', (e) => {
//   if (isDragging) {
//     e.preventDefault();
//     updateVolume(e);
//   }
// });

// // Événement mouseup sur le document
// document.addEventListener('mouseup', () => {
//   isDragging = false;
//   soundHandle.style.cursor = 'grab';
// });

// // Click direct sur le sound-bg
// soundBg.addEventListener('click', (e) => {
//   if (e.target === soundHandle) return;
//   updateVolume(e);
// });

// // Initialiser le volume à 70% (donc handle à 30% depuis le haut)
// soundHandle.style.top = '30%';
// percentageText.textContent = '70%';
// player.volume(0.7);

// Fonction pour gérer la transition de sortie
// Fonction de transition de page
function handlePageTransition(e) {
  e.preventDefault();
  const targetUrl = e.currentTarget.href;

  const pageWrapper = document.querySelector('.page-wrapper');
  const overlayLoad = document.querySelector('.overlay-load');
  
  // gsap.set(overlayLoad, {
  //   display: 'block',
  //   opacity: 1,
  //   height: 0
  // });

  const tl = gsap.timeline({
    onComplete: () => {
      window.location.href = targetUrl;
    }
  });

  tl.to(pageWrapper, {
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    ease: "power3.inOut"
  })
  // .to(overlayLoad, {
  //   height: "100vh",
  //   duration: 0.8,
  //   ease: "power2.inOut"
  // });
}

document.querySelectorAll('.link-to-project, .go-text').forEach(link => {
  link.addEventListener('click', handlePageTransition);
});

function handleResponsive() {
  const gridProject = document.querySelector('.grid__project');
  const gridLink = document.querySelector('.link__nav.grid');
  const listLink = document.querySelector('.link__nav.list');

  function checkWidth() {
    if (window.innerWidth <= 991) {
      if (gridProject) {
        gsap.set(gridProject, { display: 'none' });
      }
      if (gridLink) {
        gridLink.style.display = 'none';
      }
      
      if (listLink && !listLink.classList.contains('active')) {
        listLink.click();
      }
    } else {
      if (gridProject) {
        gsap.set(gridProject, { display: 'grid' });
      }
      if (gridLink) {
        gridLink.style.display = 'block';
      }
    }
  }

  checkWidth();

  window.addEventListener('resize', checkWidth);
}

document.addEventListener('DOMContentLoaded', handleResponsive);

window.addEventListener('resize', () => {
  initializeListView();
});

