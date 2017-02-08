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

	//create new dish
	Dishes.create({
		name: 'Uthapizza',
		description: 'Yummy'
	}, function(err, dish){
		if(err) throw err;

		console.log('Dish created!');
		console.log(dish);
		var id = dish._id;

		//get all dishes
		setTimeout(function(){
			Dishes.findByIdAndUpdate(id, {
				$set:{
					description: 'Updated Yummy'
				}
			},{
				new: true
			})
			.exec(function(err, dish){
				if(err) throw err;
				console.log('Udated Dish!');
				console.log(dish);

				db.collection('dishes').drop(function(){
					db.close();
				});
			});

		}, 3000);
	
	})

});