 var config = {
    apiKey: "AIzaSyBOjqlHY-O_jr5MATXLP1ooreDELcX1Uuw",
    authDomain: "haloapp-5cfe2.firebaseapp.com",
    databaseURL: "https://haloapp-5cfe2.firebaseio.com",
    storageBucket: "haloapp-5cfe2.appspot.com",
  };

firebase.initializeApp(config);

var $confirmButton = $("#confirmButton");

$($confirmButton).on("submit", function(event){
  event.preventDefault();
  console.log(firebase.database().ref("user"));
})