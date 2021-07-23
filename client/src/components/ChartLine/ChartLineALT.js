import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import { useSelector } from 'react-redux'

const ChartLineALT = () => {
  const listAnalyses = useSelector(
    (state) => state.analysesReducer.listAnalyses
  )

  const anal = listAnalyses
  const length = anal.length
  let result = []
  for (let i = 0; i < length; i++) {
    result.push({ x: anal[i].date.substring(0, 10), y: anal[i].ALT })
  }
  const resultData = result.sort(function (a, b) {
    return   new Date(a.x) - new Date(b.x)    ;
  })

  let data = [
    {
      id: 'hours',
      data: resultData,
    },
  ]

  return (
    <div className="App" style={{ height: 300 }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 60, bottom: 50, left: 120 }}
        xScale={{
          type: 'point',
        }}
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
     // pointBorderWidth={5}
        // pointBorderColor={{
        //   from: 'color',
        //   modifiers: [['darker', 1.5]],
        // }}
        // pointColor={{ theme: 'background' }}
        // lineWidth={4}
        // pointSize={10}
        colors={{ scheme: 'dark2' }}
        enableArea={true}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        curve="cardinal"
        useMesh={true}
      />
    </div>
  )
}

export default ChartLineALT
