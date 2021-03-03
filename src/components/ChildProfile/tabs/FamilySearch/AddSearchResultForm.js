import Button, { ButtonGroup, LoadingButton } from "@atlaskit/button";
import { useContext, useEffect, useMemo, useState } from "react";
import { Box } from "../../../ui/atoms";
import Select from "@atlaskit/select";
import { WysiwygEditor } from "../../../WYSIWYG";
import DocumentIcon from "@atlaskit/icon/glyph/document";
import { fetchSearchVectorsRequest } from "../../../../api/searchVectors/searchVectorsRequests";
import { ModalDialog } from "../../../ui/common";
import { ChildContext } from "../../../../pages/ChildProfilePage";
import FilePicker from "../Attachments/FilePicker";
import { getLocalStorageUser } from "../../../../context/auth/authProvider";
import { AttachmentGroup, SelectInput } from "../../../ui/molecules";
import {
  createSearchResultRequest,
  updateSearchResultRequest,
  createSearchResultConnectionRequest,
  createSearchResultAttachmentRequest,
  deleteSearchResultAttachmentRequest,
  deleteSearchResultConnectionRequest,
} from "../../../../api/searchResults/searchResultsRequests";
import { toast } from "react-toastify";
import { createAttachmentRequest } from "../../../../api/attachments/attachmentRequest";
import { uploadRequest } from "../../../../api/cloudinary";
import { useForm } from "react-hook-form";

