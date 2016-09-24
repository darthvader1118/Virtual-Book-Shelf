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
      var titles = data.items[i].volumeInfo.title
      $('#searchResults').append("<h4>" + titles + "</h4>")
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
  

  return false;
}

$(document).on('click', '#submit-titleAuthor', bookSearch);