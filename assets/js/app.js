// Initialize Firebase
var config = {
  apiKey: "AIzaSyBeB0EnQ2TZwhzZMhlN3361_lpqjD3Dtv4",
  authDomain: "book-shelf-e0c52.firebaseapp.com",
  databaseURL: "https://book-shelf-e0c52.firebaseio.com",
  storageBucket: "book-shelf-e0c52.appspot.com",
  messagingSenderId: "768420248928"
};
firebase.initializeApp(config);

var database = firebase.database();
console.log("Firebase");

// FIREBASE NOT COMPLETE
// At initial load, get snapshot of current data
database.ref().on("value", function(snap){

// If any errors are experienced, log them to console. 
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
// Global variables
var titleVars = []
var j = 0;

// Function to search for books by title 
function bookSearch(){
  var search = $('#titleInput').val().trim();
  // parseSearch adds the + sign in between search words, might not need it
  var parseSearch = search.split(" ").join("+");
  titleVars.push(parseSearch);
  console.log(parseSearch);

  $.ajax({
    url: 'https://www.googleapis.com/books/v1/volumes?q=' + parseSearch,
    type: 'GET',
    dataType: 'JSON',
    data: {param1: 'value1'},
    success: function(data) {
      for (var i = 0; i < data.items.length; i++) {
      var images = data.items[i].volumeInfo.imageLinks.smallThumbnail;
      var titles = data.items[i].volumeInfo.title;
      var authors = data.items[i].volumeInfo.authors;
      var description = data.items[i].volumeInfo.description;
      var bookTitle = $('<div>').addClass('thisBook');
      bookTitle.attr({'data-images': images}).attr({'data-description': description}).attr({'data-title': titles}).attr({'data-author': authors});
      bookTitle.append("<h4>" + titles + "</h4>" + " <h5>" + authors + "</h5>");
      $('#searchResults').append(bookTitle);
      }
    }
  })
  // .done(function() {
  //   console.log("success");
  // })
  // .fail(function() {
  //   console.log("error");
  // })
  // .always(function() {
  //   console.log("complete");
  // });
  
  $('#titleInput').val(" ");
  return false;
  }
  
 

$(document).on('click', '#submit-titleAuthor', bookSearch);

// When user selects from Search Results
$(document).on('click', '.thisBook', function(){
  $('#searchResults').empty();
  console.log($(this).data('title'));
  var cover = $("<img height='200px'>");
  cover.attr({'data-title': $(this).data('title')}).attr({'data-author': $(this).data('author')}).attr({'data-description': $(this).data('description')}).attr({'data-review': $(this).data('review')}).attr({'data-rating': $(this).data('rating')});
  var img = $(this).data('images');
  cover.attr('src', img).addClass('coverCSS bookInfo');
  $('.bookshelf-panel').append(cover);
});

//Clicking books on shelf to grab info
$(document).on('click', '.bookInfo', function(){
  var title2 = $(this).data('title');
  console.log(title2);
  var author2 = $(this).data('author');
  console.log(author2);
  var description2 = $(this).data('description');
  console.log(description2);
  // var review = $(this).data('review');
  // console.log(review);
  // var rating = $(this).data('rating');
  // console.log(rating);
  
  var bookInfoDiv = $('<div>');
  bookInfoDiv.addClass('alert alert-info')
  var closerBtn = $('<button type="button" class="close" data-dismiss="alert">')
  closerBtn.html('X');
  var bookInfo = $('<div>');
  bookInfo.append(title2, author2, description2, reviewLink, starRating);
  bookInfoDiv.append(closerBtn, bookInfo);
  $('.bookshelf-panel').append(bookInfoDiv);
   swal({
    title: "Here's a message!",
    text: "Yo yo yo!",
    imageUrl: "http://placecage.com/200/200"
  });

  // Set up empty array for star rating images and other variables
  var ratingsArray = [];
  for(var i = 0; i < 10.5; i = i + 0.5){
    ratingsArray.push(i);
  }
  var reviewLink;
  var starRating;
  // var isbnInput;
  var search2 = titleVars[j];
  var parseSearch2 = search2.split(" ").join("+");
  var dreambooksURL = "http://idreambooks.com/api/books/reviews.json?q=" + parseSearch2 + "&key=da5e557ab077cd7d98bef194bedc0e000c1e75af"
  $.ajax({url: dreambooksURL, type: 'GET'}).done(function(reviews){
  console.log(reviews);
  reviewLink = reviews.book.critic_reviews[0].review_link;
  starRating = reviews.book.critic_reviews[0].star_rating;
   // jQuery for display when book is clicked on
  // $('#display').html('<h3>Star Rating: ' + starRating + '<h3>')
  // $('#display').html('<h3>Review Link: ' + reviewLink + '<h3>')
  console.log(reviewLink);
  console.log(starRating);
 // Creating star rating image dynamically
  var reviewImg = $('<img>')
  var source = "/assets/images/Stars-"
  var reviewImg = $('<img height="25px">')
  var source = "./assets/images/Stars-"
  var j = ratingsArray.indexOf(starRating);
  source = source + ratingsArray[j];
  reviewImg.attr('src', source);
  //might change later
  $('.bookshelf-panel').append(reviewImg);
  bookInfo.append(title2, author2, reviewImg, starRating, reviewLink, description2);
  bookInfoDiv.append(closerBtn, bookInfo);
  $('.bookshelf-panel').append(bookInfoDiv);
  });
  j++;
});



