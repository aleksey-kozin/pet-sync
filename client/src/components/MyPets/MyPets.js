import React, { useEffect, useState } from 'react'
import Pet from '../Pet/Pet'
import ProfileNav from '../Profile/ProfileNav'
import '../Pet/Pet.css'
import { Link } from 'react-router-dom'

function MyPets() {
  const [petArr, setPetsArr] = useState()
  //fetch в БД, получаем (пока) всех животных
  useEffect(() => {
    fetch('http://localhost:4000/findpet')
      .then((res) => res.json())
      .then((result) => setPetsArr(result.petsArr))
  }, [])

  console.log(petArr)

  return (
    <>
      <div className="container">
        <div className="main-wrapper1">
          <ProfileNav />
          <div className="pet-wrapper">
            {petArr && petArr.map((pet) => <Pet key={pet._id} value={pet} />)}
          </div>

            
          <Link to="/petcard"><div className="pet-item-add">
              <p>Добавить питомца</p>
          </div></Link>
        </div>
      </div>
    </>
  )
}

export default MyPets
