import Button from "@atlaskit/button";

const organizationTableData = (data, setId) => {
  const isArray = Array.isArray(data);
  data = isArray ? data : (data = [data]);
  return data.map((item, index) => ({
    key: index,
    cells: [
      {
        key: "name",
        content: !isArray ? (
          item.name
        ) : (
          <Button
            onClick={() => setId(item.id)}
            appearance="link"
            spacing="none"
          >
            {item.name}
          </Button>
        ),
      },
      {
        key: "address",
        content: item.address,
      },
      {
        key: "city",
        content: item.city,
      },
      {
        key: "state",
        content: item.state,
      },
      {
        key: "zip",
        content: item.zip,
      },
    ],
  }));
};

export { organizationTableData };
