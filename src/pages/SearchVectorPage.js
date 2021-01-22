import Button from "@atlaskit/button";
import EmojiAddIcon from "@atlaskit/icon/glyph/emoji-add";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createActionItemRequest } from "../api/actionItems/actionItemRequest";
import {
  createChildUserRequest,
  updateChildUserRequest,
} from "../api/children";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Table } from "../components/ui/common/Table";
import { SearchBar } from "../components/ui/molecules/SearchBar";
import { searchVectorTableData } from "../content/searchVector.data";
import { searchVectorsTableColumns } from "../content/columns.data";
import { getLocalStorageUser } from "../context/auth/authProvider";
import {
  fetchSearchVectors,
  postSearchVector,
  deleteSearchVector,
  updateSearchVector,
} from "../context/searchVectors/SearchVectorsProvider";
import { updateQueryParams } from "./OrganizationsPage";
import { AddSearchVectorForm } from "../components/SearchVector/";
import { ModalDialog } from "../components/ui/common";
import ChildIssuesIcon from "@atlaskit/icon/glyph/child-issues";

export const SearchVectorsPage = (props) => {
  const history = useHistory();
  const [searchVector, setSearchVector] = useState([]);
  const [tablePending, setTablePending] = useState(true);
  const user = getLocalStorageUser();
  const query = new URLSearchParams(props.location.search);
  const head = searchVectorsTableColumns;
  const [currentPage, setCurrentPage] = useState(query.get("page") || 1);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState(query.get("search") || "");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSV, setCurrentSV] = useState(-1);
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    console.log("User in Children Page", user);
    history.push(updateQueryParams(currentPage, search));
    setTablePending(true);
    const timer = setTimeout(() => fetch(), search?.length === 0 ? 0 : 1000);
    return () => clearTimeout(timer);
  }, [currentPage, search]);

  useEffect(() => {
    search.length > 0 && setCurrentPage(1);
  }, [search]);

  const fetch = () => {
    fetchSearchVectors({
      page: currentPage,
      meta: true,
      search: search,
      organization_id: user.organization_id,
    })
      .then((response) => {
        if (response) {
          setTotalPage(response?.meta?.num_pages);
          console.log(response);
          console.log(response?.data);
          setSearchVector(
            searchVectorTableData(
              response?.data,
              history,
              setIsOpen,
              setCurrentSV,
              setIsAddModalOpen,
              setEdit
            )
          );
        }
      })
      .finally(() => setTablePending(false));
  };

  const onDelete = (id) => {
    deleteSearchVector({ id }).finally(() => {
      setIsOpen(false);
      setSearchVector(searchVector.filter((sv) => sv.id !== id));
    });
  };

  console.log(searchVector, currentSV);

  return (
    <>
      <Title>Search Vectors</Title>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            iconBefore={<ChildIssuesIcon />}
            appearance="warning"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Search Vector
          </Button>
        </Box>
      </Spacing>
      <ModalDialog
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        heading={isEdit ? "Edit Search Vector" : "Add Search Vector"}
        appearance={null}
        body={
          <AddSearchVectorForm
            onSubmit={postSearchVector}
            something={updateSearchVector}
            fetch={fetch}
            onCancel={() => setIsAddModalOpen(false)}
            organization_id={user.organization_id}
            currSv={currentSV}
            sv={searchVector}
            isEdit={isEdit}
          />
        }
        hasActions={false}
      />
      <Spacing m={{ t: "20px" }}>
        <Table
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          items={searchVector}
          pending={tablePending}
          head={head}
        />
      </Spacing>
      <ModalDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={() => onDelete(currentSV)}
        positiveLabel="Delete"
        heading="Are you sure you want to remove this search vector?"
        body="You will no longer have access to this search vector"
        appearance="danger"
      />
    </>
  );
};
