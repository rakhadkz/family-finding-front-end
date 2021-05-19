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
  return res.reverse()
}

export const ReportsPage = () => {
  const [children, setChildren] = useState({labels:[],series:[]});
  const [placements, setPlacements] = useState({labels:[],series:[]});
  const [linkedConnections, setLinkedConnections] = useState({labels:[],series:[]});

  const fetchChildren = useCallback( async () => {
    const data = await fetchChildrenRequest({filter: undefined})
    setChildren({
      labels: last12months(),
      series: [ data?.children.reverse() ]
    })
  }, [])
  const fetchPlacements = useCallback( async () => {
    const data = await fetchPlacementsRequest()
    console.log(data?.placements)
    setPlacements({
      labels: last12months(),
      series: [ data?.placements.reverse() ]
    })
  },[])
  const fetchLinkedConnections =  useCallback( async () => {
    const data = await fetchLinkedConnectionsRequest()
    console.log(data?.linkedConnections)
    setLinkedConnections({
      labels: last12months(),
      series: [ data?.linkedConnections.reverse() ]
    })
  }, [])

  console.log(children, placements, linkedConnections)

  useEffect(()=>{
    fetchChildren();
  }, [fetchChildren])
  useEffect(()=>{
    fetchLinkedConnections();
  }, [fetchLinkedConnections])
  useEffect(()=>{
    fetchPlacements();
  }, [fetchPlacements])

  var options = {
    axisY: {
        labelInterpolationFnc: function(value, index) {
          return value % 1 === 0 ? value : null
        }
      },
    plugins: [
    ]
  };

  var optionsPlacement = {
    axisY: {
      labelInterpolationFnc: function(value, index) {
        return value % 1 === 0 ? value : null
      }
    },
    plugins: [
      Chartist.plugins.tooltip({
        currency: '$',
        class: 'class1 class2',
        appendToBody: true
      })
    ]
  };

  var optionsLinkedConnections = {
    axisY: {
      labelInterpolationFnc: function(value, index) {
        return value % 1 === 0 ? value : null
      }
    },
    plugins: [
      Chartist.plugins.tooltip({
        currency: '$',
        class: 'class1 class2',
        appendToBody: true
      })
    ]
  };
  /*
    [
      {
        key: "month",
        content: "Month",
        width: 100/2,
      },
      {
        key: "number",
        content: "Number",
        width: 100/12,
      },
    ]

    key: "full_name",
    content: "Full Name",
    width: 30,

  */

  const head  = (table) => ([
    {
      key: "month",
      content: <p style={{textAlign: 'center'}}>{"Month"}</p>,
      width: 100/2,
    },
    {
      key: "number",
      content: <p style={{textAlign: 'center'}}>{table}</p>,
      width: 100/2,
    },
  ])

  const chartTableData = (data, history, assignUser, isUser = true) =>
    data && data.map((item, index) => ({
      key: index,
      cells: [
        {
          key: "month",
          content: <p style={{textAlign: 'center'}}>{last12months()[index]}</p>,
        },
        {
          key: "number",
          content: <p style={{textAlign: 'center'}}>{item}</p>,
        }
      ]
    }))


    console.log(chartTableData(children.series))

  var aspectRatio = 'ct-octave';
  return (
    <>
      <Title>Reports</Title>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
        </Box>
      </Spacing>
      <Spacing m={{ t: "20px" }}>
        <div style={{
          // marginBottom: '200px'
        }}>
          <Title style={{marginBottom: 20}}>New Children Added to Linking Lives</Title>
          <StyledChart className={aspectRatio} data={children} options={options} type={'Bar'} />
          <Table
            items={ chartTableData(children.series[0]) }
            head={head('Children')}
            pending={children.series[0] === []}
          />
        </div>
        <div style={{
          // marginBottom: '200px'
          }}>
          <Title style={{marginBottom: 20}}>Children Placed</Title>
          <StyledChart className={aspectRatio} data={placements} options={optionsPlacement} type={'Bar'} />
          <Table
            items={chartTableData(placements.series[0])}
            head={head("Children")}
            pending={placements.series[0] === []}
          />
        </div>

        <div style={{
          // marginBottom: '200px'
          }}>
          <Title style={{marginLeft: 20}}>New Kinship Contacts Found</Title>
          <StyledChart className={aspectRatio} data={linkedConnections} options={optionsLinkedConnections} type={'Bar'}/>
          <Table
            items={chartTableData(linkedConnections.series[0])}
            pending={placements.series[0] === []}
            head={head('Contacts')}
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
margin-bottom: 20px;
margin-top: 50px;
`