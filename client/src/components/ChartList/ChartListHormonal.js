import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ChartMonitor from '../ChartMonitor/ChartMonitor'

function ChartList(props) {
  const dispatch = useDispatch()
  const analyses = useSelector((state) => state.analysesReducer.analysesMonitor)
  const petState = useSelector((state) => state.petsReducer.pet)

   console.log('dddddd', analyses)
  return (
    <div style={{ height: 400 }}>
      <h3>Гормональное исследование</h3>
      {/* {analyses.reduce((avr, el) => avr + el.one, 0) / analyses.length} */}
      {
        <ChartMonitor
          analyses={analyses}
          // el={analyses.reduce((avr, el) => avr + el.one, 0) / analyses.length}
        />
      }
      <Link to="/detailsanalyse">{/* <h3>Подробный анализ</h3> */}</Link>
    </div>
  )
}

export default ChartList
