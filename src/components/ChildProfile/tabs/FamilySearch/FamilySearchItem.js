import AvatarGroup from "@atlaskit/avatar-group";
import Button from "@atlaskit/button";
import { Box, Spacing, Title } from "../../../ui/atoms";
import { StyledLabel } from "../../ChildInformation";
import styled from "styled-components";
import { AttachmentIcon } from "../../../../content/childAttachment.data";
import Generic24Icon from "@atlaskit/icon-file-type/glyph/generic/24";
import PowerpointPresentation16Icon from "@atlaskit/icon-file-type/glyph/powerpoint-presentation/16";
import WordDocument16Icon from "@atlaskit/icon-file-type/glyph/word-document/16";
import ExcelSpreadsheet16Icon from "@atlaskit/icon-file-type/glyph/excel-spreadsheet/16";

export const FamilySearchItem = () => {
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
          <Box ml="4px" d="flex">
            <AttachmentTag>
              <WordDocument16Icon />
              <span className="file-name">document.docx</span>
            </AttachmentTag>
            <AttachmentTag>
              <PowerpointPresentation16Icon />
              <span className="file-name">presentation.ppt</span>
            </AttachmentTag>
            <AttachmentTag>
              <ExcelSpreadsheet16Icon />
              <span className="file-name">table.xlsx</span>
            </AttachmentTag>
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

const AttachmentTag = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin: 0 4px;
  border-radius: 30px;
  border: 1px solid #c1c7d0;
  transition: 0.2s;
  .file-name {
    margin-left: 10px;
  }

  :hover {
    background: #f0f0f0;
    cursor: pointer;
  }
`;

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
