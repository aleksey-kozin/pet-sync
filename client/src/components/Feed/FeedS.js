import React from 'react'
import { Link, useParams } from 'react-router-dom'
import ProfileNav from '../Profile/ProfileNav'


function FeedS(props) {
  const { id } = useParams()
  return (
    <>
    <div className="container">
      <div className="main-wrapper1">

      <ProfileNav />
          <div className="feed">
            <Link to={`/mypets/${id}`}>
              <img
                style={{ marginBottom: "40px" }}
                src="/left-arrow.svg"
                alt=""
                width="40px"
              />
            </Link>
            <h2 style={{ marginBottom: '40px'}}>Точная диета</h2>
            <p style={{fontSize: '19px'}}>Точной диеты для вашего питомца пока нет, запишитесь на прием для получение диеты.</p>
      </div>
    </div>
    </div>
    </>
  )
}

export default FeedS
