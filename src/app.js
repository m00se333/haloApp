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

// links to my firebase database
var db = Firebase.database();
//sets the reference to the root of the database, or the server I'm not quite sure.
var ref = db.ref("/");
// I think this is necessary to parse the JSON data I'm recieving
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//using Jade because I don't know how else to do this

//express app serves static files located in the public directory
app.use(express.static(__dirname + '/public'));
app.set("view engine", "jade");
app.set("views", __dirname + "/templates");

//At the home route (localhost:1117/) send the static file index.html
app.get("/", function(req, res){
	res.send("index.html");
});

app.get("/compare", function(req, res){
	res.sendFile(__dirname + "/public/home.html");
})
//Event Listener when there is a POST request made from public/request.js
app.post("/statSearch", function(req, res){
	// In this case the req is the POST request and the request body is the data I sent along with it. Refer to request.js
	var search = req.body.search;
	
	var statsOptions = new Options("https://www.haloapi.com/stats/h5/servicerecords/warzone?players="+search);
  		
		request(statsOptions, function (error, response, body) {
		  if (error) throw new Error(error);
		  // This is necessary because the body is a string, and JSON.parse turns said string into an object
		  var body = JSON.parse(response.body)

		  var playerData = {
		  	gamertag: body.Results[0].Id,
				totalKills: body.Results[0].Result.WarzoneStat.TotalKills,
				totalDeaths: body.Results[0].Result.WarzoneStat.TotalDeaths,
				totalGames: body.Results[0].Result.WarzoneStat.TotalGamesCompleted
		  };
		res.send(playerData)
	//console.log(playerData);
	// creates a child named "user" in my database
	// CREATE capability
	var userRef = ref.child("user");
	// populates the child with the playerData object successfully.
	// Every time a new POST request is issued the user's data resets.
	userRef.set(playerData);
		});
});

//emblem
app.post("/emblemSearch", function(req, res){
var search = req.body.search
var imgOptions = new Options('https://www.haloapi.com/profile/h5/profiles/'+search+'/emblem', '512');

		request(imgOptions, function (error, response, body) {
		  if (error) throw new Error(error);
		  var imgString = response.request.uri.href;
		  res.send(imgString);
		  //console.log(imgString);

		  // create child of "/user"
		  var emblemRef = ref.child("user/emblem");
		  		// pass an object to that path in the database
		  		emblemRef.set({img:imgString});
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
		  spartanImage.set({img:imgString});
	});
});


app.listen(1117, function(){
	console.log("Frontend server running on 1117.")
});





 