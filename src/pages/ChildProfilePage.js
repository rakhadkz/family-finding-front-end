import AvatarGroup from "@atlaskit/avatar-group";
import Button from "@atlaskit/button";
import "@atlaskit/css-reset";
import EmailIcon from "@atlaskit/icon/glyph/email";
import MentionIcon from "@atlaskit/icon/glyph/mention";
import MobileIcon from "@atlaskit/icon/glyph/mobile";
import NotificationIcon from "@atlaskit/icon/glyph/notification-direct";
import WatchIcon from "@atlaskit/icon/glyph/watch";
import Select from "@atlaskit/select";
import Spinner from "@atlaskit/spinner";
import { Text } from "@chakra-ui/react";
import React, { memo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createActionItemRequest } from "../api/actionItems/actionItemRequest";
import {
  createChildUserRequest,
  fetchChildrenRequest,
  fetchChildUsersRequest
} from "../api/children";
import { fetchCommunicationTemplateRequest } from "../api/communicationTemplates";
import {
  ChildInformation,
  ChildTabs,
  RelativesList
} from "../components/ChildProfile";
import { Box, Label, Spacing, Title } from "../components/ui/atoms";
import { ModalDialog } from "../components/ui/common";
import { MyBreadcrumbs } from "../components/ui/common/MyBreadcrumbs";
import { getLocalStorageUser } from "../context/auth/authProvider";
import { CHILDREN } from "../helpers";

