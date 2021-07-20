import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import ProfileNav from '../Profile/ProfileNav'
import './PetPage.css'
import ChartList from '../ChartList/ChartList'
import { editPetAC } from '../../utils/redux/actionCreators/actionCreators'
import { Link } from 'react-router-dom'

function PetPersonPage(props) {
  const { id } = useParams()
  const history = useHistory()
  const petState = useSelector((state) => state.petsReducer.pet)
  const dispatch = useDispatch()
  const pet = petState.find((el) => el._id === id)

  const [state, setState] = useState(true)
  const text = useRef()

  const handleDelete = () => {
    fetch(`http://localhost:4000/delete/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) console.log('Питомец удален')
      })
      .then(() => history.push('/mypets'))
  }

  const handleChange = (event) => {
    event.preventDefault()
    const name = text.current.name.value
    const spacies = text.current.spacies.value
    const breed = text.current.breed.value
    const sex = text.current.sex.value
    const weight = text.current.weight.value
    const birthdate = text.current.birthdate.value
    dispatch(editPetAC({ name, spacies, breed, sex, weight, birthdate, id }))
    setState(true)
    fetch(`http://localhost:4000/put/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, spacies, breed, sex, weight, birthdate }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) console.log('Питомец изменен')
      })
  }
  return (
    <>
      <div className="container">
        <div className="main-wrapper1">
          <ProfileNav />

          {state ? (
            <div className="pet-profile">
              <div className="formater">
                <img src="/djek.png" alt="" width="230px" />

                <div className="pet-info">
                  <h2>Кличка: {pet.name}</h2>
                  <p>Вид: {pet.spacies} </p>
                  <p>Порода: {pet.breed}</p>
                  <p>Пол:{pet.sex} </p>
                  <p>Вес: {pet.weight}</p>
                  <p>Дата рождения:{pet.birthdate} </p>
                  <button onClick={handleDelete}>удалить</button>
                  <button onClick={() => setState(false)}>изменить</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="pet-profile">
              <form ref={text}>
                <h4>
                  Кличка:
                  <input name="name" defaultValue={pet.name} />
                </h4>
                <p>
                  Вид: <input name="spacies" defaultValue={pet.spacies} />
                </p>
                <p>
                  Порода:
                  <input name="breed" defaultValue={pet.breed} />{' '}
                </p>
                <p>
                  Пол: <input name="sex" defaultValue={pet.sex} />
                </p>
                <p>
                  Вес: <input name="weight" defaultValue={pet.weight} />
                </p>
                <p>
                  Дата рождения:{' '}
                  <input name="birthdate" defaultValue={pet.birthdate} />
                </p>
                <button onClick={handleChange}>Сохранить</button>
                <button
                  onClick={() => {
                    setState(true)
                  }}
                >
                  Назад
                </button>
              </form>
            </div>
          )}          

          <div className="diet">
            <div className="pet-diet-base">
              <h2>Компонент диеты для животного</h2>
              <p>Базовая диета</p>
            </div>
            <div className="pet-diet-exact">
              <h2>Компонент диеты для животного</h2>
              <p>Точная диета</p>
            </div>
          </div>

          <div className="pet-test">
            <div className="test-item">
              <h2 className="test-title">Название теста</h2>
              <p className="test-desc">Описание теста</p>
              <img className="img" src="/test.jpeg" alt="" width="260px" />
            </div>
            <Link to={`/addanalysis/${id}`}>
            <div className="pet-item-add">
              <p>Добавить анализ</p>
            </div>
            </Link>
          </div>
          <ChartList />
        </div>
      </div>
    </>
  )
}

export default PetPersonPage
