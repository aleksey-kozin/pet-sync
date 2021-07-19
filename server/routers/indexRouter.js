const Feed = require('../db/models/feed.model')
const Pet = require('../db/models/Pet')
const router = require('express').Router()


router.get('/', (req, res) => {
  res.status(200).send('hello')
})

router.post('/addPet', async (req, res) => {
  const { name, spacies, sex, breed, birthdate, weight } = req.body
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

router.get('/findpet', async (req, res) => {
  const findPets = await Pet.find()
  res.json({petsArr: findPets})
});

router.get("/feed", async (req, res) => {
  const findFeed = await Feed.find();
  res.json({ feedArr: findFeed });
});

router.post('/addfeed', (req, res) => {
  const { img, type, age, size, veterinaryDiet, brand, name } = req.body
  const newFeed = new Feed({
    img,
    type,
    age,
    size,
    veterinaryDiet,
    brand,
    name,
  });
  newFeed.save();
  res.json({ message: "Корм успешно добавлен в базу данных!" });
})

module.exports = router
