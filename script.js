// Preloader Logic
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Update progress text when complete
            progressText.textContent = 'Portfolio Ready!';
            
            // Hide preloader after delay
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                
                // Initialize main animations after preloader is hidden
                setTimeout(initializeMainAnimations, 300);
            }, 800);
        }
        progressFill.style.width = `${progress}%`;
    }, 150);
});

function initializeMainAnimations() {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: 0.8,
        smartphone: {
            smooth: true
        },
        tablet: {
            smooth: true
        }
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Link ScrollTrigger with Locomotive Scroll
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
            return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
    });

    // Update ScrollTrigger when Locomotive Scroll updates
    scroll.on("scroll", ScrollTrigger.update);

    // Refresh ScrollTrigger when window resizes
    setTimeout(() => {
        scroll.update();
        ScrollTrigger.refresh();
    }, 500);

    // Hero Section Animation
    gsap.from(".hero-name", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out"
    });

    gsap.from(".hero-title", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
        ease: "power3.out"
    });

    gsap.from(".scroll-indicator", {
        opacity: 0,
        duration: 1,
        delay: 1.5,
        ease: "power2.out"
    });

    gsap.from(".hero-image", {
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out"
    });

    // Section Title Animations
    gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                scroller: "[data-scroll-container]",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // About Content Animation
    gsap.from(".about-content", {
        scrollTrigger: {
            trigger: ".about-content",
            scroller: "[data-scroll-container]",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out"
    });

    // Skills Grid Animation
    gsap.utils.toArray(".skill-item").forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                scroller: "[data-scroll-container]",
                start: "top 90%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out"
        });
    });

    // Timeline Item Animations
    gsap.utils.toArray(".timeline-item").forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                scroller: "[data-scroll-container]",
                start: "top 90%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            x: -30,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power2.out"
        });
    });

    // Language Items Animation
    gsap.utils.toArray(".language-item").forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                scroller: "[data-scroll-container]",
                start: "top 90%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            delay: i * 0.2,
            ease: "back.out(1.7)"
        });
    });

    // Contact Form Animation
    gsap.from(".contact-content", {
        scrollTrigger: {
            trigger: ".contact-content",
            scroller: "[data-scroll-container]",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out"
    });

    // CV Download Button Animation
    gsap.from(".cv-download", {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: 2,
        ease: "back.out(1.7)"
    });

    // Handle Contact Form Submission (Non-functional)
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('.btn');
        
        // Show a simple alert (in production, this would be replaced with actual form submission)
        alert('Thank you for your message. In a production environment, this form would send your message.');
        
        // Button feedback animation
        gsap.to(btn, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
        
        // Reset form
        this.reset();
    });

    // Refresh ScrollTrigger on resize
    window.addEventListener('resize', () => {
        scroll.update();
        ScrollTrigger.refresh();
    });
}