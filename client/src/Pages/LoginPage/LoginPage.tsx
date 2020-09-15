import React from "react";
import TwitterIcon from "../../Images/Twitter_Logo_WhiteOnImage.svg";
import {
  Wrapper,
  TwitterTag,
  LoginTitle,
  LoginForm,
  InputWrapper,
  Input,
  Label,
  Button,
  LinkContainer,
  AuthLink,
} from "../../Style/ComponentStyles/LoginPageStyles";

const LoginPage = () => {
  return (
    <Wrapper>
      <TwitterTag src={TwitterIcon} />
      <LoginTitle>Log in to Twitter</LoginTitle>
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
        <Button>Log in</Button>
      </LoginForm>
      <LinkContainer>
        <AuthLink to="">Forgot password?</AuthLink>
        <AuthLink to="">Sign up for tweeter</AuthLink>
      </LinkContainer>
    </Wrapper>
  );
};

export default LoginPage;
