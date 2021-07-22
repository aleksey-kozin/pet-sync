import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {
  initAnalysesMonitorAC,
  initAnalysesMonitorListAC,
} from '../../utils/redux/actionCreators/actionCreators'
import ProfileNav from '../Profile/ProfileNav'
import DetailsMonitorAnalyse from '../DetailsMonitorAnalyse/DetailsMonitorAnalyse'
import ChartListHormonal from '../ChartList/ChartListHormonal'
import ChartLineMonitorGAS from '../ChartLineMonitor/ChartLineMonitorGAS'
import ChartLineMonitorACT from '../ChartLineMonitor/ChartLineMonitorACT'
import ChartLineMonitorALD from '../ChartLineMonitor/ChartLineMonitorALD'
import ChartLineMonitorINS from '../ChartLineMonitor/ChartLineMonitorINS'
import ChartLineMonitorPTH from '../ChartLineMonitor/ChartLineMonitorGAS'
import ChartLineMonitorCOR from '../ChartLineMonitor/ChartLineMonitorCOR'
import ChartLineMonitorT4 from '../ChartLineMonitor/ChartLineMonitorT4'

function Hormonal() {
  const { id } = useParams()
  const [state, setState] = useState(false)
  const text = useRef()
  const petState = useSelector((state) => state.petsReducer.pet)

  const index = petState.findIndex((el) => el._id === id)

  const [details, setDetails] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    fetch('http://localhost:4000/analyses/analysesmonitor', {
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
        console.log('!!!!', result)
        dispatch(initAnalysesMonitorAC(result))
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:4000/analyses/listmonitor', {
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
      .then((data) => dispatch(initAnalysesMonitorListAC(data)))
    // .then((data) => console.log('data',data))
  }, [dispatch])

  const addHormonal = (ev) => {
    ev.preventDefault()
    const index = petState.findIndex((el) => el._id === id)
    const newHormonal = {
      spacies: petState[index].spacies,
      owner: id,
      ACT: text.current.ACT.value,
      ALD: text.current.ALD.value,
      INS: text.current.INS.value,
      PTH: text.current.PTH.value,
      T4: text.current.T4.value,
      COR: text.current.COR.value,
      GAS: text.current.GAS.value,
    }
    fetch('http://localhost:4000/addhormonal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHormonal),
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
              <h2>Гормональное исследование</h2>
            </div>
            <div style={{ marginBottom: '50px' }}>
              <ChartListHormonal />
            </div>

            <div onClick={() => setState(true)} className="pet-item-add">
              <p>Добавить анализ</p>
            </div>
            {state && (
              <form className="form-body" ref={text}>
                <h2 className="form-title">Добавление анализа</h2>
                <div className="form-item">
                  <input
                    name="ACT"
                    type="number"
                    placeholder="ACT"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="ALD"
                    type="number"
                    placeholder="ALD"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="INS"
                    type="number"
                    placeholder="INS"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="PTH"
                    type="number"
                    placeholder="PTH"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="T4"
                    type="number"
                    placeholder="T4"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="COR"
                    type="number"
                    placeholder="COR"
                    className="form-input"
                  />
                </div>
                <div className="form-item">
                  <input
                    name="GAS"
                    type="number"
                    placeholder="GAS"
                    className="form-input"
                  />
                </div>
                <button onClick={addHormonal} className="form-buttom">
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
                <DetailsMonitorAnalyse />
                <div className="tests">
                  <h3>АКТГ (адренокортикотропный гормон) </h3>
                  <ChartLineMonitorACT />{' '}
                </div>
                <div className="tests">
                  <h3>Альдостерон </h3>
                  <ChartLineMonitorALD />
                </div>
                <div className="tests">
                  <h3>Инсулин </h3>
                  <ChartLineMonitorINS />
                </div>
                <div className="tests">
                  <h3>Паратиреоидный гормон (ПТГ) </h3>
                  <ChartLineMonitorPTH />
                </div>
                <div className="tests">
                  <h3>Т4 общий (тироксин) </h3>
                  <ChartLineMonitorT4 />
                </div>
                <div className="tests">
                  <h3>Кортизол </h3>
                  <ChartLineMonitorCOR />
                </div>
                <div className="tests">
                  <h3>Гастрин </h3>
                  <ChartLineMonitorGAS />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default Hormonal
