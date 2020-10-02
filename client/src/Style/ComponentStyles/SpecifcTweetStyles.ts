import styled from "styled-components";

export const MainTweetWrapper = styled.div`
  width: 100%;
  padding: 0.9rem;
`;

export const AvatarWrapper = styled.div`
  display: flex;
`;
export const Avatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;
export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.6rem;
`;
export const UserName = styled.h4`
  color: white;
  padding: 0.2rem 0.4rem;
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
  font-size: 1rem;
`;
