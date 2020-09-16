import React from "react";
import Footer from "../../Components/Footer";
import { Input, Label } from "../../Style/ComponentStyles/LoginPageStyles";
import {
  Button,
  LoginForm,
  InputWrapper,
  Main,
  MainContentContainer,
  OuterContainer,
  Wrapper,
} from "../../Style/ComponentStyles/RegisterPageStyles";
import RegisterLogo from "../../Components/RegisterLogo";
import WhatsHappening from "../../Components/WhatsHappeningComponent";

const RegisterPage = () => {
  return (
    <Wrapper>
      <MainContentContainer>
        <RegisterLogo />
        <OuterContainer>
          <Main>
            <LoginForm>
              <InputWrapper>
                <Input />
                <Label htmlFor="Phone, email, or username">
                  Phone, email, or username
                </Label>
              </InputWrapper>
              <InputWrapper>
                <Input />
                <Label htmlFor="Password">Password</Label>
              </InputWrapper>
              <Button type="submit">Log in</Button>
            </LoginForm>

            <WhatsHappening />
          </Main>
        </OuterContainer>
      </MainContentContainer>

      <Footer />
    </Wrapper>
  );
};

export default RegisterPage;
