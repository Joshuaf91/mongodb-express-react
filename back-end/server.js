// importing nodemodual
	
	// handles server
	const express = require('express');

	// handles our database
	const mongoose = require("mongoose");


	//allows you to create paths using relative notation
	const path = require('path');

// an instance of express
const app = express();

// an instance of expressRouter this allows you to handle "Get, "POST", "DELETE", "PUT"
const router = express.Router();

// creates an absoulute path based on your file location
const absoulutePath =  path.join(__dirname, "../");

//~~~~~~~~~~~~below this sets up your server~~~~~~~~~~~~~~~

//this handles my routes
	//if i got to localhost:5555/post 
	app.use("/blogpost", blogPostRouter)

	//if i go to localhost:5555/ showIndexHTML
	app.use("/", showIndexHTML);

	

// app.listen takes two argument first a portnumber to listen second (optional) callback function
app.listen(5555, function(){
	//our call back function will show up on our terminal and helps us test if we set up properly.
	console.log('listen to port 5555')
});



function showIndexHTML(req, res){
	res.sendFile(absoulutePath + "./front-end/index.html");
}

function blogPostRouter(req, res){
	//if in our url we enter /blogpost
		//if its a get request
		function getMyBlogPost(){
			res.send(blogPost.find({}), function(error,data){
				if(error) console.log("bad get request")
					else{console.log(data)}
			})
		}
		//if its a post request
		function makeMyBlogPost(){
			blogPost.create({title: "victor", author:"esmeralda"}, function(error){
				if(error) console.log("bad request")
			})
		}

	router.route('/')
		.get(getMyBlogPost)
		.post(makeMyBlogPost)

}

// ~~~~~~~~~~~~~~~~~~~~ below this is to set up database connection.~~~~~~~~~~~~~~~~~~~~

// connect to mongoDB if it exisit it will connect otherwise it will create it
mongoose.connect('mongodb://localhost/esmeralda-victor');

///////////////////////////////////////////////
/// model schema
//////////////////////////////////////////////


// models how your database must be orginized
const blogPostSchema = mongoose.Schema({
	title : {type: String, required: true},
	author: {type: String, required: true},
});

//first argument is model name second is schema
const blogPost = mongoose.model("BlogPost", blogPostSchema);

///////////////////////////////////////////////
///  connecting to database
//////////////////////////////////////////////

//is related to line 40. line 40 is the instruction, below is the actions.
const db = mongoose.connection;

//if connection is open to esmeralda-victor do below callback
db.on('open', function (){
	// //if i got to localhost:5555/post 
	// app.use("/blogpost", blogPostRouter)

	// //if i go to localhost:5555/ showIndexHTML
	// app.use("/", showIndexHTML);

	console.log("db is running");
	// app.use("/", showIndexHTML);
	// app.listen(5555, function(){
	// //our call back function will show up on our terminal and helps us test if we set up properly.
	// console.log('listen to port 5555')
	// });
});

// if error in conecting to esmeralda-victor do below callback
db.on('error', function (){

	app.use("*", (req, res)=>{
		res.sendFile(absoulutePath + "./front-end/error.html");
	});
	console.log("db is NOT running!!!!!!")
});


