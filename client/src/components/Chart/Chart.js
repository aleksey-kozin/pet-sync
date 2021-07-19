import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import { patternDotsDef, patternSquaresDef } from '@nivo/core'

function Chart({ analyses }) {
  console.log(analyses)

  

  let data = [
    {
      id: 'dots',
      type: 'patternDots',
      background: 'inherit',
      color: '#74c476',
      size: 100,
      padding: 1,
      stagger: true,
    },
    {
      id: 'analyses',
      label: 'analyses',
      value: (analyses.one + analyses.two + analyses.three) / analyses.length,
      color: '#74c476',
    },
    {
      id: 'normal',
      label: 'normal',
      value: 20,
      color: 'hsl(253, 70%, 50%)',
    },
    // {
    //   id: 'hack',
    //   label: 'hack',
    //   value: 71,
    //   color: 'blue',
    // },
    // {
    //   id: 'erlang',
    //   label: 'erlang',
    //   value: 354,
    //   color: 'hsl(187, 70%, 50%)',
    // },
  ]
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      startAngle={0}
      endAngle={360}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: 'greens' }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      enableArcLabels={false}
      enableArcLinkLabels={false}
      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
      defs={[
        patternDotsDef('dots-pattern', {
          size: 4,
          padding: 3,
          stagger: false,
          background: '#26d959',
          color: '#33a02c',
        }),
        {
          id: 'dots-pattern',
          type: 'patternDots',
          size: 3,
          padding: 5,
          stagger: false,
          background: '#1ae031',
          color: '#2b393b',
        },
        // {
        //   id: 'dots',
        //   type: 'patternDots',
        //   background: 'inherit',
        //   color: 'rgba(255, 255, 255, 0.3)',
        //   size: 4,
        //   padding: 1,
        //   stagger: true,
        // },
        // {
        //   id: 'lines',
        //   type: 'patternLines',
        //   background: 'inherit',
        //   color: 'rgba(255, 255, 255, 0.3)',
        //   rotation: -45,
        //   lineWidth: 6,
        //   spacing: 10,
        // },
      ]}
      fill={[
        {
          match: {
            id: 'analyses',
          },
          id: 'dots-pattern',
        },
      ]}
      legends={[]}
    />
    // document.getElementById('root')
  )
}

export default Chart
