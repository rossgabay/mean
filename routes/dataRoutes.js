var express = require('express');
var Data = require('../models/dataModel');


var routes = function(){
	
var dataRouter = express.Router();

dataRouter.route('/data')
	.post(function(req, res){
		var dt = new Data(req.body);
		dt.save();
		res.status(201).send(dt);
	})
	.get(function(req, res){
	var query = {};
	if(req.query.lname){
		query.lname = req.query.lname;
	}

	Data.find(query,function(err, fdata){
		
			if(err){console.log(err);
					res.status(500).send(err);
			} else res.json(fdata);
	});
});

dataRouter.route('/data/:id').get(function(req, res){
	
	if(req.query.lname){
		query.lname = req.query.lname;
	}

	Data.findById(req.params.id,function(err, fdata){
		
			if(err){console.log(err);res.status(500).send(err);} 
			else res.json(fdata);
	})
})
 .put(function(req, res){
 	Data.findById(req.params.id,function(err, fdata){
		
			if(err){console.log(err);res.status(500).send(err);} 
			else {
				fdata.fname = req.body.fname;
				fdata.lname = req.body.lname;
				fdata.save();
				res.json(fdata);
			}
	});

 });

	return dataRouter;
};

module.exports = routes;