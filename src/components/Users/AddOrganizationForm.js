import Button from "@atlaskit/button";
import { FormSection } from "@atlaskit/form";
import SearchIcon from "@atlaskit/icon/glyph/search";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { fetchOrganizations } from "../../context/organization/organizationProvider";
import { Box, Form, Spacing } from "../ui/atoms";
import { SelectInput } from "../ui/molecules";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import "@atlaskit/css-reset";
import { TableWrapper } from "../ui/common";

export const AddOrganizationForm = ({ setOrgRoles }) => {
  const { register, handleSubmit, control, errors } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "user_organizations",
  });

  const [organizations, setOrganizations] = useState([]);

  const onAddOrganizationHandle = (data) => {
    fields.map(
      (item, index) =>
        item.organization.value === data.organization.value && remove(index)
    );
    append({
      organization: {
        label: data.organization?.label,
        value: data.organization?.value,
      },
      role: {
        label: data.role?.label,
        value: data.role?.value,
      },
    });
  };

  useEffect(() => {
    fetchOrganizations({ view: "short" }).then((items) => {
      if (items) {
        var options = items.map(function (item) {
          return {
            label: item.name,
            value: item.id,
          };
        });
        setOrganizations(options);
      }
    });
  }, []);

  useEffect(() => {
    setOrgRoles(
      fields.map((item) => ({
        id: item.organization.value,
        role: item.role.value,
      }))
    );
  }, [fields]);

  return (
    <>
      <Form
        w="100%"
        onSubmit={handleSubmit(onAddOrganizationHandle)}
        noValidate
      >
        <FormSection>
          <Spacing>
            <Box align="flex-end" d="flex" w="67%" justify="space-between">
              <SelectInput
                className="input"
                name="organization"
                elemAfterInput={<SearchIcon />}
                options={organizations}
                ref={register({ required: true })}
                control={control}
                error={errors.organization}
                label="Organization"
                placeholder="Choose organization"
              />
              <SelectInput
                className="input"
                name="role"
                label="Role"
                options={options}
                register={{ required: true }}
                control={control}
                error={errors.role}
                placeholder="Select a role"
              />
              <Button type="submit" appearance="primary">
                Add
              </Button>
            </Box>
          </Spacing>
        </FormSection>
      </Form>
      <Spacing m={{ t: "33px" }}>
        <TableWrapper>
          <table>
            <thead>
              <tr>
                <th>Organization</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((item, index) => {
                return (
                  <tr key={item.organization.value}>
                    <td>{item.organization.label}</td>
                    <td>{item.role.label}</td>
                    <td>
                      <Button
                        height="32px"
                        width="32px"
                        onClick={() => remove(index)}
                      >
                        <CrossIcon size="small" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableWrapper>
      </Spacing>
    </>
  );
};

const options = [
  { label: "Super admin", value: "super_admin" },
  { label: "Organization admin", value: "admin" },
  { label: "Organization manager", value: "manager" },
  { label: "Organization user", value: "user" },
];
