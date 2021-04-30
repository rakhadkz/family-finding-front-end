import { Drawer } from "@chakra-ui/react";
import React, { useState } from "react";
import { Title } from "../../../ui/atoms";
import { AddContactForm } from "../../AddContactForm";

function AddConnectionDrawer({
  isAddModalOpen,
  setIsAddModalOpen,
  onAddContact,
  fetchConnections,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Drawer
      onClose={() => setIsAddModalOpen(false)}
      isOpen={isAddModalOpen}
      width="wide"
    >
      {activeStep === 0 && (
        <div style={{ paddingRight: 40, paddingTop: 10 }}>
          <Title>{"Add Connection"}</Title>
          <AddContactForm
            onSubmit={async (data, emails, phones, address, removeIds) => {
              console.log("DATA", data);
              await onAddContact(data, emails, phones, address)
                .then((data) => {
                  console.log(data);
                })
                .finally(() => fetchConnections());
            }}
            onCancel={() => setIsAddModalOpen(false)}
            connection={{
              contact: { first_name: firstName, last_name: lastName },
            }}
          />
        </div>
      )}
      {activeStep === 2 && (
        <div style={{ paddingRight: 40, paddingTop: 10 }}>
          <Title>{"Add Connection"}</Title>
          <AddContactForm
            onSubmit={async (data, emails, phones, address, removeIds) => {
              console.log("DATA", data);
              await onAddContact(data, emails, phones, address)
                .then((data) => {
                  console.log(data);
                })
                .finally(() => fetchConnections());
            }}
            onCancel={() => setIsAddModalOpen(false)}
            connection={{
              contact: { first_name: firstName, last_name: lastName },
            }}
          />
        </div>
      )}
    </Drawer>
  );
}

export default AddConnectionDrawer;
