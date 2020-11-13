const userTableData = (data) => {
  return data.map(function (item, index) {
    return {
      key: index,
      cells: [
        {
          key: "name",
          content: item.first_name + " " + item.last_name,
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
          content: item.organization.name,
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
