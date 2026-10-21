/* hotel-admin.js */
(function($){
    var roomCount = parseInt($('#sh-room-count').val())||1;

    // Amenity checkbox visual
    $(document).on('change','.sh-amenity-item input',function(){
        $(this).closest('.sh-amenity-item').toggleClass('checked',this.checked);
    });

    // Auto slug from name
    $('input[name="sh_name"]').on('blur',function(){
        var sf = $('input[name="sh_slug"]');
        if(!sf.val()){
            sf.val($(this).val().toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-'));
        }
        $('#title').val($(this).val());
    });
    $('input[name="sh_name"]').on('input',function(){ $('#title').val($(this).val()); });

    // Add room
    window.shAddRoom = function(){
        var ri = roomCount; roomCount++;
        var block = $('<div class="sh-room-block" data-room="'+ri+'">'+
            '<div class="sh-room-header">'+
                '<span class="sh-room-num">Room Type '+(ri+1)+'</span>'+
                '<input type="text" name="sh_rooms['+ri+'][name]" class="sh-input sh-room-name-input" placeholder="e.g. Deluxe Suite"/>'+
                '<button type="button" class="sh-btn-remove-room" onclick="shRemoveRoom(this)">✕ Remove</button>'+
            '</div>'+
            '<div class="sh-room-body">'+
                '<div class="sh-field-row">'+
                    '<div class="sh-field"><label class="sh-label">Max Guests</label><input type="number" name="sh_rooms['+ri+'][capacity]" value="2" class="sh-input" min="1"/></div>'+
                    '<div class="sh-field"><label class="sh-label">Bed Type</label><input type="text" name="sh_rooms['+ri+'][beds]" class="sh-input" placeholder="e.g. 1 King Bed"/></div>'+
                    '<div class="sh-field"><label class="sh-label">Total Rooms</label><input type="number" name="sh_rooms['+ri+'][total]" value="5" class="sh-input" min="1"/></div>'+
                    '<div class="sh-field"><label class="sh-label">Room Size</label><input type="text" name="sh_rooms['+ri+'][size]" class="sh-input" placeholder="e.g. 350 sq ft"/></div>'+
                '</div>'+
                '<div class="sh-pricing-section"><div class="sh-section-label-sm">💰 Rates (PKR/night)</div>'+
                '<div class="sh-field-row">'+
                    '<div class="sh-field"><label class="sh-label">Weekday</label><div class="sh-input-prefix-wrap"><span class="sh-input-prefix">Rs.</span><input type="number" name="sh_rooms['+ri+'][base_rate]" value="8000" class="sh-input sh-input-with-prefix" min="0" step="100"/></div></div>'+
                    '<div class="sh-field"><label class="sh-label">Weekend</label><div class="sh-input-prefix-wrap"><span class="sh-input-prefix">Rs.</span><input type="number" name="sh_rooms['+ri+'][weekend_rate]" value="10000" class="sh-input sh-input-with-prefix" min="0" step="100"/></div></div>'+
                    '<div class="sh-field"><label class="sh-label">Peak Season</label><div class="sh-input-prefix-wrap"><span class="sh-input-prefix">Rs.</span><input type="number" name="sh_rooms['+ri+'][peak_rate]" value="12000" class="sh-input sh-input-with-prefix" min="0" step="100"/></div></div>'+
                    '<div class="sh-field"><label class="sh-label">Promo Rate</label><div class="sh-input-prefix-wrap"><span class="sh-input-prefix">Rs.</span><input type="number" name="sh_rooms['+ri+'][promo_rate]" value="0" class="sh-input sh-input-with-prefix" min="0" step="100"/></div></div>'+
                '</div></div>'+
                '<div class="sh-field"><label class="sh-label">Room Description</label><textarea name="sh_rooms['+ri+'][desc]" rows="2" class="sh-textarea" placeholder="Brief description..."></textarea></div>'+
                '<div class="sh-field"><label class="sh-label">Facilities (comma separated)</label><input type="text" name="sh_rooms['+ri+'][facilities]" class="sh-input" placeholder="WiFi, Hot Water, TV, Mountain View"/></div>'+
            '</div>'+
        '</div>');
        $('#sh-rooms-list').append(block);
        $('#sh-room-count').val(roomCount);
        block.find('.sh-room-name-input').focus();
        $('html,body').animate({scrollTop:block.offset().top-80},300);
    };

    window.shRemoveRoom = function(btn){
        var blocks = $('#sh-rooms-list .sh-room-block');
        if(blocks.length>1){ $(btn).closest('.sh-room-block').remove(); }
        else { alert('At least one room type required.'); }
    };

    // Add review
    window.shAddReview = function(){
        var ri = $('#sh-reviews-list .sh-review-row').length;
        var row = $('<div class="sh-review-row">'+
            '<div class="sh-field-row">'+
                '<div class="sh-field"><label class="sh-label">Guest Name</label><input type="text" name="sh_reviews['+ri+'][name]" class="sh-input" placeholder="Ahmad Khan"/></div>'+
                '<div class="sh-field"><label class="sh-label">City</label><input type="text" name="sh_reviews['+ri+'][city]" class="sh-input" placeholder="Islamabad"/></div>'+
                '<div class="sh-field"><label class="sh-label">Rating</label><select name="sh_reviews['+ri+'][rating]" class="sh-select"><option value="5">5 Stars</option><option value="4">4 Stars</option><option value="3">3 Stars</option></select></div>'+
                '<div class="sh-field"><label class="sh-label">Date</label><input type="text" name="sh_reviews['+ri+'][date]" class="sh-input" placeholder="March 2025"/></div>'+
                '<button type="button" class="sh-btn-remove-step" onclick="this.closest(\'.sh-review-row\').remove()" style="margin-top:22px">✕</button>'+
            '</div>'+
            '<div class="sh-field"><textarea name="sh_reviews['+ri+'][text]" rows="2" class="sh-textarea" placeholder="Review text..."></textarea></div>'+
        '</div>');
        $('#sh-reviews-list').append(row);
        row.find('input').first().focus();
    };

    // Gallery uploader
    var mediaFrame;
    $('#sh-upload-btn').on('click',function(e){
        e.preventDefault();
        if(mediaFrame){ mediaFrame.open(); return; }
        mediaFrame = wp.media({title:'Select Hotel Photos',button:{text:'Add to Gallery'},multiple:true,library:{type:'image'}});
        mediaFrame.on('select',function(){
            var ids = $('#sh-gallery-ids').val().split(',').filter(Boolean);
            mediaFrame.state().get('selection').each(function(att){
                var a=att.toJSON(); var id=String(a.id);
                if(ids.indexOf(id)!==-1) return;
                ids.push(id);
                var thumb=a.sizes&&a.sizes.thumbnail?a.sizes.thumbnail.url:a.url;
                var first = ids.length===1;
                var item=$('<div class="sh-gallery-item" data-id="'+id+'">'+
                    '<img src="'+thumb+'"/>'+
                    (first?'<span class="sh-gallery-badge-first">★</span>':'')+
                    '<button type="button" class="sh-gallery-remove" onclick="shRemovePhoto(this)">✕</button>'+
                '</div>');
                $('#sh-gallery-grid').append(item);
            });
            $('#sh-gallery-ids').val(ids.join(','));
        });
        mediaFrame.open();
    });

    window.shRemovePhoto = function(btn){
        var item=$(btn).closest('.sh-gallery-item');
        var removeId=String(item.data('id'));
        item.remove();
        var ids=$('#sh-gallery-ids').val().split(',').filter(function(i){ return i.trim()&&i.trim()!==removeId; });
        $('#sh-gallery-ids').val(ids.join(','));
    };

})(jQuery);
