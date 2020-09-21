import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Trends from "./Trends";

const Main = styled.main`
  width: 80%;
  margin: 0 auto;
  display: flex;
`;
const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Main>
      <Navbar />
      {children}
      <Trends />
    </Main>
  );
};

export default Layout;
