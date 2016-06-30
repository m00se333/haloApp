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
	$("#preview").hide();
	$("#preview").children().remove();
	var $search = $("#searchField").val();

	if ($search === "" || null ){
		alert("type in an Xbox Live Gamertag")
	} else {

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
	}
});

var $confirmButton = $("#confirmButton");
// Writing to Database successfully.
$(document).on("click", "#saveProfile", function(event){
  event.preventDefault()
  $("#profileSearch").children().remove();
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
    $("#profileSearch").css("backgroung-image", "url("+savedUserRetrieveObject.emblem+")");
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








