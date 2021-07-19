import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Pet from '../Pet/Pet'

function MyPets() {
  const [petArr, setPetsArr] = useState()
  const userState = useSelector((state) => state.usersReducer)
  //fetch в БД, получаем (пока) всех животных
  useEffect(() => {
    fetch('http://localhost:4000/findpet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id:userState.user.id}),
    })
      .then((res) => res.json())
      .then((result) => setPetsArr(result.petsArr))
  }, [])

  console.log(petArr)

  return (
    <div>
      {petArr && petArr.map((pet) => <Pet key={pet._id} value={pet} />)}
    </div>
  )
}

export default MyPets
