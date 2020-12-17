import Button from "@atlaskit/button";
import { FormSection } from "@atlaskit/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { states } from "../../content/states.data";
import { Box, Form, Spacing } from "../ui/atoms";
import { DatepickerInput, SelectInput, TextInput } from "../ui/molecules";

export const AddContactForm = ({ onSubmit, onCancel }) => {
  const { register, handleSubmit, control, errors } = useForm();
  const [pending, setPending] = useState(false);

  const onSubmitHandle = (data) => {
    setPending(true);

    console.log(data);
    const { state, ...rest } = data;

    onSubmit({ ...rest, state: state.value });
  };

  return (
    <>
      <Form w="100%" onSubmit={handleSubmit(onSubmitHandle)} noValidate>
        <FormSection>
          <Spacing
            m={{ t: "18px", b: "30px" }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              rowGap: 20,
              justifyContent: "flex-end",
            }}
          >
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
              name={"phone"}
              register={register({
                required: true,
              })}
              control={control}
              error={errors.phone}
              label="Phone"
              type={"phone"}
            />
            <TextInput
              className="input"
              name={"address"}
              register={register({ required: true })}
              control={control}
              error={errors.address}
              label="Address"
            />
            <TextInput
              className="input"
              name={"address_2"}
              register={register({ required: true })}
              control={control}
              error={errors.address_2}
              label="Another Address"
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
            <DatepickerInput
              name={"birthday"}
              register={{ required: true }}
              control={control}
              error={errors.birthday}
              label="Birthday"
              placeholder="Select birthday of child"
            />
            <Spacing m={{ r: "30px" }}>
              <Box d="flex">
                <Button isDisabled={pending} type="submit" appearance="primary">
                  Save
                </Button>
                <Spacing m={{ l: "5px", r: "5px" }} />
                <Button onClick={onCancel}>Cancel</Button>
              </Box>
            </Spacing>
          </Spacing>
        </FormSection>
      </Form>
    </>
  );
};
