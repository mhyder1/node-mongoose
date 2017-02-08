var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create leadership schema
var leaderSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String
	},
	designation: {
		type: String
	},
	abbr: {
		type: String
	},
	description: {
		type: String,
		required: true
	}
},{
	timestamps: true
});

//create model to use schema

var Leaders = mongoose.model('Leader', leaderSchema);

module.exports = Leaders;