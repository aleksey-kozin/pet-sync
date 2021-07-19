import React from 'react'
import ProfileNav from '../Profile/ProfileNav'

function Appointment(props) {
  return (
    <>
      <div className="container">
        <div className="main-wrapper1">
          <ProfileNav />
          <div className="main-profile">
          <p>У вас пока нет записей. Запишитесь к нам на прием.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Appointment
