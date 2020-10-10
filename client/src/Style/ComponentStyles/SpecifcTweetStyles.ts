import { Link } from "react-router-dom";
import styled from "styled-components";

export const MainTweetWrapper = styled.div`
  width: 100%;
  padding: 0.9rem;
`;

export const AvatarWrapper = styled.div`
  display: flex;
`;
export const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${(props) => props.theme.colors.primary};
  margin-top: -75px;
  border: 4px solid ${(props) => props.theme.colors.dark};
`;
export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.6rem;
`;
export const UserName = styled(Link)`
  color: white;
  padding: 0.2rem 0.4rem;
  text-decoration: none;
  font-weight: 700;
  &:hover {
    text-decoration: underline;
  }
`;
export const Email = styled.p`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 0.8rem;
  padding: 0.2rem 0.4rem;
`;
export const ContentWrapper = styled.div`
  width: 100%;
`;
export const TweetContent = styled.p`
  font-size: 1.5rem;
  color: white;
  padding: 0.2rem;
`;
export const DateInfo = styled.div`
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.hoverDark};
`;
export const Time = styled.time`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 0.9rem;
`;
