const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const pictureSchema = new mongoose.Schema({
  title: String,
  url: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  description: String,
  comments: [commentSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Picture', pictureSchema);
// module.exports = mongoose.model('Comment', commentSchema);
