import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './Pet.css'

function Pet({ value }) {

  return (
    <>
      <Link to={`/mypets/${value._id}`} style={{ textDecoration: 'none' }}>
        <div className="pet-item">
          <h2 className="pet-title">{value.name}</h2>
          <p className="pet-desc">{value.breed}</p>
          <img src="/620x414.jpeg" alt="" width="170px" />
        </div>
      </Link>
    </>
  )
}

export default Pet
