import React from "react";
import { Main } from "../../Style/ComponentStyles/RegisterPageStyles";
import Navbar from "./Navbar";
import Trends from "./Trends";

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
