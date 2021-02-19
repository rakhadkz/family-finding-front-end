import { Box, Spacing, Title, Form, Label } from "../../../ui/atoms";
import Button from "@atlaskit/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "../../../ui/molecules";
import { FormSection } from "@atlaskit/form";
import { toast } from "react-toastify";
export const DisqualifyModal = ({
  contact,
  onSubmit,
  initialValues = {},
  setIsDisModalOpen,
  refresh,
  id,
}) => {
  const { register, handleSubmit, control, errors, watch, setValue } = useForm({
    defaultValues: initialValues,
  });
  const [pending, setPending] = useState(false);

  const onSubmitHandle = (data) => {
    setPending(true);
    console.log(data);
    onSubmit(id, { ...data, is_disqualified: true })
      .then(() => {
        toast.success(`Contact is successfully disqualified!`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .finally(() => {
        setPending(false);
        setIsDisModalOpen(false);
        refresh();
      });
  };
  return (
    <Box d="flex" direction="column" align="center">
      <Spacing m={{ t: "30px", b: "50px" }}>
        <Title>{"Reason for Disqualification"}</Title>
        <Form w="100%" onSubmit={handleSubmit(onSubmitHandle)} noValidate>
          <FormSection>
            <TextInput
              placeholder="Add a reason..."
              width={500}
              marginX="8px"
              name={"disqualify_reason"}
              register={register({ required: false })}
              control={control}
              error={errors.city}
              label={`Please fill in the reason for disqualification of ${
                contact?.first_name + " " + contact?.last_name
              }`}
            />
            <Box d="flex" w="100%" justify="center" mb="20px" mt="50px">
              <Button isDisabled={pending} type="submit" appearance="primary">
                Disqualify
              </Button>
              <Spacing m={{ l: "5px", r: "5px" }} />
              <Button onClick={() => setIsDisModalOpen(false)}>Cancel</Button>
            </Box>
          </FormSection>
        </Form>
      </Spacing>
    </Box>
  );
};
