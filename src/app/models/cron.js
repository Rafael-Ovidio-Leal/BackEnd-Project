const mongoose = require('mongoose');

const CronSchema = new mongoose.Schema({
  status_connection: {
    type: Boolean,
    required: true
  },
  last_run_t: {
    type: Date,
    default: Date.now
  },
  run_t: {
    type: String
  },
  memory_use: {
    type: String
  }
});

module.exports = mongoose.model('crons', CronSchema);