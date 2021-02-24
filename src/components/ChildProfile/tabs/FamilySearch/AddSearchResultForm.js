import Button, { ButtonGroup } from "@atlaskit/button";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box } from "../../../ui/atoms";
import Select from "@atlaskit/select";
import { WysiwygEditor } from "../../../WYSIWYG";
import DocumentIcon from "@atlaskit/icon/glyph/document";
import InviteTeamIcon from "@atlaskit/icon/glyph/invite-team";
import { fetchSearchVectorsRequest } from "../../../../api/searchVectors/searchVectorsRequests";
import { ModalDialog } from "../../../ui/common";
//import tag from "@atlaskit/tag/dist/types/tag";
import TagGroup from "@atlaskit/tag-group";
import { ChildContext } from "../../../../pages/ChildProfilePage";
import FilePicker from "../Attachments/FilePicker";
import { getLocalStorageUser } from "../../../../context/auth/authProvider";
import {
  AvatarGroup,
  AttachmentGroup,
  SelectInput,
} from "../../../ui/molecules";

export const AddSearchResultForm = ({
  currentSearchResult,
  setIsFormVisible,
}) => {
  const { control } = useForm();
  const [options, setOptions] = useState([]);
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);
  const [isFileUplodModalOpen, setIsFileUplodModalOpen] = useState(false);
  const [files, setFiles] = useState();
  const [connections, setConnections] = useState(
    useContext(ChildContext).connectionState.connections || []
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

  const onAddConnection = () => {
    assignedConnections.map((item) =>
      setConnections((prev) => [...prev, item])
    );
  };

  const onDeleteConnection = (id) => {
    setConnections((prev) => prev.filter((connection) => connection.id !== id));
  };

  // console.log(files);
  return (
    <form>
      <SelectInput
        className="input"
        name="organization"
        options={options}
        register={{ required: true }}
        control={control}
        label="Search Vector"
        placeholder="Select search vector"
      />
      <WysiwygEditor withMention={false} onChange={(tex, raw, html) => {}} />
      <Box d="flex" justify="space-between">
        <ButtonGroup>
          <Button appearance="primary">Add Search Result</Button>
          <Button
            appearance="subtle"
            iconBefore={<DocumentIcon />}
            onClick={() => setIsFileUplodModalOpen(true)}
          />
          <Button
            appearance="subtle"
            iconBefore={<InviteTeamIcon />}
            onClick={() => setIsConnectionModalOpen(true)}
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

        {/* Murat's part starting here */}
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

        {/* That's Shyngys's part */}
        <ModalDialog
          isOpen={isConnectionModalOpen}
          setIsOpen={setIsConnectionModalOpen}
          heading="Assign a User"
          positiveLabel="Assign"
          onClick={() => onAddConnection()}
          width="small"
          body={
            <>
              <TagGroup>
                {connections?.map(
                  (connection) =>
                    connection &&
                    connection.contact && (
                      <tag
                        appearance="rounded"
                        text={`${connection.contact.first_name} ${connection.contact.first_name}`}
                        onBeforeRemoveAction={() => {
                          onDeleteConnection(connection.id);
                          return false;
                        }}
                      />
                    )
                )}
              </TagGroup>
              <Select
                className="multi-select"
                classNamePrefix="react-select"
                isMulti
                menuPortalTarget={document.body}
                value={assignedConnections}
                onChange={(e) => {
                  console.log("EEE:", e);
                  //setAssignedConnections(e);
                }}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}
                //options={state.not_child_users}
                placeholder="Choose a User(s)"
              />
            </>
          }
        />
      </Box>
    </form>
  );
};
