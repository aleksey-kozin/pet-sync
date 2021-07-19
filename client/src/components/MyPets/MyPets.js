import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pet from '../Pet/Pet'
import ProfileNav from '../Profile/ProfileNav'
import '../Pet/Pet.css'
import { Link } from 'react-router-dom'
import { initPetAC } from '../../utils/redux/actionCreators/actionCreators'

function MyPets() {
  const [petArr, setPetsArr] = useState()
  const userState = useSelector((state) => state.usersReducer)
  console.log(userState)

  const petState = useSelector((state) => state.petsReducer.pet)
  const dispatch = useDispatch()

  //fetch в БД, получаем (пока) всех животных
  useEffect(() => {
    fetch('http://localhost:4000/findpet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userState.user.id }),
    })
      .then((res) => res.json())
      // .then((result) => console.log(result.petsArr))
      .then((result) => {
        // console.log(result);
        dispatch(initPetAC(result.petsArr))
      })
  }, [userState])

  console.log(petState)
  // console.log(petArr)

  return (
    <>
      <div className="container">
        <div className="main-wrapper1">
          <ProfileNav />
          <div className="pet-wrapper">
            {petState &&
              petState.map((pet) => <Pet key={pet._id} value={pet} />)}

            <Link to="/petcard">
              <div className="pet-item-add">
                <p>Добавить питомца</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyPets
