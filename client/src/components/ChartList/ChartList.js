import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initAnalysesAC } from '../../utils/redux/actionCreators/actionCreators'
import ChartBlood from '../ChartBlood/ChartBlood'

function ChartList(props) {
  const dispatch = useDispatch()
  const analyses = useSelector((state) => state.analysesReducer.analyses)
  const petState = useSelector((state) => state.petsReducer.pet)

  let parametr = 0

  if (analyses.chart / 10 > 9) {
    parametr = 10
  } else {
    parametr = Math.round(analyses.chart / 10)
  }

  console.log('parametr', parametr)

  useEffect(() => {
    fetch('http://localhost:4000/analyses')
      .then((res) => res.json())
      .then((data) => dispatch(initAnalysesAC(data)))
  }, [dispatch])

  return (
    <div style={{ height: 400 }}>
      <h3>Общий анализ крови</h3>
      {parametr < 10 ? (
        <h3 style={{ color: 'Gold' }}>
          {10 - parametr} из 9 параметров не в норме
        </h3>
      ) : (
        <h3 style={{ color: 'green' }}>9 из 9 параметров не в норме</h3>
      )}
      {<ChartBlood analyses={analyses} />}
    </div>
  )
}

export default ChartList
