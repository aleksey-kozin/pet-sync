import React from 'react'
import { Link } from 'react-router-dom'
import './FormStyle.css'
import { FcGoogle } from 'react-icons/fc'

function FormSignUp() {
  return (
    <>
      <div className="wrapper">
      <div className="form">
        <form className="form-body">
          <h2 className="form-title">Регистрация</h2>
          <div className="form-item">
            <input type="email" placeholder="Email" className="form-input" />
          </div>
          <div className="form-item">
            <input
              type="password"
              placeholder="Пароль"
              className="form-input"
            />
          </div>
          <button className="form-buttom">Зарегистрироваться</button>
          <div className="form-links">
            <p>Регистрация через</p>
            <div className="google-link">
            <FcGoogle/>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="form-login">
            <p>Уже есть аккаунт?</p>
            <Link to="/login"><button type="button" className="btn-login">Войти</button></Link>
          </div>
        </form>
      </div>
      </div>
    </>
  )
}

export default FormSignUp
