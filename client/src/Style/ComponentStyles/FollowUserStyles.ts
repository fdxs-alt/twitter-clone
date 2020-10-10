import { Link } from "react-router-dom";
import styled from "styled-components";

export const WhoToFollowTitle = styled.div`
  font-size: 1.1rem;
  color: white;
  padding-top: 0.6rem;
  padding-left: 0.6rem;
  padding-bottom: 0.2rem;
  font-weight: 700;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;
export const UserWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 0.8rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 1.1rem;
  &:hover {
    background-color: ${(props) => props.theme.colors.hoverDark};
  }
`;

export const UserLink = styled(Link)`
  font-size: 0.8rem;
  color: white;
  text-decoration: none;
  cursor: pointer;
  font-weight: 700;
  margin-right: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

export const Avatar = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 0.4rem;
  border-radius: 50%;
`;
interface FollowButton {
  followed?: boolean;
}
export const FollowButton = styled.button<FollowButton>`
  border: none;
  background-color: ${(props) =>
    props.followed ? props.theme.colors.secondary : "inherit"};
  padding: 0.3rem 1.4rem;
  text-align: center;
  color: ${(props) =>
    props.followed ? "white" : props.theme.colors.secondary};
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  border-radius: 1.5rem;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
export const InfoEmail = styled.p`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 0.4rem;
`;
