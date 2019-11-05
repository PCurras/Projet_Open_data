var http = require("https");

var options = {
	"method": "GET",
	"hostname": "fr.openfoodfacts.org/cgi",
	"port": null,
	"path": "search.pl?search_terms=%27france%27&json=1&page_size=500",
	"headers": {
		"x-rapidapi-host": "fr.openfoodfacts.org/cgi"
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

