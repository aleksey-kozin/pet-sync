const Feed = require('../db/models/feed.model')
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
  console.log(newPet);
  res.json({message: 'Питомец успешно добавлен!'});
})

router.get('/findpet', async (req, res) => {
  const findPets = await Pet.find()
  res.json({petsArr: findPets})
});

router.get("/feed", async (req, res) => {
  const findFeed = await Feed.find();
  res.json({ feedArr: findFeed });
});

module.exports = router
