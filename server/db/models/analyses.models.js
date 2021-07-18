const { Schema, model } = require('mongoose')

const analysesSchema = new Schema({
  idPet: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],
  normalone: { type: Number },
  normaltwo: { type: Number },
  normalthree: { type: Number },
  one: { type: Number },
  two: { type: Number },
  three: { type: Number },
})

module.exports = model('Analyses', analysesSchema)
