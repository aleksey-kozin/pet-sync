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
  console.log('pet',pet)
  return (
    <>
      <div className="container">
        <div className="main-wrapper1">
          <ProfileNav />
          <div className="pet-profile">
          <h4>Кличка: {pet.name ? pet.name : 'нет данных'}</h4>
          <p>Вид: {pet.spacies ? pet.spacies : 'нет данных'}</p>
          <p>Порода: {pet.breed ? pet.breed : 'нет данных'}</p>
          <p>Пол: {pet.sex ? pet.sex : 'нет данных'}</p>
          <p>Вес: {pet.weight ? pet.weight : 'нет данных'}</p>
          <p>Дата рождения: {pet.birthdate ? pet.birthdate : 'нет данных'}</p>
          </div>
           <ChartList />
        </div>
      </div>
    </>
  )
}

export default PetPersonPage
