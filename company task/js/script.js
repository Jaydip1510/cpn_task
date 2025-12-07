document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. NAVIGATION & OVERLAY MENU
       ========================================= */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeBtn = document.getElementById('closeBtn');
    const menuOverlay = document.getElementById('menuOverlay');
    const overlayLinks = document.querySelectorAll('.overlay-nav a');

    // Function to Open Menu
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Disable background scrolling
        });
    }

    // Function to Close Menu
    const closeMenu = () => {
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Enable background scrolling
        }
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    // Close menu when clicking any link inside it
    overlayLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    /* =========================================
       2. HERO SLIDER (Auto-Play + Controls)
       ========================================= */
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('nextSlide');
    const prevBtn = document.getElementById('prevSlide');
    const dots = document.querySelectorAll('.dot');

    let currentSlide = 0;
    let heroInterval;
    const heroAutoPlayTime = 5000; // 5 seconds per slide

    // Only run if slides exist
    if (slides.length > 0) {

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');

            currentSlide = (index + slides.length) % slides.length;

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextHeroSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevHeroSlide() {
            goToSlide(currentSlide - 1);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextHeroSlide();
                resetHeroTimer();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevHeroSlide();
                resetHeroTimer();
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.slide);
                goToSlide(index);
                resetHeroTimer();
            });
        });

        function startHeroTimer() {
            heroInterval = setInterval(nextHeroSlide, heroAutoPlayTime);
        }

        function resetHeroTimer() {
            clearInterval(heroInterval);
            startHeroTimer();
        }

        startHeroTimer();
    }


    /* =========================================
       3. TOUR SECTION: DRAGGABLE + AUTO SLIDER
       ========================================= */
    const tourSlider = document.getElementById('tourSlider');
    let isDown = false;
    let startX;
    let scrollLeft;
    let tourInterval;
    const tourScrollAmount = 325; // Card width (300) + Gap (25)
    const tourSpeed = 2000; // Scroll every 3 seconds

    if (tourSlider) {

        // --- AUTO PLAY LOGIC ---
        function startTourAutoPlay() {
            tourInterval = setInterval(() => {
                // Check if we reached the end
                const maxScrollLeft = tourSlider.scrollWidth - tourSlider.clientWidth;

                if (tourSlider.scrollLeft >= maxScrollLeft - 10) {
                    // Reset to start smoothly
                    tourSlider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Scroll next
                    tourSlider.scrollBy({ left: tourScrollAmount, behavior: 'smooth' });
                }
            }, tourSpeed);
        }

        function stopTourAutoPlay() {
            clearInterval(tourInterval);
        }

        // Start Auto Play on Load
        startTourAutoPlay();


        // --- DRAG INTERACTION ---
        tourSlider.addEventListener('mousedown', (e) => {
            stopTourAutoPlay(); // Pause on interaction
            isDown = true;
            tourSlider.classList.add('active');
            startX = e.pageX - tourSlider.offsetLeft;
            scrollLeft = tourSlider.scrollLeft;
        });

        tourSlider.addEventListener('mouseleave', () => {
            isDown = false;
            tourSlider.classList.remove('active');
            startTourAutoPlay(); // Resume on leave
        });

        tourSlider.addEventListener('mouseup', () => {
            isDown = false;
            tourSlider.classList.remove('active');
            startTourAutoPlay(); // Resume on release
        });

        tourSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - tourSlider.offsetLeft;
            const walk = (x - startX) * 2;
            tourSlider.scrollLeft = scrollLeft - walk;
        });

        // Pause on Hover (Optional but recommended for UX)
        tourSlider.addEventListener('mouseenter', stopTourAutoPlay);
    }

    /* =========================================
           5. PORTFOLIO SECTION: VIEW ALL BUTTON
           ========================================= */
    const viewAllBtn = document.getElementById('viewAllBtn');
    const hiddenItems = document.querySelectorAll('.grid-item.initially-hidden');

    if (viewAllBtn && hiddenItems.length > 0) {
        viewAllBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Reveal hidden items
            hiddenItems.forEach(item => {
                // 1. Make visible (display: block/relative)
                item.classList.remove('initially-hidden');

                // 2. Set opacity 0 initially for fade-in effect
                item.style.opacity = '0';

                // 3. Trigger reflow
                void item.offsetWidth;

                // 4. Fade in
                item.style.opacity = '1';
            });

            // Hide the button
            this.style.display = 'none';
        });
    }


    /* =========================================
       6. TESTIMONIALS SECTION: DRAGGABLE SLIDER
       ========================================= */
    const testSlider = document.getElementById('testimonialSlider');
    let isTestDown = false;
    let startTestX;
    let scrollTestLeft;

    if (testSlider) {
        testSlider.addEventListener('mousedown', (e) => {
            isTestDown = true;
            testSlider.classList.add('active');
            startTestX = e.pageX - testSlider.offsetLeft;
            scrollTestLeft = testSlider.scrollLeft;
        });

        testSlider.addEventListener('mouseleave', () => {
            isTestDown = false;
            testSlider.classList.remove('active');
        });

        testSlider.addEventListener('mouseup', () => {
            isTestDown = false;
            testSlider.classList.remove('active');
        });

        testSlider.addEventListener('mousemove', (e) => {
            if (!isTestDown) return;
            e.preventDefault();
            const x = e.pageX - testSlider.offsetLeft;
            const walk = (x - startTestX) * 2; 
            testSlider.scrollLeft = scrollTestLeft - walk;
        });
    }

    /* =========================================
       7. FAQ ACCORDION
       ========================================= */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            
            // Toggle active class
            item.classList.toggle('active');
            
            // Optional: Close others (Accordion behavior)
            /* document.querySelectorAll('.faq-item').forEach(otherItem => {
                if(otherItem !== item) otherItem.classList.remove('active');
            });
            */
        });
    });
});