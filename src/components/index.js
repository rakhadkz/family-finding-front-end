import styled from "styled-components";

export const Page = styled.section`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  width: 300px;
  max-width: 100%;

  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: 600;
  color: rgb(107, 119, 140);
`;

export const ContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    margin: 0 auto;
    `

export const StyledCard = styled.div`
    width: 600px;
    height: 546px;
    background: #FFFFFF;
    border: 1px solid #DFE1E6;
    box-sizing: border-box;
    border-radius: 3px;
    margin-bottom: 40px;
    `
export const StyledCover = styled.div`
    display: flex;
    position: relative;
    left: 2.15%;
    `

export const StyledBackground = styled.img`
    position: relative;
`

export const StyledImage = styled.img`
    position: absolute;
    top: 12%;
    left: 15%;
    background-color: rgba(255, 255, 255, 0.0001);
`


export const StyledField = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 15px; padding-left: 15px;
`
