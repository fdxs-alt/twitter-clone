import { Link } from "react-router-dom";
import styled from "styled-components";
export const Wrapper = styled.section`
  width: 50%;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
`;
export const TwitterTag = styled.img`
  width: 60px;
`;
export const LoginTitle = styled.h2`
  color: ${(props) => props.theme.colors.white};
  padding: 1rem 0;
`;
export const LoginForm = styled.form`
  width: 75%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
export const InputWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.dark};
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 1.2rem;
`;
export const Input = styled.input`
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
export const Label = styled.label`
  padding: 0.2rem 0.4rem 0;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.darkGray};
  ${Input}:focus + & {
    color: ${(props) => props.theme.colors.secondary};
  }
`;
export const LinkContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  width: 35%;
  justify-content: space-between;
`;
export const Button = styled.button`
  width: 100%;
  border: none;
  border-radius: 30px;
  color: white;
  padding: 1rem;
  font-size: 0.9rem;
  background-color: ${(props) => props.theme.colors.secondary};
  font-weight: 700;
`;
export const AuthLink = styled(Link)`
  color: ${(props) => props.theme.colors.secondary};
  text-decoration: none;
  font-size: 0.9rem;
  &:hover {
    text-decoration: underline;
  }
`;
