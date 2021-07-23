import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ProfileNav from '../Profile/ProfileNav'
import ChartListPee from '../ChartList/ChartListPee'
import DetailsUrineAnalyse from '../DetailsUrineAnalyse/DetailsUrineAnalyse'
import ChartLinePeeAN16110 from '../ChartLinePee/ChartLinePeeAN16110'
import ChartLinePeeAN28110 from '../ChartLinePee/ChartLinePeeAN28110'
import ChartLinePeeAN15110 from '../ChartLinePee/ChartLinePeeAN15110'
import ChartLinePeeAN116 from '../ChartLinePee/ChartLinePeeAN116'
import ChartLinePeeAN114 from '../ChartLinePee/ChartLinePeeAN114'
import {
  initAnalysesPeeAC,
  initAnalysesPeeListAC,
} from '../../utils/redux/actionCreators/actionCreators'
import Modal from '../Modal/Modal'

function Pee() {
  const [AN28110, setAN28110] = useState(false)
  const [AN15110, setAN15110] = useState(false)
  const [AN116, setAN116] = useState(false)
  const [AN114, setAN114] = useState(false)

  const [modalActive, setModalActive] = useState(false)

  const [show, setShow] = useState(false)

  const { id } = useParams()
  const [state, setState] = useState(false)

  const analyses = useSelector((state) => state.analysesReducer.analysesPee)

  const text = useRef()
  const petState = useSelector((state) => state.petsReducer.pet)

  const index = petState.findIndex((el) => el._id === id)

  const [details, setDetails] = useState(false)
  const dispatch = useDispatch()

  console.log('analyses', analyses)

  const normal = {
    AN16110: [0, 0.5],
    AN116: [1.01, 1.04],
    AN28110: [0, 0.5],
    AN15110: [0.21, 0.57],
    AN114: [0, 20],
  }

  useEffect(() => {
    fetch('http://localhost:4000/analyses/analysespee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: petState[index]._id,
        spacies: petState[index].spacies,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        dispatch(initAnalysesPeeAC(result))
        return result
      })
      .then((result) =>
        Object.keys(result).length !== 0 ? setShow(true) : null
      )
  }, [dispatch, modalActive])

  useEffect(() => {
    fetch('http://localhost:4000/analyses/listpee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: petState[index]._id,
        spacies: petState[index].spacies,
      }),
    })
      .then((res) => res.json())
      .then((data) => dispatch(initAnalysesPeeListAC(data)))
  }, [dispatch, details])

  const addPee = (ev) => {
    ev.preventDefault()
    const newPee = {
      spacies: petState[index].spacies,
      owner: id,
      date: text.current.date.value,
      AN16110: text.current.AN16110.value,
      AN116: text.current.AN116.value,
      AN28110: text.current.AN28110.value,
      AN15110: text.current.AN15110.value,
      AN114: text.current.AN114.value,
    }
    fetch('http://localhost:4000/addpee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPee),
    })
      .then((res) => res.json())
      .then((result) => {
        setState(false)
      })
      .then((res) => setModalActive(false))
  }

  return (
    <>
      <div className="container">
        <div className="main-wrapper1">
          <ProfileNav />
          <div className="tests">
            <div className="tests-info">
              <Link to={`/mypets/${id}`}>
                <img
                  style={{ marginBottom: '40px' }}
                  src="/left-arrow.svg"
                  alt=""
                  width="40px"
                />
              </Link>
              <h2>Анализ мочи</h2>
              <button
                className="analis-btn"
                onClick={() => setModalActive(true)}
              >
                Добавить анализ
              </button>
            </div>

            {show ? (
              <div style={{ marginBottom: '50px' }}>
                <ChartListPee />
              </div>
            ) : null}

            <Modal active={modalActive} setActive={setModalActive}>
              <form className="form-body" ref={text}>
                <h2 className="form-title">Добавление анализа</h2>
                <div className="form-item">
                  <input
                    name="date"
                    type="date"
                    placeholder="date"
                    className="form-input"
                    required="required"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="AN16110"
                    type="number"
                    placeholder="AN16110"
                    className="form-input"
                    required="required"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="AN116"
                    type="number"
                    placeholder="AN116"
                    className="form-input"
                    required="required"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="AN28110"
                    type="number"
                    placeholder="AN28110"
                    className="form-input"
                    required="required"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="AN15110"
                    type="number"
                    placeholder="AN15110"
                    className="form-input"
                    required="required"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="AN114"
                    type="number"
                    placeholder="AN114"
                    className="form-input"
                    required="required"
                  />
                </div>
                <button onClick={addPee} className="form-buttom">
                  Добавить анализ
                </button>
              </form>
            </Modal>

            {show ? (
              <button
                className="analis-btn"
                onClick={() => setDetails(!details)}
              >
                Подробный анализ &rarr;
              </button>
            ) : null}
          </div>
          {details ? (
            <>
              <div className="tests">
                <DetailsUrineAnalyse />
              </div>
              <div className="tests">
                {normal.AN16110[0] <= analyses.AN16110 &&
                normal.AN16110[1] >= analyses.AN16110 ? (
                  <h3 style={{ color: 'green' }}>
                    Глюкоза/креатинин соотношение в моче{' '}
                  </h3>
                ) : (
                  <h3 style={{ color: 'Gold' }}>
                    Глюкоза/креатинин соотношение в моче{' '}
                  </h3>
                )}
                <ul>
                  <p>Референсные значения:</p>
                  <li style={{ listStyleType: 'none' }}>
                    Собаки: в норме до 0‐0,16
                  </li>
                  <li style={{ listStyleType: 'none' }}>
                    Кошки: в норме до 0-0,517
                  </li>
                </ul>
                <ChartLinePeeAN16110 />{' '}
                <button
                  className="analis-btn"
                  onClick={() => setAN28110(!AN28110)}
                >
                  Пояснения &rarr;
                </button>
              </div>
              <div className="tests">
                {normal.AN116[0] <= analyses.AN116 &&
                normal.AN116[1] >= analyses.AN116 ? (
                  <h3 style={{ color: 'green' }}>
                    Соотношение белок / креатинин в моче
                  </h3>
                ) : (
                  <h3 style={{ color: 'Gold' }}>
                    Соотношение белок / креатинин в моче
                  </h3>
                )}

                <ul>
                  <p>Референсные значения:</p>
                  <li style={{ listStyleType: 'none' }}>{`Собаки: \< 0,5`}</li>
                  <li style={{ listStyleType: 'none' }}>{`Кошки: \< 0,4`}</li>
                </ul>
                <ChartLinePeeAN28110 />
                <button
                  className="analis-btn"
                  onClick={() => setAN28110(!AN28110)}
                >
                  Пояснения &rarr;
                </button>
                {AN28110 ? (
                  <ul className="list5b">
                    <h4>Повышение уровня:</h4>
                    <li>
                      Внутрисосудистый гемолиз (иммунообусловленная
                      гемолитическая болезнь, токсическое действие цинка,
                      пироплазмоз, введение гипотонической жидкости).
                    </li>
                    <li>Неоплазия (миелома, В-клеточная лимфома, лейкемия)</li>
                    <li>
                      Цистит: бактериальный, идиопатический (у кошек), грибковый
                      (Aspergillus, Candida) или токсический (циклофосфамид)
                    </li>
                    <li>Кровотечение: травма или коагулопатия</li>
                    <li>Неоплазия: переходно-клеточный рак</li>
                    <h4>Понижение уровня:</h4>
                    <li>Не имеет диагностической значимости</li>
                  </ul>
                ) : null}
              </div>
              <div className="tests">
                {normal.AN28110[0] <= analyses.AN28110 &&
                normal.AN28110[1] >= analyses.AN28110 ? (
                  <h3 style={{ color: 'green' }}>
                    Соотношение кортизол / креатинин в моче
                  </h3>
                ) : (
                  <h3 style={{ color: 'Gold' }}>
                    Соотношение кортизол / креатинин в моче
                  </h3>
                )}

                <ul>
                  <p>Референсные значения:</p>
                  <li style={{ listStyleType: 'none' }}>
                    {`Собаки: \< 17х10-6`}
                  </li>
                  <li
                    style={{ listStyleType: 'none' }}
                  >{`Кошки: \< 36х10-6`}</li>
                </ul>
                <ChartLinePeeAN15110 />
                <button
                  className="analis-btn"
                  onClick={() => setAN15110(!AN15110)}
                >
                  Пояснения &rarr;
                </button>
                {AN15110 ? (
                  <ul className="list5b">
                    <h4>Повышение уровня:</h4>
                    <li>Аденома гипофиза </li>
                    <li>Опухоль коры надпочечников</li>
                    <li>Стрессовое состояние</li>
                    <li>
                      Различные заболевания, не связанные с заболеваниями
                      надпочечников
                    </li>
                    <h4>Понижение уровня:</h4>
                    <li>Не имеет диагностической значимости</li>
                  </ul>
                ) : null}
              </div>
              <div className="tests">
                {normal.AN15110[0] <= analyses.AN15110 &&
                normal.AN15110[1] >= analyses.AN15110 ? (
                  <h3 style={{ color: 'green' }}>
                    Соотношение ГГТ / креатинин в моче
                  </h3>
                ) : (
                  <h3 style={{ color: 'Gold' }}>
                    Соотношение ГГТ / креатинин в моче
                  </h3>
                )}
                <ul>
                  <p>Референсные значения:</p>
                  <li style={{ listStyleType: 'none' }}>Собаки: 0,21-0,57</li>
                  <li style={{ listStyleType: 'none' }}>Кошки: 0,03-0,56</li>
                </ul>
                <ChartLinePeeAN116 />
                <button className="analis-btn" onClick={() => setAN116(!AN116)}>
                  Пояснения &rarr;
                </button>
                {AN116 ? (
                  <ul className="list5b">
                    <h4>Повышение уровня:</h4>
                    <li>Повреждение почечных канальцев</li>
                    <li>Снижение СКФ</li>
                    <li>Значительное поражение клубочков</li>
                    <h4>Понижение уровня:</h4>
                    <li>Не имеют клинической значимости</li>
                  </ul>
                ) : null}
              </div>
              <div className="tests">
                {normal.AN114[0] <= analyses.AN114 &&
                normal.AN114[1] >= analyses.AN114 ? (
                  <h3 style={{ color: 'green' }}>
                    Фракционная экскреция калия и натрия с мочой
                  </h3>
                ) : (
                  <h3 style={{ color: 'Gold' }}>
                    Фракционная экскреция калия и натрия с мочой
                  </h3>
                )}

                <ul>
                  <p>Референсные значения:</p>
                  <li style={{ listStyleType: 'none' }}>
                    {`Собаки: \< 1% (Na+); \< 20% (К+)`}
                  </li>
                  <li
                    style={{ listStyleType: 'none' }}
                  >{`Кошки: \< 1% (Na+); 5-25% (К+)`}</li>
                </ul>
                <ChartLinePeeAN114 />
                <button className="analis-btn" onClick={() => setAN114(!AN114)}>
                  Пояснения &rarr;
                </button>
                {AN114 ? (
                  <ul className="list5b">
                    <h4>Повышение уровня:</h4>
                    <li>Хроническая почечная недостаточность</li>
                    <li>Наследственная гипокалиемия кошек</li>
                    <li>Полимиопатия</li>
                    <li>Заболевания канальцевого аппарата почек</li>
                    <li>Нефротоксическое действие гентамицина</li>
                    <li>Отравление этиленгликолем</li>
                    <li>Синдром Фанкони</li>
                    <li>Избыточное поступление калия с кормом</li>
                    <h4>Понижение уровня:</h4>
                    <li>Внепочечная потеря калия</li>
                    <li>Снижение поступления калия с кормом</li>
                    <li>Гипоадренокортицизм</li>
                  </ul>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default Pee
