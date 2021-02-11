import Button from "@atlaskit/button"
import { createConnectionAttachmentRequest } from "../../../../api/attachments/attachmentRequest"
import { getLocalStorageUser } from "../../../../context/auth/authProvider"
import { Box, Spacing } from "../../../ui/atoms"
import { ModalDialog } from "../../../ui/common"
import { Table } from "../../../ui/common/Table"
import FilePicker from "../Attachments/FilePicker"
import DocumentIcon from "@atlaskit/icon/glyph/document";
import { useContext, useState } from "react"
import { ConnectionContext } from "./ConnectionModal"
import { head } from "../../../../content/connectionAttachment.data"

export const AttachmentsTab = ({ connection }) => {
  const { attachmentState: { attachments, loading }, fetchAttachments } = useContext(ConnectionContext)
  const user_id = getLocalStorageUser().id;
  const [ isOpen, setIsOpen ] = useState(false);
  const [ shouldCloseOnEscapePress, setShouldCloseOnEscapePress ] = useState(true)
  const [ shouldCloseOnOverlayClick, setShouldCloseOnOverlayClick ] = useState(true)

  const onSubmit = async (attachment_id) => {
    await createConnectionAttachmentRequest({
      "connection_attachment": {
        "child_contact_id": connection.id,
        "attachment_id": attachment_id
      }
    })
  }

  const setClosable = (bool) => {
    setShouldCloseOnEscapePress(bool)
    setShouldCloseOnOverlayClick(bool)
  }

  return (
    <div>
      <Spacing m={{ t: "23px" }}>
        <Box w="100%" d="flex" direction="row-reverse">
          <Button appearance="primary" iconBefore={<DocumentIcon />} onClick={() => setIsOpen(true)}>
            Upload New File
          </Button>
          <ModalDialog
            shouldCloseOnEscapePress={shouldCloseOnEscapePress}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            width="small"
            hasActions={false}
            body={<FilePicker user_id={user_id} setIsOpen={setIsOpen} fetchAttachments={fetchAttachments} setClosable={setClosable} onSubmit={onSubmit}/>}
            />
        </Box>
      </Spacing>
      <Spacing m={{ t: "23px" }}>
        <Table
          head={head}
          items={attachments}
          pending={loading}
        />
      </Spacing>
    </div>
  )
}
