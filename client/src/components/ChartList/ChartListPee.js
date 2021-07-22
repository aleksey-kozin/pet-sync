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

   console.log('dddddd', analyses)

  // useEffect(() => {
  //   fetch('http://localhost:4000/analyses/analysespee', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({id:petState[0]._id, spacies:petState[0].spacies}),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => dispatch(initAnalysesPeeAC(data)))
  //   // .then((data) => console.log('data',data))
  // }, [dispatch])

  // console.log('!!!!',analyses);

  return (
    <div style={{ height: 400 }}>
      <h3>Анализ мочи</h3>
      {/* {analyses.reduce((avr, el) => avr + el.one, 0) / analyses.length} */}
      {
        <ChartPee
          analyses={analyses}
          // el={analyses.reduce((avr, el) => avr + el.one, 0) / analyses.length}
        />
      }
      <Link to="/detailsanalyse">{/* <h3>Подробный анализ</h3> */}</Link>
    </div>
  )
}

export default ChartList
