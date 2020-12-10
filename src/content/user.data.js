import Button, { LoadingButton } from "@atlaskit/button";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import { GroupAccess } from "../components/common";
import { role_label } from "./sample.data";

const userTableData = (data, history, user, setIsOpen, setCurrentUser) => {
  const isArray = Array.isArray(data);
  data = isArray ? data : (data = [data]);
  return data.map((item, index) => {
    var full_name = item?.first_name + " " + item?.last_name;
    return {
      key: index,
      cells: [
        {
          key: "name",
          content: !isArray ? (
            full_name
          ) : (
            <Button
              onClick={() => history.push("/users/" + item.id)}
              appearance="link"
              spacing="none"
            >
              {full_name}
            </Button>
          ),
        },
        {
          key: "email",
          content: item.email,
        },
        {
          key: "phone",
          content: item.phone,
        },
        {
          key: "organization",
          content: item.user_organizations?.map((item) => (
            <p>{item.organization?.name}</p>
          )),
        },
        {
          key: "role",
          content: item.user_organizations?.map((item) => (
            <p>{role_label(item.role)}</p>
          )),
        },
        {
          key: "actions",
          content: (
            <GroupAccess atLeast="admin" exact="super_admin">
              <LoadingButton
                isDisabled={user?.id === item.id ? true : false}
                onClick={() => {
                  setIsOpen(true);
                  setCurrentUser(item.id);
                }}
                height="32px"
                width="32px"
              >
                <CrossIcon size="small" />
              </LoadingButton>
            </GroupAccess>
          ),
        },
      ],
    };
  });
};

export { userTableData };
