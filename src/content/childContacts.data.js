const childContactsTableData = (data) =>
  data.map((item, index) => ({
    key: index,
    cells: [
      {
        key: "full_name",
        content: `${item.contact.first_name} ${item.contact.last_name}`,
      },
      {
        key: "relationship",
        content: item.relationship,
      },
      {
        key: "birth_date",
        content: item.contact.birthday,
      },
      {
        key: "address",
        content: item.contact.address,
      },
      {
        key: "phone",
        content: item.contact.phone,
      },
    ],
  }));

export { childContactsTableData };
