import Button from "@atlaskit/button";
import EmojiAddIcon from "@atlaskit/icon/glyph/emoji-add";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createActionItemRequest } from "../api/actionItems/actionItemRequest";
import { createChildUserRequest, updateChildUserRequest } from "../api/children";
import { GroupAccess } from "../components/common/GroupAccess";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Table } from "../components/ui/common/Table";
import { SearchBar } from "../components/ui/molecules/SearchBar";
import { childTableData } from "../content/child.data";
import { childrenTableColumns } from "../content/columns.data";
import { getLocalStorageUser } from "../context/auth/authProvider";
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
  const user = getLocalStorageUser();
  const head = childrenTableColumns(user?.role === "user");

  useEffect(() => {
    console.log("User in Children Page", user)
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
    search.length > 0 && setCurrentPage(1);
  }, [search]);

  const assignUser = async(child, isRepeatedly = false) => {
    if (user?.role === "user"){
      setTablePending(true)
      isRepeatedly ? await updateChildUserRequest({
        "user_child": {
          "user_id": user.id,
          "child_id": child.id,
          "date_denied": null
        }
      }) : await createChildUserRequest({
        "user_child": {
          "users": [
            {
              "user_id": user.id,
              "child_id": child.id
            }
          ]
        }
      })
      await createActionItemRequest({
        "action_item": {
          "title": "Child Permission Request",
          "description": `${user.first_name} ${user.last_name} has requested access for ${child.full_name}`,
          "child_id": child.id,
          "related_user_id": user.id,
          "action_type": "access_request"
        }
      });
      fetchChildrenFunc();
    }
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
          setChildren(childTableData(response.data, history, assignUser, user.role === "user"));
        }
      })
      .finally(() => setTablePending(false));
  }

  return (
    <>
      <Title>Children</Title>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <GroupAccess exact="admin">
            <Button
              iconBefore={<EmojiAddIcon />}
              appearance="warning"
              onClick={() => history.push("/children-add")}
            >
              Add Child
            </Button>
          </GroupAccess>
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
    </>
  );
};
