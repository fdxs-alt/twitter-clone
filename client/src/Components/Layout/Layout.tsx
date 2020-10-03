import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Trends from "./Trends";

const Main = styled.main`
  width: 85%;
  margin: 0 auto;
  display: flex;
`;
const Layout: React.FC<any> = ({ children }) => {
  return (
    <Main>
      <Navbar />
      {children}
      <Trends />
    </Main>
  );
};

export default Layout;
