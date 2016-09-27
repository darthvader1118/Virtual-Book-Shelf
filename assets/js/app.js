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

// Set up empty array for star rating images
var ratingsArray = []

// Set global variables


// Takes user ISBN input from form and adds new book to virtual Bookshelf
$("#ISBN-form").on("submit", function(e){
  e.preventDefault();
  e.stopPropagation();
  var isbnInput = $('#isbninput').val().trim();
  // Auto pushes up to book shelf

  // Using ISBN # retrieve title author summary and possibly reviews
  database.ref().push({
    ISBN : isbnInput
  })

  var reviewLink;
  var starRating;

  // Calls to dreambooks API to get NY Times reviews and ratings
  var dreambooksURL = "http://idreambooks.com/api/books/reviews.json?q=" + isbnInput + "&key=da5e557ab077cd7d98bef194bedc0e000c1e75af"
  $.ajax({url: dreambooksURL, method: 'GET'}).done(function(reviews){
    reviewLink = reviews.book.critic_reviews[0].review_link;
    starRating = reviews.book.critic_reviews[0].star_rating;
    // jQuery for display when book is clicked on
    // $('#display').html('<h3>Star Rating: ' + starRating + '<h3>')
    // $('#display').html('<h3>Review Link: ' + reviewLink + '<h3>')
    console.log(reviewLink);
    console.log(starRating);
  });
});


// Takes user Author/Title input from form and adds new book to virtual Bookshelf
$("#TA-form").on("submit", function(e){
  e.preventDefault();
  e.stopPropagation();
  var titleInput = $('#titleInput').val().trim()
  var authorInput = $('#authorInput').val().trim()
  var authorSplit = authorInput.split(" ").join("+");
  var titleSplit = titleInput.split(" ").join("+");
  // Gives person options based on author or title, then click to send up info

  // Calls to dreambooks API to get NY Times book reviews and ratings
  var dreambooksURL = "http://idreambooks.com/api/books/reviews.json?q=" + titleSplit + "&key=da5e557ab077cd7d98bef194bedc0e000c1e75af"
  $.ajax({url: dreambooksURL, method: 'GET'}).done(function(reviews){
    reviewLink = reviews.book.critic_reviews[0].review_link;
    starRating = reviews.book.critic_reviews[0].star_rating;
    console.log(reviewLink);
    console.log(starRating);
  });
});


 