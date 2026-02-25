const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,

    // Nieuwe velden voor home
    focus: String,
    goal: String,
    status: String,
    skills: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);