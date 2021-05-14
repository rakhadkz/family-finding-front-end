import Button from "@atlaskit/button";
import React, { useState } from "react";
import Select from "@atlaskit/select";
import { Box, Spacing } from "../ui/atoms";
import { Avatar } from "../ui/molecules/Avatar";
import { Rounded } from "../ui/molecules/Rounded";
import AddIcon from "@atlaskit/icon/glyph/add";
import { B400 } from "@atlaskit/theme/colors";
import { siblingTypes } from "../../pages";
import { ModalDialog } from "../ui/common";

export const SiblingsItem = ({
  sibling,
  onAdd,
  onDelete,
  siblingType = "",
  visibleRemove = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultSiblingType, setDefaultSiblingType] = useState(siblingTypes[0]);

  return (
    <Spacing m={{ l: "10px", b: "22px" }}>
      <Box d="flex" align="center">
        <Rounded
          onClick={() => window.open(`${sibling?.id}`)}
          onDelete={onDelete}
          visibleRemove={visibleRemove}
          content={
            <>
              <Avatar
                size="small"
                name={`${sibling?.first_name} ${sibling?.last_name}`}
                isChild
              />
              <div>
                <span style={{ marginLeft: "5px", color: "#455670" }}>
                  {sibling?.first_name} {sibling?.last_name}
                </span>
                <div style={{ marginLeft: "5px", color: "#455670" }}>
                  {siblingType
                    ? `Type: ${
                        siblingTypes.find((item) => item.value === siblingType)
                          .label
                      }`
                    : ""}
                </div>
              </div>
              {onAdd ? (
                <>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                    }}
                    appearance="subtle"
                    spacing="none"
                    style={{
                      borderRadius: 30,
                      marginLeft: 15,
                      padding: "3px 5px",
                    }}
                  >
                    <AddIcon size="small" primaryColor={B400} />
                  </Button>
                </>
              ) : null}
            </>
          }
        />
      </Box>
      <ModalDialog
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        heading="Select sibling type"
        positiveLabel="Select"
        onClick={() => onAdd(defaultSiblingType.value)}
        width="small"
        body={
          <>
            <Spacing m={{ t: "10px" }}>
              <Select
                className="multi-select"
                classNamePrefix="react-select"
                menuPortalTarget={document.body}
                value={defaultSiblingType}
                onFocus={(e) => e.stopPropagation()}
                onChange={(e) => {
                  setDefaultSiblingType(e);
                }}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}
                options={siblingTypes}
                placeholder="Select SiblingType"
              />
            </Spacing>
          </>
        }
      />
    </Spacing>
  );
};
