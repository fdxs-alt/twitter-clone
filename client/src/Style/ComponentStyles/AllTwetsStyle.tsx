import {
  AiOutlineMessage,
  AiOutlineRetweet,
  AiOutlineHeart,
} from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { Link } from "react-router-dom";
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
export const UserNameTitle = styled(Link)`
  font-size: 1.2rem;
  color: white;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
export const TweetContent = styled.p`
  font-size: 1rem;
  padding: 0 0 0.4rem 0;
`;
type ContainerProps = {
  quantity: number;
};
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
export const ImagesContainer = styled.div<ContainerProps>`
  width: 100%;
  display: grid;

  grid-template-columns: ${(props) =>
    props.quantity === 1 ? "auto" : "auto auto"};
  justify-content: center;
  gap: 0.4rem;
  padding: 0.4rem 0.6rem;
  border-radius: 10px;
`;
export const Image = styled.img`
  width: 100%;
  min-height: 100%;
  object-fit: cover;
  border-radius: 5px;
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
  color: ${(props) =>
    props.done
      ? props.blue
        ? props.theme.colors.secondary
        : props.red
        ? "red"
        : props.theme.colors.success
      : "inital"};

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
  &:focus {
    outline: none;
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
  &:focus {
    outline: none;
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
  &:focus {
    outline: none;
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
  &:focus {
    outline: none;
  }
`;

type NumberInfoProps = {
  blue?: boolean;
  red?: boolean;
  done?: boolean;
};
export const NumberInfo = styled.div`
  margin-left: 0.1rem;
`;
