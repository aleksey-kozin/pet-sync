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

function Pee() {
  const { id } = useParams()
  const [state, setState] = useState(false)

  const text = useRef()
  const petState = useSelector((state) => state.petsReducer.pet)

  const index = petState.findIndex((el) => el._id === id)

  const [details, setDetails] = useState(false)
  // console.log(petState, index)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('/analyses/analysespee', {
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
        // console.log(result.result)
        dispatch(initAnalysesPeeAC(result))
      })
  }, [])

  useEffect(() => {
    fetch('/analyses/listpee', {
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
    // .then((data) => console.log('data',data))
  }, [dispatch])

  const addPee = (ev) => {
    ev.preventDefault()
    const newPee = {
      spacies: petState[index].spacies,
      owner: id,
      AN16110: text.current.AN16110.value,
      AN116: text.current.AN116.value,
      AN28110: text.current.AN28110.value,
      AN15110: text.current.AN15110.value,
      AN114: text.current.AN114.value,
    }
    fetch('/addpee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPee),
    })
      .then((res) => res.json())
      .then((result) => {
        setState(false)
      })
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
            </div>
            <div style={{ marginBottom: '50px' }}>
              <ChartListPee />
            </div>

            <div onClick={() => setState(true)} className="pet-item-add">
              <p>Добавить анализ</p>
            </div>

            {state && (
              <form className="form-body" ref={text}>
                <h2 className="form-title">Добавление анализа</h2>
                <div className="form-item">
                  <input
                    name="AN16110"
                    type="number"
                    placeholder="AN16110"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="AN116"
                    type="number"
                    placeholder="AN116"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="AN28110"
                    type="number"
                    placeholder="AN28110"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="AN15110"
                    type="number"
                    placeholder="AN15110"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="AN114"
                    type="number"
                    placeholder="AN114"
                    className="form-input"
                  />
                </div>
                <button onClick={addPee} className="form-buttom">
                  Добавить анализ
                </button>
              </form>
            )}
            <button onClick={() => setDetails(!details)}>
              Подробный анализ &rarr;
            </button>
          </div>
          {details ? (
            <>
              <div className="tests">
                <DetailsUrineAnalyse />
                <div className="tests">
                  <h3>Глюкоза/креатинин соотношение в моче </h3>
                  <ChartLinePeeAN16110 />{' '}
                </div>
                <div className="tests">
                  <h3>Соотношение белок / креатинин в моче </h3>
                  <ChartLinePeeAN28110 />
                </div>
                <div className="tests">
                  <h3>Соотношение кортизол / креатинин в моче </h3>
                  <ChartLinePeeAN15110 />
                </div>
                <div className="tests">
                  <h3>Соотношение ГГТ / креатинин в моче </h3>
                  <ChartLinePeeAN116 />
                </div>
                <div className="tests">
                  <h3>Фракционная экскреция калия и натрия с мочой </h3>
                  <ChartLinePeeAN114 />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default Pee
