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

		console.log(gamerTag);
		console.log(totalKills);

		$("#postContainer h2").html("Gamertag: " + gamerTag);
		$("#postContainer p").html("Total Warzone Kills: " + totalKills);
		
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
		$("#emblem").attr("src", data.request.uri.href)
		
	});

	$.post("http://localhost:1117/spartanSearch", {search: $search}, function(data){
		//console.log(data.request.uri.href)
		$("#spartan").attr("src", data.request.uri.href)
		
	});

});