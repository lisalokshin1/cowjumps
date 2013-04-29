var express   = require('express'),
    http      = require('http'),
    path      = require('path'),
    mongoose  = require('mongoose'),
    moment    = require("moment"),
    request   = require('request'),
    routes    = require('./routes');

// the ExpressJS App
var app = module.exports = express();

// configuration of port, templates (/views), static files (/public)
// and other expressjs settings for the web server.
app.configure(function(){
  // server port number
  app.set('port', process.env.PORT || 5000);
  app.set('address', process.env.IP || "localhost");
  app.set('mongoDB', process.env.MONGOLAB_URI || 'mongodb://localhost/test');

  //  templates directory to 'views'
  app.set('views', __dirname + '/views');

  // setup template engine - we're using Hogan-Express
  app.set('view engine', 'html');
  app.set('layout','layout');
  app.engine('html', require('hogan-express')); // https://github.com/vol4ok/hogan-express

  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // database 
  app.db = mongoose.connect(app.get('mongoDB'), function(){
    console.log("connected to database: " + app.get('mongoDB'));
  });
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//Routes
app.get('/', routes.home);
app.get('/home', routes.home);
app.get('/browse', routes.browse);

routes.initItinerary(app);

// create NodeJS HTTP server using 'app'
http.createServer(app).listen(app.get('port'), app.get('address'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
