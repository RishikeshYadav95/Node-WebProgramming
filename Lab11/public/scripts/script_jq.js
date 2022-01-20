(function($) {
	// Let's start writing AJAX calls!
    var showList = $('#showList'),
        show = $('#show'),
        form = $('#searchForm'),
        homeLink = $('#homeLink'),
        error = $('#error')

    function bindEventsToTodoItem(todoItem) {
        todoItem.find('.finishItem').on('click', function(event) {
            event.preventDefault();
        });
    }

    $.ajax({
        type:"GET",
        url: `http://api.tvmaze.com/shows`,
        success: function (response) {
            error.hide();
            show.hide();
            homeLink.hide();
            console.log(response);
            showList.empty();
            response.forEach(element => {
                showList.append(`<li><a class="showElement" href="${element._links.self.href}">${element.name}</a></li>`);
                bindEventsToTodoItem
            });
            showList.show();
        }
    });

    form.submit(function(event) {
        event.preventDefault();
        var search = $('#search_term').val();
        if(search.length == 0 || search.split(" ").join("").length == 0){
            error.empty();
            error.append(`<p name="empty">Search term cannot be blank or empty spaces</p>`);
            error.show();
        }
        else{
            error.hide();
            show.hide();
            $.ajax({
                type:"GET",
                url: `http://api.tvmaze.com/search/shows?q=`+search,
                success: function (response) {
                    console.log(response);
                    showList.empty();
                    response.forEach(element => {
                        showList.append(
                        `<li><a class="showElement" href="${element.show._links.self.href}">${element.show.name}</a></li>`
                        )
                    });
                    showList.show();
                }
            });
            homeLink.show();
        }
    });

    showList.on('click', 'a', function(event){
        event.preventDefault();

        let href = $(this).attr("href");
        $.ajax({
            type: "GET",
            url: href,
            success: function(response){
                showList.hide();
                error.hide();
                show.empty();
                show.append("<h1>" + response.name + "</h1>");
                if (response.image && response.image.medium) {
                    show.append('<img src="' + response.image.medium + '"></img>');
                }
                else {
                    show.append('<img src="' + '/public/no_image.jpeg' + '"></img>');
                }
                show.append("<dl>");
                show.append("<dt>Language</dt>");
                if (response.language) {                
                    show.append("<dd>" + response.language + "</dd>");
                }
                else {
                    show.append("<dd>N/A</dd>");
                }
                show.append("<dt>Genres</dt>");
                if (response.genres.length > 0) {
                    show.append("<dd><ul>");
                    for (let i = 0; i < response.genres.length; i++) {
                        show.append(`<li>${response.genres[i]}</li>`);
                    }
                    show.append("</ul></dd>");
                }
                else {
                    show.append("<dd>N/A</dd>");
                }
                show.append("<dt>Average Rating</dt>");
                if (response.rating && response.rating.average) {
                    show.append("<dd>" + response.rating.average + "</dd>");
                }
                else {
                    show.append("<dd>N/A</dd>");
                }
                show.append("<dt>Network</dt>");
                if (response.network && response.network.name) {
                    show.append("<dd>" + response.network.name + "</dd><br>");
                }
                else {
                    show.append("<dd>N/A</dd><br>");
                }
                show.append("<dt>Summary</dt>");
                if (response.summary) {                
                    show.append("<dd>" + response.summary + "</dd>");
                }
                else {
                    show.append("<dd>N/A</dd><br>");
                }
                show.append("</dl>");
                show.show();
            }
        });
        homeLink.show();
    });
    
	
})(window.jQuery);