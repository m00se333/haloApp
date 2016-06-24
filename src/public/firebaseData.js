
  // create object instance of my Firebase database
  var myDBReference = new Firebase('https://haloapp-5cfe2.firebaseio.com/');

  myDBReference.child("user").on("child_changed", function(results){
    console.log(myDBReference.child("user"));
  });
