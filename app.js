var applicationName = "Keynote Slide Controller";
var allowedKeys = ["left", "right"];

// include
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var robot = require('robotjs');

// init
var app = express();

// configure app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// define routes
app.get('/', function(req, res){
    res.render('index', {
      applicationName: applicationName
    });   
});
app.get('/keyboard/:key', function(req, res){
  var key = req.params.key.toLowerCase();
  var index = allowedKeys.indexOf(key);
  var response = { target: 'keyboard', key: null };
  if(index != -1)
  {
    console.log("Event -> Keyboard -> " + key);
    robot.keyTap(key);
    response = { target: 'keyboard', key: key };
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(response));
});

// server listen
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(applicationName);
  console.log('Server started on port ' + port);
});

module.exports = app;