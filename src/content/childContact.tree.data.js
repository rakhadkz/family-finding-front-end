import { sideRelatives } from "./relationshipOptions.data";

const constructTree = ({
  firstName = "",
  lastName = "",
  contacts = [],
  connections = [],
}) => {
  const nodes = [
    {
      id: 0,
      Name: `${firstName} ${lastName}`,
      Relationship: "child",
      tags: ["child"],
      Avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT63VcFex7-_JFQOKCju4WMQHp3xHIxlBZUJA&usqp=CAU",
    },
  ];

  contacts.forEach((item) => {
    nodes.push({
      id: item.id,
      tags: [
        "relatives",
        sideRelatives.includes(item?.contact?.relationship) && "assistant",
      ],
      Name: `${item?.contact?.first_name || ""} ${
        item?.contact?.last_name || ""
      }`,
      contactId: item?.contact?.id,
      Relationship: item?.contact?.relationship,
      stars: item?.link_score_overall,
      pid: item.parent_id || 0,
      Avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT63VcFex7-_JFQOKCju4WMQHp3xHIxlBZUJA&usqp=CAU",
    });
  });

  return nodes;
};

export { constructTree };
