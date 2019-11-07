var express = require("express");
var app = express();
var csv = require("csv-express");
var http = require("https");
const fs = require("fs");
var fetchUrl = require("fetch").fetchUrl;

var options = {
	"method": "GET",
	"hostname": "restcountries-v1.p.rapidapi.com",
	"port": null,
	"path": "/name/afghanistan",
	"headers": {
		"x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
		"x-rapidapi-key": "26e57b845amshaa9422739e19bd5p1d003djsnbd617bf3b072"
	}
};

app.get('/', function (req, res) {
    res.send('Hello, vous êtes à la racine de ce serveur ! allez voir /index')
  })

		var currency = "";
		var change = "";
app.get('/currency/:country' , function(req,res){
	 
	   
		var name_country = req.params.country;

		var http = require("https");

		var options = {
			"method": "GET",
			"hostname": "restcountries-v1.p.rapidapi.com",
			"port": null,
			"path": "/name/"+name_country,
			"headers": {
				"x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
				"x-rapidapi-key": "26e57b845amshaa9422739e19bd5p1d003djsnbd617bf3b072"
			}
		};

		var req1 = http.request(options, function (res1) {
			var chunks = [];
			res1.on("data", function (chunk) {
				chunks.push(chunk);
			});

			res1.on("end", function () {
				var body = Buffer.concat(chunks);
						
				var json = JSON.parse(body.toString());
				var fullbody = json.map(function(data){ return (data) })[0]
				console.log(fullbody['currencies'][0],fullbody['population'],fullbody['translations']['fr']);
				currency = fullbody['currencies'][0];
				
				
				//**************************************************************************************
					var http2 = require("https");

					var options2 = {
						"method": "GET",
						"hostname": "currency-exchange.p.rapidapi.com",
						"port": null,
						"path": "/exchange?q=1.0&from=EUR&to="+currency,
						"headers": {
							"x-rapidapi-host": "currency-exchange.p.rapidapi.com",
							"x-rapidapi-key": "26e57b845amshaa9422739e19bd5p1d003djsnbd617bf3b072"
						}
					};

					var req2 = http2.request(options2, function (res2) {
						var chunks = [];

						res2.on("data", function (chunk) {
							chunks.push(chunk);
						});

						res2.on("end", function () {
							var body = Buffer.concat(chunks);
							
							console.log(body.toString());
							change = body.toString();
							
							res.send('Vous avez choisi le pays suivant : '  + name_country + '. Le code de la monnaie de ce pays est le suivant : ' + currency + '. La valeur de la conversion est de ' + change);
					
						});
});

					req2.end();
				
				
				
				
				
				
				//*****************************************************************************************

		
			});
		});
		req1.end();
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



app.listen(3000, () => {
	console.log("Server running on port 3000");
})