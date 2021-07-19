import React from 'react'
import './Profile.css'
import './ProfileNav'
import PetCard from '../PetCard/PetCard'
import ProfileNav from './ProfileNav'

function Profile() {
  return (
    <>
      <div className="container">
        <div className="main-wrapper1">
          <ProfileNav />
          {/* <PetCard /> */}
          <div className="main-profile">
            <p>Информация о профиле</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
