const fs = require("fs");
var csv = require("csv-express");
var http = require("https");
var fetchUrl = require("fetch").fetchUrl;
const Json2csvparser = require('json2csv').Parser

module.exports = function(app, express) {
    const routes = express.Router();

    //TODO FUNCTIONS

     function currency_function(name_country, res) {
		var options = {
			"method": "GET",
			"hostname": "restcountries-v1.p.rapidapi.com",
			"port": null,
			"path": "/name/" + name_country,
			"headers": {
				"x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
				"x-rapidapi-key": "26e57b845amshaa9422739e19bd5p1d003djsnbd617bf3b072"
			}
		};

		var req = http.request(options, function (res1) {
			var chunks = [];
			res1.on("data", function (chunk) {
				chunks.push(chunk);
			});

			res1.on("end", function () {
				var body = Buffer.concat(chunks);

				var json = JSON.parse(body.toString());
				var fullbody = json.map(function (data) {
					return (data)
				})[0]
				currency = fullbody['currencies'][0];
				res.send(currency);
			});
		});
	req.end();
	};
	
	
	function capital_function(name_country, res) {
	var options = {
		"method": "GET",
		"hostname": "restcountries-v1.p.rapidapi.com",
		"port": null,
		"path": "/name/" + name_country,
		"headers": {
			"x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
			"x-rapidapi-key": "26e57b845amshaa9422739e19bd5p1d003djsnbd617bf3b072"
		}
	};

	var req = http.request(options, function (res1) {
		var chunks = [];
		res1.on("data", function (chunk) {
			chunks.push(chunk);
		});

		res1.on("end", function () {
			var body = Buffer.concat(chunks);

			var json = JSON.parse(body.toString());
			var fullbody = json.map(function (data) {
				return (data)
				console.log(data);
			})[0]
			capital = fullbody['capital'];
			res.send(capital);
		});
	});
	req.end();
	};
					
	
    function callAPIfromCountryName(name_country, res) {
        var http = require("https");

        var options = {
            "method": "GET",
            "hostname": "restcountries-v1.p.rapidapi.com",
            "port": null,
            "path": "/name/" + encodeURI(name_country),
            "headers": {
                "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
                "x-rapidapi-key": "26e57b845amshaa9422739e19bd5p1d003djsnbd617bf3b072"
            }
        };
        res.format({
            'application/json': function () {
                var req1 = http.request(options, function (res1) {
                    var chunks = [];
                    res1.on("data", function (chunk) {
                        chunks.push(chunk);
                    });

                    res1.on("end", function () {
                        var body = Buffer.concat(chunks);

                        var json = JSON.parse(body.toString());
                        var fullbody = json.map(function (data) {
                            return (data)
                        })[0]
                        console.log(fullbody['currencies'][0], fullbody['population'], fullbody['translations']['fr']);
                        currency = fullbody['currencies'][0];

                        addConversionMoney(fullbody, res);

                    });
                });
                req1.end();
            },
            'text/csv': function () {
                var req1 = http.request(options, function (res1) {
                    var chunks = [];
                    res1.on("data", function (chunk) {
                        chunks.push(chunk);
                    });

                    res1.on("end", function () {
                        var body = Buffer.concat(chunks);

                        var json = JSON.parse(body.toString());
                        var fullbody = json.map(function (data) {
                            return (data)
                        })[0]
                        console.log(fullbody['currencies'][0], fullbody['population'], fullbody['translations']['fr']);
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
						

						http.get(options2, (res2) => {
							 console.log('statusCode:', res2.statusCode);
							 //console.log('headers:', res2.headers);
						
							sc=res2.statusCode.toString();

							  if (sc.startsWith('2')== true) {
									res2.on('data', (resultat) => {
								var change = resultat.toString();
								
						        fullbody.euroToLocalMoney = change;
                                fields = ["name", "topLevelDomain", "alpha2Code", "alpha3Code", "callingCodes", "capital", "altSpellings", "region", "subregion", "population", "latlng", "demonym", "area", "gini", "timezones", "borders", "nativeName", "numericCode", "currencies", "languages", "translations", "relevance", "euroToLocalMoney"]

                                json2csvParser = new Json2csvparser({fields})
                                csv = json2csvParser.parse(fullbody, function (err) {
                                    res.redirect('/')
                                })
                                res.setHeader('Content-disposition', 'attachment; filename=test.csv')
                                res.set('Content-Type', 'text/csv')
                                res.send(csv)
							});
							  } else {
						        fullbody.euroToLocalMoney = "not available";
                                fields = ["name", "topLevelDomain", "alpha2Code", "alpha3Code", "callingCodes", "capital", "altSpellings", "region", "subregion", "population", "latlng", "demonym", "area", "gini", "timezones", "borders", "nativeName", "numericCode", "currencies", "languages", "translations", "relevance", "euroToLocalMoney"]

                                json2csvParser = new Json2csvparser({fields})
                                csv = json2csvParser.parse(fullbody, function (err) {
                                    res.redirect('/')
                                })
                                res.setHeader('Content-disposition', 'attachment; filename=test.csv')
                                res.set('Content-Type', 'text/csv')
                                res.send(csv)
							  }
						});
						
                        // var req2 = http2.request(options2, function (res2) {
                            // var chunks = [];

                            // res2.on("data", function (chunk) {
                                // chunks.push(chunk);
                            // });

                            // res2.on("end", function () {
                                // var body = Buffer.concat(chunks);

                                // console.log(body.toString());
                                // change = body.toString();

                                // res.send('Vous avez choisi le pays suivant : '  + name_country + '. Le code de la monnaie de ce pays est le suivant : ' + currency + '. La valeur de la conversion est de ' + change);
                                // fullbody.euroToLocalMoney = change;
                                // fields = ["name", "topLevelDomain", "alpha2Code", "alpha3Code", "callingCodes", "capital", "altSpellings", "region", "subregion", "population", "latlng", "demonym", "area", "gini", "timezones", "borders", "nativeName", "numericCode", "currencies", "languages", "translations", "relevance", "euroToLocalMoney"]

                                // json2csvParser = new Json2csvparser({fields})
                                // csv = json2csvParser.parse(fullbody, function (err) {
                                    // res.redirect('/')
                                // })
                                // res.setHeader('Content-disposition', 'attachment; filename=test.csv')
                                // res.set('Content-Type', 'text/csv')
                                // res.status(200).send(csv)
                            // });
                        // });

                        // req2.end();
                    });
                });
                req1.end();
            }
        })
    }

    function addConversionMoney(fullbody, res) {
        var http = require("https");

        var options3 = {
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
		http.get(options3, (res2) => {
			console.log('statusCode:', res2.statusCode);
			//console.log('headers:', res2.headers);
						
			sc=res2.statusCode.toString();

			if (sc.startsWith('2')== true) {
				res2.on('data', (resultat) => {
					var change = resultat.toString();
					//res.send('Vous avez choisi le pays suivant : '  + name_country + '. Le code de la monnaie de ce pays est le suivant : ' + currency + '. La valeur de la conversion est de ' + change);
					fullbody.euroToLocalMoney = change;
					res.send(fullbody);
				});
			} else {
				fullbody.euroToLocalMoney = "not available";
				res.send(fullbody);
			}
		});
	}
		
    //ROUTES

    app.get('/country/:country', function (req, res) {
        var name_country = req.params.country;
        callAPIfromCountryName(name_country, res);
    })

    app.get('/', function (req, res) {
        fs.readFile('client.html', function (err, html) {
            if (err) {
                res.writeHead(500, err.message)
                res.end()
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'})
            }
            res.write(html)
            res.end()
        })
    })
    app.get('/', function (req, res) {
        fs.readFile("stylesheet.css", function (err, css) {
            if (err) {
                res.writeHead(500, err.message);
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
            }
            res.write(css);
            res.end();
        })
    })

	app.get('/currency/:country', function (req, res) {
		var name_country = req.params.country;
		currency_function(name_country, res)
	});

	app.get('/capital/:country', function (req, res) {
		var name_country = req.params.country;
		capital_function(name_country, res)
	});
	
    // apply the routes to our application
    app.use('/', routes);
}
