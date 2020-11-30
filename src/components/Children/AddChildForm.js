import Button from "@atlaskit/button";
import { FormSection } from "@atlaskit/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Form, Spacing } from "../ui/atoms";
import { DatepickerInput, SelectInput, TextInput } from "../ui/molecules";

export const AddChildForm = ({ onSubmit }) => {
  const history = useHistory();
  const { register, handleSubmit, control, errors } = useForm();

  const [pending, setPending] = useState(false);
  const onSubmitHandle = (data) => {
    setPending(true);
    console.log(data);
    const { permanency_goal, ...rest } = data;
    onSubmit(rest)
      .then(() => {
        toast.success("Child successfully created!", {
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
            <DatepickerInput
              name={"birthday"}
              register={{ required: true }}
              control={control}
              error={errors.birthday}
              label="Birthday"
              placeholder="Select birthday of child"
            />
            <SelectInput
              name={"permanency_goal"}
              register={{}}
              control={control}
              label="Permanency Goal"
              placeholder="Choose status"
              options={[
                { value: true, label: "On" },
                { value: false, label: "Off" },
              ]}
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
  );
};
