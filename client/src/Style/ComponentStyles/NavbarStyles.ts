import { Link } from "react-router-dom";
import styled from "styled-components";

export const Button = styled.button`
  width: 80%;
  border: none;
  border-radius: 30px;
  color: white;
  padding: 1rem;
  font-size: 0.9rem;
  background-color: ${(props) => props.theme.colors.secondary};
  font-weight: 700;
  margin-top: 1rem;
  cursor: pointer;
  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const NavBar = styled.nav`
  padding: 0.2rem;
  width: 22%;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${(props) => props.theme.colors.hoverDark};
  justify-content: space-between;
  position: sticky;
  top: 0;
`;
export const TwitterLogo = styled.img`
  width: 45px;
  margin-left: 0.8rem;
`;
export const IconWrapper = styled(Link)`
  text-decoration: none;
  font-weight: 700;
  font-size: 1.3rem;
  color: white;
  padding: 0.5rem 0.8rem;
  margin-top: 0.8rem;
  display: flex;
  align-items: center;
  width: fit-content;
  border-radius: 1.5rem;
  &:hover {
    background-color: ${(props) => props.theme.colors.hoverDark};
    color: ${(props) => props.theme.colors.secondary};
  }
  &:focus {
    outline: none;
    border-radius: 1.5rem;
    color: ${(props) => props.theme.colors.secondary};
    border: 2px solid ${(props) => props.theme.colors.secondaryBlue};
  }
`;
export const AvatarContainer = styled.div`
  display: flex;
  padding: 0.8rem 1rem;
  margin-bottom: 0.8rem;
  border-radius: 1.5rem;
  width: fit-content;
  align-items: center;
  transition: 200ms ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.hoverDark};
  }
  & > p {
    font-weight: 700;
  }
`;
export const Avatar = styled.img`
  width: 40px;
  margin-right: 1.5rem;
  border-radius: 50%;
`;
