
import React, {useState} from 'react'
import Textfield from '@atlaskit/textfield';
import Button, { ButtonGroup } from "@atlaskit/button";
import EmailIcon from '@atlaskit/icon/glyph/email';
import {
    FormSection,
    ErrorMessage,
    FormHeader
  } from "@atlaskit/form";
import { Form, Label } from "..";
import LoginLayout from '../../containers/LoginLayout'

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [emailRequired, setEmailRequired] = useState(false);

    const handleSubmit = (e) => {
        if(email==='') {
            setEmailRequired(true);
            e.preventDefault();
        }

    }

    const handleEmailInput = (e) => {
        setEmailRequired(false)
        setEmail(e.target.value)
    }

    return (
        <LoginLayout>
            <Form onSubmit={handleSubmit} noValidate>
                <FormHeader title="Forgot password?" />

                <FormSection>
                    <Label htmlFor="email">Email </Label>
                    <Textfield 
                        isInvalid={emailRequired} 
                        isRequired 
                        elemBeforeInput = {<EmailIcon primaryColor="#42526E"/>} 
                        name="email" 
                        id="email" 
                        width={240} 
                        isCompact
                        value={email}
                        onChange={val => handleEmailInput(val)}
                    />
                    {emailRequired && <ErrorMessage>
                        <text style={{
                            fontStyle: "normal",
                            fontWeight: 'normal',
                            fontSize: '12px',
                            lineHeight: '16px'}}>
                                This field is required.
                        </text>
                    </ErrorMessage>}
                </FormSection> 

                <div style={{marginTop:'20px'}}>
                    <ButtonGroup >
                        <Button
                        style={{fontSize:14}}
                        type="submit"
                        appearance="primary"
                        >
                          Send
                        </Button>
                    </ButtonGroup>
                </div>

            </Form>
        </LoginLayout>
    )
}

export default ResetPassword
