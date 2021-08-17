import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import { useSelector } from 'react-redux'

const ChartLineMonitorCOR = () => {
  const listAnalyses = useSelector(
    (state) => state.analysesReducer.monitorListAnalyses
  )

  const anal = listAnalyses
  const length = anal.length
  let result = []
  for (let i = 0; i < length; i++) {
    result.push({ x: anal[i].date.substring(0, 10), y: anal[i].COR })
  }

  let data = [
    {
      id: 'hours',
      data: result,
    },
  ]

  return (
    <div className="App" style={{ height: 300 }}>
      {/* <h1>Line y axis time scale</h1> */}
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 60, bottom: 50, left: 120 }}
        xScale={{
          type: 'point',
        }}
        // xFormat="time:%Y-%m-%d"
        yScale={{
          type: 'linear',
          stacked: ('stacked', false),
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'dark2' }}
        pointBorderWidth={5}
        pointBorderColor={{
          from: 'color',
          modifiers: [['darker', 1.5]],
        }}
        pointColor={{ theme: 'background' }}
        enableArea={true}
        lineWidth={4}
        pointSize={10}
        curve="cardinal"
        pointColor="white"
        useMesh={true}
      />
    </div>
  )
}

export default ChartLineMonitorCOR
