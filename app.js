var express = require('express');
var app = express();

// Use bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Set view template engine
app.set('view engine', 'ejs');

// Landing Route
app.get('/', function(req, res) {
    res.render('landing');
});

// Campground Route
app.get('/campgrounds', function(req, res) {
    var campgrounds = [
        { name: "Salmon Creek", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg" },
        { name: "Granite Hill", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg" },
        { name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg" }
    ];
    res.render('campgrounds', { campgrounds: campgrounds });
});
app.post('/campgrounds', function(req, res) {
    res.send('you hit the campgrounds post');
    // get data from form and add to campgrounds array
    // redirect back to campgrounds page
});

// Server Config
var config = {};
config.port = 3000;
config.host = "localhost";

// Start Server
app.listen(config.port, config.host, function () {
  console.log("Server started on port: " + config.port);
});
