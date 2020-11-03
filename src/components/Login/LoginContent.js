import React, {useState} from 'react'
import Textfield from '@atlaskit/textfield';
import Button from "@atlaskit/button";
import  { ButtonGroup } from "@atlaskit/button";
import LockIcon from '@atlaskit/icon/glyph/lock';
import EmailIcon from '@atlaskit/icon/glyph/email';
import {
    FormSection,
    ErrorMessage,
  } from "@atlaskit/form";
import { Form, Label } from "..";
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import { FORGOT_PASSWORD } from '../../helpers/routes';

const Text = styled.text`
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: '6px};
`

function LoginContent() {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailRequired, setEmailRequired] = useState(false);
    const [passwordRequired, setPasswordRequired] = useState(false);

    const handleSubmit = (e) => {
        if(email==='') {
            setEmailRequired(true);
            e.preventDefault();
        }
        if(password==='') {
            setPasswordRequired(true);
            e.preventDefault();
        }
    }

    const handleEmailInput = (e) => {
        setEmailRequired(false)
        setEmail(e.target.value)
    }

    const handlePasswordInput = (e) => {
        setPasswordRequired(false)
        setPassword(e.target.value)
    }

    return (
        <div>
            <Form onSubmit={handleSubmit} noValidate>
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
                        <Text>This field is required.</Text>
                    </ErrorMessage>}
                    <Label htmlFor="password">Password </Label>
                    <Textfield 
                        isInvalid={passwordRequired} 
                        isRequired 
                        elemBeforeInput = {<LockIcon primaryColor="#42526E"/>} 
                        name="password" 
                        id="password" 
                        width={240} 
                        isCompact 
                        label="Password" 
                        type="password"
                        value={password}
                        onChange={val => handlePasswordInput(val)}
                        />   
                    {passwordRequired && <ErrorMessage>
                        <Text>This field is required.</Text>
                    </ErrorMessage>}
                </FormSection> 
                        
                <div style={{marginTop:'20px'}}>
                    <ButtonGroup >
                        <Button
                        type="submit"
                        appearance="primary"
                        onClick={()=>{}}
                        style={{fontSize:14}}
                        >
                          Sign in
                        </Button>
                        <Button 
                            style={{fontSize:14}}
                            appearance="subtle" 
                            onClick={()=>{history.push(`${FORGOT_PASSWORD}`)}}
                        >
                          Forgot password?
                        </Button>
                    </ButtonGroup>
                </div>
            </Form>
        </div>
    )
}

export default LoginContent
