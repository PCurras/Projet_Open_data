var http = require("https");

var options = {
	"method": "GET",
	"hostname": "currency-exchange.p.rapidapi.com",
	"port": null,
	"path": "/exchange?q=1.0&from=EUR&to=CAD",
	"headers": {
		"x-rapidapi-host": "currency-exchange.p.rapidapi.com",
		"x-rapidapi-key": "efb3b66297msh599418614da6f08p158ab5jsnc9958e4c2520"
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