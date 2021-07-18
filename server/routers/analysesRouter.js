const router = require('express').Router()
const Analyses = require('../db/models/analyses.models.js')

router.get('/', async (req, res) => {
  const analyses = await Analyses.find();
  res.json(analyses);
});

module.exports = router
