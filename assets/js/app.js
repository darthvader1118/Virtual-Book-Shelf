function bookSearch(){

  var search = $('#titleInput').val().trim();
  // parseSearch adds the + sign in between search words, might not need it
  var parseSearch = search.split(" ").join("+");

  console.log(parseSearch);

  $.ajax({
    url: 'https://www.googleapis.com/books/v1/volumes?q=' + search,
    type: 'GET',
    dataType: 'JSON',
    data: {param1: 'value1'},
    success: function(data) {
      for (var i = 0; i < data.items.length; i++) {
      var images = data.items[i].volumeInfo.imageLinks.smallThumbnail;
      var titles = data.items[i].volumeInfo.title;
      var authors = data.items[i].volumeInfo.authors;
      var description = data.items[i].volumeInfo.description;
      var price = data.items[i].saleInfo.retailPrice;
      var bookTitle = $('<div>').addClass('thisBook');
      bookTitle.attr({'data-images': images}).attr({'data-description': description}).attr({'data-price': price}).attr({'data-title': titles}).attr({'data-author': authors});
      bookTitle.append("<h4>" + titles + "</h4>" + " <h5>" + authors + "</h5>");
      $('#searchResults').append(bookTitle);
    }

    }

    
  })
  .done(function() {
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
  
   $('#titleInput').val(" ");

  return false;


}


$(document).on('click', '#submit-titleAuthor', bookSearch);

// When user selects from Search Results
$(document).on('click', '.thisBook', function(){
  $('#searchResults').empty();
  console.log($(this).data('title'));
  var cover = $("<img height='200px'>");
  var img = $(this).data('images');

  cover.attr('src', img).addClass('coverCSS bookInfo');
  $('.bookshelf-panel').append(cover);
});

//Clicking books on shelf to grab info
$(document).on('click', '.bookInfo', function(){
  // var title2 = $(this).data('titles')
});
