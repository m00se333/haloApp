//define search button for later use
var $searchButton = $("#searchButton");
var $updateButton = $("#updateValueButton");
var homeRoute = "http://warzonedata.herokuapp.com/";




// config object with my credentials
  var config = {
    apiKey: "AIzaSyBOjqlHY-O_jr5MATXLP1ooreDELcX1Uuw",
    authDomain: "haloapp-5cfe2.firebaseapp.com",
    databaseURL: "https://haloapp-5cfe2.firebaseio.com",
    storageBucket: "haloapp-5cfe2.appspot.com",
  };
  //Pass that object to database 
  firebase.initializeApp(config);

// search Button event handler sends off a POST request to 3 endpoints in app.js
// app.js will call the Halo Waypoint API and update Firebase
$searchButton.on("click", function(event){
	event.preventDefault();
	$("#preview").children().remove();
	var $search = $("#searchField").val();
	$.post("statSearch", {search: $search}, function(data){
		
	});
	$.post("emblemSearch", {search: $search}, function(data){
		//console.log(data);
	});

	$.post("spartanSearch", {search: $search}, function(data){
		//console.log(data)
	});

	// delay the reading of data so firebase has a chance to update based on the search.
	setTimeout(function(){
		  firebase.database().ref("user").once("value", function(snapshot){
				function ez(path){
		      return snapshot.child(path).val();
		    }

		    var initialSearchObject = {
		      gamertag: ez("gamertag"),
		      spartanRank: ez("spartanRank"),
		      emblem: ez("emblem"),
		      spartan: ez("spartanImage"),
		      totalAssists: ez("totalAssists"),
		      totalKills: ez("totalKills"),
		      totalDeaths: ez("totalDeaths"),
		      totalGames: ez("totalGames")
					}
					$("#preview").css("display", "block");
					var previewTemplate = $("#previewTemplate").html();
					var template = Handlebars.compile(previewTemplate);
					var previewTemplateHTML = template(initialSearchObject);
					var $previewTemplateHTML = $(previewTemplateHTML);
					$("#preview").append($previewTemplateHTML);
					$("#saveProfile").css("display", "inline-block")
			});
		}, 4000);
});
/* Depreciated see the explanation in app.js line 91
// update functionality
$updateButton.on("click", function(event) {
	var $updateValue = $("#updateValue").val();
	event.preventDefault();
	console.log("clicked Update")
	$.post(homeRoute + "update", {update: $updateValue}, function(data){
		
	});
	$.post(homeRoute + "emblemUpdate", {search: $updateValue}, function(data){
		//console.log(data);
	});

	$.post(homeRoute + "spartanUpdate", {search: $updateValue}, function(data){
		//console.log(data)
	});
});
*/
var $confirmButton = $("#confirmButton");
// Writing to Database successfully.
$(document).on("click", "#saveProfile", function(event){
  event.preventDefault()
  console.log("I clicked it");
  firebase.database().ref().once("value", function(snapshot){
    function ez(path){
      return snapshot.child(path).val();
    }

    var savedUserDataSendObject = {
      gamertag: ez("user/gamertag"),
      spartanRank: ez("user/spartanRank"),
      emblem: ez("user/emblem"),
      spartan: ez("user/spartanImage"),
      totalKills: ez("user/totalKills"),
      totalAssists: ez("user/totalAssists"),
      totalDeaths: ez("user/totalDeaths"),
      totalGames: ez("user/totalGames")
    }

    function saveUser(childPath, data){
      firebase.database().ref(childPath).set(data)
    }
    saveUser("savedUser", savedUserDataSendObject);




  });
  setTimeout(function(){
  firebase.database().ref("savedUser").once("value", function(snapshot){
  	function ez(path){
      return snapshot.child(path).val();
    }
    var savedUserRetrieveObject = {
    	gamertag: ez("gamertag"),
      spartanRank: ez("spartanRank"),
      emblem: ez("emblem"),
      spartan: ez("spartan"),
      totalKills: ez("totalKills"),
      totalAssists: ez("totalAssists"),
      totalDeaths: ez("totalDeaths"),
      totalGames: ez("totalGames")
    }
    var sourceSavedUserTemplate = $("#savedUserTemplate").html();
    var savedUserTemplate = Handlebars.compile(sourceSavedUserTemplate);
    var savedUserTemplateHTML = savedUserTemplate(savedUserRetrieveObject);
    var $savedUserTemplateHTML = $(savedUserTemplateHTML);
    $("#profileSearch").append($savedUserTemplateHTML);
    console.log(savedUserRetrieveObject.spartan)
  });
	}, 4000);
 });

// Deleting successfully
$("#deleteButton").on("click", function(event){
  event.preventDefault();
  console.log("delete button clicked");
  function deleteSaved(){
    firebase.database().ref("savedUser").remove();
  }
  deleteSaved();  
});

/*
// retrieve at "user" endpoint
$("#retrieveSearch").on("click", function(event){
	event.preventDefault();
	$("#profileSearch").children().remove();
	firebase.database().ref("user").once("value", function(snapshot){
		function ez(path){
      return snapshot.child(path).val();
    }

    var confirmObject = {
      gamertag: ez("gamertag"),
      spartanRank: ez("spartanRank"),
      emblem: ez("emblem"),
      spartan: ez("spartanImage"),
      totalAssists: ez("totalAssists"),
      totalKills: ez("totalKills"),
      totalDeaths: ez("totalDeaths"),
      totalGames: ez("totalGames")
			}

		var sourceTemplate = $("#list-template").html();

    var template =  Handlebars.compile(sourceTemplate);

    var templateHTML = template(confirmObject);

    var $templateHTML = $(templateHTML);

    $("#profileSearch").append($templateHTML);

		console.log(confirmObject);
	});
});
*/









