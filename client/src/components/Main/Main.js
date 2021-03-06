import React from 'react'
import Slider from '../Slider/Slider'
import './Main.css'

function Main() {
  return (
    <>
      <div className="container">
        <div className="offer">
          <div className="offer-title">
            <h1 className="subtitle">Трекер здоровья питомца</h1>
            <h2>Сделаем жизнь вашего животного лучше</h2>
          </div>
          <img className="img-offer" src="/offerbg.png" alt="offer" />
        </div>
        <Slider />
        <div className="main-wrapper1">

          <div className="main1">
            <div className="main-item1">
              <h2 className="main-title1">Заметили ли вы какие-либо изменения в поведении вашей собаки или кошки?</h2>
              {/* <p className="main-desc">
                Инфографика по состоянию здоровья вашего животного на основе
                анализов
              </p> */}
            </div>
            <div className="main-item1">
              <h2 className="main-title1">Хотели бы вы выявлять проблемы на раннем этапе развития вашего питомца?</h2>
              {/* <p className="main-desc">
                Инфографика по состоянию здоровья вашего животного на основе
                анализов
              </p> */}
            </div>
            <div className="main-item1">
              <h2 className="main-title1">Есть ли у вашего питомца хронические заболевания, требующие регулярного контроля?</h2>
              {/* <p className="main-desc">
                Инфографика по состоянию здоровья вашего животного на основе
                анализов
              </p> */}
            </div>
            <div className="main-item1">
              <h2 className="main-title1">Хотели бы вы знать, как заботиться о вашем питомце на основе актуальной медицинской информации?</h2>
              {/* <p className="main-desc">
                Инфографика по состоянию здоровья вашего животного на основе
                анализов
              </p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="bg">
        <img className="bgimg" src="/dogscatsbg.png" alt="" />
      </div>
    </>
  )
}

export default Main
