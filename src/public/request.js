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
		var gamerTag = data.Results[0].Id;
		var totalKills = data.Results[0].Result.WarzoneStat.TotalKills;
		var totalDeaths = data.Results[0].Result.WarzoneStat.TotalDeaths;
		var totalGames = data.Results[0].Result.WarzoneStat.TotalGamesCompleted;

		console.log(gamerTag);
		console.log(totalKills);

		$("#dataContainer h2").html("Gamertag: " + gamerTag);
		$("#dataContainer p").html("Total Warzone Kills: " + totalKills
		 + "<br>" + "Total Warzone Deaths: " + totalDeaths
		 + "<br>" + "Total Wazone Matches Complete: " + totalGames);
		
		/*var playerData = {
			tag: gamerTag,
			kills: totalKills
		}
		var source = $("#entry-template").html();
		var template = Handlebars.compile(source);
		var context = playerData;
		var html = template(context)*/ //GG Handlebars
	});

	$.post("http://localhost:1117/emblemSearch", {search: $search}, function(data){
		//console.log(data.request.uri.href)
		$("#imageContainer").css("background-image", "url("+data.request.uri.href+")");
		$("#imageContainer").css("display", "block");
		
	});

	$.post("http://localhost:1117/spartanSearch", {search: $search}, function(data){
		//console.log(data.request.uri.href)
		$("#spartan").attr("src", data.request.uri.href)
		
	});

});