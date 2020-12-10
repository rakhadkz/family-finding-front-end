import Button from "@atlaskit/button";
import { FormSection } from "@atlaskit/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { states } from "../../content/states.data";
import { Box, Form, Spacing } from "../ui/atoms";
import { SelectInput, TextInput } from "../ui/molecules";
import { SelectOrganizationLogo } from "./SelectOrganizationLogo";

export const AddOrganizationForm = ({ onSubmit }) => {
  const history = useHistory();
  const { register, handleSubmit, control, errors } = useForm();

  const [pending, setPending] = useState(false);
  const [logoUrl, setLogoUrl] = useState();

  const onSubmitHandle = (data) => {
    setPending(true);
    data.logo = logoUrl ? logoUrl : data.logo;
    console.log(data);
    onSubmit(data)
      .then(() => history.push("../organizations"))
      .finally(() => setPending(false));
  };

  return (
    <Form w="100%" onSubmit={handleSubmit(onSubmitHandle)} noValidate>
      <FormSection>
        <Box d="flex" w="100%">
          <TextInput
            name={"name"}
            register={register({ required: true })}
            control={control}
            error={errors.name}
            label="Name"
          />
          <TextInput
            name={"phone"}
            register={register({ required: true })}
            control={control}
            error={errors.phone}
            label="Phone"
          />
          <TextInput
            name={"website"}
            register={register({ required: true })}
            control={control}
            error={errors.website}
            label="Website"
          />
        </Box>
        <Spacing m={{ t: "18px" }}>
          <Box d="flex" w="100%">
            <TextInput
              name={"address"}
              register={register({ required: true })}
              control={control}
              error={errors.address}
              label="Address"
            />
            <TextInput
              name={"city"}
              register={register({ required: true })}
              control={control}
              error={errors.city}
              label="City"
            />
            <SelectInput
              name={"state"}
              register={{ required: true }}
              control={control}
              options={states.map((state) => ({ label: state, value: state }))}
              error={errors.state}
              label="State"
              placeholder="Choose State"
            />
            <TextInput
              name={"zip"}
              register={register({ required: true })}
              control={control}
              error={errors.zip}
              label="Zip"
            />
          </Box>
        </Spacing>
        <SelectOrganizationLogo
          control={control}
          setLogoUrl={setLogoUrl}
          setPending={setPending}
        />
      </FormSection>
      <Button
        style={{ position: "absolute", top: 80, right: 40 }}
        isDisabled={pending}
        type="submit"
        appearance="primary"
      >
        Save
      </Button>
    </Form>
  );
};
