import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './FormStyle.css'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import {
  checkUsersAC,
  initUsersAC,
} from '../../utils/redux/actionCreators/actionCreators'
import AuthService from '../../services/AuthServices'

function FormSignUp() {
  const userState = useSelector((state) => state.usersReducer)
  console.log(userState)
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
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
      <h1>
        {userState.isAuth
          ? `Пользователь авторизован ${userState.user.email}`
          : 'АВТОРИЗУЙТЕСЬ'}
      </h1>
      <h1>
        {userState.user.isActivated
          ? 'Аккаунт подтвержден по почте'
          : 'ПОДТВЕРДИТЕ АККАУНТ!!!!'}
      </h1>
      <div className="wrapper">
        <div className="form">
          <form onSubmit={handlerSubmit} className="form-body">
            <h2 className="form-title">Вход</h2>
            <div className="form-item">
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="form-input"
              />
            </div>
            <div className="form-item">
              <input
                name="password"
                type="password"
                placeholder="Пароль"
                className="form-input"
              />
            </div>
            <button className="form-buttom">Войти</button>
            <div className="form-links">
              <p>Войти через</p>
              <div className="google-link">
                <FcGoogle />
              </div>
            </div>
            <hr className="hr-line" />
            <div className="form-login">
              <p>Еще нет аккаунта?</p>
              <Link to="/signup">
                <button type="button" className="btn-login">
                  Зарегистрироваться
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default FormSignUp
