import Button from "@atlaskit/button";

const userTableData = (data, isConcreteUser = false, history) => {
  if (isConcreteUser) data = [data];
  return data.map(function (item, index) {
    var full_name = item.first_name + " " + item.last_name;
    return {
      key: index,
      cells: [
        {
          key: "name",
          content: isConcreteUser ? (
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
          content: item.organization?.name,
        },
        {
          key: "role",
          content: item.role,
        },
      ],
    };
  });
};

export { userTableData };
