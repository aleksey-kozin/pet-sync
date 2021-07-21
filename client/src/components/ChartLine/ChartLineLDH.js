import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import { useSelector } from 'react-redux'

// function ChartLine(props) {

const ChartLineLDH = () => {
  // console.log('listAnalyses',listAnalyses.listAnalyses[0]);
  // const analyses = useSelector((state) => state.analysesReducer.analyses)
  const listAnalyses = useSelector(
    (state) => state.analysesReducer.listAnalyses
  )
  // console.log('listAnalyses', listAnalyses)

  const anal = listAnalyses
  const length = anal.length
  let result = []
  for (let i = 0; i < length; i++) {
    result.push({ x: anal[i].date.substring(0, 9), y: anal[i].LDH })
  }
  // console.log(result)

  // const dispatch = useDispatch()
  // console.log('sssss', listAnalyses)

  // console.log('state', analyses)
  let data = [
    {
      id: 'hours',
      data: result,
    },
  ]
  // const curveOptions = [
  //   'linear',
  //   'monotoneX',
  //   'step',
  //   'stepBefore',
  //   'stepAfter',
  // ]

  // const commonProperties = {
  //   width: 600,
  //   height: 300,
  //   margin: { top: 20, right: 20, bottom: 60, left: 80 },
  //   data,
  //   animate: true,
  //   enableSlices: 'x',
  // }

  // console.log('data', data)
  // useEffect(() => {
  //   fetch('http://localhost:4000/analyses/list')
  //     .then((res) => res.json())
  //     .then((data) => dispatch(listAnalysesAC(data)))
  //   // .then((data) => console.log('data',data))
  // }, [dispatch])

  // let data = [
  //   {
  //     id: 'hours',
  //     data: [
  //       // { x: '2018-01-01', y: 4 },listAnalyses[0].date
  //       { x: listAnalyses[0].date.substring(0, 9), y: listAnalyses[0].LDH },
  //       { x: listAnalyses[1].date.substring(0, 9), y: listAnalyses[1].LDH },
  //       { x: listAnalyses[2].date.substring(0, 9), y: listAnalyses[2].LDH },
  //       { x: listAnalyses[3].date.substring(0, 9), y: listAnalyses[3].LDH },
  //       { x: listAnalyses[4].date.substring(0, 9), y: listAnalyses[4].LDH },
  //       { x: listAnalyses[5].date.substring(0, 9), y: listAnalyses[5].LDH },
  //       { x: listAnalyses[6].date.substring(0, 9), y: listAnalyses[6].LDH },
  //     ],
  //   },
  // ]

  // let data = (listAnalyses)=>{
  //   const length = listAnalyses.length
  //   let result = []
  //   for(let i = 0; i < length; i++){
  //     result.push({x: listAnalyses[i].date.substring(0, 9), y: listAnalyses[i].LDH })
  //   }
  //   console.log(result);
  //   return result
  // }
  // data()
  // console.log(data);
  // console.log(listAnalyses[0].date.substring(0, 9))

  return (
    <div className="App" style={{ height: 300 }}>
      {/* <h1>Line y axis time scale</h1> */}
      <ResponsiveLine
        // {...commonProperties}
        data={data}
        margin={{ top: 50, right: 60, bottom: 50, left: 120 }}
        xScale={{
          type: 'point',
          // type: 'time',
          // format: '%Y-%m-%d',
          // useUTC: false,
          // precision: 'mount',
        }}
        // xFormat="time:%Y-%m-%d"
        yScale={{
          // type: 'linear',
          // stacked: ('stacked', false),
          type: 'linear',
          stacked: false,
          min: 0,
          max: 'auto',
          // min: 'auto',
          // max: 'auto',
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
          // orient: 'left',
          // tickSize: 5,
          // tickPadding: 5,
          // tickRotation: 0,
          // legend: 'count',
          // legendOffset: -40,
          // legendPosition: 'middle',
          // legend: 'linear scale',
          // legendOffset: 12,
        }}
        axisBottom={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle',
          // orient: 'bottom',
          // tickSize: 5,
          // tickPadding: 5,
          // tickRotation: 0,
          // legend: 'transportation',
          // legendOffset: 36,
          // legendPosition: 'middle',
          // format: '%b %d',
          // tickValues: 'every 2 days',
          // legend: 'time scale',
          // legendOffset: -12,
        }}
        // colors={{ scheme: 'blue_green' }}

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
