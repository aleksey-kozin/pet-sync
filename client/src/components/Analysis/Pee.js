import React from 'react'
import { Link, useParams } from 'react-router-dom'
import ProfileNav from '../Profile/ProfileNav'

function Pee(props) {
  const { id } = useParams()
  return (
    <>
      <div className="container">
        <div className="main-wrapper1">
          <ProfileNav />
          <div className="tests">
            <div className="tests-info">
              <Link to={`/mypets/${id}`}>
                <img
                  style={{ marginBottom: '40px' }}
                  src="/left-arrow.svg"
                  alt=""
                  width="40px"
                />
              </Link>
              <h2>Анализ мочи</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pee