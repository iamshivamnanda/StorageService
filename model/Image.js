const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Image', imageSchema);