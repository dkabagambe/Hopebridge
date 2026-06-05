document.addEventListener('DOMContentLoaded', function () {

    // ── Hero Slider ──────────────────────────────────────────────────
    const heroEl = document.querySelector('#home .swiper');
    if (heroEl && typeof Swiper !== 'undefined') {
        new Swiper(heroEl, {
            loop: true,
            speed: 1000,
            autoplay: { delay: 5000, disableOnInteraction: false },
            effect: 'fade',
            fadeEffect: { crossFade: true },
            pagination: { el: heroEl.querySelector('.swiper-pagination'), clickable: true },
            navigation: {
                nextEl: heroEl.querySelector('.swiper-button-next'),
                prevEl: heroEl.querySelector('.swiper-button-prev'),
            },
        });
    }

    // ── Services Slider ──────────────────────────────────────────────
    if (document.querySelector('.services-swiper') && typeof Swiper !== 'undefined') {
        new Swiper('.services-swiper', {
            slidesPerView: 'auto',
            spaceBetween: 24,
            loop: true,
            grabCursor: true,
            autoplay: { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true },
            pagination: { el: '.services-pagination', clickable: true },
            navigation: { nextEl: '.services-next', prevEl: '.services-prev' },
        });
    }

    // ── Hamburger Menu ───────────────────────────────────────────────
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', function (e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        navMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ── Header hide/show on scroll ───────────────────────────────────
    const header = document.querySelector('.header');
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', function () {
            const current = window.pageYOffset;
            header.style.transform = (current > lastScroll && current > 100)
                ? 'translateY(-100%)' : 'translateY(0)';
            lastScroll = current <= 0 ? 0 : current;
        });
    }

    // ── Smooth anchor scrolling ──────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // ── Scroll animations ────────────────────────────────────────────
    const animated = document.querySelectorAll('.animate-fadeInUp, .animate-fadeIn, .animate-slideInLeft, .animate-slideInRight, .animate-scaleIn');
    if (animated.length) {
        animated.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        });
        new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 }).observe && animated.forEach(function (el) {
            new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 }).observe(el);
        });
    }

    // ── Stat counters ────────────────────────────────────────────────
    document.querySelectorAll('.stat-number').forEach(function (el) {
        new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting || el.classList.contains('counted')) return;
                el.classList.add('counted');
                obs.disconnect();
                const final = parseInt(el.innerText.replace(/\D/g, ''));
                const suffix = el.innerText.replace(/\d/g, '');
                let current = 0;
                const step = final / 100;
                const timer = setInterval(function () {
                    current += step;
                    if (current >= final) { current = final; clearInterval(timer); }
                    el.innerText = Math.floor(current) + suffix;
                }, 20);
            });
        }, { threshold: 0.5 }).observe(el);
    });

    // ── Gallery lightbox ─────────────────────────────────────────────
    const galleryImages = document.querySelectorAll('.gallery-item img');
    if (galleryImages.length) {
        const lb = document.createElement('div');
        lb.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:none;align-items:center;justify-content:center;z-index:9999;cursor:pointer';
        const lbImg = document.createElement('img');
        lbImg.style.cssText = 'max-width:90%;max-height:90%;object-fit:contain;border-radius:8px';
        lb.appendChild(lbImg);
        document.body.appendChild(lb);
        galleryImages.forEach(function (img) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function () {
                lbImg.src = this.src;
                lb.style.display = 'flex';
            });
        });
        lb.addEventListener('click', function () { lb.style.display = 'none'; });
    }

    // ── Blog filter ──────────────────────────────────────────────────
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            document.querySelectorAll('.blog-post').forEach(function (post) {
                post.style.display = (filter === 'all' || post.getAttribute('data-category') === filter) ? 'block' : 'none';
            });
        });
    });

    // ── Donate amount buttons ────────────────────────────────────────
    const customAmount = document.querySelector('.custom-amount');
    document.querySelectorAll('.amount-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.amount-btn').forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');
            if (customAmount) customAmount.value = this.getAttribute('data-amount');
        });
    });

    // ── Notification helper ──────────────────────────────────────────
    function showNotification(message, type) {
        const n = document.createElement('div');
        n.textContent = message;
        n.style.cssText = 'position:fixed;top:20px;right:20px;padding:1rem 1.5rem;background:' +
            (type === 'success' ? '#10b981' : '#ef4444') +
            ';color:white;border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.2);z-index:10000;font-family:Inter,sans-serif;transition:transform 0.3s ease;transform:translateX(110%)';
        document.body.appendChild(n);
        setTimeout(function () { n.style.transform = 'translateX(0)'; }, 50);
        setTimeout(function () {
            n.style.transform = 'translateX(110%)';
            setTimeout(function () { n.remove(); }, 300);
        }, 3000);
    }

    // ── Form validation ──────────────────────────────────────────────
    document.querySelectorAll('form').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;
            form.querySelectorAll('[required]').forEach(function (f) {
                if (!f.value.trim()) { valid = false; f.classList.add('error'); f.addEventListener('input', function () { this.classList.remove('error'); }, { once: true }); }
                else f.classList.remove('error');
            });
            showNotification(valid ? 'Submitted successfully!' : 'Please fill all required fields.', valid ? 'success' : 'error');
            if (valid) form.reset();
        });
    });

    // ── Share buttons ────────────────────────────────────────────────
    document.querySelectorAll('.share-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (navigator.share) { navigator.share({ title: document.title, url: location.href }); }
            else if (navigator.clipboard) { navigator.clipboard.writeText(location.href).then(function () { showNotification('Link copied!', 'success'); }); }
        });
    });

    // ── Resources search ─────────────────────────────────────────────
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const term = this.value.toLowerCase();
            document.querySelectorAll('.resource-item').forEach(function (item) {
                const title = (item.querySelector('.resource-title') || {}).textContent || '';
                const desc = (item.querySelector('.resource-description') || {}).textContent || '';
                item.style.display = (title + desc).toLowerCase().includes(term) ? '' : 'none';
            });
        });
    }

    // ── Print buttons ────────────────────────────────────────────────
    document.querySelectorAll('.print-btn').forEach(function (btn) {
        btn.addEventListener('click', function () { window.print(); });
    });

});
