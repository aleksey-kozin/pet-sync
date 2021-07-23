import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import { useSelector } from 'react-redux'


const ChartLineLDH = () => {
  const listAnalyses = useSelector(
    (state) => state.analysesReducer.listAnalyses
  )

  const anal = listAnalyses
  const length = anal.length
  let result = []
  for (let i = 0; i < length; i++) {
    result.push({ x: anal[i].date.substring(0, 10), y: anal[i].LDH })
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
        // {...commonProperties}
        data={data}
        margin={{ top: 50, right: 60, bottom: 50, left: 120 }}
        xScale={{
          type: 'point',
        }}
        yScale={{
          // type: 'linear',
          // stacked: ('stacked', false),
          type: 'linear',
          stacked: false,
          min: 0,
          max: 'auto',
        }}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisBottom={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
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
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  )
}

export default ChartLineLDH
