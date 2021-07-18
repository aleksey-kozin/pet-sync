import React, { useEffect } from 'react'
import Chart from '../Chart/Chart'
import { useDispatch, useSelector } from 'react-redux'
import { initAnalysesAC } from '../../utils/redux/actionCreators/actionCreators'

function TestChart(props) {
  const dispatch = useDispatch()
  const analyses = useSelector((state) => state.analyses)

  useEffect(() => {
    fetch('http://localhost:4000/analyses')
      .then((res) => res.json())
      .then((data) => dispatch(initAnalysesAC(data)))
  }, [dispatch])

  // console.log();

  return (
    <div style={{ height: 400 }}>
      <Chart />
    </div>
  )
}

export default TestChart
