const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  motivation: {
    type: String,
    required: true,
    default: 'No motivation provided'
  },
  startdate: {
    type: Date,
    required: true,
    default: Date.now
  },
  streak: {
    type: Number,
    required: true,
    default: 0
  },
  completed: {
    type: Boolean,
    // required: true,
    // default: false
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
