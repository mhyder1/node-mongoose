var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create schema
var dishSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	}
},{
	timestamps: true
});

//create model to use schema

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;