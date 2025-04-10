// === script.js | IkoConnect ===
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ script.js is running!");

  // 🔹 Mobile Menu
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const body = document.body;

  if (hamburgerMenu && mobileMenu) {
    hamburgerMenu.addEventListener("click", (event) => {
      event.stopPropagation();
      mobileMenu.classList.toggle("open");
      body.classList.toggle("no-scroll");
    });

    document.addEventListener("click", (event) => {
      if (!mobileMenu.contains(event.target) && event.target !== hamburgerMenu) {
        if (mobileMenu.classList.contains("open")) {
          mobileMenu.classList.remove("open");
          body.classList.remove("no-scroll");
        }
      }
    });
  }

  // 🔹 Toast Notification
  const toast = document.getElementById("toast");
  const section = document.querySelector("section");

  if (toast && section) {
    const success = section.dataset.success === "true";
    const error = section.dataset.error === "true";

    if (success) {
      toast.textContent = "✅ Your message has been sent successfully!";
      toast.classList.add("show", "success");
    }

    if (error) {
      toast.textContent = "❌ Something went wrong. Please try again.";
      toast.classList.add("show", "error");
    }

    if (success || error) {
      setTimeout(() => toast.classList.remove("show", "success", "error"), 5000);
    }
  }
});
