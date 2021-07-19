import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuthService from '../../services/AuthServices'
import {
  checkUsersAC,
  initUsersAC,
} from '../../utils/redux/actionCreators/actionCreators'
import { Link } from 'react-router-dom'
import TestChart from '../TestChart/TestChart'

function LoginForm(props) {
  const userState = useSelector((state) => state.usersReducer)
  console.log(userState)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('token')) {
        const response = await AuthService.checkAuth()
        // console.log(response)
        dispatch(checkUsersAC(response.data.user))
      }
    })()
  }, [])

  const handlerSubmit = async (event) => {
    try {
      event.preventDefault()

      const email = event.target.email.value
      const password = event.target.password.value

      const response = await AuthService.login(email, password)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      dispatch(initUsersAC(response.data.user))
    } catch (error) {
      console.log(error.response?.data?.message)
    }
  }
  return (
    <>
      {/* <h1>
        {userState.isAuth
          ? `Пользователь авторизован ${userState.user.email}`
          : 'АВТОРИЗУЙТЕСЬ'}
      </h1>
      <h1>
        {userState.user.isActivated
          ? 'Аккаунт подтвержден по почте'
          : 'ПОДТВЕРДИТЕ АККАУНТ!!!!'}
      </h1> */}
      {(userState.isAuth && userState.user.isActivated) ? <TestChart /> : '!!!!!!!!!!!!!!!'}

      <div className="container">
        <form onSubmit={handlerSubmit}>
          <div className="container">
            <label>
              <b>Email</b>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              required
            />

            <label>
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
            />

            <button type="submit">Login</button>
            <Link to="/registration">
              <button type="submit">Reg</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginForm
