import { Link } from "react-router-dom";
import styled from "styled-components";

export const UserWrapper = styled.div`
  padding: 0.4rem;
  color: white;
  display: flex;
  align-items: center;
`;
export const UserTitle = styled(Link)`
  text-decoration: none;
  padding: 0.2rem;
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  &:focus {
    text-decoration: underline;
  }
`;
export const Avatar = styled.img`
  background-color: ${(props) => props.theme.colors.primary};
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;
export const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem;
`;
export const Email = styled.div`
  color: ${(props) => props.theme.colors.darkGray};
  padding: 0 0.2rem;
  font-size: 0.8rem;
`;
