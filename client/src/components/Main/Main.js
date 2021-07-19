import React, { useEffect } from 'react'
import Slider from '../Slider/Slider'
import TestChart from '../ChartList/ChartList'
import './Main.css'

function Main() {
  return (
    <>
    
      <div className="container">
        <Slider />
        <div className="main-wrapper1">
          {/* <div className="block-title1">
          <h2>Правильное питание очень важно</h2>
        </div> */}
          <div className="main1">
            <div className="main-item1">
              <h2 className="main-title">Базовая диета</h2>
              <p className="main-desc">
                Инфографика по состоянию здоровья вашего животного на основе
                анализов
              </p>
            </div>
            <div className="main-item1">
              <h2 className="main-title">Базовая диета</h2>
              <p className="main-desc">
                Инфографика по состоянию здоровья вашего животного на основе
                анализов
              </p>
            </div>
            <div className="main-item1">
              <h2 className="main-title">Базовая диета</h2>
              <p className="main-desc">
                Инфографика по состоянию здоровья вашего животного на основе
                анализов
              </p>
            </div>
            <div className="main-item1">
              <h2 className="main-title">Базовая диета</h2>
              <p className="main-desc">
                Инфографика по состоянию здоровья вашего животного на основе
                анализов
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main
