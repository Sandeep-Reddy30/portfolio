// Element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event listeners to navigation links
navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    const pageName = this.textContent.trim().toLowerCase();
    
    // Loop through all pages and navigation links
    pages.forEach(page => {
      if (page.dataset.page === pageName) {
        // Activate the clicked page
        page.classList.add("active");
        // Trigger animations for About section if applicable
        if (pageName === "about") {
          triggerAboutAnimations();
        }
      } else {
        // Deactivate other pages
        page.classList.remove("active");
        // Reset animations for non-active pages
        if (page.dataset.page === "about") {
          resetAnimations();
        }
      }
    });

    navigationLinks.forEach(navLink => {
      if (navLink.textContent.trim().toLowerCase() === pageName) {
        // Activate the clicked navigation link
        navLink.classList.add("active");
      } else {
        // Deactivate other navigation links
        navLink.classList.remove("active");
      }
    });
  });
});

// Intersection Observer for About section animations
function triggerAboutAnimations() {
  const sections = document.querySelectorAll(".animate-section");
  const observerOptions = {
    root: null,
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Keep observing to allow reanimation on scroll back
      } else {
        // Remove visible class to allow reanimation
        entry.target.classList.remove("visible");
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
}

// Reset animations for About section
function resetAnimations() {
  const sections = document.querySelectorAll(".animate-section");
  sections.forEach(section => {
    section.classList.remove("visible");
  });
}

// Trigger animations immediately if About page is active on load
if (document.querySelector(".about.active")) {
  // Delay slightly to ensure DOM is ready
  setTimeout(triggerAboutAnimations, 100);
}