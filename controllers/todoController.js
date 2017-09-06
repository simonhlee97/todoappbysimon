var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to Database
mongoose.connect('mongodb://simonlee4945:ByoungEun2014@ds127034.mlab.com:27034/simontodoapp17');

// create a schema - like a blueprint
var todoSchema = new mongoose.Schema({
	item: String
});

// create a Todo model (collection)
var Todo = mongoose.model('Todo', todoSchema);

// create one item instance and save to DB for testing..
// var itemOne = Todo({item: "Buy Flowers"}).save(function(err){
// 	if(err) throw err;
// 	console.log('item saved');
// });

// var data = [{item: 'get milk'},{item: 'walk dog'},{item: 'coding'}];

var urlencodedParser = bodyParser.urlencoded({extended: false}); //the post request middleware

module.exports = function(app){

	app.get('/todo', function(req, res){
		//get data from MongoDB and pass it to view
		Todo.find({}, function(err, data){
			if (err) throw err;
			res.render('todo', {todos: data});
		});
		
	});

	app.post('/todo', urlencodedParser, function(req, res){
		// send data from the view (text input box) to MongoDB
		var newTodo = Todo(req.body).save(function(err,data){
			if (err) throw err;
			res.json(data);
		})
	});

	app.delete('/todo/:item', function(req, res){
		//delete the item from MongoDB
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
			if (err) throw err;
			res.json(data);
		})
	});

};