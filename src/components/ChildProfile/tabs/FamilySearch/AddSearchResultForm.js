import Button, { ButtonGroup } from "@atlaskit/button";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box } from "../../../ui/atoms";
import { SelectInput } from "../../../ui/molecules";
import Select from "@atlaskit/select";
import { WysiwygEditor } from "../../../WYSIWYG";
import DocumentIcon from "@atlaskit/icon/glyph/document";
import { fetchSearchVectorsRequest } from "../../../../api/searchVectors/searchVectorsRequests";
import { ModalDialog } from "../../../ui/common";
import { ChildContext } from "../../../../pages/ChildProfilePage";
import {
  createSearchResultAttachmentRequest,
  createSearchResultConnectionRequest,
  createSearchResultRequest,
} from "../../../../api/searchResults/searchResultsRequests";
import { getLocalStorageUser } from "../../../../context/auth/authProvider";

export const AddSearchResultForm = ({
  currentSearchResult,
  setIsFormVisible,
}) => {
  const { control, handleSubmit, reset } = useForm();
  const [options, setOptions] = useState([]);
  const [description, setDescription] = useState("");
  const userId = getLocalStorageUser().id;
  const [selectedSearchVector, setSelectedSearchVector] = useState(null);
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

  useEffect(() => {
    fetchSearchVectors();
  }, []);

  const fetchSearchVectors = () => {
    fetchSearchVectorsRequest({}).then((data) =>
      setOptions(data.map((item) => ({ label: item.name, value: item.id })))
    );
  };

  const onCreateSubmit = async (data) => {
    const { id } = await createSearchResultRequest({
      search_vector_id: data.search_vector.value,
      description: description,
      user_id: userId,
    });
    await assignedConnections.forEach((connection) => {
      createSearchResultConnectionRequest(id, connection.value);
    });
    //Tut attachments cherez await

    clearForm();
  };

  const clearForm = () => {
    setSelectedSearchVector(null);
    setAssignedConnections(null);
  };

  return (
    <form onSubmit={handleSubmit(onCreateSubmit)}>
      <SelectInput
        className="input"
        name="search_vector"
        options={options}
        myValue={selectedSearchVector}
        myOnChange={setSelectedSearchVector}
        register={{ required: true }}
        control={control}
        label="Search Vector"
        placeholder="Select search vector"
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
          <Button type="submit" appearance="primary">
            Add Search Result
          </Button>
          <Button appearance="subtle" iconBefore={<DocumentIcon />} />
        </ButtonGroup>
        <Button onClick={() => setIsFormVisible(false)} appearance="subtle">
          Cancel
        </Button>

        {/* Murat's part starting here */}
      </Box>
    </form>
  );
};
