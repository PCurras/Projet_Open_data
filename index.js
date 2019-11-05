var express = require("express");
var app = express();
var csv = require('csv-express')
const fs = require("fs");

app.get('/user/:name', function(req, res) {
	var age=''+req.query.age;
	if(age!=="undefined" && age.trim().length){
	res.send('Hello '  + req.params.name + ' tu as ' + age +' ans');
	}else{
	(res.send('Hello '  + req.params.name));
	}
})

app.get('/index', function(req,res) {
	fs.readFile('index.html', function(err, html) {
		if(err){
			res.writeHead(500, err.message)
			res.end()
		} else {
			res.writeHead(200, {'Content-Type': 'text/html'})
		}
		res.write(html)
		res.end()
	})

})

app.get('/names', function(req,res) {
	res.format({
		'application/json': function () {
			res.json([{name : 'toto'}, {name : 'baptiste'}, {name : 'gabriel'}]);
		},

		'application/csv': function () {
			res.csv([{name : 'toto'}, {name : 'baptiste'}, {name : 'gabriel'}]);
		}
	})
})


app.listen(3000, () => {
 console.log("Server running on port 3000");
})
