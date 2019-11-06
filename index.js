var express = require("express");
var app = express();
var csv = require("csv-express");
var http = require("https");
const fs = require("fs");

var options = {
	"method": "GET",
	"hostname": "restcountries-v1.p.rapidapi.com",
	"port": null,
	"path": "/name/spain",
	"headers": {
		"x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
		"x-rapidapi-key": "26e57b845amshaa9422739e19bd5p1d003djsnbd617bf3b072"
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