export const AddSearchResultForm = ({
  currentSearchResult,
  setIsFormVisible,
  setIsOpen,
}) => {
  const {
    state: { child },
    connectionState,
    fetchSearchResults: fetch,
  } = useContext(ChildContext);
  const child_id = child.id;
  const [upd, setUpd] = useState(0);
  const userId = getLocalStorageUser().id;
  const { control, handleSubmit } = useForm();
  const [options, setOptions] = useState([]);
  const [description, setDescription] = useState(
    currentSearchResult ? currentSearchResult.description : ""
  );
  const [selectedSearchVector, setSelectedSearchVector] = useState(
    currentSearchResult && currentSearchResult.search_vector
      ? {
          label: currentSearchResult.search_vector?.name,
          value: currentSearchResult.search_vector?.id,
        }
      : null
  );
  const [pending, setPending] = useState(false);
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [currentFiles, setCurrentFiles] = useState(
    currentSearchResult ? currentSearchResult.attachments : []
  );
  const [filesForDeleting, setFilesForDeleting] = useState([]);
  const [assignedConnections, setAssignedConnections] = useState(
    currentSearchResult && currentSearchResult.connections
      ? currentSearchResult.connections.map(
          ({
            id,
            child_contact: {
              id: child_contact_id,
              contact: { first_name, last_name },
            },
          }) => ({
            label: `${first_name} ${last_name}`,
            value: child_contact_id,
            id: id,
          })
        )
      : []
  );
  const currentAssignedConnections = useMemo(() => assignedConnections, []);
  const [connectionsForDeleting, setConnectionsForDeleting] = useState([]);
  const [validationState, setValidationState] = useState("default");
  const connections = connectionState.connections.map((connection) => {
    if (connection && connection.contact) {
      const {
        contact: { first_name, last_name },
        id,
      } = connection;
      return {
        label: first_name + " " + last_name,
        value: id,
      };
    }
    return null;
  });

  useEffect(() => {
    fetchSearchVectors();
  }, []);

  const isObjectExist = (object) => {
    for (const obj of assignedConnections || []) {
      if (obj.value === object.value) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    setConnectionsForDeleting(
      currentAssignedConnections
        ?.filter((item) => !isObjectExist(item))
        .map((item) => item.id)
    );
  }, [assignedConnections]);

  const fetchSearchVectors = () => {
    fetchSearchVectorsRequest({}).then((data) =>
      setOptions(data.map((item) => ({ label: item.name, value: item.id })))
    );
  };

  const onSubmitHandle = async (data) => {
    if (!selectedSearchVector) {
      setValidationState("error");
      return;
    }
    let currentId;
    if (currentSearchResult) {
      setPending(true);
      currentId = currentSearchResult.id;
      await updateSearchResultRequest(currentSearchResult.id, {
        search_vector_id: selectedSearchVector.value,
        description: description,
      });
      for (const id of connectionsForDeleting || []) {
        await deleteSearchResultConnectionRequest(id);
      }
      for (const id of filesForDeleting) {
        await deleteSearchResultAttachmentRequest(id);
      }
    } else {
      setPending(true);
      const { id } = await createSearchResultRequest({
        search_vector_id: selectedSearchVector.value,
        description: description,
        user_id: userId,
        child_id: child_id,
      });
      currentId = id;
    }
    await createSearchResultConnections(currentId);
    await createSearchResultAttachments(currentId);
    await fetch();
    toast.success(
      currentSearchResult ? "Updated successfully!" : "Created successfully!"
    );
    setPending(false);
    clearForm();
  };

  const createSearchResultAttachments = async (id) => {
    if (files) {
      for (const file of files) {
        const {
          resource_type,
          original_filename,
          bytes,
          public_id,
          secure_url,
          format,
        } = await uploadRequest(file.file);
        if (!public_id) {
          alert("Upload failed. Try again!");
          return;
        }
        const attachment = await createAttachmentRequest({
          attachment: {
            file_name: original_filename,
            file_type: resource_type,
            file_url: secure_url,
            file_id: public_id,
            file_size: bytes,
            file_format: format,
            user_id: userId,
          },
        });
        await createSearchResultAttachmentRequest(id, attachment.id);
      }
    }
  };

  const createSearchResultConnections = async (id) => {
    if (assignedConnections) {
      for (const connection of assignedConnections) {
        if (connection) {
          try {
            await createSearchResultConnectionRequest(id, connection.value);
          } catch (e) {
            console.log(e);
          }
        }
      }
    }
  };

  const clearForm = () => {
    if (setIsOpen) {
      setIsOpen(false);
      setCurrentFiles([]);
    } else {
      setIsFormVisible(false);
    }
    files.forEach((file) => file.remove());
    setSelectedSearchVector(null);
    setAssignedConnections([]);
    setFiles([]);
    setUpd(upd + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandle)}>
      <SelectInput
        className="input"
        name="search_vector"
        options={options}
        myValue={selectedSearchVector}
        myOnChange={(e) => {
          setSelectedSearchVector(e);
          setValidationState("default");
        }}
        control={control}
        label="Search Vector"
        placeholder="Select search vector"
        validationState={validationState}
      />
      <WysiwygEditor
        withMention={false}
        onChange={(tex, raw, html) => setDescription(html)}
        defaultValue={description}
        upd={upd}
      />
      <Select
        className="multi-select"
        classNamePrefix="react-select"
        isMulti
        menuPortalTarget={document.body}
        value={assignedConnections}
        onChange={(e) => setAssignedConnections(e)}
        styles={{
          control: (base) => ({
            ...base,
            width: 400,
            marginBottom: 10,
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        options={connections}
        placeholder="Choose a Connection(s)"
      />
      {currentFiles.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <AttachmentGroup
            data={currentFiles.map((f, i) => ({
              file_name: `${f.attachment.file_name} ${f.attachment.file_format}`,
              file_format: f.attachment.file_format,
              onClick: () => {
                setCurrentFiles((prev) =>
                  prev.filter((file) => file.id !== f.id)
                );
                setFilesForDeleting((prev) => [...prev, f.id]);
              },
            }))}
            isRemovable
          />
        </div>
      )}
      <Box d="flex" justify="space-between">
        <ButtonGroup>
          <LoadingButton
            appearance="primary"
            type="submit"
            isLoading={pending}
            isDisabled={pending}
          >
            Add Search Result
          </LoadingButton>
          <Button
            appearance="subtle"
            iconBefore={<DocumentIcon />}
            onClick={() => setIsFileUploadModalOpen(true)}
          />
          {files && (
            <AttachmentGroup
              data={files.map((f, i) => ({
                file_name: f.file.name,
                file_format: f.file.name.split(".").pop(),
                onClick: () => {
                  f.remove();
                  setFiles((prev) =>
                    prev.filter((item) => item.meta.id !== f.meta.id)
                  );
                },
              }))}
              isRemovable
            />
          )}
        </ButtonGroup>
        <Button
          onClick={() => {
            clearForm();
          }}
          appearance="subtle"
        >
          Cancel
        </Button>

        <ModalDialog
          isOpen={isFileUploadModalOpen}
          setIsOpen={setIsFileUploadModalOpen}
          width="small"
          hasActions={false}
          body={
            <FilePicker
              user_id={userId}
              setIsOpen={setIsFileUploadModalOpen}
              setFiles={setFiles}
            />
          }
        />
      </Box>
    </form>
  );
};
