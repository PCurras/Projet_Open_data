var express = require("express");
var app = express();

require('./routes.js')(app, express);

app.listen(3000, () => {
	console.log("Server running on port 3000");
})