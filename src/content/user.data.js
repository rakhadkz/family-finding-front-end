import Button from "@atlaskit/button";

const userTableData = (data, history) => {
  console.log("IT IS FUKKING DATA: ", data);
  const isArray = Array.isArray(data);
  data = isArray ? data : (data = [data]);
  return data.map((item, index) => {
    var full_name = item.first_name + " " + item.last_name;
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
            <p>{item.organization.name}</p>
          )),
        },
        {
          key: "role",
          content: item.user_organizations?.map((item) => (
            <p>{role_label(item.role)}</p>
          )),
        },
      ],
    };
  });
};

const role_label = (role) => {
  switch (role) {
    case "super_admin":
      return "Super admin";
    case "admin":
      return "Organization admin";
    case "manager":
      return "Organization manager";
    default:
      return "Organization user";
  }
};

export { userTableData };
