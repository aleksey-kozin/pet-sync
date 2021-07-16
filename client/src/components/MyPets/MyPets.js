import React, { useEffect, useState } from 'react';
import Pet from '../Pet/Pet';

function MyPets() {
  const [petArr, setPetsArr] = useState()
  //fetch в БД, получаем (пока) всех животных
  useEffect(() => {
    fetch("http://localhost:4000/findpet")
      .then((res) => res.json())
      .then((result) => setPetsArr(result.petsArr));
  }, [])

  console.log(petArr);

  return (
    <div>
      {petArr && petArr.map((pet) => (
        <Pet key={pet._id} value={pet} />
      ))}
    </div>
  );
}

export default MyPets;
