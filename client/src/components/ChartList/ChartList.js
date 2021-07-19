import React, { useEffect } from 'react'
import Chart from '../Chart/Chart'
import { useDispatch, useSelector } from 'react-redux'
import { initAnalysesAC } from '../../utils/redux/actionCreators/actionCreators'

function ChartList(props) {
  const dispatch = useDispatch()
  const analyses = useSelector((state) => state.analysesReducer.analyses)

  console.log(analyses)

  useEffect(() => {
    fetch('http://localhost:4000/analyses')
      .then((res) => res.json())
      .then((data) => dispatch(initAnalysesAC(data)))
  }, [dispatch])

  // console.log();

  return (
    <div style={{ height: 400 }}>
      {/* {analyses.reduce((avr, el) => avr + el.one, 0) / analyses.length} */}
      {
        <Chart
          analyses={analyses}
          // el={analyses.reduce((avr, el) => avr + el.one, 0) / analyses.length}
        />
      }
    </div>
  )
}

export default ChartList
