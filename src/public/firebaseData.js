// config object with my credentials
  var config = {
    apiKey: "AIzaSyBOjqlHY-O_jr5MATXLP1ooreDELcX1Uuw",
    authDomain: "haloapp-5cfe2.firebaseapp.com",
    databaseURL: "https://haloapp-5cfe2.firebaseio.com",
    storageBucket: "haloapp-5cfe2.appspot.com",
  };
  //Pass that object to database 
  firebase.initializeApp(config);

  //Read Capability:
    // reading the database directly as it changes. One note on that,
    // I think since I'm using so much backend the entire process lags.
    // That results in the "user" object not being read completely formed.
    // It takes from 1-5 seconds for both of the images to show up in the database.
  firebase.database().ref().on('child_changed', function(snapshot) {
     var $testBox = $("#test")  // "child_changed" is useful for this; 
                                // the user endpoint is constantly changing until complete.
    snapshot.forEach(function(childSnap){
      console.log(childSnap.val())
      

  });
});