import React, { useEffect } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { useDispatch, useSelector } from 'react-redux'
import { listAnalysesAC } from '../../utils/redux/actionCreators/actionCreators'

// function ChartLine(props) {

const ChartLine = () => {
  // console.log('listAnalyses',listAnalyses.listAnalyses[0]);
  // const analyses = useSelector((state) => state.analysesReducer.analyses)
  const listAnalyses = useSelector(
    (state) => state.analysesReducer.listAnalyses
  )
  const dispatch = useDispatch()
  console.log('sssss',listAnalyses);

  // console.log('state', analyses)

  useEffect(() => {
    fetch('http://localhost:4000/analyses/list')
      .then((res) => res.json())
      .then((data) => dispatch(listAnalysesAC(data)))
    // .then((data) => console.log('data',data))
  }, [dispatch])

  let data = [
    {
      id: 'hours',
      data: [
        // { x: '2018-01-01', y: 4 },
        { x: '2018-01-02', y: listAnalyses[0].LDH  },
        { x: '2018-01-03', y: listAnalyses[1].LDH  },
        { x: '2018-01-04', y: listAnalyses[2].LDH  },
        { x: '2018-01-05', y: listAnalyses[3].LDH  },
        { x: '2018-01-06', y: listAnalyses[4].LDH  },
        { x: '2018-01-07', y: listAnalyses[5].LDH  },
        { x: '2018-01-08', y: listAnalyses[6].LDH  },
        
      ],
    },
  ]


  console.log(listAnalyses[0].date);
 
    return (
      <div className="App" style={{ height: 300, width: 600 }}>
        <h1>Line y axis time scale</h1>
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 60, bottom: 50, left: 120 }}
          xScale={{
            type: 'time',
            format: '%Y-%m-%d',
            useUTC: false,
            precision: 'day',
          }}
          xFormat="time:%Y-%m-%d"
          yScale={{
            type: 'linear',
            stacked: ('stacked', false),
          }}
          
          // axisLeft={{
          //   legend: 'linear scale',
          //   legendOffset: 12,
          // }}
          axisBottom={{
            format: '%b %d',
            tickValues: 'every 2 days',
            legend: 'time scale',
            legendOffset: -12,
          }}
          pointSize={10}
          pointColor="white"
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          useMesh={true}
        />
      </div>
    )

}

export default ChartLine
