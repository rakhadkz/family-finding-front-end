import { Box } from "../components/ui/atoms";
import Avatar from "@atlaskit/avatar";

const actionItemTableData = (data) => {
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
        {
          key: "user",
          content: item.user.role,
        },
        {
          key: "child",
          content: (
            <Box d="flex" align="center">
              <Avatar
                appearance="circle"
                src={item.child.avatar}
                size="medium"
              />
              <a href="" style={{ marginLeft: "8px" }}>
                {item.child.first_name + " " + item.child.last_name}
              </a>
            </Box>
          ),
        },
        {
          key: "status",
          content: item.status,
        },
        {
          key: "resolve",
          content: "Resolve",
        },
      ],
    };
  });
};

export { actionItemTableData };
