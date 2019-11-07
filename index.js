var cors = require('cors')

var express = require("express");
var app = express();
const port = process.env.PORT || 3000
app.use(cors());

require('./routes.js')(app, express);

app.listen(port)
