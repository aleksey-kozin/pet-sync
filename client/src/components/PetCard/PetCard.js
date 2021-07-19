import React, { useRef } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

//стили material-ui
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& > *': {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  },
}))

function PetCard() {
  const userState = useSelector((state) => state.usersReducer)
  const classes = useStyles()
  const text = useRef()
  const history = useHistory()
  console.log(userState.user.id)
  //событие по кнопке
  const addAnimal = (event) => {
    event.preventDefault()
    //объект для загрузки в бд
    const newPet = {
      name: text.current.name.value,
      spacies: text.current.spacies.value,
      sex: text.current.sex.value,
      breed: text.current.breed.value,
      birthdate: text.current.birthdate.value,
      weight: text.current.weight.value,
      owner: userState.user.id,
    }

    //fetch к бд
    fetch('http://localhost:4000/addPet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPet),
    })
      .then((res) => res.json())
      //alert "питомец загружен"
      .then((result) => alert(result.message))
      //редирект на MyPets
      .then(() => history.push('/mypets'))
  }

  return (
    <div>
      <form ref={text} className={classes.root} noValidate autoComplete="off">
        <div>
          <div className={classes.root}>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Загрузить фото
              </Button>
            </label>
          </div>
          <TextField
            required
            name="name"
            id="outlined-required"
            label="Кличка"
            variant="outlined"
          />
          <TextField
            name="spacies"
            id="outlined-required"
            label="Вид"
            variant="outlined"
          />
          <TextField
            name="breed"
            id="outlined-required"
            label="Порода"
            variant="outlined"
          />
          <TextField
            name="sex"
            id="outlined-required"
            label="Пол"
            variant="outlined"
          />
          <TextField
            name="birthdate"
            id="outlined-required"
            label="Дата рождения"
            variant="outlined"
          />
          <TextField
            name="weight"
            id="outlined-required"
            label="Вес"
            variant="outlined"
          />
        </div>
        <Button onClick={addAnimal} type="submit" variant="contained">
          Добавить питомца
        </Button>
      </form>
    </div>
  )
}

export default PetCard
