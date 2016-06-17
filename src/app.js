"use-strict"

var express = require("express");
//dependencies
var request = require("request");
var Options = require("./router.js")
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
	
	var statsOptions = new Options("https://www.haloapi.com/stats/h5/servicerecords/warzone?players="+search);
  		
		request(statsOptions, function (error, response, body) {
		  if (error) throw new Error(error);
		  // This is necessary because the body is a string, and JSON.parse turns said string into an object
		  var body = JSON.parse(response.body)
	
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





 