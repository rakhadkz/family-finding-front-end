import Button from "@atlaskit/button";
import { FormSection } from "@atlaskit/form";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Box, Form, Spacing } from "../../../ui/atoms";
import { SelectInput } from "../../../ui/molecules";

const relationshipOptions = [
  { label: "Mother", value: "Mother" },
  { label: "Father", value: "Father" },
  { label: "Maternal Grandfather", value: "Maternal Grandfather" },
  { label: "Materal Granndmother", value: "Materal Granndmother" },
  { label: "Paternal Grandfather", value: "Paternal Grandfather" },
  { label: "Paternal Grandmother", value: "Paternal Grandmother" },
  { label: "Maternal Aunt", value: "Maternal Aunt" },
  { label: "Maternal Uncle", value: "Maternal Uncle" },
  { label: "Paternal Aunt", value: "Paternal Aunt" },
  { label: "Paternal Uncle", value: "Paternal Uncle" },
  { label: "Other", value: "Other" },
];

export const EditNodeForm = ({ initialContacts }) => {
  const history = useHistory();
  const { register, handleSubmit, control, errors } = useForm();
  const [contacts, setContacts] = useState([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    console.log("initialContacts", initialContacts);
    const options = initialContacts
      .filter(({ contact }) => !!contact)
      .map(({ contact: item }) => ({
        label: `${item?.first_name} ${item?.last_name}`,
        value: item.id,
      }));
    setContacts(options);
  }, [initialContacts]);

  useEffect(() => {
    console.log(contacts);
  }, [contacts]);

  const onSubmitHandle = (data) => {
    localStorage.setItem("selectValue", JSON.stringify({ ...data }));
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmitHandle)}
        id="editForm"
        style={{
          display: "none",
          left: "45%",
          marginTop: -200,
          position: "absolute",
          backgroundColor: "white",
          border: "1px solid grey",
          zIndex: 10000,
          padding: 10,
        }}
      >
        <Box d="flex">
          Edit Contact Node
          <Button
            style={{ position: "absolute", right: 10 }}
            id="cancel"
            appearance="primary"
          >
            X
          </Button>
        </Box>
        <FormSection>
          <SelectInput
            name={"contact"}
            id="contact"
            register={{ required: true }}
            control={control}
            label="Contact"
            options={contacts}
          />
          <SelectInput
            name={"relationship"}
            id="relationship"
            register={{ required: true }}
            control={control}
            label="Relationship"
            options={relationshipOptions}
          />
          <Spacing m={{ t: "10px" }}>
            <Button
              isDisabled={pending}
              type="submit"
              id="save"
              appearance="primary"
            >
              Save
            </Button>
          </Spacing>
        </FormSection>
      </Form>
    </>
  );
};
