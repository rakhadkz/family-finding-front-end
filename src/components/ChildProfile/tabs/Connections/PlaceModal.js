import { Box, Spacing, Title, Form, Label } from "../../../ui/atoms";
import Button from "@atlaskit/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput, DatepickerInput } from "../../../ui/molecules";
import { FormSection } from "@atlaskit/form";
import { toast } from "react-toastify";
export const PlaceModal = ({
  contact,
  onSubmit,
  initialValues = {},
  setIsPlaceModalOpen,
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
    onSubmit(id, { ...data, is_placed: true })
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
        setIsPlaceModalOpen(false);
        refresh();
      });
  };
  return (
    <Box d="flex" direction="column" align="center">
      <Spacing m={{ t: "30px", b: "50px" }}>
        <Title>{"Placement Date"}</Title>
        <Form w="100%" onSubmit={handleSubmit(onSubmitHandle)} noValidate>
          <FormSection>
            <DatepickerInput
              marginX="8px"
              name={"placed_date"}
              register={{ required: false }}
              control={control}
              error={errors.birthday}
              label={`Please provide the date the child was placed with ${
                contact?.first_name + " " + contact?.last_name
              }`}
              placeholder="Enter Placement Date..."
            />
            <Box d="flex" w="100%" justify="center" mb="20px" mt="50px">
              <Button isDisabled={pending} type="submit" appearance="primary">
                Place
              </Button>
              <Spacing m={{ l: "5px", r: "5px" }} />
              <Button onClick={() => setIsPlaceModalOpen(false)}>Cancel</Button>
            </Box>
          </FormSection>
        </Form>
      </Spacing>
    </Box>
  );
};
