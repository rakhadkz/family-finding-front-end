import React, { useEffect, useState, useCallback } from "react";
import { Box, Spacing, Title } from "../components/ui/atoms";
import ChartistGraph from 'react-chartist';
import {
  fetchChildrenRequest,
  fetchLinkedConnectionsRequest,
  fetchPlacementsRequest
} from '../api/reports'
import styled from 'styled-components'
import Chartist from 'chartist';
import 'chartist-plugin-axistitle'
import 'chartist-plugin-accessibility'

export const ReportsPage = () => {
  const [children, setChildren] = useState();
  const [placements, setPlacements] = useState();
  const [linkedConnections, setLinkedConnections] = useState();

  /*
    labels: children.keys(),
    series: [ children.values()]
   */
  const fetchChildren = useCallback( async () => {
    const data = await fetchChildrenRequest({filter: undefined})
    setChildren({
      labels: data?.children.map(i => i[0]),
      series: [  data?.children.map(i => i[1]) ]
    })
  }, [])
  const fetchPlacements = useCallback( async () => {
    const data = await fetchPlacementsRequest()
    console.log(data?.placements)
    setPlacements({
      labels: data?.placements.map(i => i[0]),
      series: [  data?.placements.map(i => i[1]) ]
    })
  },[])
  const fetchLinkedConnections =  useCallback( async () => {
    const data = await fetchLinkedConnectionsRequest()
    console.log(data?.linkedConnections)
    setLinkedConnections({
      labels: data?.linkedConnections.map(i => i[0]),
      series: [  data?.linkedConnections.map(i => i[1]) ]
    })
  }, [])

  useEffect(()=>{
    fetchChildren();
    fetchPlacements();
    fetchLinkedConnections();
  }, [fetchChildren,fetchPlacements,fetchLinkedConnections])

  var options = {
    // high: 10,
    // low: -10,
    // stackBars: true,
    // axisX: {
    //   labelInterpolationFnc: function(value, index) {
    //     return index % 2 === 0 ? value : null;
    //   }
    // }
    plugins: [
      Chartist.plugins.ctAxisTitle({
        axisX: {
          axisTitle: "Time (mins)",
          axisClass: "ct-axis-title",
          offset: {
            x: 0,
            y: 50
          },
          textAnchor: "middle"
        },
        axisY: {
          axisTitle: "Total count",
          axisClass: "ct-axis-title",
          offset: {
            x: 0,
            y: -1
          },
          flipTitle: false
        }
      }),
      Chartist.plugins.ctAccessibility({
        caption: 'Fiscal year 2015',
        seriesHeader: 'business numbers',
        summary: 'A graphic that shows the business numbers of the fiscal year 2015',
        valueTransform: function(value) {
          return value + ' dollar';
        },
        visuallyHiddenStyles: 
        'position: relative; top: 100%; width: 100%; font-size: 11px; overflow-x: auto; background-color: rgba(0, 0, 0, 0.1); padding: 10px'
      })
    ]
  };

  var type = 'Bar'
  var aspectRatio = 'ct-octave';


  return (
    <>
      <Title>Reports</Title>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
          

        </Box>
      </Spacing>
      <Spacing m={{ t: "20px" }}>
        
        <StyledChart data={children} options={options} type={type} />
        <StyledChart data={placements} options={options} type={type} />
        <StyledChart data={linkedConnections} options={options} type={type} />

      </Spacing>
    </>
  );
};

/* Use this selector to override bar styles on bar charts.
 Bars are also strokes so you have maximum freedom in styling them. */
const StyledChart = styled(ChartistGraph)`
.ct-series-a .ct-bar {
  stroke: red;
  stroke-width: 30px;
  // stroke-dasharray: 20px;
  // stroke-linecap: round;
}
`