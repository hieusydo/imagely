var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var fs = require('fs');

var db = require("./db/db");
var strToMongooseObjectId = require("mongoose").Types.ObjectId;

var app = express();

// Middleware stuff
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/quiz', function(req, res) {
  res.render('quiz');
})

app.post('/api/storeImageUrl', function(req, res) {
  db.ImageUrls.create({
    url: req.body.url
  }, function(err, url) {
    if (err) {
      res.status(500).end();
    } else {
      res.status(201).send(url._id);
    }
  })
});

app.post('/api/storeTags:id', function(req, res) {
  console.log(req.params.id);
  var urlId = req.params.id.substring(1);
  var lang = urlId.substring(urlId.length - 2);
  urlId = urlId.substring(0, urlId.length - 2);
  console.log(urlId);

  db.Tags.create({
    imageUrl: strToMongooseObjectId(urlId),
    tags: req.body,
    language: lang
  }, function(err, tag) {
    if (err) {
      res.status(500).end();
    } else {
      res.status(201).send(tag);
    }
  })
});

app.get('/api/getRandom', function(req, res) {
  var number = db.Tags.count();
  var r = Math.floor(Math.random() * number);
  db.Tags.find().limit(1).skip(r)
    .exec(function(err, record) {
      if (err) {
        res.status(500).end();
      } else {
        res.status(201).send(record);
      }
    });
});

app.get('/api/findImage:id', function(req, res) {
  db.ImageUrls.findById(req.params.id)
    .exec(function(err, image) {
      if (err) {
        res.status(500).end();
      } else {
        res.status(201).send(image.url);
      }
    })
})

app.listen(process.env.PORT || 8000);
console.log("Server listening on port localhost:8000");
