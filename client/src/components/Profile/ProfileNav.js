import React from 'react'
import { Link } from 'react-router-dom'


function ProfileNav(props) {
  return (
    <nav>
    <ul className="profile-menu">
      <li>
        <Link to="/profile" className="profile-links">
          Мой профиль
        </Link>
      </li>
      <li>
        <Link to="/mypets" className="profile-links">
          Мои питомцы
        </Link>
      </li>
      <li>
        <Link to="/appointment" className="profile-links">
          Мои записи
        </Link>
      </li>
    </ul>
  </nav>
  );
}

export default ProfileNav;
