document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scroll Functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Ensures it scrolls to the top of the section
            });
        });
    });

    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');

    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            menu.classList.toggle('open'); // Toggles the "open" class to show/hide the menu
        });
    }

    // Example of a simple alert button (you can replace it with more complex JS interactions)
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            alert('You clicked the CTA button!');
        });
    }

    // Scroll-triggered animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate'); // Adds 'animate' class when in view
            }
        });
    }, {
        threshold: 0.1 // The element becomes visible when 10% of it is in the viewport
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
            modal.style.display = 'flex'; // Opens the modal
        });

        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none'; // Closes the modal
        });

        // Close modal if clicking outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Slider functionality
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${(i - index) * 100}%)`;
            slide.style.transition = 'transform 0.5s ease-in-out'; // Smooth transition for slide
        });
    }

    if (nextBtn && prevBtn && slides.length > 0) {
        // Next Button Event
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length; // Moves to the next slide
            showSlide(currentSlide);
        });

        // Previous Button Event
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Moves to the previous slide
            showSlide(currentSlide);
        });

        // Initialize the slider with the first slide
        showSlide(currentSlide);

        // Automatically move to the next slide every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000); // Change 5000ms to the desired interval time
    }
});
