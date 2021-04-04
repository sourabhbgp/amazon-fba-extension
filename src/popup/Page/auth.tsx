import React, { useState } from "react";
import LoginForm from "../Form/login";
import styled from "styled-components";
import Logo from "../logo.png";
import { PAGES } from "../constant";
import { login } from "../asyncAction";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-flow: column;
`;

const LogoContainer = styled.div`
  margin: 24px 0;
`;

interface Props {
  setPage: (e: string) => void;
}

const Auth: React.FC<Props> = ({ setPage }) => {
  const [unauthorized, setUnauthorized] = useState<boolean>(false);

  const onLogin = (values: any) => {
    login(values, (bol: any) => {
      if (bol) setPage(PAGES.HOME);
      else setUnauthorized(true);
    });
  };

  return (
    <Wrapper>
      <LogoContainer>
        <img src={Logo} alt="LOGO" />
      </LogoContainer>
      <LoginForm onLogin={onLogin} />

      {unauthorized && (
        <p
          style={{
            marginTop: 24,
            color: "#fff",
            padding: "4px 8px",
            fontSize: 14,
          }}
          className="badge bg-danger"
        >
          UnAuthorized
        </p>
      )}
    </Wrapper>
  );
};

export default Auth;
