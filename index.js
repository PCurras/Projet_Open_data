var express = require("express");/* npm install express */
var csv = require('csv-express')/* npm install csv-express*/

const fs = require('fs')

var app = express();

app.get('/', function (req, res) {
    res.send('Hello, vous êtes à la racine de ce serveur ! allez voir /index')
  })

var http = require("https");

var options = {
	"method": "GET",
	"hostname": "ajayakv-rest-countries-v1.p.rapidapi.com",
	"port": null,
	"path": "/rest/v1/all",
	"headers": {
		"x-rapidapi-host": "ajayakv-rest-countries-v1.p.rapidapi.com",
		"x-rapidapi-key": "26e57b845amshaa9422739e19bd5p1d003djsnbd617bf3b072"
	}
};

var req = http.request(options, function (res) {
	var chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		var body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();


//API

/* app.get('/user/:name', function(req, res) {
	var age=''+req.query.age;
	if(age!=="undefined" && age.trim().length){
	res.send('Hello '  + req.params.name + ' tu as ' + age +' ans');
	}else{
	(res.send('Hello '  + req.params.name));
	}
}) */

/* app.get('/names', function(req,res) {
	res.format({
        'application/json': function () {
            res.json([{name : 'toto'}, {name : 'baptiste'}, {name : 'gabriel'}]);
        },

        'application/csv': function () {
            res.csv([{name : 'toto'}, {name : 'baptiste'}, {name : 'gabriel'}]);
        }
    })
}) */

//static ressources

/* app.get('/index', function(req,res) {
	fs.readFile('index.html', function(err, html) {
	if(err){throw err;}
	res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(html)
            res.end()
	})

}) */

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  });


