import { Box } from "../components/ui/atoms";
import Avatar from "@atlaskit/avatar";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import Button, { LoadingButton } from "@atlaskit/button";
import { useState } from "react";
import { ModalDialog } from "../components/ui/common";
import { deleteActionItem } from "../context/actionItems/actionItemProvider";
import { approveChildUserRequest, denyChildUserRequest } from "../api/children";
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import { createActionItemRequest } from "../api/actionItems";

const actionItemTableData = (data, setRefresh) => {
  console.log(data)
  return data.map(function (item, index) {
    return {
      key: index,
      cells: [
        {
          key: "title",
          content: item.title,
        },
        {
          key: "description",
          content: item.description,
        },
        item.child ? {
          key: "child",
          content: (
            <Box d="flex" align="center">
              <Avatar
                appearance="circle"
                // src={/*item.child.avatar*/}
                size="medium"
              />
              <a href={`children/${item.child.id}#comments`} style={{ marginLeft: "8px" }}>
                {item.child.first_name + " " + item.child.last_name}
              </a>
            </Box>
          ),
        } : {          
          key: "child",
          content: ""
        },
        {
          key: "resolve",
          content: <Action type={item.action_type} id={item.id} setRefresh={setRefresh} user_id={item.related_user_id} child_id={item.child_id}/>,
        },
      ],
    };
  });
};

const Action = ({type, id, setRefresh, user_id, child_id}) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const onDelete = (id) => {
    deleteActionItem(id).then(() => setRefresh(prev => !prev)).finally(() => setIsOpen(false));
  };

  const onApprove = async(id, user_id, child_id) => {
    await deleteActionItem(id);
    await approveChildUserRequest(user_id, child_id);
    await createActionItemRequest({
      "action_item": {
        "title": "Access granted",
        "description": `You have been assigned to a child`,
        "child_id": child_id,
        "user_id": user_id,
        "action_type": "access_granted"
      }
    }).then(() => setRefresh(prev => !prev)).finally(() => setIsOpen(false));
  }

  const onDeny = async (id, user_id, child_id) => {
    await deleteActionItem(id);
    await denyChildUserRequest(user_id, child_id);
    await createActionItemRequest({
      "action_item": {
        "title": "Access denied",
        "description": `Your request has been denied`,
        "child_id": child_id,
        "user_id": user_id,
        "action_type": "access_denied"
      }
    }).then(() => setRefresh(prev => !prev)).finally(() => setIsOpen(false));
  }
  switch(type) {
    case "mention":
    case "access_granted":
    case "access_denied":
      return (<>
          <LoadingButton
            isDisabled={false}
            onClick={() => setIsOpen(true)}
            height="32px"
            width="32px"
          >
            <CrossIcon size="small" />
          </LoadingButton>
          <ModalDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClick={() => onDelete(id)}
            positiveLabel="Delete"
            heading="Are you sure you want to remove this action?"
            body="You will no longer have access to this item"
            appearance="danger"
          />
        </>
      )
    case "access_request":
      return (
        <>
          <Button iconBefore={<CheckCircleIcon/>} onClick={() => onApprove(id, user_id, child_id)} style={{marginRight: "10px"}}>
            Approve
          </Button>
          <Button iconBefore={<CrossCircleIcon/>} onClick={() => onDeny(id, user_id, child_id)}>
            Deny
          </Button>
        </>
      )
    default:
      return <div></div>
  }
}

export { actionItemTableData };
