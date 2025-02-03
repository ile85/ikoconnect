document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll Functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    const body = document.body;

    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            menu.classList.toggle('open'); // Toggle menu visibility
            body.classList.toggle('no-scroll'); // Prevent scrolling when menu is open
        });
    }

    // Call-to-Action (CTA) Buttons
    document.querySelectorAll('.cta-btn').forEach(button => {
        button.addEventListener('click', () => {
            alert('You clicked a CTA button!');
        });
    });

    // Scroll-triggered animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate'); // Adds 'animate' class when in view
            }
        });
    }, {
        threshold: 0.2 // The element becomes visible when 20% of it is in the viewport
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Modal functionality
    const modal = document.getElementById('myModal');
    const openModalBtn = document.getElementById('open-modal');
    const closeModalBtn = document.querySelector('.close');

    if (openModalBtn && modal && closeModalBtn) {
        openModalBtn.addEventListener('click', () => {
            modal.style.display = 'flex'; // Open modal
        });

        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none'; // Close modal
        });

        // Close modal if clicking outside the content
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
    }

    // Testimonial Slider (Improved)
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${(i - index) * 100}%)`;
            slide.style.transition = 'transform 0.5s ease-in-out';
        });
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    if (nextBtn && prevBtn && slides.length > 0) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });

        // Initialize slider
        showSlide(currentSlide);
        startAutoSlide();

        // Pause on hover
        document.querySelector('.slider').addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        document.querySelector('.slider').addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
});
