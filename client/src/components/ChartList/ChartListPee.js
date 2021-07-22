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



  return (
    <div style={{ height: 400 }}>
      <h3>Анализ мочи</h3>
    
      {
        <ChartPee
          analyses={analyses}
         
        />
      }
      <Link to="/detailsanalyse">{/* <h3>Подробный анализ</h3> */}</Link>
    </div>
  )
}

export default ChartList
