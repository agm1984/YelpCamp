var reseedDatabase = true;

var express = require('express'),
  bodyParser = require('body-parser'),
  flash = require('connect-flash'),
  mongoose = require('mongoose'),
  methodOverride = require('method-override'),
  passport = require('passport'),
  LocalStrategy = require('passport-local');
var app = express();

var User = require('./models/user'),
  indexRoutes = require('./routes/index'),
  campgroundRoutes = require('./routes/campgrounds'),
  commentRoutes = require('./routes/comments'),
  seedDB = require('./seeds');

// App
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(flash());
app.set('view engine', 'ejs');

// Backup variables in the event of environment variable issues.  See README
var sessionSecret = process.env.SESSION_SECRET || 'gfisd78gfis8df7g';
var config = {};
config.port = 4747;
config.host = 'localhost';
config.db = 'mongodb\:\/\/' + config.host + '\/yelp\_camp';

mongoose.connect(config.db);

// Passport
app.use(require('express-session')({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Pass information to all pages
app.use(function(req, res, next) {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  res.locals.currentUser = req.user;
  next();
});

// Seed the database with fresh data
if (reseedDatabase) {
  seedDB();
}


// Routes
app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:campground_id/comments', commentRoutes);


// Start
app.listen(config.port, config.host, function () {
  console.log('Server started on port: ' + config.port);
  console.log('DB: ' + config.db);
});
