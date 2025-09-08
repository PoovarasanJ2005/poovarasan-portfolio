'use strict';

// Utility: Add/remove .active on an element
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Sidebar toggle functionality for mobile
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


// Portfolio filter functionality (for both mobile select and desktop buttons)
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterSelect = document.querySelector("[data-select]");
const filterSelectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterItems = document.querySelectorAll("[data-filter-item]");

let lastClickedBtn = filterBtns[0];

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue.toLowerCase() === "all" || selectedValue.toLowerCase() === filterItems[i].dataset.category.toLowerCase()) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// Desktop filter button handler
filterBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        let selectedValue = this.innerText;
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);
        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
    });
});

// Mobile select box handler
if (filterSelect) {
  filterSelect.addEventListener("click", function () {
    elementToggleFunc(this);
  });

  filterSelectItems.forEach(item => {
      item.addEventListener("click", function () {
          let selectedValue = this.innerText;
          selectValue.innerText = this.innerText;
          filterFunc(selectedValue);
          elementToggleFunc(filterSelect);
      });
  });
}


// Contact form validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
    input.addEventListener("input", function () {
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }
    });
});


// Page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link, i) => {
    link.addEventListener("click", function () {
        const targetPage = this.innerHTML.toLowerCase();
        
        pages.forEach(page => {
            if (targetPage === page.dataset.page) {
                page.classList.add("active");
                window.scrollTo(0, 0);
            } else {
                page.classList.remove("active");
            }
        });

        navigationLinks.forEach(navLink => {
            navLink.classList.remove("active");
        });
        this.classList.add("active");
    });
});


// Avatar Image Modal Functionality
(() => {
  const avatarBtn = document.querySelector("[data-avatar-btn]");
  const modalContainer = document.querySelector("[data-image-modal-container]");
  const modalCloseBtn = document.querySelector("[data-image-modal-close-btn]");
  const overlay = document.querySelector("[data-image-overlay]");

  if (!avatarBtn || !modalContainer || !modalCloseBtn || !overlay) return;

  const openModal = () => {
    modalContainer.classList.add("active");
    overlay.classList.add("active");
  };

  const closeModal = () => {
    modalContainer.classList.remove("active");
    overlay.classList.remove("active");
  };

  avatarBtn.addEventListener("click", openModal);
  modalCloseBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("active")) {
      closeModal();
    }
  });
})();



// Spotlight Card Effect
document.querySelectorAll(".card-spotlight").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});



// Spotlight Card Effect
document.querySelectorAll(".card-spotlight").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});



// --- Profile Card Modal with all your requested features ---
const avatarImg = document.getElementById("sidebar-avatar");
const profileCardModal = document.getElementById("profile-card-modal");

if (avatarImg && profileCardModal) {
  const card = profileCardModal.querySelector(".pc-card");
  const shine = profileCardModal.querySelector(".pc-shine");
  const overlay = profileCardModal.querySelector(".profile-card-overlay");

  // Function to close the modal
  const closeModal = () => {
    profileCardModal.classList.remove("active");
    // Reset the card's tilt when it closes
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  // Show the modal when the mouse hovers over the small avatar
  avatarImg.addEventListener("mouseenter", () => {
    profileCardModal.classList.add("active");
  });

  // Hide the modal when the mouse leaves the entire modal area
  profileCardModal.addEventListener("mouseleave", closeModal);

  // Hide the modal when the overlay (the "balance area") is clicked
  overlay.addEventListener("click", closeModal);

  // Tilt effect for the card (this is the same shiny tilt effect from before)
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    shine.style.setProperty("--pointer-x", `${x}px`);
    shine.style.setProperty("--pointer-y", `${y}px`);
  });
}


