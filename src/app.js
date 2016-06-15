"use-strict"

var express = require("express");
//dependencies
var request = require("request");
var app = express();
var bodyParser = require("body-parser")
// I think this is necessary to parse the JSON data I'm recieving
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//using Jade because I don't know how else to do this

//express app serves static files located in the public directory
app.use(express.static(__dirname + '/public'));

//At the home route (localhost:1117/) send the static file index.html
app.get("/", function(req, res){
	res.send("index.html");
});

//Event Listener when there is a POST request made from public/request.js
app.post("/statSearch", function(req, res){
	// In this case the req is the POST request and the request body is the data I sent along with it. Refer to request.js
	var search = req.body.search;
	//logs what is searched in the terminal, not the JavaScript console
	console.log("You searched for: " + search);
	console.log(req.body)
	
	
	
	
	//these are the settings/options for the GET request I am going to make when the POST comes in from index.html
	var statsOptions = { method: 'GET',
  		url: 'https://www.haloapi.com/stats/h5/servicerecords/warzone',
  		//the search variable is still within the scope of the POST listener I did this intentionally because taking information out of these requests is what I'm struggling with
 		qs: { players: search },
  		headers: 
   			{ 'postman-token': '4e734e7b-45fa-e332-c6f6-8100ddb23915',
     			'cache-control': 'no-cache',
     			// Well you guys all know my dev key now
     			'ocp-apim-subscription-key': 'a9433cb3d47b4f7d9dca856b2c3f1809' } };

     	//request is a magical node package that makes XMLHttpRequests I suppose, similar to $.ajax(url {options})
		request(statsOptions, function (error, response, body) {
		  if (error) throw new Error(error);
		  // This is necessary because the body is a string, and JSON.parse turns said string into an object
		  var body = JSON.parse(response.body)
		  // Digging through the body object through some console-logging will produce data based on these keys... to the terminal
		  console.log("Gamertag: " + body.Results[0].Id)
		  console.log("Total Kills: " + body.Results[0].Result.WarzoneStat.TotalKills);
		
		//hate it  
		res.send(body)
		});
		
		
});

//emblem
app.post("/emblemSearch", function(req, res){
var search = req.body.search
var imgOptions = new Options('https://www.haloapi.com/profile/h5/profiles/'+search+'/emblem', '512');

		request(imgOptions, function (error, response, body) {
		  if (error) throw new Error(error);

		  res.send(response)
		});
});

//spartan image 
app.post("/spartanSearch", function(req, res){
var search = req.body.search
var spartanOptions = new Options('https://www.haloapi.com/profile/h5/profiles/'+search+'/spartan', '256');

request(spartanOptions, function (error, response, body) {
  if (error) throw new Error(error);

  res.send(response);
	});
});


app.listen(1117, function(){
	console.log("Frontend server running on 1117.")
});




function Options(url, size){
  this.url = url,
  this.method= "GET",
  this.qs= { size: size},
  this.headers=
  {'postman-token': '63e6c80b-a37c-2097-d8b7-6fbf86cf5216',
     'cache-control': 'no-cache',
     'ocp-apim-subscription-key': 'a9433cb3d47b4f7d9dca856b2c3f1809' }
  };



 