document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        gsap.to(preloader, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                preloader.style.display = 'none';
            }
        });
    });

    // Initialize GSAP SplitText if available
    let splitHeroTitle, splitHeroSubtitle;
    try {
        splitHeroTitle = new SplitText('.hero-title', { type: 'chars, words' });
        splitHeroSubtitle = new SplitText('.hero-subtitle', { type: 'chars, words' });
    } catch(e) {
        console.warn('SplitText not available, falling back to standard animations');
    }

    // GSAP Animations for Hero Section
    const heroTimeline = gsap.timeline();
    
    if (splitHeroTitle && splitHeroSubtitle) {
        // Animation with SplitText
        heroTimeline.from(splitHeroTitle.chars, {
            opacity: 0,
            y: 100,
            rotationX: -90,
            stagger: 0.03,
            duration: 0.8,
            ease: "back.out(1.7)"
        })
        .from(splitHeroSubtitle.chars, {
            opacity: 0,
            y: 50,
            stagger: 0.02,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, "-=0.4");
    } else {
        // Fallback animation without SplitText
        heroTimeline.from(".hero-title", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "back.out(1.7)"
        })
        .from(".hero-subtitle", {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, "-=0.4");
    }
    
    heroTimeline.from(".hero-buttons .btn", {
        opacity: 0,
        scale: 0.8,
        y: 30,
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out(1.7)"
    }, "-=0.4")
    .from(".scroll-indicator", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out"
    }, "-=0.2");

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Scroll-triggered animations using GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Section title animations
    gsap.from('.section-title', {
        scrollTrigger: {
            trigger: '.upcoming-events',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "back.out(1.5)"
    });

    gsap.from('.gallery-heading', {
        scrollTrigger: {
            trigger: '.past-events',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "back.out(1.5)"
    });

    // Three.js Particle Background - with error handling
    try {
        initParticles();
    } catch (error) {
        console.warn("Could not initialize particle background", error);
    }

    function initParticles() {
        const particleContainer = document.getElementById('particle-container');
        if (!particleContainer || !window.THREE) return;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        particleContainer.appendChild(renderer.domElement);
        
        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 1000; // Reduced count for better performance
        
        const posArray = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.01,
            color: 0x2705d1, // Updated to match accent color
            transparent: true,
            blending: THREE.AdditiveBlending,
            opacity: 0.5 // Reduced opacity
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        camera.position.z = 3;
        
        // Mouse movement effect
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Resize handler
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.0001; // Slower rotation
            particlesMesh.rotation.y += 0.0002;
            
            // Follow mouse movement - reduced intensity
            particlesMesh.rotation.x += mouseY * 0.0001;
            particlesMesh.rotation.y += mouseX * 0.0001;
            
            renderer.render(scene, camera);
        };
        
        animate();
    }

    // Example of adding event cards dynamically
    const eventCards = document.querySelector('.event-cards');
    const events = [
        { title: 'Music Fest', date: '2023-11-10', image: 'event1.jpg' },
        { title: 'Art Exhibition', date: '2023-11-15', image: 'event2.jpg' },
        { title: 'Tech Conference', date: '2023-11-20', image: 'event3.jpg' }
    ];

    events.forEach((event, index) => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index * 100).toString());
        card.innerHTML = `
            <img src="assets/images/events/${event.image}" alt="${event.title}">
            <h3>${event.title}</h3>
            <p>${event.date}</p>
            <button class="btn btn-accent">Register Now</button>
        `;
        eventCards.appendChild(card);
    });

    // Initialize VanillaTilt for 3D card effect if available
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll(".event-card"), {
            max: 15,
            speed: 300,
            glare: true,
            "max-glare": 0.3,
            scale: 1.05
        });
    }

    // Enhanced Gallery slider animation
    const slider = document.querySelector('.gallery-track');
    const slides = document.querySelectorAll('.gallery-item');
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');
    const indicators = document.querySelectorAll('.gallery-indicators .indicator');
    let currentPosition = 0;
    
    // Set initial active state
    function setActiveSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        // Calculate the translation value
        const slideWidth = slides[0].offsetWidth;
        const translateValue = -index * slideWidth;
        
        // Apply the translation with a smooth transition
        gsap.to(slider, {
            x: translateValue,
            duration: 0.6,
            ease: "power2.out"
        });
    }
    
    // Set up slide navigation
    prevButton.addEventListener('click', () => {
        stopGalleryAutoplay();
        currentPosition = (currentPosition > 0) ? currentPosition - 1 : slides.length - 1;
        setActiveSlide(currentPosition);
        startGalleryAutoplay();
    });
    
    nextButton.addEventListener('click', () => {
        stopGalleryAutoplay();
        currentPosition = (currentPosition < slides.length - 1) ? currentPosition + 1 : 0;
        setActiveSlide(currentPosition);
        startGalleryAutoplay();
    });
    
    // Set up indicator navigation
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopGalleryAutoplay();
            currentPosition = index;
            setActiveSlide(currentPosition);
            startGalleryAutoplay();
        });
    });
    
    // Set up autoplay for gallery
    let galleryInterval;
    
    function startGalleryAutoplay() {
        galleryInterval = setInterval(() => {
            currentPosition = (currentPosition < slides.length - 1) ? currentPosition + 1 : 0;
            setActiveSlide(currentPosition);
        }, 5000);
    }
    
    function stopGalleryAutoplay() {
        clearInterval(galleryInterval);
    }
    
    // Initialize the gallery
    setActiveSlide(0);
    startGalleryAutoplay();
    
    // Stop autoplay when user interacts with the gallery
    const galleryContainer = document.querySelector('.gallery-container');
    galleryContainer.addEventListener('mouseenter', stopGalleryAutoplay);
    galleryContainer.addEventListener('mouseleave', startGalleryAutoplay);
    
    // Add swipe functionality for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    galleryContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    galleryContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next slide
            stopGalleryAutoplay();
            currentPosition = (currentPosition < slides.length - 1) ? currentPosition + 1 : 0;
            setActiveSlide(currentPosition);
            startGalleryAutoplay();
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right - previous slide
            stopGalleryAutoplay();
            currentPosition = (currentPosition > 0) ? currentPosition - 1 : slides.length - 1;
            setActiveSlide(currentPosition);
            startGalleryAutoplay();
        }
    }

    // Initialize AOS
    if (window.AOS) {
        AOS.init({
            duration: 1000,
            once: true,
            mirror: false
        });
    }
});

// Make sure particle container doesn't block interactions
window.addEventListener('load', () => {
    const particleContainer = document.getElementById('particle-container');
    if (particleContainer) {
        particleContainer.style.pointerEvents = 'none';
    }
    
    // Force scroll to top on page load
    window.scrollTo(0, 0);
});