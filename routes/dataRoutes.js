var express = require('express');
var Data = require('../models/dataModel');


var routes = function(){
	
var dataRouter = express.Router();
var dataController = require('../controllers/dataController')(Data);

dataRouter.route('/data')
	.post(dataController.post)
	.get(dataController.get);

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
	 //req.fdata populated by middleware setup

	var retFdata = req.fdata.toJSON();

	retFdata.links = {};
	retFdata.links.FilterByThisLname = 'http://' + req.headers.host + '/api/data/?lname=' + retFdata.lname;

	res.json(retFdata);
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
 	})
 .patch(function(req, res){
		 	if(req.body._id) delete req.body._id;

		 	 for(var d in req.body){   		  //unlike PUT only updating provided field values
		          req.fdata[d] = req.body[d]; //req.fdata populated by middleware setup
		        }

		     req.fdata.save(function(err){
		          if(err) {
		            console.log(err);
		            res.status(500).send(err);
		          } else {
		            res.json(req.fdata);
		          }

		        });

 })
 .delete(function(req, res){
	 	req.fdata.remove(function(err){
			          if(err) {
			            console.log(err);
			            res.status(500).send(err);
			          } else {
			            res.status(204).send();
			          }

			        });
 });
 				
	return dataRouter;
};

module.exports = routes;