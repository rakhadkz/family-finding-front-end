import styled from "styled-components";

export const Rounded = ({ content, onClick, isRemovable = false }) => {
  return (
    <Container onClick={onClick} isRemovable={isRemovable}>
      {content}
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 30px;
  border: 1px solid #c1c7d0;
  transition: 0.2s;

  ${({ isRemovable }) =>
    !isRemovable &&
    `
      :hover {
        background: #f0f0f0;
        cursor: pointer;  
      }
    `}
`;
