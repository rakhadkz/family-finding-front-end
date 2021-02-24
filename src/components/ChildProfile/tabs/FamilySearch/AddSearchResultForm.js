import Button, { ButtonGroup } from "@atlaskit/button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box } from "../../../ui/atoms";
import { SelectInput } from "../../../ui/molecules";
import { WysiwygEditor } from "../../../WYSIWYG";
import DocumentIcon from "@atlaskit/icon/glyph/document";
import InviteTeamIcon from "@atlaskit/icon/glyph/invite-team";
import { fetchSearchVectorsRequest } from "../../../../api/searchVectors/searchVectorsRequests";

export const AddSearchResultForm = ({
  currentSearchResult,
  setIsFormVisible,
}) => {
  const { control } = useForm();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchSearchVectors();
  }, []);

  const fetchSearchVectors = () => {
    fetchSearchVectorsRequest({}).then((data) =>
      setOptions(data.map((item) => ({ label: item.name, value: item.id })))
    );
  };

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
          <Button appearance="subtle" iconBefore={<DocumentIcon />} />
          <Button appearance="subtle" iconBefore={<InviteTeamIcon />} />
        </ButtonGroup>
        <Button onClick={() => setIsFormVisible(false)} appearance="subtle">
          Cancel
        </Button>
      </Box>
    </form>
  );
};
