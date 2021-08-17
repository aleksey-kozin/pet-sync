import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ChartMonitor from '../ChartMonitor/ChartMonitor'

function ChartList(props) {
  const dispatch = useDispatch()
  const analyses = useSelector((state) => state.analysesReducer.analysesMonitor)
  const petState = useSelector((state) => state.petsReducer.pet)

  let parametr = 0

  if (analyses.chart / 10 > 9) {
    parametr = 10
  } else {
    parametr = Math.floor(analyses.chart / 14)
  }
  console.log('analyses.chart', analyses.chart)
  console.log('parametr', parametr)

  return (
    <div style={{ height: 400 }}>
      <h3>Гормональное исследование</h3>
      {parametr < 10 ? (
        <h3 style={{ color: 'Gold' }}>
          {7 - parametr -1} из 7 параметров не в норме
        </h3>
      ) : (
        <h3 style={{ color: 'green' }}>7 из 7 параметров не в норме</h3>
      )}
      {<ChartMonitor analyses={analyses} />}

      <Link to="/detailsanalyse">{/* <h3>Подробный анализ</h3> */}</Link>
    </div>
  )
}

export default ChartList
