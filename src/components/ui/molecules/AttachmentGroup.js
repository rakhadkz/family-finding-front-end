import Button, { ButtonGroup } from "@atlaskit/button";
import Popup from "@atlaskit/popup";
import { useState } from "react";
import { ButtonItem, PopupMenuGroup, Section } from "@atlaskit/menu";
import {
  AttachmentItem,
  AttachmentTag,
} from "../../ChildProfile/tabs/FamilySearch/AttachmentTag";

const MAX_VISIBLE = 3;

export const AttachmentGroup = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ButtonGroup>
      {data.slice(0, MAX_VISIBLE).map((item) => (
        <AttachmentTag
          file_format={item.file_format}
          file_name={item.file_name}
          onClick={() => window.open(item.file_url, "_blank")}
        />
      ))}
      {data.length > MAX_VISIBLE && (
        <Popup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          content={() => (
            <OtherAttachments attachments={data.slice(MAX_VISIBLE)} />
          )}
          placement="bottom-start"
          trigger={(triggerProps) => (
            <Button
              appearance="subtle"
              {...triggerProps}
              isSelected={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              +{data.length - MAX_VISIBLE}
            </Button>
          )}
        />
      )}
    </ButtonGroup>
  );
};

const OtherAttachments = ({ attachments }) => {
  return (
    <PopupMenuGroup onClick={(e) => e.stopPropagation()}>
      <Section>
        {attachments.map((item) => (
          <ButtonItem onClick={() => window.open(item.file_url, "_blank")}>
            <AttachmentItem
              file_format={item.file_format}
              file_name={item.file_name}
            />
          </ButtonItem>
        ))}
      </Section>
    </PopupMenuGroup>
  );
};
