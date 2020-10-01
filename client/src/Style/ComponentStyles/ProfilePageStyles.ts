import { Link } from "react-router-dom";
import styled from "styled-components";

export const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const BackgroundPhoto = styled.img`
  width: 100%;
  min-height: 100%;
  object-fit: cover;
`;
export const Background = styled.div`
  width: 100%;
  min-height: 25vh;
  background-color: rgb(61, 84, 102);
`;
export const UserInformation = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid ${(props) => props.theme.colors.dark};
  margin-top: -50px;
`;
export const WhenJoinedInfo = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 0.8rem;
  padding: 0.2rem 0;
`;
export const ProfileLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.darkGray};
  margin-right: 0.4rem;
  &:hover {
    text-decoration: underline;
  }
`;
