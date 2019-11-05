var express = require("express");
var app = express();
var csv = require("csv-express");
var http = require("https");
const fs = require("fs");

var options = {
	"method": "GET",
	"hostname": "recipe-puppy.p.rapidapi.com",
	"port": null,
	"path": "/?i=banana%",
	"headers": {
		"x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
		"x-rapidapi-key": "bfbccef416msh5d68796c71ff54ep1d47b5jsnd820a352027f"
	}
};

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

var req = http.request(options, function (res) {
	var chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		var body = Buffer.concat(chunks);
		console.log(body.toString())
		app.get('/names', function(req,res) {
			res.format({
				'application/json': function () {

					res.send(body.toString());
				},

				'application/csv': function () {
					res.csv(body.toString());
				}
			})
		})
	});


});

req.end();

app.listen(3000, () => {
	console.log("Server running on port 3000");
})