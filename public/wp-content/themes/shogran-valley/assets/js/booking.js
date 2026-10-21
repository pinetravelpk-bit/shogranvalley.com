/**
 * Shogran Valley — Booking JS
 * assets/js/booking.js
 */
(function () {
    'use strict';

    /* ===== PRICE ESTIMATOR ===== */
    function initPriceEstimator() {
        var personsSelect = document.getElementById('bf_persons');
        var estimateRow   = document.querySelector('.estimate-persons');
        var estPersons    = document.getElementById('est-persons');
        var estTotal      = document.getElementById('est-total');
        var priceInput    = document.querySelector('input[name="tour_price"]');

        if (!personsSelect || !priceInput) return;

        var pricePerPerson = parseInt(priceInput.value, 10) || 0;

        personsSelect.addEventListener('change', function () {
            var persons = parseInt(this.value, 10);
            if (!persons) { estimateRow && (estimateRow.style.display = 'none'); return; }

            var total = pricePerPerson * persons;
            if (estPersons) estPersons.textContent = persons;
            if (estTotal)   estTotal.textContent   = 'PKR ' + total.toLocaleString();
            if (estimateRow) estimateRow.style.display = '';
        });
    }

    /* ===== FORM VALIDATION ===== */
    function initFormValidation() {
        var form = document.querySelector('.shogran-booking-form');
        if (!form) return;

        // Custom validation styles
        form.addEventListener('submit', function (e) {
            var valid = true;
            var required = form.querySelectorAll('[required]');

            required.forEach(function (field) {
                field.style.borderColor = '';
                if (!field.value.trim() || (field.type === 'checkbox' && !field.checked)) {
                    field.style.borderColor = '#ef4444';
                    field.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.12)';
                    if (valid) { field.focus(); valid = false; }
                }
            });

            if (!valid) {
                e.preventDefault();
                // Scroll to first error
                var firstErr = form.querySelector('[style*="ef4444"]');
                if (firstErr) {
                    firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                // Show loading state on button
                var btn = form.querySelector('.btn-book-now');
                if (btn) {
                    btn.textContent = '⏳ Bhej rahe hain...';
                    btn.disabled = true;
                }
            }
        });

        // Clear error styles on input
        form.querySelectorAll('input, select, textarea').forEach(function (field) {
            field.addEventListener('input', function () {
                this.style.borderColor = '';
                this.style.boxShadow   = '';
            });
        });
    }

    /* ===== PHONE FORMATTER ===== */
    function initPhoneFormat() {
        var phoneInput = document.getElementById('bf_phone');
        if (!phoneInput) return;
        phoneInput.addEventListener('input', function () {
            // Allow only digits, +, -
            this.value = this.value.replace(/[^0-9+\-\s]/g, '');
        });
    }

    /* ===== MIN DATE for tour date ===== */
    function initMinDate() {
        var dateInput = document.getElementById('bf_date');
        if (!dateInput) return;
        var today = new Date();
        today.setDate(today.getDate() + 1); // min tomorrow
        var yyyy = today.getFullYear();
        var mm   = String(today.getMonth() + 1).padStart(2, '0');
        var dd   = String(today.getDate()).padStart(2, '0');
        dateInput.min = yyyy + '-' + mm + '-' + dd;
    }

    /* ===== SMOOTH SCROLL to form on "Book Now" clicks ===== */
    function initSelectorCardLinks() {
        // Already handled by anchor; this adds smooth behavior
        document.querySelectorAll('.selector-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                // Add loading state
                this.textContent = '⏳ Loading...';
            });
        });
    }

    /* ===== INIT ===== */
    document.addEventListener('DOMContentLoaded', function () {
        initPriceEstimator();
        initFormValidation();
        initPhoneFormat();
        initMinDate();
        initSelectorCardLinks();
    });

})();
