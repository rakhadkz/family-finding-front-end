import Button from "@atlaskit/button";
import { FormSection } from "@atlaskit/form";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Box, Form, Spacing } from "../ui/atoms";
import { SelectInput, TextInput } from "../ui/molecules";
import SearchIcon from "@atlaskit/icon/glyph/search";
import { toast } from "react-toastify";
import Select from "@atlaskit/select";
import { fetchOrganizations } from "../../context/organization/organizationProvider";

export const AddUserForm = ({ onSubmit }) => {
  const history = useHistory();
  const { register, handleSubmit, control, errors } = useForm();

  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    fetchOrganizations("extended").then((items) => {
      var options = items.map(function (item) {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setOrganizations(options);
    });
  }, []);

  const [pending, setPending] = useState(false);
  const onSubmitHandle = (data) => {
    setPending(true);
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
      })
      .finally(() => setPending(false));
  };

  const options = [
    { label: "Super admin", value: "super_admin" },
    { label: "Organization admin", value: "admin" },
    { label: "Organization manager", value: "manager" },
    { label: "Organization user", value: "user" },
  ];

  return (
    <Form w="100%" onSubmit={handleSubmit(onSubmitHandle)} noValidate>
      <FormSection>
        <Spacing m={{ t: "18px", b: "18px" }}>
          <Box d="flex" w="100%" justify="space-between">
            <TextInput
              name={"first_name"}
              register={register({ required: true })}
              control={control}
              error={errors.first_name}
              label="First name"
            />
            <TextInput
              name={"last_name"}
              register={register({ required: true })}
              control={control}
              error={errors.last_name}
              label="Last name"
            />
            <TextInput
              name={"email"}
              register={register({ required: true })}
              control={control}
              error={errors.email}
              label="Email"
            />
            <TextInput
              name={"phone"}
              register={register({ required: true })}
              control={control}
              error={errors.phone}
              label="Phone"
              type={"number"}
            />
          </Box>
        </Spacing>
        <SelectInput
          name={"organization_id"}
          elemAfterInput={<SearchIcon />}
          options={organizations}
          register={register({ required: true })}
          control={control}
          error={errors.organization}
          label="Organization"
          placeholder="Choose organization"
        />
        <Spacing m={{ t: "33px" }}>
          <SelectInput
            name={"role"}
            options={options}
            register={register({ required: true })}
            control={control}
            error={errors.role}
            placeholder="Choose role"
          />
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
  );
};
