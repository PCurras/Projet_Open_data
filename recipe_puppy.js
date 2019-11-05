var http = require("https");

var options = {
	"method": "GET",
	"hostname": "recipe-puppy.p.rapidapi.com",
	"port": null,
	"path": "/?i=banana%",
	"headers": {
		"x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
		"x-rapidapi-key": "bfbccef416msh5d68796c71ff54ep1d47b5jsnd820a352027f"
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



