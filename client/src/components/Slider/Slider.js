import React from 'react'
import './Slider.css'

function Slider() {
  return (
    <div className="main-wrapper">
      <div className="main">
        <div className="main-item">
          <h2 className="main-title">Профиль питомца</h2>
          <p className="main-desc">
            Инфографика по состоянию здоровья вашего животного на основе
            анализов
          </p>
          <img src="/620x414.jpeg" alt="" width="170px" />
        </div>
        <div className="main-item">
          <h2 className="main-title">Удобные напоминаия</h2>
          <p className="main-desc">
            Напоминание о вакцинации и дегельминтизации
          </p>
          <img src="/620x414.jpeg" alt="" width="170px" />
        </div>
        <div className="main-item">
          <h2 className="main-title">Электронная запись</h2>
          <p className="main-desc">Онлайн чат с клиникой</p>
          <img src="/620x414.jpeg" alt="" width="170px" />
        </div>
      </div>
    </div>
  )
}

export default Slider
