import React from 'react'
import Chart from '../Chart/Chart'
import { useDispatch, useSelector } from 'react-redux'

function TestChart(props) {
  const dispatch = useDispatch()
  const analyses = useSelector((state) => state.analyses);

  // console.log();

  return (
    <div style={{ height: 400 }}>
      <Chart />
    </div>
  )
}

export default TestChart
