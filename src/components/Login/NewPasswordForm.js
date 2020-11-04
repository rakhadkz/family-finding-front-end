import Button, { ButtonGroup } from "@atlaskit/button";
import { ErrorMessage, FormHeader, FormSection } from "@atlaskit/form";
import LockIcon from "@atlaskit/icon/glyph/lock";
import Textfield from "@atlaskit/textfield";
import React, { useState } from "react";
import { Form, Label } from "../ui/atoms";

export const NewPasswordForm = () => {
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [pass1Required, setPass1Required] = useState(false);
  const [pass2Required, setPass2Required] = useState(false);

  const handlePasswordInput = (e, flag) => {
    if (flag === 1) {
      setPass1Required(false);
      setPass1(e.target.value);
    } else {
      setPass2Required(false);
      setPass2(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    if (pass1 === "") {
      setPass1Required(true);
      e.preventDefault();
    }
    if (pass2 === "") {
      setPass2Required(true);
      e.preventDefault();
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormHeader title="New password" />

      <FormSection>
        <Label htmlFor="password">New password </Label>
        <Textfield
          isInvalid={pass1Required}
          isRequired
          elemBeforeInput={<LockIcon primaryColor="#42526E" />}
          name="password"
          id="password"
          width={240}
          isCompact
          label="Password"
          type="password"
          value={pass1}
          onChange={(val) => handlePasswordInput(val, 1)}
        />
        {pass1Required && (
          <ErrorMessage>
            <text
              style={{
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "12px",
                lineHeight: "16px",
              }}
            >
              This field is required.
            </text>
          </ErrorMessage>
        )}
        <Label htmlFor="password">Repeat password </Label>
        <Textfield
          isInvalid={pass2Required}
          isRequired
          elemBeforeInput={<LockIcon primaryColor="#42526E" />}
          name="password"
          id="password"
          width={240}
          isCompact
          label="Password"
          type="password"
          value={pass2}
          onChange={(val) => handlePasswordInput(val, 2)}
        />
        {pass2Required && (
          <ErrorMessage>
            <text
              style={{
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "12px",
                lineHeight: "16px",
              }}
            >
              This field is required.
            </text>
          </ErrorMessage>
        )}
      </FormSection>

      <div style={{ marginTop: "20px" }}>
        <ButtonGroup>
          <Button style={{ fontSize: 14 }} type="submit" appearance="primary">
            Send
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  );
};
