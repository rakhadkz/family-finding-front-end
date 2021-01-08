export const organizationsTableColumns = [
  {
    key: "name",
    content: "Name",
    width: 25,
  },
  {
    key: "address",
    content: "Address",
    width: 33,
  },
  {
    key: "city",
    content: "City",
    width: 15,
  },
  {
    key: "state",
    content: "State",
    width: 15,
  },
  {
    key: "zip",
    content: "Zip",
    width: 8,
  },
];

export const usersTableColumns = (isSuperAdmin = false) => {
  const columns1 = [
    {
      key: "name",
      content: "Name",
      width: 25,
    },
    {
      key: "email",
      content: "Email",
      width: 25,
    },
    {
      key: "phone",
      content: "Phone",
      width: 15,
    },
  ];
  if (isSuperAdmin)
    columns1.push({
      key: "organization",
      content: "Organization",
      width: 16,
    });
  const columns2 = [
    {
      key: "role",
      content: "Role",
      width: 15,
    },
    {
      key: "actions",
      content: "Actions",
      width: 10,
    },
  ];
  return columns1.concat(columns2);
};

export const childrenTableColumns = (isUser = true) => [
  {
    key: "full_name",
    content: "Full Name",
    width: 25,
  },
  {
    key: "permanency_goal",
    content: <p align="left">Permanency Goal</p>,
    width: 20,
  },
  {
    key: "continuous_search",
    content: <p align="center">Continuous Search</p>,
    width: 14,
  },
  {
    key: "days_in_system",
    content: <p align="center">Days in system</p>,
    width: isUser ? 10 : 13,
  },
  {
    key: "relatives",
    content: <p align="center">Relatives</p>,
    width: isUser ? 10 : 13,
  },
  {
    key: "matches",
    content: <p align="center">Matches</p>,
    width: isUser ? 10 : 13,
  },
  isUser && {
    key: "status",
    content: <p align="center">Status</p>,
    width: 16,
  }
]

export const actionItemsTableColumns = [
  {
    key: "title",
    content: "Title",
    width: 20,
  },
  {
    key: "description",
    content: "Description",
    width: 30,
  },
  {
    key: "child",
    content: "Associated Child Case",
    width: 18,
  },
  {
    key: "resolve",
    content: <p align="center">Resolve</p>,
    width: 15,
  },
];

export const attachmentsTableColumns = [
  {
    key: "file_name",
    content: "File Name",
    width: 51,
  },
  {
    key: "size",
    content: "Size",
    width: 15,
  },
  {
    key: "author",
    content: "Author",
    width: 15,
  },
  {
    key: "date",
    content: "Date",
    width: 15,
  },
  {
    key: "action",
    content: "Action",
    width: 5,
  },
];

export const contactsTableColumns = [
  {
    key: "full_name",
    content: "Full name",
    width: 20,
  },
  {
    key: "relationship",
    content: "Relationship",
    width: 16,
  },
  {
    key: "birth_date",
    content: "Birth date",
    width: 12,
  },
  {
    key: "address",
    content: "Address",
    width: 37,
  },
  {
    key: "phone",
    content: "Phone number",
    width: 11,
  },
];
