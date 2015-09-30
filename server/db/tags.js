var mongoose = require('mongoose');

var TagSchema = new mongoose.Schema({
  imageUrl: { type: mongoose.Schema.Types.ObjectId, ref: 'ImageUrl' },
  tags: Object,
  language: String
});

module.exports = mongoose.model('Tag', TagSchema);