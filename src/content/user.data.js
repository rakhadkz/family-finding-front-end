import { useHistory } from "react-router-dom";

const userTableData = (data, isConcreteUser = false, history) => {
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
            <a onClick={() => history.push("/users/" + item.id)}>{full_name}</a>
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
