import React from "react";
import { Main, Wrapper } from "../../Style/ComponentStyles/SharedStyles";
import Navbar from "./Navbar";
import Trends from "./Trends";

const Layout: React.FC<any> = ({ children }) => {
  return (
    <Main>
      <Navbar />
      <Wrapper>{children}</Wrapper>
      <Trends />
    </Main>
  );
};

export default Layout;
