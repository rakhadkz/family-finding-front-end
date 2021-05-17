import Button from "@atlaskit/button";
import EmojiAddIcon from "@atlaskit/icon/glyph/emoji-add";
import React, { useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import Toggle from "@atlaskit/toggle";
import Can from "../accessControl/Can";
import { createActionItemRequest } from "../api/actionItems/actionItemRequest";
import {
  createChildUserRequest,
  updateChildUserRequest,
} from "../api/children";
import { Box, Label, Spacing, Title } from "../components/ui/atoms";
import { Table } from "../components/ui/common/Table";
import { SearchBar } from "../components/ui/molecules/SearchBar";
import { childTableData } from "../content/child.data";
import { childrenTableColumns } from "../content/columns.data";
import { getLocalStorageUser } from "../context/auth/authProvider";
import { fetchChildren } from "../context/children/childProvider";
import { CHILDREN } from "../helpers";
import { updateQueryParams } from "./OrganizationsPage";
import { ACTIONS as PERFORMS } from "../accessControl/actions";
import {
  childReducer,
  fetchChildrenFailure,
  fetchChildrenSuccess,
  initialState,
  fetchChildrenRequest,
} from "../reducers/child";
import ChartistGraph from 'react-chartist';
import styled from 'styled-components'
import Chartist from 'chartist';
import 'chartist-plugin-axistitle'
import 'chartist-plugin-accessibility'
import {
  fetchGaugeRequest as fetchGauge
} from '../api/reports'
import './chart.css'

export const ChildrenPage = (props) => {
  const query = new URLSearchParams(props.location.search);
  const user = getLocalStorageUser();
  const history = useHistory();

  const [totalPage, setTotalPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(query.get("page") || 1);
  const [search, setSearch] = useState(query.get("search") || "");
  const [state, dispatch] = useReducer(childReducer, initialState);
  const [sort, setSort] = useState("");
  const [filterAssigned, setFilterAssigned] = useState(false);
  const [filterActive, setFilterActive] = useState(true);
  const head = childrenTableColumns(user?.role === "user", sort, setSort);
  const [chartData, setChartData] = useState()

  useEffect(() => {
    history.push(updateQueryParams(currentPage, search, sort, getFilter()));
    dispatch(fetchChildrenRequest());
    const timer = setTimeout(
      () => {fetchChildrenFunc();fetchChildrenGauge()},
      search?.length === 0 ? 0 : 1000
    );
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, search, sort, filterAssigned, filterActive]);

  useEffect(() => {
    search.length > 0 && setCurrentPage(1);
  }, [search]);

  const assignUser = async (child, isRepeatedly = false) => {
    if (user?.role === "user") {
      dispatch(fetchChildrenRequest());
      try {
        isRepeatedly
          ? await updateChildUserRequest({
              user_child: {
                user_id: user.id,
                child_id: child.id,
                date_denied: null,
              },
            })
          : await createChildUserRequest({
              user_child: {
                users: [
                  {
                    user_id: user.id,
                    child_id: child.id,
                  },
                ],
              },
            });
        await createActionItemRequest({
          action_item: {
            title: "Child Permission Request",
            description: `${user.first_name} ${user.last_name} has requested access for ${child.full_name}`,
            child_id: child.id,
            related_user_id: user.id,
            action_type: "access_request",
          },
        });
        fetchChildrenFunc();
      } catch (e) {
        dispatch(fetchChildrenFailure(e.message));
      }
    }
  };

  const getFilter = () => {
    let filter = "";
    if (filterActive) filter += "active";
    if (filterAssigned) filter += filter === "" ? "assigned" : ",assigned";
    return filter;
  };

  const fetchChildrenGauge = async () => {
    const filter = getFilter();
    const data = await fetchGauge({
      meta: true,
      filter,
    })
    console.log(data)
    setChartData({
      series : [{
        value: data?.chart_data[0],
        className: "green"
      },
      {
        value: data?.chart_data[1],
        className: "yellow"
      },
      {
        value: data?.chart_data[2],
        className: "orange"
      },
      {
        value: data?.chart_data[3],
        className: "red"
      },
      {
        value: data?.chart_data[4],
        className: "black"
      }
    ]
  })
  };

  const fetchChildrenFunc = () => {
    const filter = getFilter();
    fetchChildren({
      view: "table",
      page: currentPage,
      meta: true,
      search,
      sort,
      filter,
    })
      .then((response) => {
        if (response) {
          setTotalPage(response.meta.num_pages);
          dispatch(
            fetchChildrenSuccess(
              childTableData(
                response.data,
                history,
                assignUser,
                user.role === "user"
              )
            )
          );
        }
      })
      .catch((e) => dispatch(fetchChildrenFailure(e.message)));
  };

  const ActiveToggle = () => (
    <Box d="flex" direction="column" align="flex-start">
      <Label htmlFor="active-toggle">Only Active Children </Label>
      <Toggle
        id="active-toggle"
        onChange={() => setFilterActive((prev) => !prev)}
        isChecked={filterActive}
      />
    </Box>
  );

  const AssignedToggle = () => (
    <Box d="flex" direction="column" align="flex-start">
      <Label style={{ padding: 0 }} htmlFor="assigned-toggle">
        Only Assigned Children{" "}
      </Label>
      <Toggle
        id="assigned-toggle"
        onChange={() => setFilterAssigned((prev) => !prev)}
        isChecked={filterAssigned}
      />
    </Box>
  );

  /*
    <= 30 days = green
    31 to 60 days = yellow
    61 to 90 days = orange
    91 to 120 days = red
  */
  var options = {
    donut: true,
    donutWidth: 30,
    donutSolid: true,
    startAngle: 270,
    total: chartData?.series.reduce((acc, item) => acc+=item.value, 0)*2,
    showLabel: true,
    plugins: [],
    responsive: true,
    maintainAspectRatio: false,
  };

  console.log(chartData?.series.filter(i => i.value!==0))

  return (
    <>
      <Title>Children</Title>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <AssignedToggle />
          <ActiveToggle />
          <Can
            perform={`${CHILDREN}:${PERFORMS.ADD}`}
            yes={() => (
              <Button
                iconBefore={<EmojiAddIcon />}
                appearance="warning"
                onClick={() => history.push("/children-add")}
              >
                Add Child
              </Button>
            )}
          />
        </Box>
      </Spacing>
      <Box d="f">
      <Spacing m={{ 
        t: "20px", 
        b: "-80px", 
        l:'-100px'
      }} >
        <StyledChart data={{series: chartData?.series.filter(i => i.value!==0)}} 
        className={''} options={options} type={'Pie'} />
      </Spacing>
      <Digits chartData={chartData}/>
      </Box>

      <Spacing m={{ t: "20px" }}>
        <Table
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          items={state.children}
          pending={state.loading}
          head={head}
        />
      </Spacing>
    </>
  );
};

const Digits = ({chartData}) => {
  console.log(chartData)
  return (
    <Box d="f" style={{ marginTop: '30px' }}>
      { 
        chartData?.series[0].value !== 0 && 
        <Box style={{width: 130}}>
          <Text>{chartData?.series[0].value}</Text>
          <SmallText>Under 30 days</SmallText>
        </Box>
      } {
        chartData?.series[1].value !== 0 &&
        <Box style={{width: 130}}>
          <Text>{chartData?.series[1].value}</Text>
          <SmallText>31 to 60 days</SmallText>
        </Box>
      } {
        chartData?.series[2].value !== 0 &&
        <Box style={{width: 130}}>
          <Text>{chartData?.series[2].value}</Text>
          <SmallText>61 to 90 days</SmallText>
        </Box>
      }{
        chartData?.series[3].value !== 0 &&
        <Box style={{width: 130}}>
          <Text>{chartData?.series[3].value}</Text>
          <SmallText>91 to 120 days</SmallText>
        </Box>
      }{
        chartData?.series[4].value !== 0 &&
        <Box style={{width: 130}}>
          <Text>{chartData?.series[4].value}</Text>
          <SmallText>More than 120</SmallText>
        </Box>
      }
    </Box>
  )
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