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
        content: item.permanency_goal,
      },
      {
        key: "continuous_search",
        content: item.continuous_search,
      },
      {
        key: "days_in_system",
        content: item.days_in_system,
      },
      {
        key: "relatives",
        content: item.relatives,
      },
      {
        key: "matches",
        content: item.matches,
      },
    ],
  }));

export { childTableData };
