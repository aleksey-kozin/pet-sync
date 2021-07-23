import React from 'react'
import { Link } from 'react-router-dom'
import './FormStyle.css'
import { useDispatch } from 'react-redux'
import AuthService from '../../services/AuthServices'
import { initUsersAC } from '../../utils/redux/actionCreators/actionCreators'
import cogoToast from 'cogo-toast'
import { GoogleLogin } from 'react-google-login'

function FormSignUp() {
  const clientId =
    '679324257872-7jktj71veuce36c6f6gd35d5quh0utof.apps.googleusercontent.com'
  const dispatch = useDispatch()

  const handlerSubmit = async (event) => {
    try {
      event.preventDefault()
      const email = event.target.email.value
      const password = event.target.password.value
      const response = await AuthService.registration(email, password)
      localStorage.setItem('token', response.data.accessToken)
      dispatch(initUsersAC(response.data.user))
      cogoToast.info('Вам на почту пришла ссылка на активацию', {
        position: 'bottom-center',
      })
    } catch (error) {
      cogoToast.warn(error.response?.data?.message, {
        position: 'bottom-center',
      })
    }
  }
  // если гугл авторизация успешна отдает в консоль объект с гугл данными
  const onLoginSuccess = (res) => {
    console.log('login success', res.profileObj)
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
            <h2 className="form-title">Регистрация</h2>
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
            <button className="form-buttom">Зарегистрироваться</button>
            {/* <GoogleLogin
              className="form-links"
              clientId={clientId}
              buttonText="Зарегистрироваться с помощью Google"
              onSuccess={onLoginSuccess}
              onFailure={onFailSuccess}
              cookiePolicy={'single_host_origin'}
            />             */}
            <hr class="hr-line" />
            <div className="form-login">
              <p>Уже есть аккаунт?</p>
              <Link to="/login">
                <button type="button" className="btn-login">
                  Войти
                </button>
              </Link>
            </div>
          </form>
        </div>
        <div className="bg">
          <img className="bgimg" src="/dogscatsbg.png" alt="" />
        </div>
      </div>
    </>
  )
}

export default FormSignUp
