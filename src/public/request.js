//define search button for later use
var $searchButton = $("#searchButton");
var $search = $("#searchField").val();
var $updateButton = $("#updateValueButton");
var $updateValue = $("#updateValue").val();

//search Button event handler sends off a POST request
$searchButton.on("click", function(event){
	
	event.preventDefault();
	
	//jQuery POST request: url, data, dunno what the function is for
	$.post("http://localhost:1117/statSearch", {search: $search}, function(data){
		//console.log(data)
		//returns formatted data object courtesy of app.js
		var gamerTag = data.gamertag;
		var totalKills = data.totalKills
		var totalDeaths = data.totalDeaths;
		var totalGames = data.totalGames;

		//log data probably a test
		//console.log(gamerTag);
		//console.log(totalKills);

		$("#dataContainer h2").html("Gamertag: " + gamerTag);
		$("#dataContainer p").html("Total Warzone Kills: " + totalKills
		 + "<br>" + "Total Warzone Deaths: " + totalDeaths
		 + "<br>" + "Total Wazone Matches Complete: " + totalGames);
	});

	$.post("http://localhost:1117/emblemSearch", {search: $search}, function(data){
		$("#imageContainer").css("background-image", "url("+data+")");
		$("#imageContainer").css("display", "block");
	});

	$.post("http://localhost:1117/spartanSearch", {search: $search}, function(data){
		$("#spartan").attr("src", data)
	});
});

$updateButton.on("click", function(event) {
	
})
