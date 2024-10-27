const mongoose = require('mongoose');

const clockSchema = new mongoose.Schema({
  time: String,
  description: String,
  isTriggered: { type: Boolean, default: false },
});

module.exports = mongoose.model('Clock', clockSchema);
