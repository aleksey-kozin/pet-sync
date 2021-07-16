const Pet = require('../db/models/Pet')
const router = require('express').Router()

router.get('/', (req, res) => {
  res.status(200).send('hello')
})

router.post('/addPet', async (req, res) => {
  const { name, spacies, sex, breed, birthdate, weight } = req.body
  console.log(name);
  const newPet = new Pet({
    name,
    spacies,
    sex,
    breed,
    birthdate,
    weight,
  });
  newPet.save()
  res.json({message: 'Питомец успешно добавлен!'});
})

module.exports = router
