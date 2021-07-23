import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function ProfileNav(props) {
  const userState = useSelector((state) => state.usersReducer)
  let admin = userState.user.email === 'akost2001@gmail.com'
  return (
    <div className="profile-nav">
      <nav>
        <ul className="profile-menu">
          <li>
            <NavLink
              to="/mypets"
              className="profile-links"
              activeClassName={'profile-links-selected'}
            >
              Мои питомцы
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/appointment"
              className="profile-links"
              activeClassName={'profile-links-selected'}
            >
              Мои записи
            </NavLink>
          </li>  
            {admin 
            ? <><li><NavLink
                to="/feeds"
                className="profile-links"
                activeClassName={'profile-links-selected'}
              >
                Корма
              </NavLink></li>
              <li><NavLink
                to="/addfeed"
                className="profile-links"
                activeClassName={'profile-links-selected'}
              >
                Добавить корм
              </NavLink></li></>
              
              
               : null
            }
          {/* </li> */}
        </ul>
      </nav>
    </div>
  )
}

export default ProfileNav
