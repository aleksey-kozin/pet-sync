import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { listAnalysesAC } from '../../utils/redux/actionCreators/actionCreators'
import ChartLineALB from '../ChartLine/ChartLineALB'
import ChartLineLDH from '../ChartLine/ChartLineLDH'
import ChartLineALP from '../ChartLine/ChartLineALP'
import ChartLineALT from '../ChartLine/ChartLineALT'
import ChartLineAST from '../ChartLine/ChartLineAST'
import ChartLineGLU from '../ChartLine/ChartLineGLU'
import ChartLineT_B from '../ChartLine/ChartLineT_B'
import ChartLineT_Cho from '../ChartLine/ChartLineT_Cho'
import ChartLineT_P from '../ChartLine/ChartLineT_P'

import ChartList from '../ChartList/ChartList'
import DetailsBloodAnalyse from '../DetailsBloodAnalyse/DetailsBloodAnalyse'
import ProfileNav from '../Profile/ProfileNav'
import './Analysis.css'

function Blood(props) {
  const [details, setDetails] = useState(false)
  const { id } = useParams()

  // const listAnalyses = useSelector(
  //   (state) => state.analysesReducer.listAnalyses
  // )
  const dispatch = useDispatch()
  // console.log('sssss',analyses);

  // console.log('state', analyses)

  useEffect(() => {
    fetch('http://localhost:4000/analyses/list')
      .then((res) => res.json())
      .then((data) => dispatch(listAnalysesAC(data)))
    // .then((data) => console.log('data',data))
  }, [dispatch])

  return (
    <>
      <div className="container">
        <div className="main-wrapper1">
          <ProfileNav />
          <div className="tests">
            <div className="tests-info">
              <Link to={`/mypets/${id}`}>
                <img
                  style={{ marginBottom: '40px' }}
                  src="/left-arrow.svg"
                  alt=""
                  width="40px"
                />
              </Link>
              <h2>Анализ крови</h2>
              {/* <Link to={`/tests/blood/${pet._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                
              </Link> */}
            </div>
            <div style={{ marginBottom: '50px' }}>
              <ChartList />
            </div>

            <button onClick={() => setDetails(!details)}>
              Подробный анализ &rarr;
            </button>
            {details ? (
              <>
                <DetailsBloodAnalyse /> <ChartLineLDH /> <ChartLineALB />
                <ChartLineALP />
                <ChartLineALT />
                <ChartLineAST />
                <ChartLineGLU />
                <ChartLineT_B />
                <ChartLineT_Cho />
                <ChartLineT_P/> <ChartLineALP />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default Blood
