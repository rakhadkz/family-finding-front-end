import React from 'react'
import ChartistGraph from 'react-chartist';
import styled from 'styled-components'
import Chartist from 'chartist';
import 'chartist-plugin-axistitle'
import 'chartist-plugin-accessibility'
import { Box, Label, Spacing, Title } from "../ui/atoms";

export const GaugeChart = ({chartData}) => {
    var options = {
        donut: true,
        donutWidth: 30,
        donutSolid: true,
        startAngle: 270,
        total: chartData?.series.reduce((acc, item) => acc+=item.value, 0)*2,
        showLabel: false,
        plugins: [],
        responsive: true,
        maintainAspectRatio: false,
      };
    return (
        <Box d="f">
            <Spacing m={{  
              t: "20px", 
              b: "-84px", 
              l:'-65px'
            }} >
              <StyledChart data={{series: chartData?.series.filter(i => i.value!==0)}} 
              className={''} options={options} type={'Pie'} />
            </Spacing>
            <Digits chartData={chartData}/>
      </Box>
    )
}


export const Digits = ({chartData}) => {
    console.log(chartData)
    return chartData ? (<Box d="f" style={{ marginTop: '30px' }}>
        { 
          chartData?.series[0].value !== 0 && 
          <Box style={{
            width: 130,
            background: "forestgreen",
            color: "white",
            borderRadius: 5,
            padding: 10,
            marginRight: 5,
          }}>
            <Text>{chartData?.series[0].value}</Text>
            <SmallText>Under 30 days</SmallText>
          </Box>
        } {
          chartData?.series[1].value !== 0 &&
          <Box style={{
            width: 130,
            background: "#FFFF00",
            color: "black",
            borderRadius: 5,
            padding: 10,
            marginRight: 5,
          }}>
            <Text>{chartData?.series[1].value}</Text>
            <SmallText>31 to 60 days</SmallText>
          </Box>
        } {
          chartData?.series[2].value !== 0 &&
          <Box style={{
            width: 130,
            background: "#FF0000",
            color: "white",
            borderRadius: 5,
            padding: 10,
            marginRight: 5,
          }}>
            <Text>{chartData?.series[2].value}</Text>
            <SmallText>61 to 90 days</SmallText>
          </Box>
        }{
          chartData?.series[3].value !== 0 &&
          <Box style={{
            width: 130,
            background: "#FFA500",
            color: "white",
            borderRadius: 5,
            padding: 10,
            marginRight: 5,
          }}>
            <Text>{chartData?.series[3].value}</Text>
            <SmallText>91 to 120 days</SmallText>
          </Box>
        }{
          chartData?.series[4].value !== 0 &&
          <Box style={{
            width: 130,
            background: "#040404",
            color: "white",
            borderRadius: 5,
            padding: 10,
            marginRight: 5,
          }}>
            <Text>{chartData?.series[4].value}</Text>
            <SmallText>Over 120 days</SmallText>
          </Box>
        }
      </Box>
    ) : null
  }
  
  const Text = styled.p`
    font-size: 32px;
    text-align: center;
  `
  const SmallText = styled.p`
    font-size: 16px;
    text-align: center;
    margin-top: -5px;
  `
  
  const StyledChart = styled(ChartistGraph)``