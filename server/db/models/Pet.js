const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
  image: { type: String, require: true },
  name: { type: String, require: true },
  sex: { type: String, require: true },
  breed: { type: String, require: true },
  birthdate: { type: Date, require: true },
  weight: { type: Number, require: true },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test' }],
})

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet
