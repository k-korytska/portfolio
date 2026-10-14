const designBtn = document.getElementById('designBtn');
const aboutMeBtn = document.getElementById('aboutMeBtn');
const experiencePanel = document.getElementById('experience-panel');
const worksPanel = document.getElementById('works-panel');

const blob = document.querySelector('#blob');
const curtain = document.querySelector('.curtain');
const scene = document.querySelector('.scene');

const revealSize = 380;
const followStrength = 0.001;
const startDelay = 600;

function toggleButtons(activeBtn, inactiveBtn) {
  activeBtn.classList.add('active');
  inactiveBtn.classList.remove('active');

  activeBtn.setAttribute('aria-selected', 'true');
  inactiveBtn.setAttribute('aria-selected', 'false');
}

function togglePanels(showTab, hideTab) {
  showTab.style.display = 'flex';
  hideTab.style.display = 'none';
}

if (designBtn && aboutMeBtn && worksPanel && experiencePanel) {
  designBtn.addEventListener('click', () => {
    togglePanels(worksPanel, experiencePanel);
    toggleButtons(designBtn, aboutMeBtn);
  });

  aboutMeBtn.addEventListener('click', () => {
    togglePanels(experiencePanel, worksPanel);
    toggleButtons(aboutMeBtn, designBtn);
  });
}

window.addEventListener('pageshow', () => {
  document.body.classList.remove('fade-out');
});

document.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');

    if (!href) return;

    if (href.startsWith('http') || href.startsWith('#')) {
      return;
    }

    e.preventDefault();

    document.body.classList.add('fade-out');

    setTimeout(() => {
      window.location.href = href;
    }, 300);
  });
});

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;

let hasMoved = false;
let startTime = 0;

// Initial position: 10% from the top and left
function setInitialPosition() {
  const rect = scene.getBoundingClientRect();

  currentX = rect.width * 0.1 + blob.offsetWidth / 2;
  currentY = rect.height * 0.1 + blob.offsetHeight / 2;

  targetX = currentX;
  targetY = currentY;

  blob.style.translate = `${currentX - blob.offsetWidth / 2 - rect.width * 0.1}px
     ${currentY - blob.offsetHeight / 2 - rect.height * 0.1}px`;
}

setInitialPosition();

window.addEventListener('pointermove', (event) => {
  const rect = scene.getBoundingClientRect();

  targetX = event.clientX - rect.left;
  targetY = event.clientY - rect.top;

  curtain.style.setProperty('--reveal-x', `${event.clientX - rect.left}px`);

  curtain.style.setProperty('--reveal-y', `${event.clientY - rect.top}px`);

  curtain.style.setProperty('--reveal-size', `${revealSize}px`);
  curtain.classList.add('is-active');

  if (!hasMoved) {
    hasMoved = true;
    startTime = performance.now();
  }
});

function animateCursor() {
  const rect = scene.getBoundingClientRect();

  if (hasMoved && performance.now() - startTime > startDelay) {
    currentX += (targetX - currentX) * followStrength;
    currentY += (targetY - currentY) * followStrength;
  }

  const x = currentX - blob.offsetWidth / 2 - rect.width * 0.1;
  const y = currentY - blob.offsetHeight / 2 - rect.height * 0.1;

  blob.style.translate = `${x}px ${y}px`;

  requestAnimationFrame(animateCursor);
}

animateCursor();
