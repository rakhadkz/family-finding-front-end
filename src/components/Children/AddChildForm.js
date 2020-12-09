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
    data.permanency_goal = data.permanency_goal.value;
    onSubmit(data)
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
          <Box d="flex" w="100%">
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
              defaultValue={{
                value: "return_to_parent",
                label: "Return to Parent(s) (Reunification)",
              }}
              name={"permanency_goal"}
              ref={register({ required: true })}
              control={control}
              error={errors.permanency_goal}
              label="Permanency Goal"
              placeholder="Choose status"
              options={[
                {
                  value: "return_to_parent",
                  label: "Return to Parent(s) (Reunification)",
                },
                { value: "adoption", label: "Adoption" },
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
              ]}
            />
          </Box>
        </Spacing>
        <Button
          appearance="primary"
          style={{ position: "absolute", top: 80, right: 40 }}
          isDisabled={pending}
          type="submit"
        >
          Save
        </Button>
      </FormSection>
    </Form>
  );
};
