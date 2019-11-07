<<<<<<< HEAD
var http = require("https");

var options = {
	"method": "GET",
	"hostname": "currency-exchange.p.rapidapi.com",
	"port": null,
	"path": "/exchange?q=1.0&from=EUR&to=CAD",
=======
var https = require("https");

var options_convert = {
	"method": "GET",
	"hostname": "currency-exchange.p.rapidapi.com",
	"port": null,
	"path": "/exchange?q=1.0&from=EUR&to=AOA",
>>>>>>> master
	"headers": {
		"x-rapidapi-host": "currency-exchange.p.rapidapi.com",
		"x-rapidapi-key": "efb3b66297msh599418614da6f08p158ab5jsnc9958e4c2520"
	}
};

<<<<<<< HEAD
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
=======
https.get(options_convert, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

  res.on('error', (e) => {
	console.error(e);
});

const sc=res.statusCode.toString();

function test(statusCode) {
  if (sc.startsWith('2')== true) {
    return "OK";
  } else {
    return "NOT ok";
  }
}

console.log(test(res.statusCode));

});





















>>>>>>> master
