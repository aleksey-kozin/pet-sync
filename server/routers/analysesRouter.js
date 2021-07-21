const router = require('express').Router()
const AnalysesBioCat = require('../db/models/analysesBioCat.models.js')
const AnalysesBioDog = require('../db/models/analysesBioDog.js')
const AnalysesUrineCat = require('../db/models/analysesUrineCat.js')
const analysesUrineDog = require('../db/models/analysesUrineDog.js')
const AnalysesUrineDog = require('../db/models/analysesUrineDog.js')
const AnalysesGormonsCat = require('../db/models/analysesGormonsCat.js')
const AnalysesGormonsDog = require('../db/models/analysesGormonsDog.js')
const analysesGormonsCat = require('../db/models/analysesGormonsCat.js')
const analysesGormonsDog = require('../db/models/analysesGormonsDog.js')

router.post('/list', async (req, res) => {
  const { id, spacies } = req.body
  // console.log(id,spacies);
  if (spacies === 'Кошка') {
    const analyses = await AnalysesBioCat.find({ owner: id }).sort({ date: 1 })
    res.json(analyses)
  } else {
    const analyses = await AnalysesBioDog.find({ owner: id }).sort({ date: 1 })
    res.json(analyses)
  }
})

router.post('/listpee', async (req, res) => {
  const { id, spacies } = req.body
  // console.log(id,spacies);
  if (spacies === 'Кошка') {
    const analyses = await AnalysesUrineCat.find({ owner: id }).sort({
      date: 1,
    })
    res.json(analyses)
  } else {
    const analyses = await analysesUrineDog
      .find({ owner: id })
      .sort({ date: 1 })
    res.json(analyses)
  }
})

router.post('/listmonitor', async (req, res) => {
  const { id, spacies } = req.body
  // console.log(id,spacies);
  if (spacies === 'Кошка') {
    const analyses = await analysesGormonsCat.find({ owner: id }).sort({
      date: 1,
    })
    res.json(analyses)
  } else {
    const analyses = await analysesGormonsDog
      .find({ owner: id })
      .sort({ date: 1 })
    res.json(analyses)
  }
})

router.post('/', async (req, res) => {
  const { id, spacies } = req.body
  // console.log('id', id, spacies)
  if (spacies === 'Кошка') {
    const analyses = await AnalysesBioCat.find({ owner: id }).sort({ date: 1 })
    if (!analyses.length) {
      return res.json({})
    }
    const resultAnalyses = analyses[0]._doc
    // console.log(resultAnalyses);
    let chartValue = 0
    const normal = {
      LDH: [320, 460],
      ALT: [8, 52],
      AST: [9, 39],
      ALB: [22, 32],
      T_P: [43, 75],
      T_B: [2, 5],
      GLU: [3, 8],
      T_Cho: [2, 4],
      ALP: [12, 65],
    }
    let count = 0
    for (let key in normal) {
      if (
        normal[key][0] <= resultAnalyses[key] &&
        normal[key][1] >= resultAnalyses[key]
      ) {
        chartValue += 11.1
      }
    }
    // console.log(chartValue)
    const finalAnalyse = { ...resultAnalyses }
    finalAnalyse['chart'] = chartValue
    res.json(finalAnalyse)
  } else {
    const analyses = await AnalysesBioDog.find({ owner: id }).sort({ date: 1 })
    // console.log(analyses)
    if (!analyses.length) {
      return res.json({})
    }
    const resultAnalyses = analyses[0]._doc
    // console.log('analyses',resultAnalyses);
    let chartValue = 0
    const normal = {
      LDH: [220, 450],
      ALT: [8, 57],
      AST: [9, 49],
      ALB: [22, 39],
      T_P: [50, 100],
      T_B: [1, 10],
      GLU: [3, 8],
      T_Cho: [3, 6],
      ALP: [10, 100],
    }
    let count = 0
    for (let key in normal) {
      if (
        normal[key][0] <= resultAnalyses[key] &&
        normal[key][1] >= resultAnalyses[key]
      ) {
        chartValue += 11.1
      }
    }
    // console.log(chartValue)
    const finalAnalyse = { ...resultAnalyses }
    finalAnalyse['chart'] = chartValue
    // console.log(finalAnalyse)
    res.json(finalAnalyse)
  }
})

router.post('/findblood', async (req, res) => {
  const { id, spacies } = req.body
  // console.log(id, spacies);
  if (spacies === 'Кошка') {
    const peeCat = await AnalysesBioCat.find({ owner: id })
    res.json({ result: peeCat })
  } else {
    const peeDog = await AnalysesBioDog.find({ owner: id })
    // console.log(peeDog);

    res.json({ result: peeDog })
  }
})

