var mongoose = require('mongoose'),
	assert = require('assert');

var Promotions = require('./models/promotions');

//Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	//get connected!
	console.log('Connected to the server!');

	//create new promotion
	Promotions.create({
		name: 'Weekend Grand Buffet',
		image: 'images/buffet.png',
		label: 'New',
		price: '19.99',
		description: 'Featuring . . .'
	}, function(err, promo){
		if(err) throw err;

		console.log('promo created!');
		console.log(promo);
		var id = promo._id;

		//get all promos
		setTimeout(function(){
			Promotions.findByIdAndUpdate(id, {
				$set:{
					description: 'Updated Featuring . . .'
				}
			},{
				new: true
			})
			.exec(function(err, promo){
				if(err) throw err;
				console.log('Udated Promotion!');
				console.log(promo);

				db.collection('promotions').drop(function(){
					db.close();
				});

			});

		}, 3000);
	
	})

});