const fs = require("fs");
var csv = require("csv-express");
var http = require("https");
var fetchUrl = require("fetch").fetchUrl;
const Json2csvparser = require('json2csv').Parser

module.exports = function(app, express) {
    const routes = express.Router();

    //TODO FUNCTIONS

    function callAPIfromCountryName(name_country, res) {
        var http = require("https");

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
                            "path": "/exchange?q=1.0&from=EUR&to=" + currency,
                            "headers": {
                                "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
                                "x-rapidapi-key": "26e57b845amshaa9422739e19bd5p1d003djsnbd617bf3b072"
                            }
                        };

                        // récupération du résultat de la requête 		
						http.get(options2, (res2) => {
							 console.log('statusCode:', res2.statusCode);
							 //console.log('headers:', res2.headers);
						
							sc=res2.statusCode.toString();

							  if (sc.startsWith('2')== true) {
									res2.on('data', (resultat) => {
								var change = resultat.toString();
								//res.send('Vous avez choisi le pays suivant : '  + name_country + '. Le code de la monnaie de ce pays est le suivant : ' + currency + '. La valeur de la conversion est de ' + change);
								fullbody.conversionMoney = change;
                                res.send(fullbody);
							});
							  } else {
								  fullbody.conversionMoney = "not available";
                                res.send(fullbody);
							  }
						});
							
					});
				});
			req1.end();
            }
        })
    }

    function addConversionMoney(fullbody, res) {
        var http = require("https");

        var options = {
            "method": "GET",
            "hostname": "currency-exchange.p.rapidapi.com",
            "port": null,
            "path": "/exchange?q=1.0&from=EUR&to=" + currency,
            "headers": {
                "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
                "x-rapidapi-key": "26e57b845amshaa9422739e19bd5p1d003djsnbd617bf3b072"
            }
        };

        var req = http.request(options, function (res2) {
            var chunks = [];

            res2.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res2.on("end", function () {
                var body = Buffer.concat(chunks);

                console.log(body.toString());
                change = body.toString();

                //res.send('Vous avez choisi le pays suivant : '  + name_country + '. Le code de la monnaie de ce pays est le suivant : ' + currency + '. La valeur de la conversion est de ' + change);
                fullbody.conversionMoney = change;
                res.send(fullbody);
            });
        });

        req.end();
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

    // apply the routes to our application
    app.use('/', routes);
}
