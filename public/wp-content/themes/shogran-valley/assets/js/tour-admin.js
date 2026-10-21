/**
 * Shogran Valley — Tour Admin JS
 * assets/js/tour-admin.js
 */
(function($){
    'use strict';

    var dayCount = parseInt($('#sv-days-count').val()) || 1;

    /* ===== PRICING TYPE TOGGLE ===== */
    function initPricingToggle() {
        $('.sv-pricing-radio').on('change', function(){
            $('.sv-pricing-option').removeClass('selected');
            $(this).closest('.sv-pricing-option').addClass('selected');
            var val = $(this).val();
            if (val === 'on_request') {
                $('#sv-price-row').hide();
                $('#sv-on-request-msg').show();
            } else {
                $('#sv-price-row').show();
                $('#sv-on-request-msg').hide();
            }
        });
        // Init on load
        var cur = $('input[name="sv_pricing_type"]:checked').val();
        if (cur === 'on_request') {
            $('#sv-price-row').hide();
            $('#sv-on-request-msg').show();
        }
    }

    /* ===== BADGE AUTO TEXT ===== */
    function initBadgeAuto() {
        var autoMap = {
            'featured':'Featured','popular':'Popular','sale':'SALE',
            'new':'New','seasonal':'Seasonal','bestseller':'Best Seller',
            'adventure':'Adventure','limited':'Limited Slots'
        };
        $('#sv-badge-type').on('change', function(){
            var txt = $('#sv-badge-text').val();
            if (!txt || Object.values(autoMap).indexOf(txt) !== -1) {
                $('#sv-badge-text').val(autoMap[$(this).val()] || '');
            }
        });
    }

    /* ===== ITINERARY: ADD STEP ===== */
    window.svAddStep = function(btn) {
        var dayBlock = $(btn).closest('.sv-day-block');
        var dayIdx   = dayBlock.data('day');
        var stepsList= dayBlock.find('.sv-steps-list');
        var row = $('<div class="sv-step-row">'+
            '<span class="sv-step-drag" title="Drag">&#8942;</span>'+
            '<input type="text" name="sv_itinerary['+dayIdx+'][steps][]" class="sv-input sv-step-input" placeholder="e.g. 5:00 AM — Pickup from Islamabad" />'+
            '<button type="button" class="sv-btn-remove-step" onclick="svRemoveStep(this)" title="Remove">&#x2715;</button>'+
        '</div>');
        stepsList.append(row);
        row.find('input').focus();
    };

    /* ===== ITINERARY: REMOVE STEP ===== */
    window.svRemoveStep = function(btn) {
        var row = $(btn).closest('.sv-step-row');
        var list = row.closest('.sv-steps-list');
        if (list.find('.sv-step-row').length > 1) {
            row.remove();
        } else {
            row.find('input').val('');
        }
    };

    /* ===== ITINERARY: ADD DAY ===== */
    window.svAddDay = function() {
        var idx = dayCount;
        dayCount++;
        $('#sv-days-count').val(dayCount);
        var block = $(
            '<div class="sv-day-block" data-day="'+idx+'">'+
                '<div class="sv-day-header">'+
                    '<span class="sv-day-handle" title="Drag">&#9776;</span>'+
                    '<span class="sv-day-num">Day '+(idx+1)+'</span>'+
                    '<input type="text" name="sv_itinerary['+idx+'][title]" class="sv-input sv-day-title-input" placeholder="e.g. Shogran to Siri Paye" />'+
                    '<button type="button" class="sv-btn-remove-day" onclick="svRemoveDay(this)">&#x2715; Remove Day</button>'+
                '</div>'+
                '<div class="sv-steps-list">'+
                    '<div class="sv-step-row">'+
                        '<span class="sv-step-drag">&#8942;</span>'+
                        '<input type="text" name="sv_itinerary['+idx+'][steps][]" class="sv-input sv-step-input" placeholder="e.g. 7:00 AM — Breakfast at hotel" />'+
                        '<button type="button" class="sv-btn-remove-step" onclick="svRemoveStep(this)">&#x2715;</button>'+
                    '</div>'+
                '</div>'+
                '<button type="button" class="sv-btn-add-step" onclick="svAddStep(this)">+ Add Step to Day '+(idx+1)+'</button>'+
            '</div>'
        );
        $('#sv-itinerary-days').append(block);
        block.find('.sv-day-title-input').focus();
        // Scroll to new day
        $('html,body').animate({ scrollTop: block.offset().top - 80 }, 300);
    };

    /* ===== ITINERARY: REMOVE DAY ===== */
    window.svRemoveDay = function(btn) {
        var days = $('#sv-itinerary-days .sv-day-block');
        if (days.length > 1) {
            $(btn).closest('.sv-day-block').remove();
            // Renumber visible days
            $('#sv-itinerary-days .sv-day-block').each(function(i){
                $(this).find('.sv-day-num').text('Day '+(i+1));
            });
            dayCount = $('#sv-itinerary-days .sv-day-block').length;
            $('#sv-days-count').val(dayCount);
        } else {
            alert('At least one day is required.');
        }
    };

    /* ===== PICKUP: ADD ROW ===== */
    window.svAddPickup = function() {
        var idx = $('#sv-pickup-list .sv-pickup-row').length;
        var row = $(
            '<div class="sv-pickup-row">'+
                '<input type="text" name="sv_pickup['+idx+'][city]" class="sv-input" style="width:150px" placeholder="City" />'+
                '<input type="text" name="sv_pickup['+idx+'][location]" class="sv-input" placeholder="Location e.g. Faizabad Interchange" />'+
                '<input type="text" name="sv_pickup['+idx+'][time]" class="sv-input" style="width:110px" placeholder="Time e.g. 5:00 AM" />'+
                '<button type="button" onclick="this.closest(\'.sv-pickup-row\').remove()" class="sv-btn-remove-step">&#x2715;</button>'+
            '</div>'
        );
        $('#sv-pickup-list').append(row);
        row.find('input').first().focus();
    };

    /* ===== QUICK ADD to textarea ===== */
    window.svQuickAdd = function(fieldName, text) {
        var ta = $('textarea[name="'+fieldName+'"]');
        var cur = ta.val().trim();
        ta.val(cur ? cur + '\n' + text : text);
        ta.focus();
    };

    /* ===== GALLERY MEDIA UPLOADER ===== */
    var mediaFrame;
    function initGalleryUploader() {
        $('#sv-upload-gallery-btn').on('click', function(e) {
            e.preventDefault();
            if (mediaFrame) { mediaFrame.open(); return; }
            mediaFrame = wp.media({
                title: 'Select Tour Photos',
                button: { text: 'Add to Gallery' },
                multiple: true,
                library: { type: 'image' }
            });
            mediaFrame.on('select', function(){
                var ids = [];
                $('#sv-gallery-ids').val().split(',').filter(Boolean).forEach(function(id){ ids.push(id.trim()); });

                mediaFrame.state().get('selection').each(function(attachment){
                    var a   = attachment.toJSON();
                    var id  = a.id;
                    if (ids.indexOf(String(id)) !== -1) return; // skip duplicates
                    ids.push(id);
                    var thumb = a.sizes && a.sizes.thumbnail ? a.sizes.thumbnail.url : a.url;
                    var item = $('<div class="sv-gallery-item" data-id="'+id+'">'+
                        '<img src="'+thumb+'" />'+
                        '<button type="button" class="sv-gallery-remove" onclick="svRemoveGalleryImg(this)">&#x2715;</button>'+
                    '</div>');
                    $('#sv-gallery-grid').append(item);
                });
                $('#sv-gallery-ids').val(ids.join(','));
            });
            mediaFrame.open();
        });
    }

    /* ===== GALLERY: REMOVE IMAGE ===== */
    window.svRemoveGalleryImg = function(btn) {
        var item = $(btn).closest('.sv-gallery-item');
        var removeId = String(item.data('id'));
        item.remove();
        var ids = $('#sv-gallery-ids').val().split(',').filter(function(i){ return i.trim() && i.trim() !== removeId; });
        $('#sv-gallery-ids').val(ids.join(','));
    };

    /* ===== AUTO SLUG from Title ===== */
    function initAutoSlug() {
        $('input[name="sv_title"]').on('blur', function(){
            var slugField = $('input[name="sv_slug"]');
            if (!slugField.val()) {
                var slug = $(this).val().toLowerCase()
                    .replace(/[^a-z0-9\s-]/g,'')
                    .trim().replace(/\s+/g,'-')
                    .replace(/-+/g,'-');
                slugField.val(slug);
            }
        });
    }

    /* ===== AUTO DURATION LABEL ===== */
    function initDurationAuto() {
        function updateLabel() {
            var labelField = $('input[name="sv_duration_label"]');
            if (labelField.val()) return; // user set manually
            var days   = parseInt($('input[name="sv_days"]').val()) || 1;
            var nights = parseInt($('input[name="sv_nights"]').val()) || 0;
            var label  = days + (days>1?' Days':' Day');
            if (nights > 0) label += ' / ' + nights + (nights>1?' Nights':' Night');
            labelField.attr('placeholder', label);
        }
        $('input[name="sv_days"], input[name="sv_nights"]').on('input', updateLabel);
        updateLabel();
    }

    /* ===== SORTABLE STEPS ===== */
    function initSortable() {
        $(document).on('sortcreate', '#sv-itinerary-days', function(){});
        // Make step rows sortable within each day
        function makeSortable() {
            $('.sv-steps-list').sortable({ handle: '.sv-step-drag', axis: 'y', tolerance: 'pointer' });
        }
        makeSortable();
        // Re-init when new day added
        var observer = new MutationObserver(makeSortable);
        observer.observe(document.getElementById('sv-itinerary-days'), { childList: true });
    }

    /* ===== TITLE SYNC ===== */
    function initTitleSync() {
        // Sync our title field with WP hidden title field
        $('input[name="sv_title"]').on('input', function(){
            var v = $(this).val();
            $('#title').val(v);
        });
    }

    /* ===== INIT ===== */
    $(document).ready(function(){
        initPricingToggle();
        initBadgeAuto();
        initGalleryUploader();
        initAutoSlug();
        initDurationAuto();
        initSortable();
        initTitleSync();
    });

})(jQuery);
