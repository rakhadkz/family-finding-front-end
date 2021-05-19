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
import 'chartist-plugin-axistitle'
import 'chartist-plugin-accessibility'
import 'chartist-plugin-tooltips-updated';
import { last12months } from '../utils/dateUtils'
import { head, chartTableData } from '../content/chart.data'

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

  // console.log(children, placements, linkedConnections)

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
    plugins: []
  };

  return (
    <>
      <Title>Reports</Title>
      <Spacing m={{ t: "20px" }}>
        <Box>
          <Title style={{marginBottom: 20}}>New Children Added to Linking Lives</Title>
          <StyledChart className={"ct-octave"} data={children} options={options} type={'Bar'} />
          <Table
            items={ chartTableData(children.series[0]) }
            head={head('Children')}
            pending={children.series[0] === []}
          />
        </Box>
        <Box>
          <Title style={{marginBottom: 20}}>Children Placed</Title>
          <StyledChart className={"ct-octave"} data={placements} options={options} type={'Bar'} />
          <Table
            items={chartTableData(placements.series[0])}
            head={head("Children")}
            pending={placements.series[0] === []}
          />
        </Box>

        <Box>
          <Title style={{marginLeft: 20}}>New Kinship Contacts Found</Title>
          <StyledChart className={"ct-octave"} data={linkedConnections} options={options} type={'Bar'}/>
          <Table
            items={chartTableData(linkedConnections.series[0])}
            pending={placements.series[0] === []}
            head={head('Contacts')}
          />
        </Box>
      </Spacing>
    </>
  );
};


const StyledChart = styled(ChartistGraph)`
  .ct-series-a .ct-bar {
    stroke: #9469B0;
    stroke-width: 30px;
  }
  .ct-label{
    fill: rgba(0,0,0,.4);
    color: rgba(0,0,0,.4);
  }
  margin-bottom: 20px;
  margin-top: 50px;
`