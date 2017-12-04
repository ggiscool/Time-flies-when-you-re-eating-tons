const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  comment: { type: String, require: true },
  submitted_by: { type: String, require: true },
});

module.exports = mongoose.model('Comment', commentSchema);
