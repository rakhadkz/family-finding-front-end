import React from 'react'
import frame from './../assets/Frame.svg'
import Cover from './../assets/Cover.svg'
import logo from './../assets/logo.png'
import { ContainerDiv, StyledCard, StyledCover, StyledBackground, StyledImage, StyledField } from "./../components";

function LoginLayout({children}) {
    return (
        <ContainerDiv className="container" >
            <StyledCard >

                <div className="row">
                    <StyledCover>
                        <StyledBackground src={Cover} />
                        <StyledImage src={frame} />
                    </StyledCover>
                </div>

                <div className="row">
                    <StyledField className="col">
                        <img src={logo} alt="logo"/>
                    </StyledField>

                    <StyledField className="col">
                        {children }
                    </StyledField>
                </div>
            </StyledCard>
        </ContainerDiv>
    )
}

export default LoginLayout
