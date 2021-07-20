import React from 'react'
import { useSelector } from 'react-redux'
import { ResponsiveRadar } from '@nivo/radar'

function DetailsBloodAnalyse(props) {
  const analyses = useSelector((state) => state.analysesReducer.analyses)
  console.log(analyses)
  let data = [
    {
      taste: 'normalALB',
      Max: 32,
      Min: 22,
      Fact: analyses.ALB,
    },
    {
      taste: 'normalGOT',
      Max: 39,
      Min: 9,
      Fact: analyses.GOT,
    },
    {
      taste: 'normalGPT',
      Max: 52,
      Min: 8,
      Fact: analyses.GPT,
    },
    {
      taste: 'normalLDH',
      Max: 56,
      Min: 32,
      Fact: analyses.LDH,
    },
    {
      taste: 'normalT_Bil',
      Max: 5,
      Min: 2,
      Fact: analyses.T_Bil,
    },
    {
      taste: 'normalT_Pro',
      Max: 75,
      Min: 43,
      Fact: analyses.T_Pro,
    },
  ]

  return (
    <div style={{ height: 800 }}>
      <ResponsiveRadar
        data={data}
        keys={['Max', 'Min', 'Fact']}
        indexBy="taste"
        maxValue="auto"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={36}
        enableDots={true}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color' }}
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={{ scheme: 'nivo' }}
        fillOpacity={0.25}
        blendMode="multiply"
        animate={true}
        motionConfig="wobbly"
        isInteractive={true}
        legends={[
          {
            anchor: 'top-left',
            direction: 'column',
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999',
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </div>
  )
}

export default DetailsBloodAnalyse
