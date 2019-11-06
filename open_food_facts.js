var https = require("https");

// requête pour origins='france'

var options = {
	"method": "GET",
	"hostname": "fr.openfoodfacts.org",
	"port": null,
	"path": "/cgi/search.pl?search_terms=&origins=france&json=1&page_size=5",
	"headers": {
		"x-rapidapi-host": "fr.openfoodfacts.org"
	}
};

var req = https.request(options, function (res) {
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


// ############################################################


// requête pour origins='France'

var options = {
	"method": "GET",
	"hostname": "fr.openfoodfacts.org",
	"port": null,
	"path": "/cgi/search.pl?search_terms=&origins=France&json=1&page_size=5",
	"headers": {
		"x-rapidapi-host": "fr.openfoodfacts.org"
	}
};

var req = https.request(options, function (res) {
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
