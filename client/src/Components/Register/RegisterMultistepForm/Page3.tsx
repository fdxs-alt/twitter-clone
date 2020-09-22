import React from "react";
import { Button } from "../../../Style/ComponentStyles/LoginPageStyles";
import {
  DateInfo,
  PageOneWrapper,
} from "../../../Style/ComponentStyles/RegisterFormPagesStyle";

const Page3 = () => {
  return (
    <PageOneWrapper>
      <DateInfo>
        By signing up, you agree to our Terms, Privacy Policy, and Cookie Use
      </DateInfo>
      <Button type="submit" style={{ marginTop: "2rem" }}>
        Sign up
      </Button>
    </PageOneWrapper>
  );
};

export default Page3;
