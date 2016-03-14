var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var connectString = process.env.CONNECT_STRING || 'mongodb://localhost/dataAPI';

mongoose.connect(connectString);
var db = mongoose.connection;

db.once('open', function() {
  console.log('connected to mongo @' + connectString);
});

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
dataRouter = require("./routes/dataRoutes")();
app.use("/api", dataRouter);

app.get('/', function(req, res){
	rtData = {
		message: 'static message'
	};
	res.json(rtData);
});

app.listen(port, function(){
	console.log('Running on PORT: ' + port);
});