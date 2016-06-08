"use-strict"

var express = require("express");
var request = require("request");
var app = express();
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
	res.sendFile("index.html");
});

app.post("/search", function(req, res){
	var search = req.body.search;
	console.log("You searched for: " + search);
	res.end("yes");
	
	var options = { method: 'GET',
  		url: 'https://www.haloapi.com/stats/h5/servicerecords/warzone',
 		qs: { players: search },
  		headers: 
   			{ 'postman-token': '4e734e7b-45fa-e332-c6f6-8100ddb23915',
     			'cache-control': 'no-cache',
     			'ocp-apim-subscription-key': 'a9433cb3d47b4f7d9dca856b2c3f1809' } };

		request(options, function (error, response, body) {
		  if (error) throw new Error(error);
		  var body = JSON.parse(body)
		  console.log("Gamertag: " + body.Results[0].Id)
		  console.log("Total Kills: " + body.Results[0].Result.WarzoneStat.TotalKills);
			});
})





app.listen(1117, function(){
	console.log("Frontend server running on 1117.")
})




 