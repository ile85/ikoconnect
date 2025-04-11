// === script.js | IkoConnect ===

// Wait for the DOM to fully load
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

  // 🔹 Disable submit button and show spinner
  const form = document.querySelector("form");
  const submitBtn = document.getElementById("submit-btn");

  if (form && submitBtn) {
    form.addEventListener("submit", () => {
      const text = submitBtn.querySelector(".text");
      const spinner = submitBtn.querySelector(".spinner");

      submitBtn.disabled = true;
      text.style.display = "none";
      spinner.style.display = "inline";
    });
  }

  // 🔹 Toast Logic
  const toast = document.getElementById("toast");
  const section = document.querySelector("section");

  const showToast = (msg, type = "success") => {
    if (!toast) return;

    toast.innerHTML = `
      <span class="icon">${type === "success" ? "✅" : "❌"}</span>
      <span>${msg}</span>
    `;
    toast.classList.add("show", type);

    setTimeout(() => {
      toast.classList.remove("show", type);
    }, 5000);
  };

  if (section) {
    const success = section.dataset.success === "true";
    const error = section.dataset.error === "true";

    if (success) showToast("✅ Your message has been sent successfully!", "success");
    if (error) showToast("❌ Something went wrong. Please try again.", "error");
  }

  // 🔹 Live Markdown Preview (Admin Panel)
  
  const markdownInput = document.getElementById("markdown");
  const previewBox = document.getElementById("markdown-preview");
  
  if (markdownInput && previewBox) {
    markdownInput.addEventListener("input", async () => {
      const markdown = markdownInput.value;
  
      // 🔹 Додај fade ефект пред да се смени содржината
      previewBox.style.opacity = 0.5;
  
      try {
        const res = await fetch("/api/markdown-preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ markdown }),
        });
  
        const data = await res.json();
        previewBox.innerHTML = data.html;
  
        // 🔹 Fade назад до нормална видливост после update
        setTimeout(() => {
          previewBox.style.opacity = 1;
        }, 100);
  
      } catch (err) {
        previewBox.innerHTML = "<p style='color:red'>❌ Failed to render preview</p>";
        previewBox.style.opacity = 1; // осигури се дека не останува полупроѕирен
      }
    });
  }  
});
