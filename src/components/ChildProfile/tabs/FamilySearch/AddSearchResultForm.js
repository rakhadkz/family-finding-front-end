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

export const AddSearchResultForm = ({
  currentSearchResult,
  setIsFormVisible,
}) => {
  const [svId, setSvId] = useState();
  const [text, setText] = useState();
  const [rawData, setRawData] = useState();
  const [htmlText, setHTMLText] = useState();
  const [options, setOptions] = useState([]);
  const [pending, setPending] = useState(false);
  const [isFileUplodModalOpen, setIsFileUplodModalOpen] = useState(false);
  const [files, setFiles] = useState();
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
  const [assignedConnections, setAssignedConnections] = useState([]);
  const userId = getLocalStorageUser().id;

  useEffect(() => {
    console.log("Connections:::", connections);
    fetchSearchVectors();
  }, []);

  const fetchSearchVectors = () => {
    fetchSearchVectorsRequest({}).then((data) =>
      setOptions(data.map((item) => ({ label: item.name, value: item.id })))
    );
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    if (svId) {
      setPending(true);
      const { id } = await createSearchResultRequest({
        search_vector_id: svId,
        user_id: userId,
        description: htmlText,
      });
      if (files) {
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
          if (index === files.length - 1) {
            toast.success("Uploaded successfully!");
            setPending(false);
          }
        });
        if (assignedConnections)
          assignedConnections.forEach(async (connection, index) => {
            await createSearchResultConnectionRequest(id, connection.value);
          });
      }
      if (!files && id) setPending(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandle}>
      <Box w="200px">
        <Select
          style={{ width: "400px" }}
          className="input"
          name="organization"
          options={options}
          label="Search Vector"
          placeholder="Select search vector"
          onChange={(e) => {
            setSvId(e.value);
          }}
        />
      </Box>
      <WysiwygEditor
        withMention={false}
        onChange={(text, raw, html) => {
          setText(text);
          setRawData(raw);
          setHTMLText(html);
        }}
      />
      <Select
        className="multi-select"
        classNamePrefix="react-select"
        isMulti
        menuPortalTarget={document.body}
        value={assignedConnections}
        onChange={(e) => {
          setAssignedConnections(e);
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
            onClick={() => setIsFileUplodModalOpen(true)}
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
          isOpen={isFileUplodModalOpen}
          setIsOpen={setIsFileUplodModalOpen}
          width="small"
          hasActions={false}
          body={
            <FilePicker
              user_id={userId}
              setIsOpen={setIsFileUplodModalOpen}
              setFiles={setFiles}
            />
          }
        />
      </Box>
    </form>
  );
};
