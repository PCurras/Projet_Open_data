var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer();
var fs = require("fs");

/*server.on('request', function(request, response) {
	console.log('il y a eut une requete')
	});*/

app.get('/', function (req, res) {
    res.send('Hello World!')
  })

app.get('/user/:name', function(req, res) {
	var age=''+req.query.age;
	if(age!=="undefined" && age.trim().length){
	res.send('Hello '  + req.params.name + ' tu as ' + age +' ans');
	}else{
	(res.send('Hello '  + req.params.name));
	}
})

app.get('/user/names/json', function(req, res) {
	fs.readFile('names.json', function (err, data) {
		if (err) {
			res.writeHead(500, err.message)
			res.end()
		} else {
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			res.end(data)
		}
	})
	});
	
app.get('/user/names/csv', function(req, res) {
	fs.readFile('names.csv', function (err, data) {
		if (err) {
			res.writeHead(500, err.message)
			res.end()
		} else {
			res.writeHead(200, {
				'Content-Type': 'text/csv'
			});
			res.end(data)
		}
	})
	});

app.listen(3000, () => {
 console.log("Server running on port 3000");
})
