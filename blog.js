function getBlogCategories(posts) {
    var categories = uniqueCategories([].concat(_.map(posts, 'categories')));
    return _.uniq(_.pullAll(categories, [null]));
}

function uniqueCategories(currentCategories) {
    var allUniqueCategories = [];
    _.forEach(currentCategories, function(val, key){
        if(val !== null && val !== undefined && val.length > 0) {
            _.forEach(val, function(category, key){
                if(!_.includes(allUniqueCategories, category)){
                    allUniqueCategories.push(category);
                }
            });
        }
    });
    return allUniqueCategories;
}

function getPostsByCategory(category_name){
    var post_categories = [];
    var all_posts = getAllPublishedPosts();
    var all_categories = getBlogCategories(all_posts);
    for (j = 0; j < all_posts.length; j++) {
        if($.inArray(category_name, all_posts[j].categories) > -1){
            post_categories.push(all_posts[j]);
        }
    }
    return post_categories;
}

function renderPostsPageData(){
    //check if tag is attached to path
    var query = window.location.search;
    if(query !== "") {
        var cat_name = query.split('=')[1];
        cat_name = cat_name.replace("%20", " ");
        var posts = getPostsByCategory(cat_name);
        var published_posts = posts.sortBy(function(o){ return moment(o.publish_date) }).reverse();
        renderPosts("#blog_container", "#blog_template", published_posts);
    } else {
        regularPostList();
    }
    
    show_content();
}

function regularPostList () {
    var posts = getAllPublishedPosts();
    var published_posts = posts.sortBy(function(o){ return moment(o.publish_date) }).reverse();
    renderPosts("#blog_container", "#blog_template", published_posts);
}

function renderPosts(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    $.each( collection , function( key, val ) {
        if (val.image_url.indexOf('missing.png') > -1) {
            val.post_image = "//codecloud.cdn.speedyrails.net/sites/5a678ccb6e6f647da50d0000/image/png/1519669755000/northside_blog_default.png";
        } else {
            val.post_image = val.image_url;
        }
        
        if(val.body.length > 100){
            val.description_short = val.body.substring(0,100) + "...";
        } else {
            val.description_short = val.body;
        }
        
        var date_blog = moment(val.publish_date).tz(getPropertyTimeZone());
        val.published_on = date_blog.format('MMM DD, YYYY');
        
        val.twitter_title = val.title + " via @DomainNORTHSIDE"

        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}
    
// function renderSearchPosts(container, template, collection, search){
//     var item_list = [];
//     var item_rendered = [];
//     var template_html = $(template).html();
//     var counter = 1;
//     Mustache.parse(template_html);   // optional, speeds up future uses
//     $.each( collection , function( key, val ) {
//         if (val.image_url.indexOf('missing.png') > -1) {
//             val.post_image = "//codecloud.cdn.speedyrails.net/sites/5a678ccb6e6f647da50d0000/image/png/1519669755000/northside_blog_default.png";
//         } else {
//             val.post_image = val.image_url;
//         }
        
//         if(val.body.length > 100){
//             val.description_short = val.body.substring(0,100) + "...";
//         } else {
//             val.description_short = val.body;
//         }

//         val.counter = counter;
//         var added_val = false;
//         if(val.tag !== null && val.tag !== undefined) {
//             //search through all the tags with query, if matches render
//             $.each( val.tag , function( key2, tag ) {
//                 if(!added_val){
//                     tag = tag.toLowerCase();
//                     search = search.toLowerCase();
//                     // console.log(key, "tag is", tag , "search is", search);
//                     if(tag.indexOf(search) > -1 || search.indexOf(tag) > -1) {
//                         // console.log("tag is", tag , "search is", search);
//                         var rendered = Mustache.render(template_html,val);
//                         item_rendered.push(rendered);
//                         counter = counter + 1;
//                         added_val = true;
//                     }
//                 }
//             });
//         }
//     });
    
//     if(item_rendered.length === 0) {
//         $("#no_posts").show();
//     }
    
//     $(container).show();
//     $(container).html(item_rendered.join(''));
// }