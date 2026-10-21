/**
 * Shogran Valley — Hotel Frontend JS
 * assets/js/hotel-front.js
 */
(function () {
    'use strict';

    /* ===== SET PHOTO (detail page) ===== */
    window.hfSetPhoto = function (el, url) {
        var main = document.getElementById('hf-main-photo');
        if (main) main.src = url;
        document.querySelectorAll('.hf-thumb').forEach(function (t) { t.classList.remove('active'); });
        if (el) el.classList.add('active');
    };

    /* ===== UPDATE PRICE ESTIMATE (detail page) ===== */
    window.hfUpdatePrice = function (sel) {
        var price   = parseInt(sel.options[sel.selectedIndex].dataset.price) || 0;
        var est     = document.getElementById('hf-estimate');
        var checkin = document.getElementById('hb-checkin');
        var checkout= document.getElementById('hb-checkout');
        if (!price || !checkin || !checkout || !checkin.value || !checkout.value) return;
        var nights = Math.max(1, (new Date(checkout.value) - new Date(checkin.value)) / 86400000);
        document.getElementById('hf-est-label').textContent   = sel.options[sel.selectedIndex].text.split('—')[0].trim();
        document.getElementById('hf-est-rate').textContent    = 'Rs. ' + price.toLocaleString() + '/night';
        document.getElementById('hf-est-nights').textContent  = nights;
        document.getElementById('hf-est-sub').textContent     = 'Rs. ' + (price * nights).toLocaleString();
        document.getElementById('hf-est-total').textContent   = 'Rs. ' + (price * nights).toLocaleString();
        if (est) est.style.display = 'block';
    };

    /* ===== LISTING PAGE FILTER ===== */
    var activeAmenities = [];

    window.hfToggleAmenity = function (btn) {
        var am = btn.dataset.amenity;
        btn.classList.toggle('active');
        if (activeAmenities.indexOf(am) !== -1) {
            activeAmenities = activeAmenities.filter(function (a) { return a !== am; });
        } else {
            activeAmenities.push(am);
        }
        hfFilter();
    };

    window.hfFilter = function () {
        var cityEl  = document.getElementById('hf-filter-city');
        var starsEl = document.getElementById('hf-filter-stars');
        var sortEl  = document.getElementById('hf-filter-sort');
        var city    = cityEl  ? cityEl.value  : '';
        var stars   = starsEl ? parseInt(starsEl.value) || 0 : 0;
        var sort    = sortEl  ? sortEl.value  : 'popular';

        var cards   = Array.from(document.querySelectorAll('.hf-hotel-card'));
        var visible = 0;

        cards.forEach(function (c) {
            var cs   = parseInt(c.dataset.stars)  || 0;
            var cc   = c.dataset.city || '';
            var cams = (c.dataset.amenities || '').split(',');
            var show = true;

            if (city  && cc !== city)  show = false;
            if (stars && cs < stars)   show = false;
            if (activeAmenities.length) {
                activeAmenities.forEach(function (a) {
                    if (cams.indexOf(a) === -1) show = false;
                });
            }
            c.style.display = show ? '' : 'none';
            if (show) visible++;
        });

        // Sort visible cards
        var grid   = document.getElementById('hf-hotels-grid');
        var sorted = cards.filter(function (c) { return c.style.display !== 'none'; });
        sorted.sort(function (a, b) {
            if (sort === 'price_asc')  return parseInt(a.dataset.price)  - parseInt(b.dataset.price);
            if (sort === 'price_desc') return parseInt(b.dataset.price)  - parseInt(a.dataset.price);
            if (sort === 'rating')     return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
            return 0;
        });
        sorted.forEach(function (c) { grid.appendChild(c); });

        var rc = document.getElementById('hf-results-count');
        if (rc) rc.textContent = visible + ' hotel' + (visible !== 1 ? 's' : '') + ' found';
    };

    /* ===== INIT ===== */
    document.addEventListener('DOMContentLoaded', function () {

        /* Min dates */
        var d   = new Date(); d.setDate(d.getDate() + 1);
        var min = d.toISOString().split('T')[0];

        // Listing page dates
        var lci = document.getElementById('hf-filter-checkin');
        var lco = document.getElementById('hf-filter-checkout');
        if (lci) { lci.min = min; lci.addEventListener('change', function () { if (lco) lco.min = this.value; }); }
        if (lco) lco.min = min;

        // Detail page dates
        var dci = document.getElementById('hb-checkin');
        var dco = document.getElementById('hb-checkout');
        if (dci) {
            dci.min = min;
            dci.addEventListener('change', function () {
                if (dco) dco.min = this.value;
                var rt = document.getElementById('hb-room-type');
                if (rt && rt.value) hfUpdatePrice(rt);
            });
        }
        if (dco) {
            dco.min = min;
            dco.addEventListener('change', function () {
                var rt = document.getElementById('hb-room-type');
                if (rt && rt.value) hfUpdatePrice(rt);
            });
        }

        /* Sticky tabs (detail page) */
        var tabs = document.querySelectorAll('.hf-tab');
        var secs = ['hf-overview', 'hf-rooms', 'hf-amenities', 'hf-policies', 'hf-location', 'hf-reviews', 'hf-photos'];
        if (tabs.length) {
            window.addEventListener('scroll', function () {
                var cur = '';
                secs.forEach(function (id) {
                    var el = document.getElementById(id);
                    if (el && window.scrollY >= el.offsetTop - 160) cur = id;
                });
                tabs.forEach(function (a) {
                    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
                });
            }, { passive: true });
        }
    });

})();
