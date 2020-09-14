import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TwitterIcon from "../Images/Twitter_Logo_WhiteOnImage.svg";
const Wrapper = styled.section`
  width: 50%;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TwitterTag = styled.img`
  width: 60px;
`;
const LoginTitle = styled.h2`
  color: ${(props) => props.theme.colors.white};
  padding: 1rem 0;
`;
const LoginForm = styled.form`
  width: 75%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const InputWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.dark};
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 1.2rem;
`;
const Input = styled.input`
  width: 100%;
  background-color: inherit;
  border: none;
  color: ${(props) => props.theme.colors.white};
  padding: 0.2rem 0.4rem;
  border-bottom: 2px solid ${(props) => props.theme.colors.darkGray};
  font-size: 1.2rem;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.secondary};
  }
`;
const Label = styled.label`
  padding: 0.2rem 0.4rem 0;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.darkGray};
  ${Input}:focus + & {
    color: ${(props) => props.theme.colors.secondary};
  }
`;
const LinkContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  width: 35%;
  justify-content: space-between;
`;
const Button = styled.button`
  width: 100%;
  border: none;
  border-radius: 30px;
  color: white;
  padding: 1rem;
  font-size: 0.9rem;
  background-color: ${(props) => props.theme.colors.secondary};
  font-weight: 700;
`;
const AuthLink = styled(Link)`
  color: ${(props) => props.theme.colors.secondary};
  text-decoration: none;
  font-size: 0.9rem;
  &:hover {
    text-decoration: underline;
  }
`;

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