router.post('/findpee', async (req, res) => {
  const { id, spacies } = req.body
  // console.log(id, spacies);
  if (spacies === 'Кошка') {
    const peeCat = await AnalysesUrineCat.find({ owner: id })
    res.json({ result: peeCat })
  } else {
    const peeDog = await AnalysesUrineDog.find({ owner: id })
    // console.log(peeDog);

    res.json({ result: peeDog })
  }
})

router.post('/analysespee', async (req, res) => {
  const { id, spacies } = req.body
  // console.log('id', id, spacies)
  if (spacies === 'Кошка') {
    const analyses = await AnalysesUrineCat.find({ owner: id }).sort({
      date: 1,
    })
    if (!analyses.length) {
      return res.json({})
    }
    const resultAnalyses = analyses[0]._doc

    let chartValue = 0
    const normal = {
      AN16110: [0, 0.16],
      AN116: [1.02, 1.05],
      AN28110: [0, 0.4],
      AN15110: [0.03, 0.57],
      AN114: [5, 20],
    }
    let count = 0
    for (let key in normal) {
      if (
        normal[key][0] <= resultAnalyses[key] &&
        normal[key][1] >= resultAnalyses[key]
      ) {
        chartValue += 20
      }
    }
    // console.log(chartValue)
    const finalAnalyse = { ...resultAnalyses }
    finalAnalyse['chart'] = chartValue
    res.json(finalAnalyse)
  } else {
    const analyses = await AnalysesUrineDog.find({ owner: id }).sort({
      date: 1,
    })
    if (!analyses.length) {
      return res.json({})
    }
    const resultAnalyses = analyses[0]._doc
    // console.log(resultAnalyses)
    // console.log(resultAnalyses);
    let chartValue = 0
    const normal = {
      AN16110: [0, 0.5],
      AN116: [1.01, 1.04],
      AN28110: [0, 0.5],
      AN15110: [0.21, 0.57],
      AN114: [0, 20],
    }
    let count = 0
    for (let key in normal) {
      if (
        normal[key][0] <= resultAnalyses[key] &&
        normal[key][1] >= resultAnalyses[key]
      ) {
        chartValue += 20
      }
    }
    // console.log(chartValue)
    const finalAnalyse = { ...resultAnalyses }
    finalAnalyse['chart'] = chartValue
    res.json(finalAnalyse)
  }
})

router.post('/analysesmonitor', async (req, res) => {
  const { id, spacies } = req.body
  console.log('id', id, spacies)
  if (spacies === 'Кошка') {
    const analyses = await AnalysesGormonsCat.find({ owner: id }).sort({
      date: 1,
    })
    if (!analyses.length) {
      return res.json({})
    }
    const resultAnalyses = analyses[0]._doc

    let chartValue = 0
    const normal = {
      ACT: [10, 60],
      ALD: [7, 105],
      INS: [5, 20],
      PTH: [1, 38],
      T4: [12, 55],
      COR: [28, 140],
      GAS: [0, 18],
    }
    let count = 0
    for (let key in normal) {
      if (
        normal[key][0] <= resultAnalyses[key] &&
        normal[key][1] >= resultAnalyses[key]
      ) {
        chartValue += 14.3
      }
    }
    // console.log(chartValue)
    const finalAnalyse = { ...resultAnalyses }
    finalAnalyse['chart'] = chartValue
    res.json(finalAnalyse)
  } else {
    const analyses = await AnalysesGormonsDog.find({ owner: id }).sort({
      date: 1,
    })
    if (!analyses.length) {
      return res.json({})
    }
    const resultAnalyses = analyses[0]._doc
    console.log(resultAnalyses)
    console.log(resultAnalyses);
    let chartValue = 0
    const normal = {
      ACT: [10, 80],
      ALD: [2, 96],
      INS: [5, 20],
      PTH: [19, 123],
      T4: [15, 67],
      COR: [28, 170],
      GAS: [0, 100],
    }
    let count = 0
    for (let key in normal) {
      if (
        normal[key][0] <= resultAnalyses[key] &&
        normal[key][1] >= resultAnalyses[key]
      ) {
        chartValue += 14.3
      }
    }
    // console.log(chartValue)
    const finalAnalyse = { ...resultAnalyses }
    finalAnalyse['chart'] = chartValue
    // console.log(finalAnalyse)
    res.json(finalAnalyse)
  }
})

module.exports = router