export const ChildProfilePage = (props) => {
  const id = props.match.params.id;
  const user = getLocalStorageUser();
  const [child, setChild] = useState({});
  const [users, setUsers] = useState({});
  const [templates, setTemplates] = useState([]);
  const [templateType, setTemplateType] = useState("");
  const [templateHtml, setTemplateHtml] = useState("");
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [assignedUsers, setAssignedUsers] = useState(null);
  const [validationState, setValidationState] = useState("default");
  const [buttonPending, setButtonPending] = useState(false);
  const [hasAccess, setAccess] = useState(false);
  const [pending, setPending] = useState(true);
  const history = useHistory();

  useEffect(() => {
    fetchChildProfile();
    fetchTemplates();
    (user.role === "admin" || user.role === "manager") && fetchChildUsers();
  }, []);

  useEffect(() => {
    setTemplateHtml('')
    setFilteredTemplates(
      templates
        .filter((item) => item.template_type === templateType)
        .map((item) => ({
          value: item.content,
          label: `${item.name} - ${item.template_type}`,
        }))
    );
  }, [templateType]);

  const fetchChildUsers = async () => {
    await fetchChildUsersRequest({ id: id }).then(
      (item) =>
        item &&
        setUsers({
          child_users: item.child_users.map((user) => ({
            email: user.email,
            key: user.id,
            name: `${user.first_name} ${user.last_name}`,
            href: "#",
          })),
          not_child_users: item.not_child_users.map((user) => ({
            label: `${user.first_name} ${user.last_name}`,
            value: user.id,
          })),
        })
    );
  };

  const fetchTemplates = async () => {
    await fetchCommunicationTemplateRequest().then((data) => {
      setTemplates(data);
    });
  };

  const fetchChildProfile = () => {
    fetchChildrenRequest({ id: id, view: "extended" })
      .then((item) => {
        if (item) {
          item.id ? setAccess(true) : setAccess(false);
          setChild(item);
        }
      })
      .catch(() => setAccess(false))
      .finally(() => setPending(false));
  };

  const onSubmitUsers = async () => {
    !assignedUsers && setValidationState("error");
    setButtonPending(true);
    await createChildUserRequest({
      user_child: {
        users: assignedUsers.map((item) => ({
          user_id: item.value,
          child_id: child.id,
          date_approved: new Date(),
          date_denied: null,
        })),
      },
    });
    await createActionItemRequest({
      action_item: {
        items: assignedUsers.map((item) => ({
          title: "Access granted",
          description: `You have been assigned to a child`,
          child_id: child.id,
          user_id: item.value,
          action_type: "access_granted",
        })),
      },
    })
      .then(() => fetchChildUsers())
      .finally(() => {
        setButtonPending(false);
        setIsOpen(false);
      });
  };

  const openModal = () => {
    setAssignedUsers(null);
    setIsOpen(true);
  };

  const AssignedUser = memo(({ data }) => (
    <AvatarGroup appearance="stack" data={data} />
  ));

  const assignUser = () => {
    setPending(true);
    user?.role === "user" &&
      createChildUserRequest({
        user_child: {
          users: [
            {
              user_id: user.id,
              child_id: id,
            },
          ],
        },
      }) &&
      createActionItemRequest({
        action_item: {
          title: "User Assign",
          description: `${user.first_name} ${user.last_name} has requested access for ${child.first_name} ${child.last_name}`,
          child_id: id,
          related_user_id: user.id,
          action_type: "access_request",
        },
      })
        .then(() => history.goBack())
        .finally(() => setPending(false));
  };

  return (
    <>
      {pending ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spinner size="large" />
        </div>
      ) : hasAccess ? (
        <>
          <Box d="flex" justify="space-between">
            <Title>{`${child.first_name} ${child.last_name}`}</Title>
            {user?.role !== "user" && (
              <>
                <Box d="flex">
                  <Button
                    appearance="primary"
                    iconBefore={<NotificationIcon />}
                  >
                    Set Reminder
                  </Button>
                  <Spacing m="0px 10px">
                    <Button
                      appearance="primary"
                      iconBefore={<WatchIcon />}
                      onClick={() => openModal()}
                    >
                      Assign
                    </Button>
                    <ModalDialog
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      heading="Assign a User"
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
                            setAssignedUsers(e);
                            setValidationState("default");
                          }}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          }}
                          options={users.not_child_users}
                          placeholder="Choose a User(s)"
                        />
                      }
                    />
                  </Spacing>
                  <AssignedUser data={users.child_users || []} />
                </Box>
              </>
            )}
          </Box>
          <Spacing m={{ t: "28px" }}>
            <MyBreadcrumbs
              text1="Children"
              text2={`${child.first_name} ${child.last_name}`}
              path={`../${CHILDREN}`}
            />
          </Spacing>
          <Spacing m={{ t: "22px" }}>
            <ChildInformation child={child} />
          </Spacing>
          <Spacing m={{ t: "22px" }}>
            <RelativesList relatives={child.contacts || []} />
          </Spacing>
          <Spacing m={{ t: "16px" }}>
            <Box d="flex">
              <Button
                onClick={() => {
                  setTemplateType("Letter");
                  setIsTemplateOpen(true);
                }}
                iconBefore={<EmailIcon />}
                isSelected
              >
                Generate Letter
              </Button>
              <Spacing m="0px 10px">
                <Button
                  onClick={() => {
                    setTemplateType("Email");
                    setIsTemplateOpen(true);
                  }}
                  iconBefore={<MentionIcon />}
                  isSelected
                >
                  Send Email
                </Button>
              </Spacing>
              <Button
                onClick={() => {
                  setTemplateType("SMS");
                  setIsTemplateOpen(true);
                }}
                iconBefore={<MobileIcon />}
                isSelected
              >
                Send SMS Text
              </Button>
            </Box>
          </Spacing>
          <ModalDialog
            isOpen={isTemplateOpen}
            setIsOpen={setIsTemplateOpen}
            heading="Choose Template"
            positiveLabel="Send"
            width="small"
            body={
              <div>
                <Select
                  className="select"
                  classNamePrefix="react-select"
                  menuPortalTarget={document.body}
                  value={assignedUsers}
                  validationState={validationState}
                  onChange={(e) => {
                    console.log("EEE", e);
                    setTemplateHtml(e.value);
                    setValidationState("default");
                  }}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  options={filteredTemplates}
                  placeholder="Choose Template"
                />
                <Spacing style={{ marginBottom: -15, marginTop: 10 }}>
                  <Label>Template Text</Label>
                </Spacing>
                <Text
                  style={{ paddingLeft: 10, paddingRight: 10 }}
                  dangerouslySetInnerHTML={{ __html: templateHtml }}
                ></Text>
              </div>
            }
          />
          <Spacing m={{ t: "40px" }}>
            {<ChildTabs user={user} {...child} />}
          </Spacing>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {child.first_name ? (
            <>
              <h4 style={{ marginBottom: "10px" }}>
                You do not have access to view this child's profile
              </h4>
              <Box>
                {!child.request_pending ? (
                  <Button onClick={() => assignUser()} appearance="primary">
                    Request access
                  </Button>
                ) : (
                  <Button isDisabled>Request pending</Button>
                )}
                <Button
                  onClick={() => history.goBack()}
                  appearance="subtle-link"
                >
                  Go back
                </Button>
              </Box>
            </>
          ) : (
            <>
              <h4 style={{ marginBottom: "10px" }}>Child Not Found</h4>
              <Button onClick={() => history.goBack()} appearance="subtle-link">
                Go back
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
};
