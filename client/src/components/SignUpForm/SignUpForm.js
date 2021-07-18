import React from 'react'
import { useDispatch } from 'react-redux'
import AuthService from '../../services/AuthServices'
import { initUsersAC } from '../../utils/redux/actionCreators/actionCreators'
import RegFormStyles from './RegForm.css'

export default function SignUpForm() {
  const dispatch = useDispatch()

  const handlerSubmit = async (event) => {
    try {
      event.preventDefault()
      const email = event.target.email.value
      const password = event.target.password.value
      const response = await AuthService.registration(email, password)
      // console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      dispatch(initUsersAC(response.data.user))
    } catch (error) {
      console.log(error.response?.data?.message)
    }
  }
  return (
    <div className="container">
      <form onSubmit={handlerSubmit}>
        <div className="container">
          <label>
            <b>Email</b>
          </label>
          <input type="email" placeholder="Enter email" name="email" required />

          <label>
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
          />

          <button type="submit">SignUp</button>
        </div>
      </form>
    </div>
  )
}
