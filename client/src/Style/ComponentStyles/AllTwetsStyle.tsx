import { AiOutlineMessage, AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
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
export const IconsContainer = styled.div`
  width: 100%;
  padding: 0.4rem 0;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.darkGray};
`;
export const IconWrapper = styled.div<NumberInfoProps>`
  width: 20%;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  &:hover {
    color: ${(props) =>
      props.blue
        ? props.theme.colors.secondary
        : props.red
        ? "red"
        : props.theme.colors.success};
  }
`;

export const MessageIcon = styled(AiOutlineMessage)`
  box-sizing: content-box;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.iconHover};
  }
`;
export const RetweetIcon = styled(AiOutlineRetweet)`
  box-sizing: content-box;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.iconHover};
  }
`;

export const LikeIcon = styled(AiOutlineHeart)`
  box-sizing: content-box;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background-color: ${(props) => props.theme.colors.iconHover};
  }
`;
export const MoreActionsIcon = styled(FiUpload)`
  box-sizing: content-box;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.iconHover};
  }
`;

type NumberInfoProps = {
  blue?: boolean;
  red?: boolean;
};
export const NumberInfo = styled.div`
  margin-left: 0.1rem;
`;
