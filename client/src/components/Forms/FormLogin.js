import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './FormStyle.css'
import { useDispatch } from 'react-redux'
import { checkUsersAC, initUsersAC} from '../../utils/redux/actionCreators/actionCreators'
import AuthService from '../../services/AuthServices'
import cogoToast from 'cogo-toast';

function FormSignUp() {
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
        <div className="bg">
        <img className="bgimg" src="/dogscatsbg.png" alt="" />
      </div>
      </div>
    </>
  )
}

export default FormSignUp
