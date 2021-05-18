import React, { useEffect, useState, useCallback } from "react";
import { Box, Spacing, Title } from "../components/ui/atoms";
import ChartistGraph from 'react-chartist';
import {
  fetchChildrenRequest,
  fetchLinkedConnectionsRequest,
  fetchPlacementsRequest
} from '../api/reports'
import { Table } from "../components/ui/common/Table";
import styled from 'styled-components'
import Chartist from 'chartist';
import 'chartist-plugin-axistitle'
import 'chartist-plugin-accessibility'
import ChartistAccessibility from 'react-chartist-plugin-accessibility'
import 'chartist-plugin-tooltips-updated';

const last12months = () => {
  let monthName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
  let d = new Date();
  d.setDate(1);
  let res = []
  for (let i=0; i<=11; i++) {
      res.push(monthName[d.getMonth()])
      d.setMonth(d.getMonth() - 1);
  }
  return res
}

export const ReportsPage = () => {
  const [children, setChildren] = useState({labels:[],series:[]});
  const [placements, setPlacements] = useState({labels:[],series:[]});
  const [linkedConnections, setLinkedConnections] = useState({labels:[],series:[]});

  const fetchChildren = useCallback( async () => {
    const data = await fetchChildrenRequest({filter: undefined})
    setChildren({
      labels: last12months(),
      series: [ data?.children ]
    })
  }, [])
  const fetchPlacements = useCallback( async () => {
    const data = await fetchPlacementsRequest()
    console.log(data?.placements)
    setPlacements({
      labels: last12months(),
      series: [ data?.placements ]
    })
  },[])
  const fetchLinkedConnections =  useCallback( async () => {
    const data = await fetchLinkedConnectionsRequest()
    console.log(data?.linkedConnections)
    setLinkedConnections({
      labels: last12months(),
      series: [ data?.linkedConnections ]
    })
  }, [])
  console.log(children, placements, linkedConnections)

  useEffect(()=>{
    fetchChildren();
    fetchPlacements();
    fetchLinkedConnections();
  }, [fetchChildren,fetchPlacements,fetchLinkedConnections])

  var options = {
    // high: 10,
    axisY: {
        labelInterpolationFnc: function(value, index) {
          return value % 1 === 0 ? value : null
        }
      },
    plugins: [
      // Chartist.plugins.ctAxisTitle({
      //   axisX: {
      //     axisTitle: "Children",
      //     axisClass: "ct-axis-title",
      //     offset: {
      //       x: 0,
      //       y: 50
      //     },
      //     textAnchor: "middle"
      //   },
      //   axisY: {
      //     axisTitle: "Number of Children",
      //     axisClass: "ct-axis-title",
      //     offset: {
      //       x: 0,
      //       y: -1
      //     },
      //     flipTitle: false
      //   }
      // }),
      Chartist.plugins.tooltip()
      // Chartist.plugins.tooltip({
      //   currency: '$',
      //   class: 'class1 class2',
      //   appendToBody: true
      // })
    ]
  };

  var optionsPlacement = {
    // high: 10,
    // low: -10,
    // stackBars: true,
    // axisX: {
    //   labelInterpolationFnc: function(value, index) {
    //     return index % 2 === 0 ? value : null;
    //   }
    // }
    axisY: {
      labelInterpolationFnc: function(value, index) {
        return value % 1 === 0 ? value : null
      }
    },
    plugins: [
      // Chartist.plugins.ctAxisTitle({
      //   axisX: {
      //     axisTitle: "Contacts",
      //     axisClass: "ct-axis-title",
      //     offset: {
      //       x: 0,
      //       y: 50
      //     },
      //     textAnchor: "middle"
      //   },
      //   axisY: {
      //     axisTitle: "Number of Placed Contacts",
      //     axisClass: "ct-axis-title",
      //     offset: {
      //       x: 0,
      //       y: -1
      //     },
      //     flipTitle: false
      //   }
      // }),
      Chartist.plugins.tooltip({
        currency: '$',
        class: 'class1 class2',
        appendToBody: true
      })
    ]
  };

  var optionsLinkedConnections = {
    // high: 10,
    // low: -10,
    // stackBars: true,
    // axisX: {
    //   labelInterpolationFnc: function(value, index) {
    //     return index % 2 === 0 ? value : null;
    //   }
    // }
    axisY: {
      labelInterpolationFnc: function(value, index) {
        return value % 1 === 0 ? value : null
      }
    },
    plugins: [
      Chartist.plugins.ctAxisTitle({
        // axisX: {
        //   axisTitle: "Contacts",
        //   axisClass: "ct-axis-title",
        //   offset: {
        //     x: 0,
        //     y: 50
        //   },
        //   textAnchor: "middle"
        // },
  
        // axisY: {
          // labelInterpolationFnc: (value, index) =>
          //  # check if the value is not a decimal
          // value % 1 == 0 value :: null
          // axisTitle: "Number of Linked Connections",
          // axisClass: "ct-axis-title",
          // offset: {
          //   x: 0,
          //   y: -1
          // },
          // flipTitle: false
        // }
        // axisY: {
        //   labelInterpolationFnc: function(value, index) {
        //     return value
        //   }
        // },
      }),
      Chartist.plugins.tooltip({
        currency: '$',
        class: 'class1 class2',
        appendToBody: true
      })
    ]
  };
  const head  = last12months().map((m, i) => ({
      key: m,
      content: m,
      width: 100/12,
  }))

  var aspectRatio = 'ct-octave';
  return (
    <>
      <Title>Reports</Title>
      <Spacing m={{ t: "23px" }}>
        
        <Box d="flex" justify="space-between">
        

        </Box>
      </Spacing>
      <Spacing m={{ t: "20px" }}>
        <div style={{marginBottom: '200px'}}>
          <Title style={{marginBottom: 20}}>New Children Added to Linking Lives</Title>
        <StyledChart className={aspectRatio} data={children} options={options} type={'Bar'} />
        <Table
          items={
            children.series === []  ? 
            children.series[0].map((i,index) => ({
            key: index,
            content: i,
            width: 100/12,}))
             : []
          }
          head={head}
          pending={children.series === []}
        />
        </div>
        <div style={{marginBottom: '200px'}}>
          <Title style={{marginBottom: 20}}>New Contacts Placed in Linking Lives</Title>
        <StyledChart className={aspectRatio} data={placements} options={optionsPlacement} type={'Bar'} />
        <Table
          items={
            placements.series === [] ? placements.series[0].map((i,index) => ({
            key: index,
            content: i,
            width: 100/12,})) : []
          }
          head={head}
          pending={placements.series === []}
        />
        </div>

        <div style={{marginBottom: '200px'}}>
          <Title style={{marginBottom: 20}}>New Contacts Linked in Linking Lives</Title>
          <StyledChart className={aspectRatio} data={linkedConnections} options={optionsLinkedConnections} type={'Bar'}/>
          <Table
          items={
            linkedConnections.series === []  ? 
            linkedConnections.series[0].map((i,index) => ({
            key: index,
            content: i,
            width: 100/12,})) 
            : []
          }
          pending={placements.series === []}
          head={head}
        />
        </div>

      </Spacing>
    </>
  );
};

/* Use this selector to override bar styles on bar charts.
 Bars are also strokes so you have maximum freedom in styling them. */
const StyledChart = styled(ChartistGraph)`
.ct-series-a .ct-bar {
  stroke: #9469B0;
  stroke-width: 30px;
  // stroke-dasharray: 20px;
  // stroke-linecap: round;
}
.ct-label{
  fill: rgba(0,0,0,.4);
  color: rgba(0,0,0,.4);
}
`