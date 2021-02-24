import Button, { ButtonGroup } from "@atlaskit/button";
import { useContext, useEffect, useState } from "react";
import { Box } from "../../../ui/atoms";
import Select from "@atlaskit/select";
import { WysiwygEditor } from "../../../WYSIWYG";
import DocumentIcon from "@atlaskit/icon/glyph/document";
import { fetchSearchVectorsRequest } from "../../../../api/searchVectors/searchVectorsRequests";
import { ModalDialog } from "../../../ui/common";
import { ChildContext } from "../../../../pages/ChildProfilePage";
import FilePicker from "../Attachments/FilePicker";
import { getLocalStorageUser } from "../../../../context/auth/authProvider";
import {
  AvatarGroup,
  AttachmentGroup,
  SelectInput,
} from "../../../ui/molecules";
import {
  createSearchResultRequest,
  createSearchResultConnectionRequest,
  createSearchResultAttachmentRequest,
} from "../../../../api/searchResults/searchResultsRequests";
import { toast } from "react-toastify";
import { createAttachmentRequest } from "../../../../api/attachments/attachmentRequest";
import { uploadRequest } from "../../../../api/cloudinary";
import { useForm } from "react-hook-form";

export const AddSearchResultForm = ({
  currentSearchResult,
  setIsFormVisible,
}) => {
  const userId = getLocalStorageUser().id;
  const { control, handleSubmit } = useForm();
  const [options, setOptions] = useState([]);
  const [description, setDescription] = useState("");
  const [selectedSearchVector, setSelectedSearchVector] = useState(null);
  const [pending, setPending] = useState(false);
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [assignedConnections, setAssignedConnections] = useState([]);
  const [validationState, setValidationState] = useState("default");
  const connections = useContext(ChildContext).connectionState.connections.map(
    (connection) => {
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
    }
  );

  useEffect(() => {
    fetchSearchVectors();
  }, []);

  const fetchSearchVectors = () => {
    fetchSearchVectorsRequest({}).then((data) =>
      setOptions(data.map((item) => ({ label: item.name, value: item.id })))
    );
  };

  const onSubmitHandle = async (data) => {
    if (assignedConnections.length === 0) {
      setValidationState("error");
      return;
    }
    setPending(true);
    const { id } = await createSearchResultRequest({
      search_vector_id: data.search_vector.value,
      description: description,
      user_id: userId,
    });
    await assignedConnections?.forEach((connection) => {
      createSearchResultConnectionRequest(id, connection.value);
    });
    files.forEach(async (f, index) => {
      const {
        resource_type,
        original_filename,
        bytes,
        public_id,
        secure_url,
        format,
      } = await uploadRequest(f.file);
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
    });
    toast.success("Created successfully!");
    setPending(false);
    clearForm();
  };

  const clearForm = () => {
    setSelectedSearchVector(null);
    setAssignedConnections(null);
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
      />
      <Select
        className="multi-select"
        classNamePrefix="react-select"
        isMulti
        menuPortalTarget={document.body}
        value={assignedConnections}
        onChange={(e) => setAssignedConnections(e)}
        styles={{
          control: (base) => ({ ...base, width: 400, marginBottom: 10 }),
        }}
        options={connections}
        placeholder="Choose a Connection(s)"
      />
      <Box d="flex" justify="space-between">
        <ButtonGroup>
          <Button appearance="primary" type="submit" isDisabled={pending}>
            Add Search Result
          </Button>
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
              }))}
            />
          )}
        </ButtonGroup>
        <Button onClick={() => setIsFormVisible(false)} appearance="subtle">
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
