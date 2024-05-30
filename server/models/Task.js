const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ['TODO', 'IN_PROGRESS', 'DONE'],
    default: 'TODO',
  },
});

module.exports = mongoose.model('Task', taskSchema);
