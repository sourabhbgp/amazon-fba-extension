import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 360px;
  flex-flow: column;
`;

const Body = styled.div`
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  /* background-color: #e9ecef; */
  border-radius: 0.3rem;
  height: 425px;
  margin-bottom: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    padding: 24px;
    /* overflow-y: scroll; */
    height: 95%;
    width: 90%;
  }
`;

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      <Body>
        <div>{children}</div>
      </Body>
    </Wrapper>
  );
};

export default Layout;
