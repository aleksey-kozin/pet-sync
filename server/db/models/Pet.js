const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
  // image: { type: String, require: true },
  name: { type: String, require: true },
  spacies: { type: String},
  sex: { type: String},
  breed: { type: String},
  birthdate: { type: Date},
  weight: { type: Number,},
  // pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test" }],
});

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet
