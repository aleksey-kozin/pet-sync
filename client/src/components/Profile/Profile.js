
import React, { useEffect } from 'react'
import './Profile.css'
import './ProfileNav'
import PetCard from '../PetCard/PetCard'
import ProfileNav from './ProfileNav'

import { useDispatch, useSelector } from 'react-redux'
import { checkUsersAC } from '../../utils/redux/actionCreators/actionCreators'
import AuthService from '../../services/AuthServices'
import { Link } from 'react-router-dom'

function Profile() {
  const userState = useSelector((state) => state.usersReducer)
  // console.log(userState)
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      if (localStorage.getItem('token')) {
        const response = await AuthService.checkAuth()
        // console.log(response)
        dispatch(checkUsersAC(response.data.user))
      }
    })()
  }, [dispatch])
  return (
    <>
      <div className="container">
        <div className="main-wrapper1">
          <ProfileNav />
          {/* <PetCard /> */}
          <div className="main-profile">
            <p></p>
            <div className="profile-item">
              <h2 className="profile-title">Информация о профиле</h2>
              <p className="profile-desc">
                Инфографика по состоянию здоровья вашего животного на основе
                анализов
              </p>
            </div>
            <div>
            <Link to="/addfeed">Добавить корм</Link>
            <Link to="/feed">Корма</Link>
            </div>
          </div>
 
        </div>
      </div>
    </>
  )
}

export default Profile
