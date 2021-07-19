import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initAnalysesAC } from '../../utils/redux/actionCreators/actionCreators'
import ChartBlood from '../ChartBlood/ChartBlood'

function ChartList(props) {
  const dispatch = useDispatch()
  const analyses = useSelector((state) => state.analysesReducer.analyses)

  console.log('dddddd', analyses)

  useEffect(() => {
    fetch('http://localhost:4000/analyses')
      .then((res) => res.json())
      .then((data) => dispatch(initAnalysesAC(data)))
    // .then((data) => console.log('data',data))
  }, [dispatch])

  // console.log();

  return (
    <div style={{ height: 400 }}>
      <h3>Общий анализ крови</h3>
      {/* {analyses.reduce((avr, el) => avr + el.one, 0) / analyses.length} */}
      {
        <ChartBlood
          analyses={analyses}
          // el={analyses.reduce((avr, el) => avr + el.one, 0) / analyses.length}
        />
      }
      <Link to="/detailsanalyse">
        <h3>Подробный анализ</h3>
      </Link>
    </div>
  )
}

export default ChartList
