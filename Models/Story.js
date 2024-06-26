// models/Story.js
const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['food', 'health_fitness', 'travel', 'movie', 'education'], required: true },
  // author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: { type: Number, default: 0 },
  link:{type :String, default:"kkk"}

});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
