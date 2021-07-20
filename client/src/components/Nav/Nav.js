import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
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

  const handlerLogout = async (event) => {
    try {
      const response = await AuthService.logout();
      console.log(response);
      localStorage.removeItem('token');
      // this.setAuth(false);
      // this.setUser({} as IUser);
      dispatch(checkUsersAC({}))
  } catch (e) {
      console.log(e.response?.data?.message);
  }
  }

  return (
    <>
      {userState.isAuth && userState.user.isActivated ? (
        <nav className="navbar-item">
          <NavLink to="/" className="navbar-logo"><img src="/logo.png" width="180px" alt="logo" /></NavLink>
          <div onClick={() => setIcon(!icon)} className="menu-icon">
            {icon ? <VscClose /> : <FiMenu />}
          </div>
          <ul className={icon ? 'nav-menu active' : 'nav-menu'}>
            {/* <li>
              <NavLink onClick={() => setIcon(false)} to="/" className="nav-links" activeStyle={{backgroundColor: 'white'}}>
                Главная
              </NavLink>
            </li> */}
            <li>
              <NavLink
                onClick={() => setIcon(false)}
                to="/profile"
                className="nav-links"
              >
                Профиль
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                onClick={() => setIcon(false)}
                to="/signup"
                className="nav-links"
              >
                Добавить питомца
              </NavLink>
            </li> */}
            <li>
              <Link
                onClick={() => handlerLogout()}
                className="nav-links"
              >
                Выйти
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="navbar-item">
          <NavLink to="/" className="navbar-logo"><img src="/logo.png" width="180px" alt="logo" /></NavLink>
          <div onClick={() => setIcon(!icon)} className="menu-icon">
            {icon ? <VscClose /> : <FiMenu />}
          </div>
          <ul className={icon ? 'nav-menu active' : 'nav-menu'}>
            {/* <li>
              <NavLink onClick={() => setIcon(false)} to="/" className="nav-links">
                Главная
              </NavLink>
            </li> */}

            <li>
              <NavLink
                onClick={() => setIcon(false)}
                to="/login"
                className="nav-links-login"
              >
                Войти
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </>
  )
}

export default Nav
