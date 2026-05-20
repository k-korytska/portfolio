const designBtn = document.getElementById('designBtn');
const aboutMeBtn = document.getElementById('aboutMeBtn');
const experiencePanel = document.getElementById('experience-panel');
const worksPanel = document.getElementById('works-panel');

function toggleButtons(activeBtn, inactiveBtn) {
  activeBtn.classList.add('active');
  inactiveBtn.classList.remove('active');

  activeBtn.setAttribute('aria-selected', 'true');
  inactiveBtn.setAttribute('aria-selected', 'false');
}

// function togglePanels(activePanel, inactivePanel) {
//   activePanel.hidden = false;
//   inactivePanel.hidden = true;
// }

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
