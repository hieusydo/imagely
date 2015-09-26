var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');


var app = express();

// Middleware stuff
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', function(req, res) {
  res.render('index');
})

app.listen(process.env.PORT || 8000);
console.log("Server listening on port localhost:8000");
