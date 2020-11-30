import Button from "@atlaskit/button";
import { FormSection } from "@atlaskit/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Form, Spacing, Title } from "../ui/atoms";
import { TextInput } from "../ui/molecules";
import { AddOrganizationForm } from "./AddOrganizationForm";

export const AddUserForm = ({ onSubmit }) => {
  const history = useHistory();
  const { register, handleSubmit, control, errors } = useForm();
  const [orgRoles, setOrgRoles] = useState([]);
  const [pending, setPending] = useState(false);

  const onSubmitHandle = (data) => {
    setPending(true);
    data["organizations"] = orgRoles;
    console.log(data);
    onSubmit(data)
      .then(() => {
        toast.success("User successfully created!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.goBack();
      })
      .finally(() => setPending(false));
  };

  return (
    <>
      <Form w="100%" onSubmit={handleSubmit(onSubmitHandle)} noValidate>
        <FormSection>
          <Spacing m={{ t: "18px" }}>
            <Box d="flex" w="100%" justify="space-between">
              <TextInput
                className="input"
                name={"first_name"}
                register={register({ required: true })}
                control={control}
                error={errors.first_name}
                label="First name"
              />
              <TextInput
                className="input"
                name={"last_name"}
                register={register({ required: true })}
                control={control}
                error={errors.last_name}
                label="Last name"
              />
              <TextInput
                className="input"
                name={"email"}
                register={register({
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                })}
                control={control}
                error={errors.email}
                label="Email"
              />
              <TextInput
                width={170}
                name={"phone"}
                register={register({
                  required: true,
                })}
                control={control}
                error={errors.phone}
                label="Phone"
                type={"phone"}
              />
            </Box>
          </Spacing>
          <Button
            style={{ position: "absolute", top: 80, right: 40 }}
            isDisabled={pending}
            type="submit"
            appearance="primary"
          >
            Save
          </Button>
        </FormSection>
      </Form>
      <AddOrganizationForm setOrgRoles={setOrgRoles} />
    </>
  );
};
