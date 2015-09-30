var mongoose = require('mongoose');

var ImageUrlSchema = new mongoose.Schema({
  url: String
});

module.exports = mongoose.model('ImageUrl', ImageUrlSchema);
