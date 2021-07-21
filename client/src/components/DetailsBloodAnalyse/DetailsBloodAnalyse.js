import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ResponsiveRadar } from '@nivo/radar'
import ChartLine from '../ChartLine/ChartLineLDH'
import { listAnalysesAC } from '../../utils/redux/actionCreators/actionCreators'
import { Link } from 'react-router-dom'

function DetailsBloodAnalyse(props) {
  const analyses = useSelector((state) => state.analysesReducer.analyses)
  const listAnalyses = useSelector(
    (state) => state.analysesReducer.listAnalyses
  )
  const dispatch = useDispatch()
  // console.log('sssss',analyses);

  // console.log('state', analyses)

  useEffect(() => {
    fetch('http://localhost:4000/analyses/list')
      .then((res) => res.json())
      .then((data) => dispatch(listAnalysesAC(data)))
    // .then((data) => console.log('data',data))
  }, [dispatch])

  // console.log(analyses)
  let data = [
    {
      taste: 'normalALB',
      Max: 32,
      Min: 22,
      Fact: analyses.ALB,
    },
    {
      taste: 'normalAST',
      Max: 39,
      Min: 9,
      Fact: analyses.AST,
    },
    {
      taste: 'normalALT',
      Max: 52,
      Min: 8,
      Fact: analyses.ALT,
    },
    {
      taste: 'normalT_Pro',
      Max: 75,
      Min: 43,
      Fact: analyses.T_Pro,
    },
    {
      taste: 'normalALP',
      Max: 12,
      Min: 65,
      Fact: analyses.ALP,
    },
  ]

  return (
    <div style={{ height: 800 }}>
      <ResponsiveRadar
        data={data}
        keys={['Max', 'Min', 'Fact']}
        indexBy="taste"
        fontSize="23"
        maxValue="auto"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        curve="cardinalClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={9}
        theme={{
          dots: {
            text: {
              fill: '#2d374d',
              fontSize: 12,
              fontWeight: 800,
            },
          },
        }}
        gridShape="linear"
        gridLabelOffset={36}
        enableDots={true}
        dotSize={23}
        dotColor={{ from: 'color', modifiers: [] }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color' }}
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={4}
        colors={{ scheme: 'nivo' }}
        fillOpacity={0.25}
        blendMode="multiply"
        animate={true}
        motionConfig="wobbly"
        isInteractive={true}
        // legends={[
        //   {
        //     anchor: 'top-left',
        //     direction: 'column',
        //     translateX: -50,
        //     translateY: -40,
        //     itemWidth: 80,
        //     itemHeight: 20,
        //     itemTextColor: '#999',
        //     symbolSize: 12,
        //     symbolShape: 'circle',
        //     effects: [
        //       {
        //         on: 'hover',
        //         style: {
        //           itemTextColor: '#000',
        //         },
        //       },
        //     ],
        //   },
        // ]}
      />
      {/* {listAnalyses.map((el)=><ChartLine el={el} />)} */}
      {/* <ChartLine listAnalyses={listAnalyses} /> */}
      {/* <Link to="/chartline">
        <h3>+++++++</h3>
      </Link> */}
      {/* <ChartLine/> */}
    </div>
  )
}

export default DetailsBloodAnalyse
