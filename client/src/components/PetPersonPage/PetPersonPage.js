import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function PetPersonPage(props) {
  const { id } = useParams()
  const petState = useSelector((state) =>
    state.petsReducer.pet.find((el) => el._id === id)
  )
  console.log(petState)
  return <div>
    <h1>{petState.name}</h1>
  </div>
}

export default PetPersonPage
