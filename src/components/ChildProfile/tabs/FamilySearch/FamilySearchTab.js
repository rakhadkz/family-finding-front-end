import Button, { ButtonGroup } from "@atlaskit/button";
import React from "react";
import { useForm } from "react-hook-form";
import { Box, Spacing } from "../../../ui/atoms";
import { SelectInput } from "../../../ui/molecules";
import { WysiwygEditor } from "../../../WYSIWYG";
import DocumentIcon from "@atlaskit/icon/glyph/document";
import InviteTeamIcon from "@atlaskit/icon/glyph/invite-team";
import { FamilySearchItem } from "./FamilySearchItem";

export function FamilySearchTab() {
  const { control } = useForm();
  const options = [
    { label: "Select", value: "select" },
    { label: "Select1", value: "select1" },
    { label: "Select2", value: "select2" },
  ];
  return (
    <Spacing m={{ t: "23px", b: "40px" }}>
      <Box w="100%" d="flex" direction="row-reverse">
        <ButtonGroup appearance="primary">
          <Button>Add New Search Result</Button>
          <Button>Export Search Result</Button>
        </ButtonGroup>
      </Box>
      <Spacing m={{ b: "30px" }}>
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
          <WysiwygEditor
            withMention={false}
            onChange={(tex, raw, html) => {}}
          />
          <ButtonGroup>
            <Button appearance="primary">Add Search Result</Button>
            <Button appearance="subtle" iconBefore={<DocumentIcon />} />
            <Button appearance="subtle" iconBefore={<InviteTeamIcon />} />
          </ButtonGroup>
        </form>
      </Spacing>

      {/* Family Search Items  */}
      <Spacing>
        <FamilySearchItem />
        <FamilySearchItem />
        <FamilySearchItem />
        <FamilySearchItem />
      </Spacing>
    </Spacing>
  );
}
