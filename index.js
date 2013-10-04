var express = require('express'),
	wget = require("wgetjs"),
	fs = require("fs"),
	path = require("path"),
	config = require("./lib/config")(__dirname + "/config.json");

var app = express();

app.use(express.bodyParser());
app.use(express.methodOverride());
//app.use(express.logger());
app.use(express.static(__dirname + '/public'));
app.use(app.router);

app.use(function(err, req, res, next){
  console.log(err.stack);
  res.send(500, "Something broke!");
});

app.get("/", function(req, res) {
	res.headers["Content-Type"] = "text/html";
	fs.readFile(path.join(__dirname, "public", "index.html")).pipe(res);
});

app.put("/downloads", function(req, res) {
	console.log(req.body);
	res.send({done: true});
});

app.get("/tmp", function(req, res) {
	console.log("[", new Date(), "]", "Downloading", req.query.url);
	wget({
		url: req.query.url,
		dest: config.dest
	}, function(err, data) {
		if(err) {
			console.err("[", new Date(), "]", "Error downloading", req.query.url, err);
		} else {
			console.log("[", new Date(), "]", "Download of", req.query.url, "complete");
		}
	});

	res.send("Hello world");
});

app.listen(3000);
console.log('Listening on port 3000');
