document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ script.js is running!");

    /** 🔹 Fix Mobile Menu Toggle */
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    const body = document.body;

    if (hamburgerMenu && mobileMenu) {
        hamburgerMenu.addEventListener("click", () => {
            mobileMenu.classList.toggle("open");
            body.classList.toggle("no-scroll");
            console.log(mobileMenu.classList.contains("open") ? "✅ Menu Opened" : "❌ Menu Closed");
        });
    } else {
        console.error("❌ Hamburger menu elements not found!");
    }

    /** 🔹 Modal Functionality (Fixed) */
    function initializeModal() {
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
            console.warn("⚠️ Modal elements not found.");
        }
    }

    initializeModal();

    /** 🔹 Fix Smooth Scroll */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
                console.log(`✅ Scrolling to ${this.getAttribute("href")}`);
            }
        });
    });
});
