import React from 'react'
import { useDispatch } from 'react-redux'
import AuthService from '../../services/AuthServices'
import { initUsersAC } from '../../utils/redux/actionCreators/actionCreators'
import LoginFormStyles from './LoginForm.css'

function LoginForm(props) {
  const dispatch = useDispatch()

  const handlerSubmit = async (event) => {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value

    const response = await AuthService.registration(email, password)
    // console.log(response)
    localStorage.setItem('token', response.data.accessToken)
    dispatch(initUsersAC(response.data.user))
  }
  return (
    <div className="container">
      <form onSubmit={handlerSubmit}>
        <div className="container">
          <label >
            <b>Email</b>
          </label>
          <input type="email" placeholder="Enter email" name="email" required />

          <label >
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
          />

          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
