var dataController = function(Data){
	
	var post = function(req, res){
		    var dt = new Data(req.body);
		    dt.save(function(err){
		          if(err) {
		            console.log(err);
		            res.status(500).send(err);
		          } else {
		            res.status(201).send(dt);
		          }

		        }); 
		  }

	var get = function(req, res){
		  var query = {};
		  if(req.query.lname){
		    query.lname = req.query.lname;
		  }

		  Data.find(query,function(err, fdata){
		    
		      if(err){console.log(err);
		          res.status(500).send(err);
		      } else {
		      	var retData = [];
		      	fdata.forEach(function(element, index, array){
		      		var newFdata = element.toJSON();
		      		newFdata.links = {};
		      		newFdata.links.self = 'http://' + req.headers.host + '/api/data/' + newFdata._id;
		      		retData.push(newFdata);
		      	})
		      	res.json(retData);
		      }
		  });
		}

	return {
		post: post,
		get: get
	}
}

module.exports = dataController;