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
import ChartistAccessibility from 'react-chartist-plugin-accessibility'
import 'chartist-plugin-tooltips-updated';

export const ReportsPage = () => {
  const [children, setChildren] = useState({labels:[],series:[[]]});
  const [placements, setPlacements] = useState({labels:[],series:[[]]});
  const [linkedConnections, setLinkedConnections] = useState({labels:[],series:[[]]});

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
      series: [ data?.placements.map(i => i[1])]
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
          axisTitle: "Children",
          axisClass: "ct-axis-title",
          offset: {
            x: 0,
            y: 50
          },
          textAnchor: "middle"
        },
        axisY: {
          axisTitle: "Number of Children",
          axisClass: "ct-axis-title",
          offset: {
            x: 0,
            y: -1
          },
          flipTitle: false
        }
      }),
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
    plugins: [
      Chartist.plugins.ctAxisTitle({
        axisX: {
          axisTitle: "Contacts",
          axisClass: "ct-axis-title",
          offset: {
            x: 0,
            y: 50
          },
          textAnchor: "middle"
        },
        axisY: {
          axisTitle: "Number of Placed Contacts",
          axisClass: "ct-axis-title",
          offset: {
            x: 0,
            y: -1
          },
          flipTitle: false
        }
      }),
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
    plugins: [
      Chartist.plugins.ctAxisTitle({
        axisX: {
          axisTitle: "Contacts",
          axisClass: "ct-axis-title",
          offset: {
            x: 0,
            y: 50
          },
          textAnchor: "middle"
        },
        axisY: {
          axisTitle: "Number of Linked Connections",
          axisClass: "ct-axis-title",
          offset: {
            x: 0,
            y: -1
          },
          flipTitle: false
        }
      }),
      Chartist.plugins.tooltip({
        currency: '$',
        class: 'class1 class2',
        appendToBody: true
      })
    ]
  };

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
        <StyledChart className={aspectRatio} data={children} options={options} type={'Bar'} >
          <ChartistAccessibility
            caption={'Total number of Children in a system'}
            summary={'A graphic that shows the total number of children in the system by months of the last year'}
            seriesHeader={'New children registered'}
            visuallyHiddenStyles={{
              position: 'absolute',
              top: '100%',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              fontSize: '14px',
              paddingLeft: '10px',
              paddingRight: '10px'
            }}
            valueTransform={function(value) {
              return value + (value === 1 ? ' child' : ' children');
            }}
          />
        </StyledChart>
        </div>
        <div style={{marginBottom: '200px'}}>

        <StyledChart className={aspectRatio} data={placements} options={optionsPlacement} type={'Bar'} >
        <ChartistAccessibility
            caption={'Total number of Placed Contacts in a system'}
            summary={'A graphic that shows the total number of placed contacts in the system by months of the last year'}
            seriesHeader={'New children registered'}
            visuallyHiddenStyles={{
              position: 'absolute',
              top: '100%',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              fontSize: '14px',
              paddingLeft: '10px',
              paddingRight: '10px'
            }}
            valueTransform={function(value) {
              return value + (value === 1 ? ' contact' : ' contacts');
            }}
          />
        </StyledChart>
        </div>

        <div style={{marginBottom: '200px'}}>
          <StyledChart className={aspectRatio} data={linkedConnections} options={optionsLinkedConnections} type={'Bar'}>
          <ChartistAccessibility
            caption={'Total number of Linked Connections in a system'}
            summary={'A graphic that shows the total number of linked contacts in the system by months of the last year'}
            seriesHeader={'New contacts linked'}
            visuallyHiddenStyles={{
              position: 'absolute',
              top: '100%',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              fontSize: '14px',
              paddingLeft: '10px',
              paddingRight: '10px'
            }}
            valueTransform={function(value) {
              return value + (value === 1 ? ' contact' : ' contacts');
            }}
          />
          </StyledChart>
        </div>

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