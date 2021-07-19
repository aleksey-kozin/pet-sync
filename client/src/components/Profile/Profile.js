import React, { useEffect } from 'react'
import PetCard from '../PetCard/PetCard'

import { useDispatch, useSelector } from 'react-redux'
import { checkUsersAC } from '../../utils/redux/actionCreators/actionCreators'
import AuthService from '../../services/AuthServices'

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
      {userState.isAuth && userState.user.isActivated ? (
        <PetCard />
      ) : (
        '!!!!!!!!!!!!!!!'
      )}
    </>
  )
}

export default Profile
