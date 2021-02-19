import AvatarGroup from "@atlaskit/avatar-group";
import Button, { ButtonGroup } from "@atlaskit/button";
import { Box, Spacing, Title } from "../../../ui/atoms";
import { StyledLabel } from "../../ChildInformation";
import Popup from "@atlaskit/popup";
import { useState } from "react";
import { ButtonItem, PopupMenuGroup, Section } from "@atlaskit/menu";
import { AttachmentItem, AttachmentTag } from "./AttachmentTag";

export const FamilySearchItem = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box d="flex" mt="5px">
      <Box d="flex" direction="column">
        <Title>14</Title>
        <span>February</span>
        <span>2021</span>
      </Box>
      <Spacing m={{ l: "16px" }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <Box mt="11px" d="flex">
          <AvatarGroup
            size="medium"
            appearance="stack"
            maxCount={4}
            data={RANDOM_USERS}
          />
          <Box ml="6px" d="flex" align="center">
            <ButtonGroup>
              <AttachmentTag file_format="ppt" file_name="presentation.ppt" />
              <AttachmentTag file_format="docx" file_name="documents.docx" />
              <AttachmentTag file_format="pdf" file_name="info.pdf" />
              <Popup
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                content={() => <OtherAttachments />}
                placement="bottom-start"
                trigger={(triggerProps) => (
                  <Button
                    appearance="subtle"
                    {...triggerProps}
                    isSelected={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    +4
                  </Button>
                )}
              />
            </ButtonGroup>
          </Box>
        </Box>
        <Box d="flex" justify="space-between" align="baseline" mt="10px">
          <StyledLabel>Found via Search Vector by Alex Bell</StyledLabel>
          <Button appearance="link" spacing="none">
            Edit Result
          </Button>
        </Box>
        <Spacing
          style={{ borderBottom: "1px solid #dee1e5" }}
          m={{ t: "8px", b: "8px" }}
        />
      </Spacing>
    </Box>
  );
};

const OtherAttachments = () => {
  return (
    <PopupMenuGroup onClick={(e) => e.stopPropagation()}>
      <Section>
        <ButtonItem>
          <AttachmentItem file_format="ppt" file_name="ppt" />
        </ButtonItem>
        <ButtonItem>
          <AttachmentItem file_format="ppt" file_name="ppt" />
        </ButtonItem>
      </Section>
    </PopupMenuGroup>
  );
};

const RANDOM_USERS = [
  {
    email: "example@email.com",
    key: 1,
    name: "Shyngys Rakhad",
    href: "#",
  },
  {
    email: "example@email.com",
    key: 2,
    name: "Lorem Ipsum",
    href: "#",
  },
  {
    email: "example@email.com",
    key: 3,
    name: "Olzhas Rakhad",
    href: "#",
  },
  {
    email: "example@email.com",
    key: 4,
    name: "Miras Rakhad",
    href: "#",
  },
  {
    email: "example@email.com",
    key: 5,
    name: "Steve Jobs",
    href: "#",
  },
];
