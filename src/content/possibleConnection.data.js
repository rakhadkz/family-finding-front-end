import Button from "@atlaskit/button"
import EmailIcon from '@atlaskit/icon/glyph/email'
import NotificationIcon from "@atlaskit/icon/glyph/notification-direct"
import AttachmentIcon from "@atlaskit/icon/glyph/attachment"
import React from 'react'
import { Avatar } from "../components/ui/molecules/Avatar"
import { Box, Spacing } from "../components/ui/atoms"
import EditorEditIcon from "@atlaskit/icon/glyph/editor/edit";

export const possibleConnectionRows = (
  data,
  setIsConnectionModalOpen,
  setCurrentConnection,
  setIsConfirmModalOpen,
  setIsAddModalOpen
) => (
  data
    .filter(item => item && !item.is_confirmed)
    .map((item, index) => item && item.contact && (
      {
        key: index,
        cells: [
          {
            key: "full_name",
            content: (
              <Box d="flex" align="center">
                <Avatar name={`${item.contact.first_name} ${item.contact.last_name}`} size="medium" ratio={0.4}/>
                <Box d="flex" align="center">
                  <Button 
                    appearance="link" 
                    spacing="none" 
                    style={{marginLeft: "8px"}}
                    onClick={() => {
                      setCurrentConnection(item)
                      setIsConnectionModalOpen(true)
                    }}
                  >
                    {`${item.contact.first_name} ${item.contact.last_name}`}
                  </Button>
                  <Button spacing="none" style={{marginLeft: "5px"}} appearance="link" onClick={() => {
                    setCurrentConnection(item)
                    setIsAddModalOpen(true)
                  }}>
                    <EditorEditIcon size="medium" />
                  </Button>
                </Box>
              </Box>
            )
          },
          {
            key: "relationship",
            content: item.relationship
          },
          {
            key: "engagement",
            content: (
              <Box d="flex">
                  <Button appearance="link" spacing="none" style={{ marginRight: "17px" }}>
                    <Box d="flex" align="center">
                      <Spacing m={{r: "4px"}}>
                        5
                      </Spacing>
                      <EmailIcon />
                    </Box>
                  </Button>
                  <Button appearance="link" spacing="none" style={{ marginRight: "17px" }}>
                    <Box d="flex" align="center">
                      <Spacing m={{r: "4px"}}>
                        3
                      </Spacing>
                      <NotificationIcon />
                    </Box>
                  </Button>
                  <Button appearance="link" spacing="none">
                    <Box d="flex" align="center">
                      <Spacing m={{r: "4px"}}>
                        6
                      </Spacing>
                      <AttachmentIcon />
                    </Box>
                  </Button>
              </Box>
            )
          },
          {
            key: "actions",
            content: (
            <div align="center">
              <Button
                onClick={() => {
                  setCurrentConnection(item)
                  setIsConfirmModalOpen(true)
                }}
              >
                Confirm
              </Button>
            </div>
            )
          }
        ]
      }
    ))
)