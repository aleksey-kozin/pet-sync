import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { VscClose } from 'react-icons/vsc'
import './Nav.css'
import { useDispatch, useSelector } from 'react-redux'
import { checkUsersAC } from '../../utils/redux/actionCreators/actionCreators'
import AuthService from '../../services/AuthServices'

function Nav() {
  const [icon, setIcon] = useState(false)
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
  }, [])

  return (
    <>
      {userState.isAuth && userState.user.isActivated ? (
        <nav className="navbar-item">
          <h1 className="navbar-logo">PETSYNC</h1>
          <div onClick={() => setIcon(!icon)} className="menu-icon">
            {icon ? <VscClose /> : <FiMenu />}
          </div>
          <ul className={icon ? 'nav-menu active' : 'nav-menu'}>
            <li>
              <Link onClick={() => setIcon(false)} to="/" className="nav-links">
                Главная
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIcon(false)}
                to="/profile"
                className="nav-links"
              >
                Профиль
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIcon(false)}
                to="/signup"
                className="nav-links"
              >
                Добавить питомца
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIcon(false)}
                to="/login"
                className="nav-links"
              >
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="navbar-item">
          <h1 className="navbar-logo">PETSYNC</h1>
          <div onClick={() => setIcon(!icon)} className="menu-icon">
            {icon ? <VscClose /> : <FiMenu />}
          </div>
          <ul className={icon ? 'nav-menu active' : 'nav-menu'}>
            <li>
              <Link onClick={() => setIcon(false)} to="/" className="nav-links">
                Главная
              </Link>
            </li>

            <li>
              <Link
                onClick={() => setIcon(false)}
                to="/login"
                className="nav-links"
              >
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  )
}

export default Nav
