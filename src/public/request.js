//define search button for later use
var $searchButton = $("#searchButton");

//search Button event handler sends off a POST request
$searchButton.on("click", function(event){
	//captute the value of the search field when button is clicked
	// Type in Lore Eye An Us- that's me and a valid Xbox Live Gamertag
	var $search = $("#searchField").val();
	event.preventDefault();
	
	//jQuery POST request: url, data, dunno what the function is for
	$.post("http://localhost:1117/statSearch", {search: $search}, function(data){
		console.log(data)
		var gamerTag = data.gamertag;
		var totalKills = data.totalKills
		var totalDeaths = data.totalDeaths;
		var totalGames = data.totalGames;

		console.log(gamerTag);
		console.log(totalKills);

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