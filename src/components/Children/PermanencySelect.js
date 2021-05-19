import React from 'react'
import Select from "@atlaskit/select";

const permanency_goal_options = [
    {value: 'all', label: 'All'},
    {
      value: "return_to_parent",
      label: "Return to Parent(s) (Reunification)",
    },
    {
      value: "adoption",
      label: "Adoption",
    },
    {
      value: "permanent_legal_custody",
      label: "Permanent Legal Custody (PLC)",
    },
    {
      value: "permanent_placement",
      label: "Permanent Placement with a Fit and Willing Relative",
    },
    {
      value: "appla",
      label: "Another Planned Permanent Living Arrangement (APPLA)",
    },
  ];

export const PermanencySelect = ({setFilterPermanencyGoal}) => (
    <Select
      menuPortalTarget={document.body}
      onChange={e => setFilterPermanencyGoal(e)}
      styles={{
        width: '240px',
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }}
      options={permanency_goal_options}
      placeholder="Permanency Goal"
    />
)