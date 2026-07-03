const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
  },
  technologies: {
    type: [String],
    required: true,
  },
  imageUrl: {
    type: String,
  },
  githubUrl: {
    type: String,
  },
  liveUrl: {
    type: String,
  },
  contribution: {
    type: String,
  },
  challenges: {
    type: String,
  },
  lessonsLearned: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', projectSchema);