import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  initAnalysesAC,
  initAnalysesPeeAC,
} from '../../utils/redux/actionCreators/actionCreators'
import ChartPee from '../ChartPee/ChartPee'

function ChartList(props) {
  const dispatch = useDispatch()
  const analyses = useSelector((state) => state.analysesReducer.analysesPee)
  const petState = useSelector((state) => state.petsReducer.pet)

  let parametr = 0

  console.log(analyses.chart);

  if (analyses.chart / 10 === 10) {
    parametr = 5
  } else {
    parametr = Math.round(analyses.chart / 10)
  }
  console.log(parametr);

  return (
    <div style={{ height: 400 }}>
      <h3>Анализ мочи</h3>
      {parametr < 10 ? (
        <h3 style={{ color: 'Gold' }}>
          {5 - (parametr/2)} из 5 параметров не в норме
        </h3>
      ) : (
        <h3 style={{ color: 'green' }}>5 из 5 параметров в норме</h3>
      )}
      {<ChartPee analyses={analyses} />}

      <Link to="/detailsanalyse">{/* <h3>Подробный анализ</h3> */}</Link>
    </div>
  )
}

export default ChartList
