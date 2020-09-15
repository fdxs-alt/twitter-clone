import React from "react";
import {
  ButtonsSection,
  TwitterLogo,
  ButtonsTitle,
  JoinTitle,
  SignUpButton,
  LogInButton,
} from "../Style/ComponentStyles/RegisterPageStyles";
import Logo from "../Images/Twitter_Logo_WhiteOnImage.svg";
const WhatsHappening = () => {
  return (
    <ButtonsSection>
      <TwitterLogo src={Logo} />
      <ButtonsTitle>See what’s happening in the world right now</ButtonsTitle>
      <JoinTitle>Join Twitter today.</JoinTitle>
      <SignUpButton>Sign up</SignUpButton>
      <LogInButton>Log in</LogInButton>
    </ButtonsSection>
  );
};

export default WhatsHappening;
