import React from "react";
import Footer from "../../Components/Register/Footer";
import {
  Main,
  MainContentContainer,
  OuterContainer,
  Wrapper,
} from "../../Style/ComponentStyles/RegisterPageStyles";
import RegisterLogo from "../../Components/Register/RegisterLogo";
import WhatsHappening from "../../Components/Register/WhatsHappeningComponent";
import MainPageLoginForm from "../../Components/Register/MainPageLoginForm";

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
