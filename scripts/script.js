const designBtn = document.getElementById("designBtn");
const aboutMeBtn = document.getElementById("aboutMeBtn");
const experienceTab = document.querySelector(".experience");
const worksTab = document.querySelector(".works");
const rendersSection = document.querySelector(".renders");

designBtn.addEventListener("click", () => {
  toggleTabs(worksTab, experienceTab);
  toggleButtons(designBtn, aboutMeBtn);
});

aboutMeBtn.addEventListener("click", () => {
  toggleTabs(experienceTab, worksTab);
  toggleButtons(aboutMeBtn, designBtn);
});

function toggleTabs(showTab, hideTab) {
  showTab.style.display = "flex";
  hideTab.style.display = "none";
}

function toggleButtons(activeBtn, inactiveBtn) {
  activeBtn.classList.add("active");
  inactiveBtn.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.opacity = "0";

    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 1500);
  }, 3500);

  const skillsSection = document.querySelector(".skills-section");
  const workButtons = document.querySelectorAll(".works-container button");
  workButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const relatedSectionId = button.getAttribute("data-related-section");
      const relatedSection = document.getElementById(relatedSectionId);

      if (relatedSectionId === "recipe-app") {
        skillsSection.style.backgroundColor = "#FFB03C";
      }

      document.getElementById("overviewContainer").style.display = "none";
      document.getElementById("detailContainer").style.display = "flex";
      document.getElementById("worksSection").style.display = "none";
      rendersSection.style.display = "none";

      document.querySelectorAll(".work").forEach((work) => {
        work.style.display = "none";
      });

      if (relatedSection) {
        relatedSection.style.display = "flex";
        relatedSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  document.getElementById("designReturnBtn").addEventListener("click", () => {
    const worksContainer = document.querySelector(".works-container");
    document.getElementById("overviewContainer").style.display = "flex";
    document.getElementById("detailContainer").style.display = "none";

    skillsSection.style.backgroundColor = "";

    document.querySelectorAll(".work").forEach((work) => {
      work.style.display = "none";
    });

    rendersSection.style.display = "grid";

    worksContainer.style.display = "grid";
  });

  const rendersReturnBtn = document.getElementById("rendersReturnBtn");
  const renderButtons = document.querySelectorAll(".renders-container button");
  const renderDescriptions = document.querySelectorAll(
    ".work.render-description"
  );

  rendersReturnBtn.style.display = "none";

  rendersReturnBtn.addEventListener("click", () => {
    rendersReturnBtn.style.display = "none";
    renderButtons.forEach((button) => {
      button.style.display = "grid";
    });
    renderDescriptions.forEach((section) => {
      section.style.display = "none";
    });
    document.querySelector(".renders-container").style.display = "grid";
    document.querySelector(".renders h3").style.display = "block";
  });

  renderButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const relatedSectionId = button.getAttribute("data-related-section");
      const relatedSection = document.getElementById(relatedSectionId);

      rendersReturnBtn.style.display = "flex";
      document.querySelector(".renders h3").style.display = "none";
      renderButtons.forEach((btn) => {
        btn.style.display = "none";
      });
      renderDescriptions.forEach((section) => {
        section.style.display = "none";
      });

      if (relatedSection) {
        relatedSection.style.display = "grid";
        relatedSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
