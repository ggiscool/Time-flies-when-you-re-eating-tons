const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  post: { type: String, require: true },
  submitted_by: { type: String, require: true },
  location: String,
  caption: String
});


module.exports = mongoose.model('Posts', postSchema);
