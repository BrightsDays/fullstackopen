const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: 'Author',
    minlength: 4,
  },
  genres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      type: String,
      ref: 'Genre',
    },
  ],
})

module.exports = mongoose.model('Book', schema)
