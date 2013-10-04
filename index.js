var express = require('express');
var app = express();

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.logger());
app.use(express.static(__dirname + '/public'));
app.use(app.router);

app.use(function(err, req, res, next){
  console.log(err.stack);
  res.send(500, "Something broke!");
});

app.get("/", function(req, res) {
	res.send("Hello world");
});

app.listen(3000);
console.log('Listening on port 3000');
