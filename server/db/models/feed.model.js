const { Schema, model } = require('mongoose')

const feedSchema = new Schema({
  img: {type: String},
  type: { type: String, require: true },
  age: { type: String, require: true },
  size: { type: String },
  veterinaryDiet: { type: String },
  brand: { type: String, require: true },
  name: { type: String, require: true },
  state: {type: Boolean, default: false}
});

module.exports = model('Feed', feedSchema)

