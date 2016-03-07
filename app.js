var express = require('express');
var mongoose = require('mongoose');

var connectString = process.env.CONNECT_STRING || 'mongodb://localhost/dataAPI';

mongoose.connect(connectString);
var db = mongoose.connection;

db.once('open', function() {
  console.log('connected to mongo @' + connectString);
});

var Data = require('./models/dataModel');

/*var drec = new Data({fname: 'ftest', lname: 'ltest'});
drec.save(function(err, d){
	if(err) console.error(err);
	console.log('drec saved ok');
});*/

var app = express();
var port = process.env.PORT || 3000;

var dataRouter = express.Router();

dataRouter.route('/data').get(function(req, res){
	
	var query = {};
	if(req.query.lname){
		query.lname = req.query.lname;
	}

	Data.find(query,function(err, fdata){
		
			if(err){console.log(err);
					res.status(500).send(err);
			} else res.json(fdata);
	})
});

dataRouter.route('/data/:id').get(function(req, res){
	
	if(req.query.lname){
		query.lname = req.query.lname;
	}

	Data.findById(req.params.id,function(err, fdata){
		
			if(err){console.log(err);
					res.status(500).send(err);
			} 
			else res.json(fdata);
	})
});

app.use("/api", dataRouter);

app.get('/', function(req, res){
	res.send('hi');
});

app.listen(port, function(){
	console.log('Running on PORT: ' + port);
});