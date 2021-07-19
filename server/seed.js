const mongoose = require('mongoose')
const AnalysesBlood = require('./db/models/analysesHeart.models.js')
const connect = require('./db/connect.js')

const analysesBlood = {
  LDH: 350,
  GPT: 23,
  GOT: 6,
  ALB: 45,
  T_Pro: 45,
  T_Bil: 4,
}

async function seed() {
  await connect()
  await AnalysesBlood.insertMany(analysesBlood)
  await mongoose.connection.close()
  console.log('База засеяна')
}
seed()
