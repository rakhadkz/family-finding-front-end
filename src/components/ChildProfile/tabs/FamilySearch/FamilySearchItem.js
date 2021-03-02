import Button, { ButtonGroup } from "@atlaskit/button";
import { Box, Spacing, Title } from "../../../ui/atoms";
import { StyledLabel } from "../../ChildInformation";
import { useState } from "react";
import { AvatarGroup, AttachmentGroup } from "../../../ui/molecules";

const attachments = [
  {
    file_name: "document.docx",
    file_format: "docx",
  },
  {
    file_name: "presentation.ppt",
    file_format: "ppt",
  },
  {
    file_name: "table.xls",
    file_format: "xls",
  },
  {
    file_name: "avatar.png",
    file_format: "png",
  },
  {
    file_name: "video.mp4",
    file_format: "mp4",
  },
  {
    file_name: "list_of_students.xls",
    file_format: "xls",
  },
  {
    file_name: "information.docx",
    file_format: "docx",
  },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const FamilySearchItem = ({ item, noEdit, noMeta }) => {
  let date = new Date(item.created_at);
  console.log(!noMeta, !noEdit, item.attachments);
  return (
    <Box d="flex" mt="5px">
      <Box d="flex" direction="column">
        <Title>{date.getDate()}</Title>
        <span>{months[date.getMonth()]}</span>
        <span>{date.getFullYear()}</span>
      </Box>
      <div style={{ marginLeft: "16px", width: "100%" }}>
        <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
        {!noMeta && (
          <Box mt="11px" d="flex">
            <ButtonGroup>
              <AvatarGroup
                data={item?.child_contacts?.map(
                  ({ contact: { first_name, last_name } }) => ({
                    name: first_name + " " + last_name,
                  })
                )}
              />
              <AttachmentGroup
                data={item.attachments.map((item) => ({
                  ...item,
                  onClick: () => {
                    window.open(item.file_url, "_blank");
                  },
                }))}
              />
            </ButtonGroup>
          </Box>
        )}
        <Box d="flex" justify="space-between" align="baseline" mt="10px">
          <StyledLabel>
            Found via {item.search_vector?.name} by{" "}
            {`${item.user?.first_name} ${item.user?.last_name}`}
          </StyledLabel>
          {!noEdit && (
            <Button appearance="link" spacing="none">
              Edit Result
            </Button>
          )}
        </Box>
        <Spacing
          style={{ borderBottom: "1px solid #dee1e5" }}
          m={{ t: "8px", b: "8px" }}
        />
      </div>
    </Box>
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
