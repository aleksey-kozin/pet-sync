import React from 'react'
import ProfileNav from '../Profile/ProfileNav'
import './Appointment.css'

function Appointment(props) {
  return (
    <>
      <div className="container">
        <div className="main-wrapper1">
          <ProfileNav />
          <div className="main-profile">
          {/* <p>У вас пока нет записей. Запишитесь к нам на прием.</p> */}
          <iframe height="700px" width="900px" scrolling="no" frameborder="0" allowtransparency="true" id="ms_booking_iframe" src="https://n561042.yclients.com/"></iframe>
          </div>
        </div>
      </div>
    </>
  )
}

export default Appointment
