import React, { useEffect, useState } from "react";
import styled from "styled-components";
import jwtDecode from "jwt-decode";
import Logo from "../logo.png";
import { PAGES } from "../constant";
import { logout } from "../asyncAction";

const Wrapper = styled.div`
  height: 100%;
  padding: 24px 12px;
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LogoContainer = styled.div`
  margin: 24px 0;
`;

interface Props {
  setPage: (e: string) => void;
}

interface UserInfo {
  name: string;
  role: string;
}

const Home: React.FC<Props> = ({ setPage }) => {
  const [loader, setLoader] = useState<boolean>(true);
  const [user, setUser] = useState<UserInfo>();

  /*global chrome*/
  useEffect(() => {
    chrome.storage.sync.get(null, (data) => {
      if (data.token) {
        setUser(jwtDecode(data.token));
        setLoader(false);
      } else setPage(PAGES.AUTH);
    });
  }, []);

  const onLogout = () => {
    logout((bol: any) => {
      if (bol) setPage(PAGES.AUTH);
    });
  };

  return (
    <Wrapper>
      {loader ? (
        <LoaderContainer>
          <div>Loading ...</div>
        </LoaderContainer>
      ) : (
        <>
          <LogoContainer>
            <img src={Logo} alt="LOGO" />
          </LogoContainer>
          <p
            style={{
              textTransform: "uppercase",
              color: "#fff",
              marginBottom: "4px",
              padding: "4px 8px",
            }}
            className="badge bg-secondary"
          >
            {user && user.role}
          </p>
          <p>{user && user.name}</p>

          <button
            style={{ marginTop: 24 }}
            className="btn  btn-outline-primary btn-sm"
            onClick={onLogout}
          >
            Log Out
          </button>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
