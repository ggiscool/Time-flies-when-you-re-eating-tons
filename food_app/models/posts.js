const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  img: { type: String, require: true },
  caption: { type: String, require: true },
  post: { type: String, require: true },
  submitted_by: { type: String, require: true },
  location: String,
  link: String
});


module.exports = mongoose.model('Posts', postSchema);
