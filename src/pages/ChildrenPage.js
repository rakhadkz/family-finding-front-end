import Button from "@atlaskit/button";
import EmojiAddIcon from "@atlaskit/icon/glyph/emoji-add";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createActionItemRequest } from "../api/actionItems/actionItemRequest";
import { createChildUserRequest } from "../api/children";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { Table } from "../components/ui/common/Table";
import { SearchBar } from "../components/ui/molecules/SearchBar";
import { SidebarTemplate } from "../components/ui/templates";
import { childTableData } from "../content/child.data";
import { childrenTableColumns } from "../content/columns.data";
import { useAuth } from "../context/auth/authContext";
import { fetchChildren } from "../context/children/childProvider";
import { updateQueryParams } from "./OrganizationsPage";

export const ChildrenPage = (props) => {
  const history = useHistory();
  const [ children, setChildren ] = useState([]);
  const [ tablePending, setTablePending ] = useState(true);
  const [ totalPage, setTotalPage ] = useState(null);
  const query = new URLSearchParams(props.location.search);
  const [ currentPage, setCurrentPage ] = useState(query.get("page") || 1);
  const [ search, setSearch ] = useState(query.get("search") || "");
  const { user } = useAuth();
  const role = window.localStorage.getItem("role");
  const head = childrenTableColumns(user?.role === "user");

  useEffect(() => {
    console.log("USER", user);
    history.push(updateQueryParams(currentPage, search));
    setTablePending(true);
    const timer = setTimeout(
      () =>
        fetchChildrenFunc(),
      search?.length === 0 ? 0 : 1000
    );
    return () => clearTimeout(timer);
  }, [currentPage, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const assignUser = (child) => {
    user?.role === "user" 
    && createChildUserRequest({
      "user_child": {
        "users": [
          {
            "user_id": user.id,
            "child_id": child.id
          }
        ]
      }
    })
    && createActionItemRequest({
      "action_item": {
        "title": "User Assign",
        "description": `${user.first_name} ${user.last_name} sent a request to ${child.full_name}`,
        "child_id": child.id,
        "organization_id": user.organization_id,
        "related_user_id": user.id,
        "action_type": "access_request"
      }
    }).then(() => fetchChildrenFunc())
  }
  
  const fetchChildrenFunc = () => {
    fetchChildren({
      view: "table",
      page: currentPage,
      meta: true,
      search: search,
    })
      .then((response) => {
        if (response){
          setTotalPage(response.meta.num_pages);
          setChildren(childTableData(response.data, history, assignUser, role === "user"));
        }
      })
      .finally(() => setTablePending(false));
  }

  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Children</Title>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            iconBefore={<EmojiAddIcon />}
            appearance="warning"
            onClick={() => history.push("/children-add")}
          >
            Add child
          </Button>
        </Box>
      </Spacing>
      <Spacing m={{ t: "20px" }}>
        <Table
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          items={children}
          pending={tablePending}
          head={head}
        />
      </Spacing>
    </SidebarTemplate>
  );
};
