import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './FormStyle.css'
import { useDispatch, useSelector } from 'react-redux'
import { checkUsersAC, initUsersAC} from '../../utils/redux/actionCreators/actionCreators'
import { FcGoogle } from 'react-icons/fc'
import AuthService from '../../services/AuthServices'
import cogoToast from 'cogo-toast';
import {GoogleLogin} from 'react-google-login'

function FormSignUp() {
  const clientId = '679324257872-7jktj71veuce36c6f6gd35d5quh0utof.apps.googleusercontent.com'
  const userState = useSelector((state) => state.usersReducer)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    ;(async () => {
      if (localStorage.getItem('token')) {
        const response = await AuthService.checkAuth()
        dispatch(checkUsersAC(response.data.user))
      }
    })()
  }, [dispatch])

  const handlerSubmit = async (event) => {
    try {
      event.preventDefault()

      const email = event.target.email.value
      const password = event.target.password.value

      const response = await AuthService.login(email, password)
      localStorage.setItem('token', response.data.accessToken)
      dispatch(initUsersAC(response.data.user))
      history.push('/mypets')
    } catch (error) {
      cogoToast.warn(error.response?.data?.message, { position: 'bottom-center'});
       }
  }
  // если гугл авторизация успешна отдает в консоль объект с гугл данными
  const onLoginSuccess = (res) => {
    console.log("login success", res.profileObj)
  }
  //если гугл авторизация провалена выдает ошибку
  const onFailSuccess = (res) => {
    console.log('login failed', res)
  }

  return (
    <>
      
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
            <GoogleLogin
              className="form-links"
              clientId={clientId}
              buttonText="Войти с помощью Google"
              onSuccess={onLoginSuccess}
              onFailure={onFailSuccess}
              cookiePolicy={'single_host_origin'}
            />
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
