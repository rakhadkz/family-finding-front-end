import Button from "@atlaskit/button";
import { FormSection } from "@atlaskit/form";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { fetchContacts } from "../../../../context/children/childProvider";
import { Box, Form, Spacing } from "../../../ui/atoms";
import { SelectInput, TextInput } from "../../../ui/molecules";

export const EditNodeForm = () => {
  const history = useHistory();
  const { register, handleSubmit, control, errors } = useForm();
  const [contacts, setContacts] = useState([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    fetchContacts().then((data) => {
      const options = data.map((item) => ({
        label: `${item?.first_name} ${item?.last_name}`,
        value: item.id,
      }));
      setContacts(options);
    });
  }, []);

  useEffect(() => {
    console.log(contacts);
  }, [contacts]);

  const onSubmitHandle = (data) => {
    localStorage.setItem("selectValue", JSON.stringify(data.contact));
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
          <TextInput
            className="input"
            name={"relationship"}
            register={register({ required: true })}
            control={control}
            id="title"
            error={errors.relationship}
            label="Relationship"
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
