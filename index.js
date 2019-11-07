// librairies
var express = require("express");
var app = express();
var csv = require("csv-express");
var http = require("https");
const fs = require("fs");
var fetchUrl = require("fetch").fetchUrl;

// route accès à la racine
app.get('/', function (req, res) {
    res.send('Hello, vous êtes à la racine de ce serveur ! allez voir /index')
  })

		var currency = "";
		var change = "";
		var sc="";
		
// route accès au pays
app.get('/currency/:country' , function(req,res){
	 
// récupération du pays (actuellement écrit dans l'url, à terme : sera récupéré par ce qu'entre le client dans la barre de recherche)
	var name_country = req.params.country;

// API des infos pays 
	var options = {
		"method": "GET",
		"hostname": "restcountries-v1.p.rapidapi.com",
		"port": null,
		"path": "/name/"+name_country, // récupération de la variable name_country
		"headers": {
			"x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
			"x-rapidapi-key": "26e57b845amshaa9422739e19bd5p1d003djsnbd617bf3b072"
		}
	};

// récupération du résultat de la requête sur l'API
	var req1 = http.request(options, function (res1) {
		var chunks = [];
		res1.on("data", function (chunk) {
			chunks.push(chunk);
		});

		res1.on("end", function () {
			var body = Buffer.concat(chunks);

// selection de l'affichage des résultats
			var json = JSON.parse(body.toString());
			var fullbody = json.map(function(data){ return (data) })[0]
			console.log(fullbody['currencies'][0],fullbody['population'],fullbody['translations']['fr']);
			currency = fullbody['currencies'][0];
			
			
			//**************************************************************************************
				
// API conversion de la monnaie
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

// récupération du résultat de la requête 		
			http.get(options2, (res2) => {
				 console.log('statusCode:', res2.statusCode);
				 console.log('headers:', res2.headers);
				 
				res2.on('error', (e) => {
					console.error(e);
				});
				
				res2.on('data', (resultat) => {
					var change = resultat.toString();
					res.send('Vous avez choisi le pays suivant : '  + name_country + '. Le code de la monnaie de ce pays est le suivant : ' + currency + '. La valeur de la conversion est de ' + change);
				});
				
				sc=res.statusCode.toString();

				function test(statusCode) {
				  if (sc.startsWith('2')== true) {
					return "OK";
				  } else {
					return "NOT ok";
				  }
				}

				console.log(test(res.statusCode));
			
			});
		});
	});

				
				//*****************************************************************************************

	req1.end();	
});


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



