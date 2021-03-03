import Button, { ButtonGroup } from "@atlaskit/button";
import { Box, Spacing, Title } from "../../../ui/atoms";
import { StyledLabel } from "../../ChildInformation";
import { useState } from "react";
import { AvatarGroup, AttachmentGroup } from "../../../ui/molecules";
import { ModalDialog } from "../../../ui/common";
import { AddSearchResultForm } from "./AddSearchResultForm";

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
  const {
    created_at,
    description,
    user,
    attachments,
    connections,
    search_vector,
  } = item;
  let date = new Date(created_at);
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <Box d="flex" mt="5px">
      <Box d="flex" direction="column">
        <Title>{date.getDate()}</Title>
        <span>{months[date.getMonth()]}</span>
        <span>{date.getFullYear()}</span>
      </Box>
      <div style={{ marginLeft: "16px", width: "100%" }}>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
        {!noMeta && (
          <Box mt="11px" d="flex">
            <ButtonGroup>
              <AvatarGroup
                data={connections.map(
                  ({
                    child_contact: {
                      contact: { first_name, last_name },
                    },
                  }) => ({
                    name: first_name + " " + last_name,
                  })
                )}
              />
              <AttachmentGroup
                data={attachments.map(({ attachment }) => ({
                  ...attachment,
                  onClick: () => {
                    window.open(attachment.file_url, "_blank");
                  },
                }))}
              />
            </ButtonGroup>
          </Box>
        )}
        <Box d="flex" justify="space-between" align="baseline" mt="10px">
          <StyledLabel>
            Found via {search_vector.name} by{" "}
            {`${user.first_name} ${user.last_name}`}
          </StyledLabel>
          {!noEdit && (
            <>
              <ButtonGroup>
                <Button appearance="link" spacing="compact">
                  Remove
                </Button>
                <Button
                  appearance="link"
                  spacing="compact"
                  onClick={() => setIsEditOpen(true)}
                >
                  Edit Result
                </Button>
              </ButtonGroup>
              <ModalDialog
                isOpen={isEditOpen}
                setIsOpen={setIsEditOpen}
                width="large"
                hasActions={false}
                body={
                  <div style={{ margin: "20px 0" }}>
                    <AddSearchResultForm
                      currentSearchResult={item}
                      setIsOpen={setIsEditOpen}
                    />
                  </div>
                }
              />
            </>
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
