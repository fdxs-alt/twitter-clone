import React from "react";
import Footer from "../../Components/Footer";
import {
  Main,
  MainContentContainer,
  OuterContainer,
  Wrapper,
} from "../../Style/ComponentStyles/RegisterPageStyles";
import RegisterLogo from "../../Components/RegisterLogo";
import WhatsHappening from "../../Components/WhatsHappeningComponent";
import MainPageLoginForm from "../../Components/MainPageLoginForm";

const RegisterPage = () => {
  return (
    <Wrapper>
      <MainContentContainer>
        <RegisterLogo />
        <OuterContainer>
          <Main>
            <MainPageLoginForm />
            <WhatsHappening />
          </Main>
        </OuterContainer>
      </MainContentContainer>

      <Footer />
    </Wrapper>
  );
};

export default RegisterPage;
