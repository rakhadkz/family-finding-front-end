import Avatar from "@atlaskit/avatar";
import Button from "@atlaskit/button";
import { Box } from "../components/ui/atoms";

const childTableData = (data, history) =>
  data.map((item, index) => ({
    key: index,
    cells: [
      {
        key: "full_name",
        content: (
          <Box d="flex" align="center">
            <Avatar appearance="circle" src={item.avatar} size="medium" />
            <Button
              style={{ marginLeft: "8px" }}
              onClick={() => history.push("/children/" + item.id)}
              appearance="link"
              spacing="none"
            >
              {item.full_name}
            </Button>
          </Box>
        ),
      },
      {
        key: "permanency_goal",
        content: <p align="center">{item.permanency_goal}</p>,
      },
      {
        key: "continuous_search",
        content: <p align="center">{item.continuous_search}</p>,
      },
      {
        key: "days_in_system",
        content: <p align="center">{item.days_in_system}</p>,
      },
      {
        key: "relatives",
        content: <p align="center">{item.relatives}</p>,
      },
      {
        key: "matches",
        content: <p align="center">{item.matches}</p>,
      },
    ],
  }));

export { childTableData };
