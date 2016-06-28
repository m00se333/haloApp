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

  /*firebase.database().ref().on('child_changed', function(snapshot) {
     var $testBox = $("#test")  // "child_changed" is useful for this; 
                                // the user endpoint is constantly changing until complete.
    snapshot.forEach(function(childSnap){
      console.log(childSnap.val)
      

  });*/

  /*firebase.database().ref("user/emblem").on("value", function(snapshot){
    
    console.log(snapshot.val())

    snapshot.forEach(function(childSnap){
      console.log(childSnap.val());
      $("#test").attr("src", childSnap.val())
    });
  });

  firebase.database().ref("user/spartanImage").on("value", function(snapshot){

    snapshot.forEach(function(childSnap){
      console.log(childSnap.val());
      $("#test2").attr("src", childSnap.val())
    });
  });
  */
$("#searchButton").on("click", function(){

    firebase.database().ref().once("child_added", function(snapshot){
    // little lesson in closure
    // dry coding
    function ez(path){
      return snapshot.child(path).val();
    }

    var dataObject = { 
      gamertag: ez("gamertag"),
      totalKills: ez("totalKills"),
      totalDeaths: ez("totalDeaths"),
      totalGames: ez("totalGames")
    };

    /*var images = {
      spartan: ez("spartan/img"),
      emblem: ez("emblem/img")
    }*/
    

    var sourceTemplate = $("#list-template").html();

    var template =  Handlebars.compile(sourceTemplate);

    var templateHTML = template(dataObject);

    var $templateHTML = $(templateHTML);

    //console.log(dataObject);
    // set it inside something as a test, Handlebars
    $("#profileSearch").append($templateHTML);


  });
  
});

var $confirmButton = $("#confirmButton");

$(document).on("click", "#confirm", function(event){
  event.preventDefault()
  console.log("I clicked it");
  firebase.database().ref().once("value", function(snapshot){
    function ez(path){
      return snapshot.child(path).val();
    }

    var savedUserData = {
      gamertag: ez("user/gamertag"),
      totalKills: ez("user/totalKills"),
      totalDeaths: ez("user/totalDeaths"),
      totalGames: ez("user/totalGames")
    }

    function saveUser(childPath, data){
      firebase.database().ref(childPath).set(data)
    }
    saveUser("savedUser", savedUserData);


  });
});

// Deleting successfully
$("#deleteButton").on("click", function(event){
  event.preventDefault();
  console.log("delete button clicked");
  function deleteSaved(){
    firebase.database().ref("savedUser").remove();
  }
  deleteSaved();  
})




  





