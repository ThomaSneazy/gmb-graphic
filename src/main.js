import './styles/style.css'

console.log('Hello KEZ')

const grid = document.querySelector('.grid__project');
const wrapper = document.querySelector('.page-wrapper');

let maxMoveX = (grid.offsetWidth - wrapper.offsetWidth) / 2;
let maxMoveY = (grid.offsetHeight - wrapper.offsetHeight) / 2;

let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;


///////////Test com 
wrapper.addEventListener('mousemove', (e) => {
  let mousePercentX = e.clientX / wrapper.offsetWidth;
  let mousePercentY = e.clientY / wrapper.offsetHeight;
  
  targetX = (mousePercentX - 0.5) * maxMoveX * 2.2;
  targetY = (mousePercentY - 0.5) * maxMoveY * 2.2;
});

function animate() {
  currentX += (targetX - currentX) * 0.09;
  currentY += (targetY - currentY) * 0.09;
  
  grid.style.transform = `translate(-50%, -50%) translate(${-currentX}px, ${-currentY}px)`;
  
  requestAnimationFrame(animate);
}

animate();