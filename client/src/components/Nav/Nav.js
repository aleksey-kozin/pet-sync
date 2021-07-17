import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { VscClose } from 'react-icons/vsc'
import './Nav.css'

function Nav() {
  const [icon, setIcon] = useState(false)

  return (
    <>
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
            <Link onClick={() => setIcon(false)} to="/profile" className="nav-links">
              Профиль
            </Link>
          </li>
          <li>
            <Link onClick={() => setIcon(false)} to="/signup" className="nav-links">
              Добавить питомца
            </Link>
          </li>
          <li>
            <Link onClick={() => setIcon(false)} to="/login" className="nav-links">
              Войти
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Nav