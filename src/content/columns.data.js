export const organizationsTableColumns = [
  {
    key: "name",
    content: "Name",
    width: 25,
  },
  {
    key: "address",
    content: "Address",
    width: 30,
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
    width: 10,
  },
];

export const communicationTemplatesTableColumns = [
  {
    key: "name",
    content: "Name",
    width: 25,
  },
  {
    key: "template_type",
    content: "Type",
    width: 33,
  },
  {
    key: "updated_at",
    content: "Last Edited Date",
    width: 15,
  },
  {
    key: "actions",
    content: <p align="center">Actions</p>,
    width: 15,
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
      content: <p align="center">Actions</p>,
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
    content: "Permanency Goal",
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
  },
];

export const searchVectorsTableColumns = [
  {
    key: "name",
    content: "Name",
    width: 15,
  },
  {
    key: "description",
    content: "Description",
    width: 25,
  },
  // {
  //   key: "in_continuous_search",
  //   content: "In Continuous Search",
  //   width: 15,
  // },
  {
    key: "priority",
    content: "Priority",
    width: 15,
  },
  {
    key: "Actions",
    content: <p align="center">Actions</p>,
    width: 15,
  },
];

export const actionItemsTableColumns = [
  {
    key: "title",
    content: "Title",
    width: 15,
  },
  {
    key: "description",
    content: "Description",
    width: 25,
  },
  {
    key: "child",
    content: "Associated Child Case",
    width: 15,
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
    width: 40,
  },
  {
    key: "size",
    content: "Size",
    width: 15,
  },
  {
    key: "author",
    content: "Author",
    width: 20,
  },
  {
    key: "date",
    content: "Date",
    width: 15,
  },
  {
    key: "action",
    content: <p align="center">Action</p>,
    width: 15,
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
