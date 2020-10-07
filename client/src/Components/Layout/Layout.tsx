import React, { PropsWithChildren } from "react";
import { Main, Wrapper } from "../../Style/ComponentStyles/SharedStyles";
import Navbar from "./Navbar";
import Trends from "./Trends";

interface Props {}

const Layout: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <Main>
      <Navbar />
      <Wrapper>{children}</Wrapper>
      <Trends />
    </Main>
  );
};

export default Layout;
