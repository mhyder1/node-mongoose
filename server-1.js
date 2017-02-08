var mongoose = require('mongoose'),
	assert = require('assert');

var Dishes = require('./models/dishes-1');

//Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	//get connected!
	console.log('Connected to the server!');

	//create new user
	var newDish = Dishes({
		name:'Uthapizza',
		description: 'Yummy'
	});

	//save the user
	newDish.save(function(err){
		if(err) throw err;

		console.log('Dish created!');

		Dishes.find({}, function(err, dishes){
			if(err) throw err;

			//object containing users
			console.log(dishes);

			//close db connection
			db.collection('dishes').drop(function(){
				db.close();
			});
		});
	});
});