"use-strict"
//require big firebase authentication
require("./firebaseAuth.js")
var express = require("express");
//dependencies
var request = require("request");
var Options = require("./router.js")
var app = express();
var bodyParser = require("body-parser");
var Firebase = require("firebase");
var port = process.env.PORT || 8080;
// links to my firebase database
var db = Firebase.database();
//sets the reference to the root of the database, or the server I'm not quite sure.
var ref = db.ref("/");
// I think this is necessary to parse the JSON data I'm recieving
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//express app serves static files located in the public directory
app.use(express.static(__dirname + '/public'));


//At the home route (localhost:1117/) send the static file index.html
app.get("/", function(req, res){
	res.send("index.html");
});

app.get("/compare", function(req, res){
	res.sendFile(__dirname + "/public/home.html");
})
//Event Listener when there is a POST request made from public/request.js
app.post("/statSearch", function(req, res){
	var search = req.body.search;
	
	var statsOptions = new Options("https://www.haloapi.com/stats/h5/servicerecords/warzone?players="+search);
  		
		request(statsOptions, function (error, response, body) {
		  if (error) throw new Error(error);
		  var body = JSON.parse(response.body)

		  var warzoneOverview = {
		  	gamertag: body.Results[0].Id,
		  	spartanRank: body.Results[0].Result.SpartanRank,
				totalKills: body.Results[0].Result.WarzoneStat.TotalKills,
				totalAssists: body.Results[0].Result.WarzoneStat.TotalAssists,
				totalDeaths: body.Results[0].Result.WarzoneStat.TotalDeaths,
				totalGames: body.Results[0].Result.WarzoneStat.TotalGamesCompleted
		  };

	res.send(warzoneOverview);
	var userRef = ref.child("user");
	
	userRef.set(warzoneOverview);
		});
});

//emblem
app.post("/emblemSearch", function(req, res){
var search = req.body.search;
var imgOptions = new Options('https://www.haloapi.com/profile/h5/profiles/'+search+'/emblem', '512');

		request(imgOptions, function (error, response, body) {
		  if (error) throw new Error(error);
		  var imgString = response.request.uri.href;
		 
		  res.send(imgString);
		  
		  var emblemRef = ref.child("user/emblem");
		  		emblemRef.set(imgString);
		});
});

//spartan image 
app.post("/spartanSearch", function(req, res){
var search = req.body.search
var spartanOptions = new Options('https://www.haloapi.com/profile/h5/profiles/'+search+'/spartan', '256');

request(spartanOptions, function (error, response, body) {
  if (error) throw new Error(error);

  var imgString = response.request.uri.href;

	res.send(imgString);

	var spartanImage = ref.child("user/spartanImage");
		  spartanImage.set(imgString);
	});
});

app.listen(port, function(){
	console.log("Frontend server running on " + port)
});





 