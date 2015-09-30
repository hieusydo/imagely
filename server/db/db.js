var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/imagely');

module.exports = {
  ImageUrls: require('./imageUrl.js'),
  Tags: require('./tags.js')
}

