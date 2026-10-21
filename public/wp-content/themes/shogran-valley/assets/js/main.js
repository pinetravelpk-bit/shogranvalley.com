/**
 * Shogran Valley Theme — assets/js/main.js
 */
(function () {
    'use strict';

    /* ===== MOBILE MENU ===== */
    function initMobileMenu() {
        var toggle = document.querySelector('.menu-toggle');
        var nav    = document.getElementById('nav-links');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', function () {
            var open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        // Close on outside click
        document.addEventListener('click', function (e) {
            if (!toggle.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ===== SEARCH TABS ===== */
    function initSearchTabs() {
        var tabs = document.querySelectorAll('.search-tab');
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(function (t) {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
            });
        });
    }

    /* ===== HERO SEARCH ===== */
    function initHeroSearch() {
        var btn  = document.getElementById('hero-search-btn');
        var dest = document.getElementById('hero-destination');
        if (!btn || !dest) return;
        btn.addEventListener('click', function () {
            var q = dest.value.trim();
            if (q) {
                window.location.href = (shogranAjax && shogranAjax.homeUrl ? shogranAjax.homeUrl : '/') + '?s=' + encodeURIComponent(q);
            }
        });
        dest.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') btn.click();
        });
    }

    /* ===== PRODUCT FILTER TABS ===== */
    function initProductTabs() {
        var tabBtns = document.querySelectorAll('.tabs-nav .tab-btn');
        var cards   = document.querySelectorAll('#products-grid .product-card');
        if (!tabBtns.length) return;

        tabBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                tabBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                var filter = btn.getAttribute('data-filter') || 'all';
                cards.forEach(function (card) {
                    if (filter === 'all' || card.getAttribute('data-type') === filter) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    /* ===== SCROLL REVEAL ===== */
    function initReveal() {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.reveal').forEach(function (el) {
                el.classList.add('visible');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal').forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ===== BACK TO TOP ===== */
    function initBackTop() {
        var btn = document.getElementById('back-top');
        if (!btn) return;

        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        }, { passive: true });

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ===== STICKY NAV ===== */
    function initStickyNav() {
        var nav = document.getElementById('navbar');
        if (!nav) return;
        window.addEventListener('scroll', function () {
            nav.style.boxShadow = window.scrollY > 20
                ? '0 4px 30px rgba(0,0,0,0.3)'
                : '0 2px 20px rgba(0,0,0,0.2)';
        }, { passive: true });
    }

    /* ===== LAZY IMAGES FALLBACK ===== */
    function initLazyImages() {
        if ('loading' in HTMLImageElement.prototype) return; // native support
        var imgs = document.querySelectorAll('img[loading="lazy"]');
        if (!imgs.length) return;
        // Dynamically load lazysizes if needed
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    /* ===== SMOOTH ANCHOR LINKS ===== */
    function initSmoothAnchors() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    /* ===== INIT ===== */
    document.addEventListener('DOMContentLoaded', function () {
        initMobileMenu();
        initSearchTabs();
        initHeroSearch();
        initProductTabs();
        initReveal();
        initBackTop();
        initStickyNav();
        initLazyImages();
        initSmoothAnchors();
    });

})();
