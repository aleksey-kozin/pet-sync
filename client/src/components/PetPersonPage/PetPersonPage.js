import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProfileNav from '../Profile/ProfileNav'
import './PetPage.css'
import ChartList from '../ChartList/ChartList'

function PetPersonPage(props) {
  const { id } = useParams()
  const petState = useSelector((state) => state.petsReducer.pet)
  const pet = petState.find((el) => el._id === id)
  console.log(id,pet)
  return (
    <>
      <div className="container">
        <div className="main-wrapper1">
          <ProfileNav />
           <ChartList />
          <div className="pet-profile">
          <h4>Кличка: {pet.name}</h4>
          <p>Вид: </p>
          <p>Порода: </p>
          <p>Пол: </p>
          <p>Вес: </p>
          <p>Дата рождения: </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PetPersonPage
