//define search button for later use
var $searchButton = $("#searchButton");
var $updateButton = $("#updateValueButton");
var homeRoute = "https://warzonedata.herokuapp.com/"

//search Button event handler sends off a POST request
$searchButton.on("click", function(event){
	
	event.preventDefault();
	var $search = $("#searchField").val();
	//jQuery POST request: url, data, dunno what the function is for
	$.post(homeRoute + "statSearch", {search: $search}, function(data){
		
		//console.log(data)
		//returns formatted data object courtesy of app.js
		var gamerTag = data.gamertag;
		var totalKills = data.totalKills;
		var totalDeaths = data.totalDeaths;
		var totalGames = data.totalGames;
		console.log(data);
/*
	$.post("http://localhost:1117/emblemSearch", {search: $search}, function(data){
		$("#imageContainer").css("background-image", "url("+data+")");
		$("#imageContainer").css("display", "block");
	});

	$.post("http://localhost:1117/spartanSearch", {search: $search}, function(data){
		$("#spartan").attr("src", data)
	});
	*/
	});
});

// update functionality
$updateButton.on("click", function(event) {
	var $updateValue = $("#updateValue").val();
	event.preventDefault();
	$.post(homeRoute +"update", {update: $updateValue}, function(data){
		console.log(data);
	});
});
