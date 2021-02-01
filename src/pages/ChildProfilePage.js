import AvatarGroup from "@atlaskit/avatar-group";
import Button from "@atlaskit/button";
import "@atlaskit/css-reset";
import EmailIcon from "@atlaskit/icon/glyph/email";
import MentionIcon from "@atlaskit/icon/glyph/mention";
import MobileIcon from "@atlaskit/icon/glyph/mobile";
import NotificationIcon from "@atlaskit/icon/glyph/notification-direct";
import WatchIcon from "@atlaskit/icon/glyph/watch";
import Select from "@atlaskit/select";
import { Text } from "@chakra-ui/react";
import React, { memo, useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { createActionItemRequest } from "../api/actionItems/actionItemRequest";
import {
  createChildUserRequest,
  fetchChildrenRequest,
  fetchChildUsersRequest,
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
import { Box, Label, Spacing, Title } from "../components/ui/atoms";
import { ModalDialog } from "../components/ui/common";
import { MyBreadcrumbs } from "../components/ui/common/MyBreadcrumbs";
import { getLocalStorageUser } from "../context/auth/authProvider";
import { CHILDREN } from "../helpers";
import { AddChildForm } from "../components/Children";
import { updateChild } from "../context/children/childProvider";
import Tag from '@atlaskit/tag';
import TagGroup from '@atlaskit/tag-group';
import childReducer, { ACTIONS, initialState } from "../reducers/child.reducer";
import { Preloader } from "./Preloader";

export default function ChildProfilePage(props){
  const id = props.match.params.id;
  const user = getLocalStorageUser();
  const [templates, setTemplates] = useState([]);
  const [templateType, setTemplateType] = useState("");
  const [templatePending, setTemplatePending] = useState(false);
  const [templateHtml, setTemplateHtml] = useState("");
  const [templatePreview, setTemplatePreview] = useState("");
  const [templateUser, setTemplateUser] = useState();
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [assignedUsers, setAssignedUsers] = useState(null);
  const [validationState, setValidationState] = useState("default");
  const [buttonPending, setButtonPending] = useState(false);
  const [ isOpenEdit, setIsOpenEdit ] = useState(false);
  const history = useHistory();

  const [state, dispatch] = useReducer(childReducer, initialState)

  useEffect(() => {
    dispatch({ type: ACTIONS.FETCH_CHILD_REQUEST })
    fetchChildProfile();
    fetchTemplates();
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

  const fetchChildUsers = () => {
    fetchChildUsersRequest({ id: id }).then(
      (item) => 
        item && dispatch(
          { 
            type: ACTIONS.FETCH_CHILD_USERS_SUCCESS,
            payload: {
              child_users: item.child_users,
              not_child_users: item.not_child_users
            }
          })
    ).catch((e) => dispatch({ type: ACTIONS.FETCH_CHILD_USERS_FAILURE, payload: e.message}));
  }
  
  useEffect(() => {
    const text = templateHtml
      .replaceAll("{{child_name}}", `${state.child?.first_name} ${state.child?.last_name}`)
      .replaceAll(
        "{{contact_name}}",
        `${templateUser?.contact?.first_name} ${templateUser?.contact?.last_name}`
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
      .then((item) => 
        item && dispatch({ type: ACTIONS.FETCH_CHILD_SUCCESS, payload: item })
      )
      .catch((e) => 
        dispatch({ type: ACTIONS.FETCH_CHILD_FAILURE, payload: e.message})  
      );
  }

  const sendTemplateToUser = async () => {
    let content = templatePreview;
    const body = {
      email: templateUser?.contact?.email,
      content: content,
      template_type: templateType,
      phone: templateUser?.contact?.phone,
    };
    console.log(body);

    setTemplatePending(true);
    await sendCommunicationTemplateToUserRequest({ template_send: body })
      .then(() =>
        toast.success("Successfully sent!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )
      .catch(() =>
        toast.error("Happened error!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )
      .finally(() => {
        setTemplatePending(false);
        setIsTemplateOpen(false);
        setTemplateHtml("");
        setTemplateUser();
      });
  };

  const onSubmitUsers = async () => {
    !assignedUsers && setValidationState("error");
    setButtonPending(true);
    if (assignedUsers){
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
    }else{
      setButtonPending(false)
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
      })
        .then(() => history.goBack());
  };

  const removeUser = (id) => {
    removeChildUserRequest(id).then(async() => await fetchChildUsers()).catch(e => console.log(e))
  }

  return (
    <>
      {state.loading ? (
        <Preloader/>
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
              <div style={{padding: "30px"}}>
                <AddChildForm onSubmit={updateChild} setIsOpenEdit={setIsOpenEdit} child={state.child} fetch={fetchChildProfile}/>
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
                          {state.child_users?.map(user => (
                          <Tag 
                            appearance="rounded" 
                            text={user.name}
                            onBeforeRemoveAction={() => {
                              removeUser(user.id)
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
            <ChildInformation child={state.child} setIsOpenEdit={setIsOpenEdit}/>
          </Spacing>
          <Spacing m={{ t: "22px" }}>
            <RelativesList relatives={state.child.contacts || []} />
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
            onClick={sendTemplateToUser}
            heading="Choose Template"
            positiveLabel="Send"
            isLoading={templatePending}
            isDisabled={!templateUser || templateHtml === ""}
            body={
              <div>
                <Spacing m="10px 0px">
                  <Select
                    className="select"
                    classNamePrefix="react-select"
                    menuPortalTarget={document.body}
                    onChange={({ value }) => setTemplateUser(value)}
                    validationState={validationState}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    options={state.child?.contacts.map((item) => ({
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
            {
              <ChildTabs
                user={user}
                fetchChildProfile={fetchChildProfile}
                {...state.child}
              />
            }
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
    </>
  );
};
