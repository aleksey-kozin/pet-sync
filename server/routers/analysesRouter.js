const router = require('express').Router()
const AnalysesHearths = require('../db/models/analysesHeart.models.js')

// router.get('/', async (req, res) => {
//   const analyses = await AnalysesHearths.find()
//   const avrAnalyses = {}
//   analyses.map((el) => {
//     const keys = Object.keys(el._doc)

//     // console.log(keys);
//     keys.forEach((key) => {
//       // console.log('key', key)
//       // console.log('val', el[key])
//       if (avrAnalyses[key]) {
//         avrAnalyses[key] += el[key]
//       } else {
//         avrAnalyses[key] = el[key]
//       }
//     })
//   })

//   avrAnalyses['length'] = analyses.length
//   console.log(avrAnalyses)

//   res.json(avrAnalyses)
// })

router.get('/', async (req, res) => {
  const analyses = await AnalysesHearths.find().sort({ date: -1 })
  const resultAnalyses = analyses[0]._doc
  let chartValue = 0
  const normal = {
    LDH: [320, 460],
    GPT: [8, 52],
    GOT: [9, 39],
    ALB: [22, 32],
    T_Pro: [43, 75],
    T_Bil: [2, 5],
  }
  let count = 0
  for (let key in normal) {
    if (
      normal[key][0] <= resultAnalyses[key] &&
      normal[key][1] >= resultAnalyses[key]
    ) {
      chartValue += 16.6
    }
  }
  console.log(chartValue)
  const finalAnalyse = { ...resultAnalyses }
  finalAnalyse['chart'] = chartValue
  res.json(finalAnalyse)
})

module.exports = router
