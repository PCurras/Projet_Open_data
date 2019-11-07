var express = require("express");
var app = express();
const port = process.env.PORT || 3000

require('./routes.js')(app, express);

app.listen(port)