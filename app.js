var express = require('express');
var app = express();

// Set public asset directory and template engine
//app.use(express.static('views'));
app.set('view engine', 'ejs');

// Landing Route
app.get('/', function(req, res) {
    res.render('landing');
});

// Server Config
var config = {};
config.port = 3000;
config.host = "localhost";

// Start Server
app.listen(config.port, config.host, function () {
  console.log("Server started on port: " + config.port);
});
