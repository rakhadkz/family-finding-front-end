import AvatarGroup from "@atlaskit/avatar-group";
import Button from "@atlaskit/button";
import "@atlaskit/css-reset";
import EmailIcon from "@atlaskit/icon/glyph/email";
import MentionIcon from "@atlaskit/icon/glyph/mention";
import MobileIcon from "@atlaskit/icon/glyph/mobile";
import NotificationIcon from "@atlaskit/icon/glyph/notification-direct";
import WatchIcon from "@atlaskit/icon/glyph/watch";
import Select from "@atlaskit/select";
import Tag from "@atlaskit/tag";
import TagGroup from "@atlaskit/tag-group";
import { Text } from "@chakra-ui/react";
import React, { memo, useCallback, useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { createActionItemRequest } from "../api/actionItems/actionItemRequest";
import {
  createChildUserRequest,
  fetchChildrenRequest,
  fetchChildUsersRequest,
  fetchConnectionsRequest,
  fetchFamilyTreeRequest,
  removeChildUserRequest
} from "../api/children";
import {
  fetchCommunicationTemplateRequest,
  sendCommunicationTemplateToUserRequest
} from "../api/communicationTemplates";
import {
  ChildInformation,
  ChildTabs,
  RelativesList
} from "../components/ChildProfile";
import { AddChildForm } from "../components/Children";
import { Box, Label, Spacing, Title } from "../components/ui/atoms";
import { ModalDialog } from "../components/ui/common";
import { MyBreadcrumbs } from "../components/ui/common/MyBreadcrumbs";
import { constructTree } from "../content/childContact.tree.data";
import { getLocalStorageUser } from "../context/auth/authProvider";
import { updateChild } from "../context/children/childProvider";
import { CHILDREN } from "../helpers";
import {
  childProfileReducer,
  fetchChildFailure,
  fetchChildRequest,
  fetchChildSuccess,
  fetchChildUsersFailure,
  fetchChildUsersSuccess,
  initialState
} from "../reducers/childProfile";
import { 
  commentReducer,
  initialState as commentInitialState,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  fetchCommentsRequest
} from "../reducers/comment";
import { 
  connectionReducer,
  initialState as connectionInitialState,
  fetchConnectionsFailure,
  fetchConnectionsSuccess,
} from "../reducers/connection";
import { 
  familyTreeReducer,
  initialState as familyTreeInitialState,
  fetchFamilyTreeFailure,
  fetchFamilyTreeSuccess,
} from "../reducers/familyTree";
import { 
  attachmentReducer,
  initialState as attachmentInitialState,
  fetchAttachmentsRequest,
  fetchAttachmentsFailure,
  fetchAttachmentsSuccess,
} from "../reducers/attachment";
import { Preloader } from "./Preloader";

export const ChildContext = React.createContext();

export function ChildProfilePage(props) {
  const id = props.match.params.id;
  const user = getLocalStorageUser();
  const [templates, setTemplates] = useState([]);
  const [templateType, setTemplateType] = useState("");
  const [templatePending, setTemplatePending] = useState(false);
  const [templateHtml, setTemplateHtml] = useState("");
  const [templatePreview, setTemplatePreview] = useState("");
  const [templateUser, setTemplateUser] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [assignedUsers, setAssignedUsers] = useState(null);
  const [validationState, setValidationState] = useState("default");
  const [buttonPending, setButtonPending] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const history = useHistory();

  const [ state, dispatch ] = useReducer(childProfileReducer, initialState);
  const [ connectionState, connectionDispatch ] = useReducer(connectionReducer, connectionInitialState)
  const [ familyTreeState, familyTreeDispatch ] = useReducer(familyTreeReducer, familyTreeInitialState)
  const [ commentState, commentDispatch ] = useReducer(commentReducer, commentInitialState)
  const [ attachmentState, attachmentDispatch ] = useReducer(attachmentReducer, attachmentInitialState)

  useEffect(() => {
    dispatch(fetchChildRequest());
    fetchChildProfile();
    fetchConnections();
    fetchFamilyTree();
    fetchTemplates();
    fetchComments();
    fetchAttachments();
    (user.role === "admin" || user.role === "manager") && fetchChildUsers();
  }, []);

  useEffect(() => {
    setTemplateHtml("");
    setTemplatePreview("");
    setFilteredTemplates(
      templates
        .filter((item) => item.template_type === templateType)
        .map((item) => ({
          value: item.content,
          label: `${item.name} - ${item.template_type}`,
        }))
    );
  }, [templateType]);

  useEffect(() => {
    console.log("TEmplate User", templateUser);
    const firstUser = templateUser && templateUser[0]?.value;
    const text = templateHtml
      .replaceAll(
        "{{child_name}}",
        `${state.child?.first_name} ${state.child?.last_name}`
      )
      .replaceAll(
        "{{contact_name}}",
        `${firstUser?.contact?.first_name} ${firstUser?.contact?.last_name}`
      )
      .replaceAll(
        "{{orgranization_name}}",
        localStorage.getItem("organizationName")
      );
    setTemplatePreview(text);
  }, [templateHtml, templateUser, state.child]);

  const fetchTemplates = () => {
    fetchCommunicationTemplateRequest().then((data) => {
      setTemplates(data);
    });
  };

  const fetchChildProfile = () => {
    fetchChildrenRequest({ id: id, view: "extended" })
      .then((item) => item && dispatch(fetchChildSuccess(item)))
      .catch((e) => dispatch(fetchChildFailure(e.message)));
  };

  const fetchChildUsers = useCallback(() => {
    fetchChildUsersRequest({ id: id })
      .then(
        (item) =>
          item &&
          dispatch(
            fetchChildUsersSuccess({
              child_users: item.child_users,
              not_child_users: item.not_child_users,
            })
          )
      )
      .catch((e) => dispatch(fetchChildUsersFailure(e.message)));
  }, [id])

  const fetchConnections = () => {
    fetchConnectionsRequest({ id: id })
      .then(item => item && item.contacts && connectionDispatch(fetchConnectionsSuccess(item.contacts)))
      .catch(e => connectionDispatch(fetchConnectionsFailure(e.message)))
  }

  const fetchFamilyTree = () => {
    fetchFamilyTreeRequest({ id: id })
      .then(item => item && item.family_tree && familyTreeDispatch(fetchFamilyTreeSuccess({
        family_tree: item.family_tree,
        constructed_tree: constructTree({contacts: item.family_tree, firstName: item.first_name, lastName: item.last_name })
      })))
      .catch(e => familyTreeDispatch(fetchFamilyTreeFailure(e.message)))
  }

  const fetchComments = () => {
    commentDispatch(fetchCommentsRequest())
    fetchChildrenRequest({ id: id, view: "comments" })
      .then(data => data && data.comments && commentDispatch(fetchCommentsSuccess(data.comments)))
      .catch(e => commentDispatch(fetchCommentsFailure(e.message)))
  }

  const fetchAttachments = () => {
    attachmentDispatch(fetchAttachmentsRequest())
    fetchChildrenRequest({ id, view: "attachments" })
      .then(data => data && data.attachments && attachmentDispatch(fetchAttachmentsSuccess(data.attachments)))
      .catch(e => attachmentDispatch(fetchAttachmentsFailure(e.message)))
  }

  const handleTemplateSendSubmit = async () => {
    let promises = [];
    for (let i = 0; i < templateUser?.length; i++) {
      const user = templateUser && templateUser[i]?.value;
      if (user) {
      }
      promises.push(sendTemplateToUser(user));
    }

    Promise.all(promises)
      .then(() => {
        console.log("AHHAHAHAHAH");
        toast.success("Successfully sent!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(() => {
        console.log("ERROR");
        toast.error("Happened error!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .finally(() => {
        setTemplatePending(false);
        setIsTemplateOpen(false);
        setTemplateHtml("");
        setTemplateUser();
      });
  };

  const sendTemplateToUser = async (user) => {
    let content = templatePreview;
    const body = {
      email: user?.contact?.email,
      content: content,
      template_type: templateType,
      phone: user?.contact?.phone,
    };
    console.log(body);

    setTemplatePending(true);
    await sendCommunicationTemplateToUserRequest({ template_send: body });
  };

  const onSubmitUsers = async () => {
    !assignedUsers && setValidationState("error");
    setButtonPending(true);
    if (assignedUsers) {
      await createChildUserRequest({
        user_child: {
          users: assignedUsers.map((item) => ({
            user_id: item.value,
            child_id: state.child.id,
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
            child_id: state.child.id,
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
    } else {
      setButtonPending(false);
    }
  };

  const openModal = () => {
    setAssignedUsers(null);
    setIsOpen(true);
  };

  const AssignedUser = memo(({ data }) => (
    <AvatarGroup appearance="stack" data={data} />
  ));

  const assignUser = () => {
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
          title: "Child Permission Request",
          description: `${user.first_name} ${user.last_name} has requested access for ${state.child.first_name} ${state.child.last_name}`,
          child_id: id,
          related_user_id: user.id,
          action_type: "access_request",
        },
      }).then(() => history.goBack());
  };

  const removeUser = (id) => {
    removeChildUserRequest(id)
      .then(async () => await fetchChildUsers())
      .catch((e) => console.log(e));
  };

  return (
    <ChildContext.Provider value={{ 
      state,
      commentState,
      connectionState,
      attachmentState,
      familyTreeState,
      dispatch,
      connectionDispatch,
      attachmentDispatch,
      fetchConnections,
      fetchFamilyTree,
      fetchComments,
      fetchAttachments
    }}>
      {state.loading ? (
        <Preloader />
      ) : state.hasAccess ? (
        <>
          <ModalDialog
            isOpen={isOpenEdit}
            setIsOpen={setIsOpenEdit}
            width="medium"
            hasActions={false}
            shouldCloseOnEscapePress={false}
            shouldCloseOnOverlayClick={false}
            body={
              <div style={{ padding: "30px" }}>
                <AddChildForm
                  onSubmit={updateChild}
                  setIsOpenEdit={setIsOpenEdit}
                  child={state.child}
                  fetch={fetchChildProfile}
                />
              </div>
            }
          />
          <Box d="flex" justify="space-between">
            <Title>{`${state.child.first_name} ${state.child.last_name}`}</Title>
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
                        <>
                          <TagGroup>
                            {state.child_users?.map((user) => (
                              <Tag
                                appearance="rounded"
                                text={user.name}
                                onBeforeRemoveAction={() => {
                                  removeUser(user.id);
                                  return false;
                                }}
                              />
                            ))}
                          </TagGroup>
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
                            options={state.not_child_users}
                            placeholder="Choose a User(s)"
                          />
                        </>
                      }
                    />
                  </Spacing>
                  <AssignedUser data={state.child_users || []} />
                </Box>
              </>
            )}
          </Box>
          <Spacing m={{ t: "28px" }}>
            <MyBreadcrumbs
              text1="Children"
              text2={`${state.child.first_name} ${state.child.last_name}`}
              path={`../${CHILDREN}`}
            />
          </Spacing>
          <Spacing m={{ t: "22px" }}>
            <ChildInformation
              child={state.child}
              setIsOpenEdit={setIsOpenEdit}
            />
          </Spacing>
          <Spacing m={{ t: "22px" }}>
            <RelativesList relatives={connectionState.connections || []} />
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
            onClick={handleTemplateSendSubmit}
            heading="Choose Template"
            positiveLabel="Send"
            isLoading={templatePending}
            isDisabled={!templateUser || templateHtml === ""}
            body={
              <div>
                <Spacing m="10px 0px">
                  <Select
                    className="multi-select"
                    classNamePrefix="react-select"
                    menuPortalTarget={document.body}
                    onChange={(e) => setTemplateUser(e)}
                    isMulti
                    value={templateUser}
                    validationState={validationState}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    options={connectionState.connections.map((item) => ({
                      label: `${item?.contact?.first_name} ${item?.contact?.last_name}`,
                      value: item,
                    }))}
                    placeholder="Choose contact"
                  />
                </Spacing>
                <Select
                  className="select"
                  classNamePrefix="react-select"
                  menuPortalTarget={document.body}
                  onChange={(e) => {
                    console.log("EEE", e, state.child);
                    setTemplateHtml(
                      templateType === "SMS"
                        ? e.value.replace(/<(?:.|\n)*?>/gm, "")
                        : e.value
                    );
                    setValidationState("default");
                  }}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  options={filteredTemplates}
                  placeholder="Choose Template"
                />

                <Spacing style={{ marginTop: 15, marginBottom: 15 }}>
                  <Label>Template Preview</Label>
                </Spacing>
                <Text
                  style={{ paddingLeft: 10, paddingRight: 10 }}
                  dangerouslySetInnerHTML={{ __html: templatePreview }}
                />
                {/* <Spacing m={{ t: "20px" }}>
                  {dynamicVariables.map((variable) => {
                    const inputName = variable.substring(
                      2,
                      variable.length - 2
                    );
                    return (
                      <TextInput
                        className="input"
                        width={350}
                        name={inputName}
                        register={register({ required: false })}
                        control={control}
                        error={errors[inputName]}
                        label={inputName}
                      />
                    );
                  })}
                </Spacing> */}
              </div>
            }
          />
          <Spacing m={{ t: "40px" }}>
            <ChildTabs />
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
          {state.child.first_name ? (
            <>
              <h4 style={{ marginBottom: "10px" }}>
                You do not have access to view this child's profile
              </h4>
              <Box>
                {!state.child.request_pending ? (
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
              <h4 style={{ marginBottom: "10px" }}>Child not found</h4>
              <Button onClick={() => history.goBack()} appearance="subtle-link">
                Go back
              </Button>
            </>
          )}
        </div>
      )}
    </ChildContext.Provider>
  );
}
