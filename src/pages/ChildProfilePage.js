import AvatarGroup from "@atlaskit/avatar-group";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import Button from "@atlaskit/button";
import EmailIcon from "@atlaskit/icon/glyph/email";
import EmojiSymbolsIcon from "@atlaskit/icon/glyph/emoji/symbols";
import MentionIcon from "@atlaskit/icon/glyph/mention";
import MobileIcon from "@atlaskit/icon/glyph/mobile";
import NotificationIcon from "@atlaskit/icon/glyph/notification-direct";
import WatchIcon from "@atlaskit/icon/glyph/watch";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  ChildInformation,
  ChildTabs,
  RelativesList
} from "../components/ChildProfile";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { ModalDialog, Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";
import { fetchChildren } from "../context/children/childProvider";
import { CHILDREN } from "../helpers";
import Select from "@atlaskit/select";
import '@atlaskit/css-reset'
import { createChildUserRequest, fetchChildUsersRequest } from "../api/children";

export const ChildProfilePage = (props) => {
  const history = useHistory();
  const id = props.match.params.id;
  const [child, setChild] = useState({});
  const [ users, setUsers ] = useState({})
  const [ isOpen, setIsOpen ] = useState(false);
  const [ assignedUsers, setAssignedUsers ] = useState(null);
  const [ validationState, setValidationState ] = useState("default");
  const [ buttonPending, setButtonPending ] = useState(false);

  useEffect(() => {
    fetchChildProfile();
    fetchChildUsers();
  }, []);

  const fetchChildUsers = async () => {
    await fetchChildUsersRequest({id: id}).then((item) => item && setUsers(
      { 
        child_users: item.child_users.map(user => (
          {
            email: user.email,
            key: user.id,
            name: `${user.first_name} ${user.last_name}`,
            href: "#"
          }
        )),
        not_child_users: item.not_child_users.map(user => (
          {
            label: `${user.first_name} ${user.last_name}`,
            value: user.id
          }
        ))
      }
    ));
  }

  const fetchChildProfile = async () => {
    console.log("CALLED FETCH PROFILE");
    setChild({})
    await fetchChildren({ id: id, view: "extended" }).then(
      (item) => item && setChild(item)
    );
  };

  const onSubmitUsers = () => {
    !assignedUsers && setValidationState("error")
    setButtonPending(true)
    createChildUserRequest({
      "user_child": {
        "users": assignedUsers.map(item => ({
          "user_id": item.value,
          "child_id": child.id,
          "date_approved": new Date()
        }))
      }
    })
    .then(() => fetchChildUsers())
    .finally(() => {
      setButtonPending(false)
      setIsOpen(false)
    })
  }

  const openModal = () => {
    setAssignedUsers(null)
    setIsOpen(true)
  }

  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Box d="flex" justify="space-between">
        <Title>{`${child.first_name} ${child.last_name}`}</Title>
        <Box d="flex">
          <Button appearance="primary" iconBefore={<NotificationIcon />}>
            Set Reminder
          </Button>
          <Spacing m="0px 10px">
            <Button appearance="primary" iconBefore={<WatchIcon />} onClick={() => openModal()}>
              Assign
            </Button>
            <ModalDialog
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              heading="Assign a user"
              positiveLabel="Assign"
              onClick={() => onSubmitUsers()}
              width="small"
              isLoading={buttonPending}
              body={
                <Select
                  className="multi-select"
                  classNamePrefix="react-select"
                  isMulti
                  menuPortalTarget={document.body}
                  value={assignedUsers}
                  validationState={validationState}
                  onChange={(e) => {
                    setAssignedUsers(e)
                    setValidationState("default");
                  }}
                  styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                  options={users.not_child_users}
                  placeholder="Choose a User(s)"
                />
              }
            />
          </Spacing>
          <AvatarGroup appearance="stack" data={users.child_users || []} />
        </Box>
      </Box>
      <Spacing m={{ t: "28px" }}>
        <Breadcrumbs>
          <BreadcrumbsItem
            iconBefore={
              <Spacing m={{ r: "7px" }}>
                <EmojiSymbolsIcon primaryColor="#2684FF" />
              </Spacing>
            }
            onClick={() => history.push(`../${CHILDREN}`)}
            text="Children"
          />
          <BreadcrumbsItem text={`${child.first_name} ${child.last_name}`} />
        </Breadcrumbs>
      </Spacing>
      <Spacing m={{ t: "22px" }}>
        <ChildInformation child={child} />
      </Spacing>
      <Spacing m={{ t: "22px" }}>
        <RelativesList relatives={child.contacts || []} />
      </Spacing>
      <Spacing m={{ t: "16px" }}>
        <Box d="flex">
          <Button iconBefore={<EmailIcon />} isSelected>
            Generate Letter
          </Button>
          <Spacing m="0px 10px">
            <Button iconBefore={<MentionIcon />} isSelected>
              Send Email
            </Button>
          </Spacing>
          <Button iconBefore={<MobileIcon />} isSelected>
            PlaceCall
          </Button>
        </Box>
      </Spacing>
      <Spacing m={{ t: "40px" }}>
        {<ChildTabs {...child} refreshContacts={fetchChildProfile} />}
      </Spacing>
    </SidebarTemplate>
  );
};
