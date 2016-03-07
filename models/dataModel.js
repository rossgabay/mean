var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataModel=new Schema({
	fname: {type: String},
	lname: {type: String}
});

module.exports = mongoose.model("Data", dataModel);