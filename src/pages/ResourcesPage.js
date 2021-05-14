/* eslint-disable no-unused-vars */
import Button from "@atlaskit/button";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { Box, Spacing, Title } from "../components/ui/atoms";
import { ModalDialog } from "../components/ui/common";
import { Table } from "../components/ui/common/Table";
import { SearchBar } from "../components/ui/molecules/SearchBar";
import { resourcesTableColumns } from "../content/columns.data";
import MentionIcon from "@atlaskit/icon/glyph/mention";
import { resourcesData } from "../content/resources.data";
import { ResourcesForm } from "../components/Resources";
import { createResourceRequest, deleteResourceRequest, fetchResourceRequest, updateResourceRequest } from "../api/resource";

export const ResourcesPage = (props) => {
  const query = new URLSearchParams(props.location.search);
  const [resources, setResources] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [id, setId] = useState(props.match.params.id);
  const [currentId, setCurrentId] = useState(-1);
  const [currentResource, setCurrentResource] = useState({});
  const [tablePending, setTablePending] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [totalPage, setTotalPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(query.get("page") || 1);
  const [search, setSearch] = useState(query.get("search") || "");
  const formRef = React.createRef();
  const head = resourcesTableColumns;

  const onDelete = (id) => {
    setRefresh(true);
    deleteResourceRequest(id)
      .catch((err) => toast.error("Error on server !"))
      .finally(() => {
        setRefresh(false);
        setIsOpen(false);
      });
  };

  useEffect(() => {
    setTablePending(true);
    const timer = setTimeout(
      () => {
        fetchResourceRequest().then((data) => {
          setResources(
            resourcesData(
              data,
              setIsOpen,
              setCurrentId,
              setIsOpenEdit,
              setCurrentResource
            )
          );
          setTablePending(false);
        });
      },
      search.length === 0 ? 0 : 1000
    );
    return () => clearTimeout(timer);
  }, [id, refresh, currentPage, search]);

  return (
    <>
      <Title>Resources</Title>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
          <Box d="flex" align="flex-end">
            {/* <SearchBar value={search} /> */}
          </Box>
          <Button
            appearance="primary"
            onClick={() => setIsCreateOpen(true)}
            iconBefore={<MentionIcon />}
          >
            Add Resource
          </Button>
        </Box>
      </Spacing>{" "}
      <Spacing m={{ t: "23px" }}>
        <Table
          totalPage={!id && totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          items={resources}
          pending={tablePending}
          head={head}
        />
      </Spacing>
      <ModalDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={() => onDelete(currentId)}
        positiveLabel="Delete"
        heading="Are you sure you want to remove this resource ?"
        body="You will no longer have access to this resource"
        appearance="danger"
      />
      <ModalDialog
        isOpen={isCreateOpen}
        setIsOpen={setIsCreateOpen}
        onClick={() => {
          formRef.current.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          );
        }}
        positiveLabel="Add"
        body={
          <ResourcesForm
            ref={formRef}
            onSubmit={createResourceRequest}
            refresh={refresh}
            setRefresh={setRefresh}
            setIsOpenEdit={setIsCreateOpen}
            isUpdate={false}
          />
        }
        appearance="danger"
      />
      <ModalDialog
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
        onClick={() => {
          formRef.current.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          );
        }}
        positiveLabel="Update"
        body={
          <ResourcesForm
            ref={formRef}
            onSubmit={updateResourceRequest(currentResource?.id)}
            initialValues={currentResource}
            refresh={refresh}
            setRefresh={setRefresh}
            setIsOpenEdit={setIsOpenEdit}
            isUpdate={true}
          />
        }
        appearance="danger"
      />
    </>
  );
};
