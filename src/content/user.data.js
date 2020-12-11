import Button, { LoadingButton } from "@atlaskit/button";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import { GroupAccess } from "../components/common";
import { role_label } from "./sample.data";

const userTableData = (data, history, user, setIsOpen, setCurrentUser) => {
  const isArray = Array.isArray(data);
  data = isArray ? data : (data = [data]);
  return data.map((item, index) => {
    var full_name = item?.first_name + " " + item?.last_name;
    const cells = fetchCells(
      !isArray ? (
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
      item.email,
      item.phone,
      user?.role === "super_admin"
        ? item.user_organizations?.map((item) => (
            <p>{item.organization?.name}</p>
          ))
        : null,
      item.user_organizations?.map((item) => <p>{role_label(item.role)}</p>),
      <GroupAccess atLeast="admin" exact="super_admin">
        <LoadingButton
          isDisabled={user?.id === item.id}
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
    );
    return {
      key: index,
      cells: cells,
    };
  });
};

const fetchCells = (name, email, phone, organization = null, role, action) => {
  const cells1 = [
    {
      key: "name",
      content: name,
    },
    {
      key: "email",
      content: email,
    },
    {
      key: "phone",
      content: phone,
    },
  ];
  organization &&
    cells1.push({
      key: "organization",
      content: organization,
    });
  const cells2 = [
    {
      key: "role",
      content: role,
    },
    {
      key: "actions",
      content: action,
    },
  ];
  return cells1.concat(cells2);
};

export { userTableData };
