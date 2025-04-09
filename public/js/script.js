// === script.js | IkoConnect ===
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ script.js is running!");
  
    // ================================
    // 🔹 Mobile Menu (Hamburger Toggle)
    // ================================
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    const body = document.body;
  
    if (hamburgerMenu && mobileMenu) {
      hamburgerMenu.addEventListener("click", (event) => {
        event.stopPropagation();
        mobileMenu.classList.toggle("open");
        body.classList.toggle("no-scroll");
        console.log(mobileMenu.classList.contains("open") ? "✅ Menu Opened" : "❌ Menu Closed");
      });
  
      document.addEventListener("click", (event) => {
        if (!mobileMenu.contains(event.target) && event.target !== hamburgerMenu) {
          if (mobileMenu.classList.contains("open")) {
            mobileMenu.classList.remove("open");
            body.classList.remove("no-scroll");
            console.log("❌ Mobile Menu Closed");
          }
        }
      });
    }
  
    // ========================
    // 🔹 Responsive Navbar
    // ========================
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
  
    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        console.log(navMenu.classList.contains("active") ? "✅ Nav Menu Opened" : "❌ Nav Menu Closed");
      });
    }
  
    // ============================
    // 🔹 Modal Functionality
    // ============================
    const modal = document.getElementById("myModal");
    const openModalBtn = document.getElementById("open-modal");
    const closeModalBtn = modal ? modal.querySelector(".close") : null;
  
    if (modal && openModalBtn && closeModalBtn) {
      openModalBtn.addEventListener("click", () => {
        modal.style.display = "flex";
        console.log("✅ Modal Opened");
      });
  
      closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
        console.log("❌ Modal Closed");
      });
  
      window.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.style.display = "none";
          console.log("❌ Modal Closed (Clicked Outside)");
        }
      });
  
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.style.display === "flex") {
          modal.style.display = "none";
          console.log("❌ Modal Closed (Escape Key)");
        }
      });
  
      console.log("✅ Modal functionality initialized!");
    } else {
      console.warn("⚠️ Modal elements not found. Check HTML structure.");
    }
  
    // ======================
    // 🔹 Hero Animation
    // ======================
    document.querySelectorAll(".hero h1, .hero p").forEach(el => {
      el.classList.add("fadeIn");
    });
  
    // ======================
    // 🔹 Smooth Scroll
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          console.log(`✅ Scrolling to ${this.getAttribute("href")}`);
        }
      });
    });
  });
  function showToast(message = "Done!", duration = 3000) {
    const toast = document.getElementById("toast");
    if (!toast) return;
  
    toast.textContent = message;
    toast.classList.add("show");
  
    setTimeout(() => {
      toast.classList.remove("show");
    }, duration);
  }  