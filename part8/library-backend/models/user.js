const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
  },
  favouriteGenre: {
    type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: 'Genre',
  },
})

module.exports = mongoose.model('User', schema)
