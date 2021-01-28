import { getLocalStorageUser } from "../context/auth/authProvider"
import styled from "styled-components";

export const ComponentWrapper = ({ roles = ['s', 'm', 'a', 'u'], children }) => {
  const { role } = getLocalStorageUser();

  return (
    <Wrapper>
      {roles.includes(role.charAt(0)) || roles.includes(role) ? children : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
          }}
        >
          <h4>Access was denied</h4>
          <span>You don't have permission to view this page</span>
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: block;
  width: 100%;
  min-height: 100vh;
  padding: 28px 40px;
`;