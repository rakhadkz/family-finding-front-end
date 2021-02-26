import Tabs from "@atlaskit/tabs";
import React, { useEffect, useState } from "react";
import EmailSettings from "../components/Settings/EmailSettings";
import PhoneSettings from "../components/Settings/PhoneSettings";

function ContactsSettingPage() {
  const [current, setCurrent] = useState(0);

  useEffect(()=>{
    console.log('WWWSNSJS');
  }, [])

  const selectTab = (tab, index) => {
    setCurrent(index);
  };
  const tabs = [
    {
      label: "Phone Settings",
      content: <PhoneSettings />,
    },
    {
      label: "Email Settings",
      content: <EmailSettings />
    },
  ];

  return (
    <>
      <Tabs onSelect={selectTab} selected={tabs[current]} tabs={tabs} />
    </>
  );
}

export default ContactsSettingPage;
