import { Box, Spacing, Title, Form } from "../../../ui/atoms";
import Button, { ButtonGroup } from "@atlaskit/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DatepickerInput } from "../../../ui/molecules";
import { toast } from "react-toastify";

export const PlaceModal = ({
  contact,
  onSubmit,
  initialValues = {},
  setIsPlaceModalOpen,
  refresh,
  id,
}) => {
  const { handleSubmit, control, errors } = useForm({
    defaultValues: initialValues,
  });
  const [pending, setPending] = useState(false);

  const onSubmitHandle = (data) => {
    setPending(true);
    console.log(data);
    onSubmit(id, { ...data, status: 'placed' })
      .then(() => toast.success(`Contact is successfully placed!`))
      .finally(() => {
        setPending(false);
        setIsPlaceModalOpen(false);
        refresh();
      });
  };
  return (
    <Box d="flex" direction="column" align="center">
      <Spacing m={{ t: "30px", b: "20px" }}>
        <Title>{"Placement Date"}</Title>
        <Form w="100%" onSubmit={handleSubmit(onSubmitHandle)} noValidate>
          <div style={{ position: "absolute", left: 50 }}>
            <DatepickerInput
              name={"placed_date"}
              width={300}
              register={{ required: false }}
              control={control}
              error={errors.birthday}
              label={`Please provide the date the child was placed with ${
                contact?.first_name + " " + contact?.last_name
              }`}
              placeholder="Enter Placement Date..."
            />
          </div>
          <Box d="flex" w="100%" justify="center" mt="120px">
            <ButtonGroup>
              <Button isDisabled={pending} type="submit" appearance="primary">
                Place
              </Button>
              <Button onClick={() => setIsPlaceModalOpen(false)}>Cancel</Button>
            </ButtonGroup>
          </Box>
        </Form>
      </Spacing>
    </Box>
  );
};
