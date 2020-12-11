import Button from "@atlaskit/button";
import EmojiAddIcon from "@atlaskit/icon/glyph/emoji-add";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchChildrenMeta } from "../api/children";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { Table } from "../components/ui/common/Table";
import { SearchBar } from "../components/ui/molecules/SearchBar";
import { SidebarTemplate } from "../components/ui/templates";
import { childTableData } from "../content/child.data";
import { childrenTableColumns } from "../content/columns.data";
import { fetchChildren } from "../context/children/childProvider";

export const ChildrenPage = (props) => {
  const history = useHistory();
  const [children, setChildren] = useState([]);
  const [tablePending, setTablePending] = useState(true);
  const [totalPage, setTotalPage] = useState(null);
  const query = new URLSearchParams(props.location.search);
  var currentPage = query.get("page") || 1;
  useEffect(() => {
    fetchChildren({ view: "table", page: currentPage, meta: true })
      .then((response) => {
        const items = response.data;
        setTotalPage(response.meta.num_pages);
        if (items) setChildren(childTableData(items, history));
      })
      .finally(() => setTablePending(false));
  }, [currentPage]);
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Children</Title>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
          <SearchBar />
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
          items={children}
          pending={tablePending}
          head={childrenTableColumns}
        />
      </Spacing>
    </SidebarTemplate>
  );
};
