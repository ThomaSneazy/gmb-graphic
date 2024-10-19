import './styles/style.css'

console.log('Hello KEZ')


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

function adjustGridItemSizes() {
  const gridItems = document.querySelectorAll('.grid__item');
  
  gridItems.forEach((item, index) => {
    const aspect = item.getAttribute('data-aspect');
    let gridArea = item.style.gridArea.split(' / ');
    
    if (aspect === 'portrait') {
      gridArea[2] = 'span 5';
      gridArea[3] = 'span 3';
    } else if (aspect === 'landscape') {
      gridArea[2] = 'span 4';
      gridArea[3] = 'span 5';
    }
    
    item.style.gridArea = gridArea.join(' / ');
  });
}

// Appelez cette fonction après que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
  adjustGridItemSizes();
  
  setTimeout(() => {
    isAnimationEnabled = true;
  }, 5000);
});
