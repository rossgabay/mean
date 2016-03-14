var express = require('express');
var Data = require('../models/dataModel');


var routes = function(){
	
var dataRouter = express.Router();

dataRouter.route('/data')
	.post(function(req, res){
		var dt = new Data(req.body);
		dt.save(function(err){
					if(err) {
						console.log(err);
						res.status(500).send(err);
					} else {
						res.status(201).send(dt);
					}

				});	
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

//injecting express middleware to avoid having to repeat the findById
//query for each method that uses it
dataRouter.use('/data/:id', function(req,res,next){
	Data.findById(req.params.id,function(err, fdata){
		
			if(err){
				console.log(err);
				res.status(500).send(err); // TODO : add graceful handling of CastError for invalid IDs: 
										  //Cast to ObjectId failed for value "56e0a1275c3b9f14219b1a7" at path "_id"
			} 
			else if(fdata) {
				req.fdata = fdata;
				next();
			}
			else {
				res.status(404).send('not found');	
			}
	});

});

dataRouter.route('/data/:id').get(function(req, res){
	res.json(req.fdata); //req.fdata populated by middleware setup
})
 .put(function(req, res){
 				if(req.body._id) delete req.body._id;

				req.fdata.fname = req.body.fname; //req.fdata populated by middleware setup
				req.fdata.lname = req.body.lname;
				req.fdata.save(function(err){
					if(err) {
						console.log(err);
						res.status(500).send(err);
					} else {
						res.json(req.fdata);
					}

				});
 	});

	return dataRouter;
};

module.exports = routes;