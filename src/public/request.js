//define search button for later use
var $searchButton = $("#searchButton");

//search Button event handler sends off a POST request
$searchButton.on("click", function(event){
	//captute the value of the search field when button is clicked
	// Type in Lore Eye An Us- that's me and a valid Xbox Live Gamertag
	var $search = $("#searchField").val();
	event.preventDefault();
	
	//jQuery POST request: url, data, dunno what the function is for
	$.post("http://localhost:1117/search", {search: $search}, function(data){
		if (data === "DONE"){
			console.log("POST worked")
		}
	});
});