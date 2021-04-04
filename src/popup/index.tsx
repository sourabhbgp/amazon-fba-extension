import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { PAGES } from "./constant";
import Layout from "./Contexts/Layout";
import Home from "./Page/home";
import Auth from "./Page/auth";

import "./index.css";

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {}

const Popup: React.FC<Props> = () => {
  const [page, setPage] = useState<string>(PAGES.AUTH);
  const [loader, setLoader] = useState<boolean>(true);

  /*global chrome*/
  useEffect(() => {
    chrome.storage.sync.get(null, (data) => {
      setLoader(false);
      if (data.token) setPage(PAGES.HOME);
      else setPage(PAGES.AUTH);
    });
  }, []);

  return (
    <Layout>
      {loader ? (
        <LoaderContainer>
          <div>Loding ... </div>
        </LoaderContainer>
      ) : (
        <div>
          {page === PAGES.AUTH ? <Auth setPage={setPage} /> : null}
          {page === PAGES.HOME ? <Home setPage={setPage} /> : null}
        </div>
      )}
    </Layout>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,

  document.getElementById("root")
);
