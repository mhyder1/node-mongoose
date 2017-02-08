var mongoose = require('mongoose'),
	assert = require('assert');

var Leaders = require('./models/leadership');

//Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	//get connected!
	console.log('Connected to the server!');

	//create new leader
	Leaders.create({
		name: 'Peter Pan',
		image: 'images/alberto.png',
		designation: 'Chief Epicurious Officer',
		abbr: 'CEO',
		description: 'Our CEO, Peter, . . .'
	}, function(err, leader){
		if(err) throw err;

		console.log('leader created!');
		console.log(leader);
		var id = leader._id;

		//get all leaders
		setTimeout(function(){
			Leaders.findByIdAndUpdate(id, {
				$set:{
					description: 'Updated Our CEO, Peter, . . .'
				}
			},{
				new: true
			})
			.exec(function(err, leader){
				if(err) throw err;
				console.log('Udated Leader!');
				console.log(leader);

				db.collection('Leaders').drop(function(){
					db.close();
				});

			});

		}, 3000);
	
	})

});