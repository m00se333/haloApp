var $searchButton = $("#searchButton");

$searchButton.on("click", function(event){
	var $search = $("#searchField").val();
	event.preventDefault();
	
	$.post("http://localhost:1117/search", {search: $search}, function(data){
		if (data === "DONE"){
			console.log("POST worked")
		}
	});
});