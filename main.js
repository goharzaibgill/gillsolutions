document.addEventListener('DOMContentLoaded', () => {
    // Advanced Intersection Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const appearObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .stagger-child, section').forEach(el => {
        el.classList.add('reveal');
        appearObserver.observe(el);
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Interactive Card Click Effect
    document.querySelectorAll('.interactive-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.add('clicked-green');
            setTimeout(() => {
                card.classList.remove('clicked-green');
            }, 200);
        });
    });

    // Sticky Navbar Toggle
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Stats Counter with Delay
    const stats = document.querySelectorAll('.stat-number');
    const startCounters = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            let count = 0;
            const duration = 2000;
            const startTime = performance.now();

            const updateCount = (timestamp) => {
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / duration, 1);
                // Ease out cubic
                const ease = 1 - Math.pow(1 - percentage, 3);
                stat.innerText = Math.floor(ease * target) + '+';
                
                if (percentage < 1) {
                    requestAnimationFrame(updateCount);
                }
            };
            requestAnimationFrame(updateCount);
        });
    };

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(startCounters, 300);
                statsObserver.unobserve(statsSection);
            }
        });
        statsObserver.observe(statsSection);
    }

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Enhanced fade-in animations on page load
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Portfolio Filtering with Animation
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.innerText.toLowerCase().trim();
                const items = document.querySelectorAll('.portfolio-item');
                
                items.forEach(item => {
                    item.style.transform = 'scale(0.8)';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        const category = item.getAttribute('data-category')?.toLowerCase().trim();
                        // Smarter matching for descriptive categories
                        const isAll = filter.includes('all');
                        const isMatch = filter.includes(category) || (category && category.includes(filter));

                        if (isAll || isMatch) {
                            item.style.display = 'flex';
                            setTimeout(() => {
                                item.style.transform = 'scale(1)';
                                item.style.opacity = '1';
                            }, 50);
                        } else {
                            item.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    }

    // FAQ Accordion with smooth height
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Particles.js Initialization
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#3B82F6" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#3B82F6",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 3,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    // Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.shimmer-btn, .btn-primary, .cta-btn, .btn-secondary');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // Lightbox Logic
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);

    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-secondary')) return;
            const imgSrc = item.querySelector('img').src;
            const img = document.createElement('img');
            img.src = imgSrc;
            while (lightbox.firstChild) lightbox.removeChild(lightbox.firstChild);
            lightbox.appendChild(img);
            lightbox.classList.add('active');
        });
    });

    lightbox.addEventListener('click', () => lightbox.classList.remove('active'));

    // Scroll-to-Top Logic
    const scrollTop = document.createElement('div');
    scrollTop.className = 'scroll-top';
    scrollTop.innerHTML = '↑';
    document.body.appendChild(scrollTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) scrollTop.classList.add('show');
        else scrollTop.classList.remove('show');
    });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Grain Effect Overlay
    const grain = document.createElement('div');
    grain.className = 'grain-overlay';
    document.body.appendChild(grain);
});
