const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
})

const User = mongoose.model('User', userSchema)

module.exports = User
