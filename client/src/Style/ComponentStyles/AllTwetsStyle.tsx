import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  color: white;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.colors.border};
  &:hover {
    background-color: ${(props) => props.theme.colors.tweetHover};
  }
`;
export const AvatarWrapper = styled.div`
  padding: 1rem;
  width: 10%;
`;
export const TweetInfoWrapper = styled.div`
  padding: 0.5rem;
  width: 88%;
`;
export const Info = styled.div`
  display: flex;
`;
export const Time = styled.time`
  font-size: 0.8rem;
  padding: 0.4rem;
  color: ${(props) => props.theme.colors.darkGray};
`;
export const UserNameTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;
export const TweetContent = styled.p`
  font-size: 1rem;
  padding: 0 0 0.4rem 0;
`;
type ContainerProps = {
  quantity: number;
};
export const ImagesContainer = styled.div<ContainerProps>`
  width: 100%;
  display: grid;

  grid-template-columns: ${(props) =>
    props.quantity === 1 ? "auto" : "auto auto"};
  justify-content: center;
  gap: 0.4rem;
  padding: 0.4rem 0.6rem;
  border: 2px solid ${(props) => props.theme.colors.hoverDark};
  border-radius: 10px;
`;
export const Image = styled.img`
  width: 100%;
  min-height: 100%;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.hoverDark};
`;