import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import ProfileNav from '../Profile/ProfileNav'
import './PetPage.css'
import ChartList from '../ChartList/ChartList'
import { editPetAC } from '../../utils/redux/actionCreators/actionCreators'

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
      method: 'DELETE'
    })
      .then(res => res.json())
      .then((result) => {if(result.status) console.log("Питомец удален")})
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
    dispatch(editPetAC({name,spacies,breed,sex, weight, birthdate, id}))
    setState(true)
    fetch(`http://localhost:4000/put/${id}`, {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name,spacies,breed,sex, weight, birthdate})
    })
      .then(res => res.json())
      .then(result => {if(result.status) console.log("Питомец изменен")})
    
  }
  return (
    <>
      <div className="container">
        <div className="main-wrapper1">
          <ProfileNav />
            <ChartList />
            { 
              state
              ? <div className="pet-profile" >
                  <h4>Кличка: {pet.name}</h4>
                  <p>Вид: {pet.spacies} </p>
                  <p>Порода: {pet.breed}</p>
                  <p>Пол:{pet.sex} </p>
                  <p>Вес: {pet.weight}</p>
                  <p>Дата рождения:{pet.birthdate} </p>
                  <button onClick={handleDelete} >удалить</button>
                  <button onClick={()=>setState(false)} >изменить</button>
                </div>
              : <div className="pet-profile" >
                <form ref={text}>
              <h4>Кличка:<input name="name" defaultValue={pet.name}/></h4>
              <p>Вид: <input name="spacies" defaultValue={pet.spacies}/></p>
              <p>Порода:<input name="breed" defaultValue={pet.breed}/> </p>
              <p>Пол: <input name="sex" defaultValue={pet.sex}/></p>
              <p>Вес: <input name="weight" defaultValue={pet.weight}/></p>
              <p>Дата рождения: <input name="birthdate" defaultValue={pet.birthdate}/></p>
              <button onClick={handleChange}>Сохранить</button>
              </form>
            </div>              
            }
        </div>
      </div>
    </>
  )
}

export default PetPersonPage
