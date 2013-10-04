var express = require('express'),
	wget = require("wgetjs"),
	fs = require("fs"),
	path = require("path"),
	config = require("./lib/config")(__dirname + "/config.json"),
	plugins = require("./lib/plugins")(config);

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
	plugins.download(req.body.url);
	res.send({done: true});
});

app.get("/tmp", function(req, res) {
	plugin.canYouHandle(function(err, yesICan) {

	});

	res.send("Hello world");
});

app.listen(3000);
console.log('Listening on port 3000');
