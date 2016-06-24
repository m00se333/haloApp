"use-strict"

var express = require("express");
//dependencies
var request = require("request");
var Options = require("./router.js")
var app = express();
var bodyParser = require("body-parser");
var Firebase = require("firebase");

Firebase.initializeApp({
  databaseURL: "https://haloapp-5cfe2.firebaseio.com/",
  serviceAccount: {
  "type": "service_account",
  "project_id": "haloapp-5cfe2",
  "private_key_id": "572160bb6042d638afdf4b055fbb7150c7b348a8",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQbkjBi2gs/fIB\nMpxIfLn3LTlaUKEUzW11489/E1ng1uTag606BhVzc82UFwKXKVLvIdpkakI5BLLg\nJwsIy7h9K0pTPW+u0oJ0rW7wcCQIUUYwb2+p51s10MdvRHpsdKixjLpybsszrncV\nXq3LMURtlY5F2kBhArHilz2DF0uZQgTz7LqeWMPr+wq3JFTHmaKNpFhVyN0OyE1O\nnS/bU8QOWgb8wRhvVOLaNEn9EeUbp0Sam9sOJ08dvfLW0s+gOTsKQ+M3RXnIqBVB\nwPigFuqeVxjvsdFegZhb2s8zepuP44+bYnrEudOq51/ktVJGyIRSV+FHRasqqbiY\nXitD6q5VAgMBAAECggEBALaOMalbadYmYiWMZ3fRzqvg71/cSQnIV7wu2RmLIGie\nr3l4ZWvx0i352rB/auRs7FfIhdj3fKMmK2nKqI5+qErxdLrtj3lGpb59/TIYdmbW\nkKxxnhLpMWk0QMmC59tAXlSMVu1Nfyr3/xM3hu72auG0YRVrcIHHc3hsURMVf0Bu\nDlPhU4SWsNR1fJ0HDr22MYVRQ+xQ4NL3ucKfnEBteUBR/ot5vNUC2U1QNecOUvGh\nrFS3cbZ9NOF69j4XjS26kxba8fD0vXJzLBxC0aqurBU9b+erfZdGFxlD2mOi0Tcx\nsoF/Ayqm8LVtno++6WDPKtcM9GTiwfIcqej1cHzXWeECgYEA9Etv9+WvVeBfyl6g\n7BKRY6Ln0iBcZG1NeZXGw5dEse0LlGKi4T0mLU/qHtYPbGVpKS+ZByAIblMNLLz0\nx5A/pbmNHBsC/kshbcdprglOgje176hMPz4lf7SVZDsppbfREc0irIVwVUCpKg3I\nCT4o/Srz5gAvDx+OPvoNeQThhg0CgYEA2mrvGuJTKTvNe3sp0zIywYxXEy11lQJv\nPdaUJUYUlapbSuqJbdkiTg2UvskjPhZaqMRPyiQdzTbjIr7NcIvsnEC+Oykgtw0C\nk9/6FK0SWUhKkpNWXbKKsPFBgO69cmhcu0HRzg1vM0PNVNxUgzIkVubZNhTg7VMl\nBOEGLddDv2kCgYBNAC4ltAblCZkH33XXky6yehmZ2MtmeDFQXo5M/jQP5QieV8zB\nNBYBeEvyNkScRQa1jaQtY8Jki9b+P/zjnisBoI/CyRzTbHj38j/0NEjDsK2vAZwu\n3vbQ3umrsx44dsz2UHNab6Dtrjjj4X4os6gVzGEeIPa0TJz4araua4RuTQKBgQCt\nrq7n/+UFOurRMEU4DgjSY9iyBUok7cSrtcAkS6/+u3LRBeO2mB1xV9daRvNhYcFB\nxql0IngYQXcon/UZdAr4zXr37GJ5bT0JfeeNHXsjyBqUp9jbtSgYQCBIeI/pNBfZ\nSCOf6IruhxH2UyZZFTxUZkl/eebKkX00fgO93BmhUQKBgD6lJuJV2ItxZT0DzWF6\ns3y7uJJj8TMQgctLwTSux+WS7u242a0770WS7ZYsrcRSulsQGEZ3N1VVJHpuJWFs\ngdAtqto7ZCHjOh8dIDUd/IVNtWL7+Wdjpz6NwU98areYYZNvgUvoRrNycc1/pH8M\n3QJ1VKDCNEYVNM5EMafyJjU1\n-----END PRIVATE KEY-----\n",
  "client_email": "haloappservice@haloapp-5cfe2.iam.gserviceaccount.com",
  "client_id": "105846616556317301825",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/haloappservice%40haloapp-5cfe2.iam.gserviceaccount.com"
}
  
});

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

		  var playerData = {
		  	gamertag: body.Results[0].Id,
				totalKills: body.Results[0].Result.WarzoneStat.TotalKills,
				totalDeaths: body.Results[0].Result.WarzoneStat.TotalDeaths,
				totalGames: body.Results[0].Result.WarzoneStat.TotalGamesCompleted
		  };
		res.send(playerData)
		console.log(playerData);
	// creates a child named "user" in my database
	var userRef = ref.child("user");
	// populates the child with the playerData object successfully.
	// Every time a new POST request is issued the user's data resets.
	userRef.set(playerData)
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
		  console.log(imgString);

		  // create child of "/user"
		  var emblemRef = ref.child("user/emblem");
		  		// pass an object to that path in the database
		  		emblemRef.set({image:imgString});
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
		  spartanImage.set({image:imgString});
	});
});


app.listen(1117, function(){
	console.log("Frontend server running on 1117.")
});





 