function init(e){
    $('<div class="modal-backdrop custom_backdrop"><div class="loader">Loading...</div></div>').appendTo(document.body);
    
    $('.menu_toggler').click(function(){
        $('#navbar').slideToggle();
        if ($('.menu_toggler').attr('src') == '//codecloud.cdn.speedyrails.net/sites/58bdb9106e6f644783090000/image/png/1489683413000/mobile_menu.png'){
            $('.menu_toggler').attr('src', '//codecloud.cdn.speedyrails.net/sites/58bdb9106e6f644783090000/image/png/1489685283000/closeicon.png')
        }else{
            $('.menu_toggler').attr('src', '//codecloud.cdn.speedyrails.net/sites/58bdb9106e6f644783090000/image/png/1489683413000/mobile_menu.png')
        }
    })
    
    $(window).scroll(function(e){
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
    //Click event to scroll to top
	$('.scrollToTop').click(function(e){
		$('html, body').animate({scrollTop : 0},800);
		e.preventDefault();
	});
	
	$('.accordion_header').click(function(e){
        $(this).find('i').toggleClass('fa-caret-down fa-caret-up');
	});
	
    get_instagram("//northside.mallmaverick.com/api/v2/northside/social.json", 9, 'thumbnail', render_instagram)
    
    blog_searcher();
    
    // $('#subForm').submit(function(e){
    //     e.preventDefault();
    //     if($("#agree_newsletter").is(':checked')){
    //         $.getJSON(
    //             this.action + "?callback=?",
    //             $(this).serialize(),
    //             function (data) {
    //                 if (data.Status === 400) {
    //                     alert("An error occured while processing your request. Please try again later.");
    //                 } else { // 200
    //                     $("#subscription_confirmed").fadeIn();
    //                     $('#subscription_confirmed').delay(2000).fadeOut();
    //                     $('#subForm').trigger('reset');
    //                 }
    //         });
    //     }
    //     else{
    //         $("#agree_newsletter").focus();
    //         alert("Please agree to receive newsletter before continuing.")
    //     }
    // });
}

function render_instagram(data){
    $('#instafeed').html(data)
}

function show_content(){
    $('.yield').fadeIn();
    $(".modal-backdrop").remove();
    var windowWidth = $(window).width();
    if(windowWidth <= 1024) {
         $('.panel-collapse').removeClass('in')
    }
}

$('.category_selector').click(function(e){
    $('.dropdown-menu .cat_list').css('display', 'block');
});
        
function show_cat_stores(){
    $('.show_cat_stores').click(function(e){
        var cat_id = $(this).attr('data-id');
        var cat_name = $(this).attr('name');
        var rows = $('.cats_row');
        if(cat_id != "000") {
            rows.hide();
            // $('#cat_name').text($(this).text());
            // $('#cat_name').css('display', 'block');
            $.each(rows, function(i, val){
                var cat_array = val.getAttribute('data-cat').split(',');
                if ($.inArray(cat_id, cat_array) >= 0){
                    $(val).show();
                }
            });
        } else {
            rows.show();
            $.each($('.store_initial'), function(i, val){
                if ($(val).text().length > 0){
                    $(val).show();
                } 
            });
            $('#cat_name').hide();    
        }
        $('.dropdown-menu .cat_list').css('display', 'none');
        $('#store_cat_list').html(cat_name + '<span class="dropdown_arrow"><img src="//codecloud.cdn.speedyrails.net/sites/58bdb9106e6f644783090000/image/png/1489097373000/Expand Arrow.png" alt=""></span>');
        $('html, body').animate({scrollTop : 0},800);
        e.preventDefault();
    });
}

function jobs_filter(){
    $('.filter_jobs').click(function(e){
        $('#no_jobs_in_filter').text("")
        var filter_id = $(this).attr('data-id');
        $('.active_filter').removeClass('active_filter');
        $(this).addClass('active_filter');
        $('#current_filter').text($(this).text());
        var rows = $('.filter_row');
        if (filter_id == "all"){
            rows.show();
        } else{
            rows.hide();
            $.each(rows, function(i, val){
                var filter_array = val.getAttribute('data-job-type').split('/');
                if ($.inArray(filter_id, filter_array) >= 0){
                    $(val).show();
                }
            });
        }
        if($('.filter_row:hidden').length == rows.length){
            $('#no_jobs_in_filter').text("There are currently no " + filter_id + " jobs available, please check back again later.")
        }
    });
}

function get_day(id){
    switch(id) {
        case 0:
            return ("Sunday");
            break;
        case 1:
            return ("Monday");
            break;
        case 2:
            return ("Tuesday");
            break;
        case 3:
            return ("Wednesday");
            break;
        case 4:
            return ("Thursday");
            break;
        case 5:
            return ("Friday");
            break;
        case 6:
            return ("Saturday");
            break;
    }
}


function convert_hour(d){
    var h = (d.getUTCHours());
    var m = addZero(d.getUTCMinutes());
    var s = addZero(d.getUTCSeconds());
    if (h >= 12) {
        if ( h != 12) {
            h = h - 12;    
        }
        
        i = "pm"
    } else {
        i = "am"
    }
    return h+":"+m+i;
}



function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function get_month (id){
    var month = "";
    switch(id) {
        case 0:
            month = "Jan";
            break;
        case 1:
            month = "Feb";
            break;
        case 2:
            month = "Mar";
            break;
        case 3:
            month = "Apr";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "Jun";
            break;
        case 6:
            month = "Jul";
            break;
        case 7:
            month = "Aug";
            break;
        case 8:
            month = "Sep";
            break;
        case 9:
            month = "Oct";
            break;
        case 10:
            month = "Nov";
            break;
        case 11:
            month = "Dec";
            break;
            
    }
    return month;
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function drop_pin(id){
    map.marksHide();
    var coords = map.get_coords(id);
    var height = parseInt(coords["height"]);
    var width = parseInt(coords["width"]);
    var x_offset = (parseInt(width) / 2);
    var y_offset = (parseInt(height) / 2);
    map.setMarks([{ xy: [coords["x"] - 27 + x_offset, coords["y"] - 72 + y_offset],
        attrs: {
            src:  '//codecloud.cdn.speedyrails.net/sites/58bdb9106e6f644783090000/image/png/1492031824000/northside_map_pin-01.png'
        }
    }]);
    map.setViewBox(id);
    $('#btnZoomIn').click()
}

function load_map(reg, store_details){
    this_region = {};
    this_region = store_details.svgmap_region;
    map = $('#mapsvg_store_detail').mapSvg({
        source: getSVGMapURL(),    // Path to SVG map
        colors: {stroke: '#aaa', hover: 0, selected: '#a4a8d1'},
        disableAll: true,
        height:335,
        width:848,
        regions: reg,
        tooltipsMode:'custom',
        loadingText: "loading...",
        zoom: true,
        zoomButtons: {'show': false,'location': 'left' },
        pan:true,
        cursor:'pointer',
        responsive:true,
        zoomLimit: [0,5],
        viewBox:[420,420,1650,1650]
    });
    map.setViewBox(store_details.svgmap_region);
    map.selectRegion(store_details.svgmap_region);
    drop_pin(store_details.svgmap_region);
}

function load_store_map(reg, store_details){
    this_region = {};
    this_region = store_details.svgmap_region;
    map = $('#mapsvg_store_detail').mapSvg({
        source: getSVGMapURL(),    // Path to SVG map
        colors: {stroke: '#aaa', hover: 0},
        disableAll: true,
        height:335,
        width:848,
        regions: reg,
        tooltipsMode:'custom',
        loadingText: "loading...",
        zoom: true,
        zoomButtons: {'show': true,'location': 'left' },
        pan:true,
        cursor:'pointer',
        responsive:true,
        zoomLimit: [0,5],
        viewBox:[420,420,1650,1650]
    });
    // map.setViewBox(store_details.svgmap_region);
    map.selectRegion(store_details.svgmap_region);
    drop_pin(store_details.svgmap_region);
}

function init_map(reg){
    map = $('#mapsvg').mapSvg({
        source: getSVGMapURL(),    // Path to SVG map
        colors: {stroke: '#aaa'},
        disableAll: true,
        height:800,
        width:1140,
        regions: reg,
        tooltipsMode:'custom',
        loadingText: "loading...",
        zoom: true,
        zoomButtons: {'show': true,'location': 'right' },
        pan:true,
        panLimit:true,
        cursor:'pointer',
        responsive:true,
        zoomLimit: [0,10],
        viewBox:[420,420,1650,1650]
    });
}


function verify_captcha(response){
    var secret_key = "6LeCLhETAAAAAH8koFeWonL5g_kkYrSp8gcsrRjO";
    var data = {"secret_key": secret_key, "g-recaptcha-response": response }
}

function blog_searcher(){
    $('#close_search').click(function(){
        $(this).hide();
        $('#search_results_stores').html('');
        $('#search_results_events').html('');
        $('#search_results_promotions').html('');
        $('#search_results_stores').hide();
        $('#search_results_events').hide();
        $('#search_results_promotions').hide();
        $('#site_search').val('')
    });
    $('#site_search').keyup(function(){
        if ($('#site_search').val() == ""){
            $('#search_results_stores').html('');
            $('#search_results_events').html('');
            $('#search_results_promotions').html('');
            $('#search_results_stores').hide();
            $('#search_results_events').hide();
            $('#search_results_promotions').hide();
            $('#close_search').hide();
        }
        else{
            $('#close_search').show();
            $('#search_results_stores').html('');
            $('#search_results_events').html('');
            $('#search_results_promotions').html('');
            
            var val = $(this).val().toLowerCase();
            
            results = getSearchResults(val);
            var s_stores = results.stores;
            var s_events = results.events;
            var s_promos = results.promotions;
            
            if(s_stores !=undefined && s_stores.length > 0){
                var h2_stores = "<h2 id='open_stores' class='li_open'>(" +s_stores.length + ") Stores<i class='pull-right fa fa-chevron-down'></i></h2>";
                $('#search_results_stores').append(h2_stores);
                $.each(s_stores, function(i, v){
                    var div_stores = "<div class='blog_search_results collapse_open_stores'>";
                    div_stores = div_stores + "<h4><a href='/stores/" + v.slug + "'>" + v.name + "</a></h4>";
                    div_stores = div_stores + "</div>";
                    $('#search_results_stores').append(div_stores);
                    $('#search_results_stores').show();
                });
            }
            if(s_promos != undefined && s_promos.length > 0){
                var h2_promotions = "<h2 id='open_promotions' class='li_open'>(" +s_promos.length + ") Promotions<i class='pull-right fa fa-chevron-down'></i></h2>";
                $('#search_results_promotions').append(h2_promotions);
                $.each(s_promos, function(i, v){
                    var div = "<div class='blog_search_results collapse_open_promotions'>";
                    div = div + "<h4><a href='/promotions/" + v.slug + "'>" + v.name + "</a></h4>";
                    div = div + "</div>";
                    $('#search_results_promotions').append(div);
                    $('#search_results_promotions').show();
                });
            }   
            if(s_events != undefined && s_events.length > 0){
                var h2_events = "<h2 id='open_events' class='li_open'>(" +s_events.length + ") Events<i class='pull-right fa fa-chevron-down'></i></h2>";
                $('#search_results_stores').append(h2_events);
                $.each(s_events, function(i, v){
                    var div = "<div class='blog_search_results collapse_open_events'>";
                    div = div + "<h4><a href='/events/" + v.slug + "'>" + v.name + "</a></h4>";
                    div = div + "</div>";
                    $('#search_results_stores').append(div);
                    $('#search_results_stores').show();
                });
            }
            
            
            
            $('.li_open').click(function(){
                var collapse = ".collapse_" + $(this).attr('id');
                if($(this).hasClass('open')){
                    $(collapse).slideUp('fast');
                    $(this).removeClass('open');
                }
                else{
                    $(this).addClass('open');
                    $(collapse).slideDown('fast');
                }
                
            })
            
        }
    });
}

function in_my_time_zone(hour, format){
    return hour.tz(getPropertyTimeZone()).format(format)
}

function store_search() {
    $('#close_search_results').click(function(){
        $(this).hide();
        $('#store_search_img').show();
        $('#store_search_results').html('');
        $('#store_search_results').hide();
        $('#store_search').val('')
    });
    $('#store_search').keyup(function(){
        if ($('#store_search').val() == ""){
            $('#store_search_results').html('');
            $('#store_search_results').hide();
            $('#close_search_results').hide();
        } else {
            $('#store_search_img').hide();
            $('#close_search_results').show();
            $('#store_search_results').html('');
            
            var val = $(this).val().toLowerCase();
            var results = getSearchResults(val);
            var s_stores = results.stores;
            
            if(s_stores != undefined && s_stores.length > 0){
                $.each(s_stores, function(i, v){
                    var div_stores = "<div class='store_search_list'>";
                    div_stores = div_stores + "<h4><a href='/stores/" + v.slug + "'>" + v.name + "</a></h4>";
                    div_stores = div_stores + "</div>";
                    $('#store_search_results').append(div_stores);
                    $('#store_search_results').show();
                });
            }
        }
    });
}

function submit_contest(slug) {
    var contest_entry = {};
    var contest_data = {};
    contest_data.first_name = $('#first_name').val();
    contest_data.last_name = $('#last_name').val();
    contest_data.email = $('#email').val();
    contest_data.phone = $('#phone_number').val();
    contest_data.postal_code = $('#zip_code').val();
    contest_data.age = $('#age').val();
    contest_data.gender = $('#gender').val();
    contest_data.newsletter = $('#newsletter_signup').prop("checked");
    
    contest_entry.contest = contest_data;
    
    var propertyDetails = getPropertyDetails();
    var host = propertyDetails.mm_host.replace("http:", "");
    var action = host + "/contests/" + slug + "/create_js_entry"
    $.ajax({
        url : action,
        type: "POST",
        data : contest_entry,
        success: function(data){
           $('#succes_msg').show();
           $('.contest_btn').prop('disabled', false);
           $('#contest_form').trigger('reset');
        },
        error: function (data){
            alert('An error occured while processing your request. Please try again later!')
        }
    });
}

var default_image = {
    "image_url" : "//codecloud.cdn.speedyrails.net/sites/58bdb9106e6f644783090000/image/png/1490119146000/northside_logo_default.png",
}
var promo_default = {
    "image_url" : "//codecloud.cdn.speedyrails.net/sites/58bdb9106e6f644783090000/image/jpeg/1490102972000/promo_default.jpg"
}

function getAssetURL(id){
    var store_id = id
    var store_assets = JSON.parse("//northside.mallmaverick.com/api/v4/northside/stores/" + store_id + "/store_files.json");
    console.log(store_assets)
    // $.each(store_assets, function(key, val){
    //     var url = val.url
    //     console.log(url);
    // });
    // var asset_url = "//www.mallmaverick.com" + JSON.parse(store_assets.url);
    // console.log(asset_url)
    // return asset_url;
}