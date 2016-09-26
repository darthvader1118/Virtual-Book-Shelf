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

  // Calls to dreambooks API to get NY Times reviews and ratings
  var dreambooksURL = "http://api/books/reviews.json?q=" + isbnInput + "&key=da5e557ab077cd7d98bef194bedc0e000c1e75af"
  $.ajax({url: dreambooksURL, method: 'GET'}).done(function(reviews){
    var bookReview = reviews.book.critic_reviews[0].review_link;
    var starRating = reviews.book.critic_reviews[0].star_rating;
    var snippet = reviews.book.critic_reviews[0].snippet;
    // jQuery for display when book is clicked on
    $('#').html('<h3>Star Rating: ')
  });

  // Conditionals for star Ratings
  if ( starRating == 0.5 ){
    
  }
  if ( starRating == 1.0 ){
    
  }
  if ( starRating == 1.5 ){
    
  }
  if ( starRating == 2.0 ){
    
  }
  if ( starRating == 2.5 ){
    
  }
  if ( starRating == 3.0 ){
    
  }
  if ( starRating == 3.5 ){
    
  }
  if ( starRating == 4.0 ){
    
  }
  if ( starRating == 4.5 ){
    
  }
  if ( starRating == 5.0 ){
    
  }


// Takes user Author/Title input from form and adds new book to virtual Bookshelf
$("#TA-form").on("submit", function(e){
  e.preventDefault();
  e.stopPropagation();
  var titleInput = $('#titleInput').val().trim()
  var authorInput = $('#authorInput').val().trim()
  // Gives person options based on author or title, then click to send up info

  // Calls to dreambooks API to get NY Times book reviews and ratings
  var dreambooksURL = "http://api/books/reviews.json?q=" + titleInput + "&key=da5e557ab077cd7d98bef194bedc0e000c1e75af"
  $.ajax({url: dreambooksURL, method: 'GET'}).done(function(reviews){
    var bookReview = reviews.book.critic_reviews[0].review_link;
    var starRating = reviews.book.critic_reviews[0].star_rating;
    var snippet = reviews.book.critic_reviews[0].snippet;
    console.log()
  });
});

  // Conditionals for star ratings
  if ( starRating == 0.0 ){

  }
  if ( starRating == 0.5 ){
    
  }
  if ( starRating == 1.0 ){
    
  }
  if ( starRating == 1.5 ){
    
  }
  if ( starRating == 2.0 ){
    
  }
  if ( starRating == 2.5 ){
    
  }
  if ( starRating == 3.0 ){
    
  }
  if ( starRating == 3.5 ){
    
  }
  if ( starRating == 4.0 ){
    
  }
  if ( starRating == 4.5 ){
    
  }
  if ( starRating == 5.0 ){
    
  }