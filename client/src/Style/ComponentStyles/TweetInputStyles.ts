import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { BiSmile } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
export const TweetForm = styled.form`
  width: 100%;
  padding: 0.3rem;
`;
export const Wrapper = styled.div`
  display: flex;
`;
export const Avatar = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 0.4rem;
  border-radius: 50%;
`;

export const TextArea = styled(TextareaAutosize)`
  width: 100%;
  background-color: inherit;
  border: none;
  resize: none;
  color: white;
  font-size: 1.1rem;
  padding: 0.4rem;
  font-family: inherit;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${(props) => props.theme.colors.darkGray};
    font-size: 1.3rem;
  }
`;
export const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-between;
  padding: 0.2rem 0;
  align-items: center;
`;

export const Button = styled.button`
  height: 100%;
  width: 15%;
  padding: 0.5rem;
  color: white;
  border: none;
  background-color: ${(props) => props.theme.colors.secondary};
  font-weight: 700;
  border-radius: 1.5rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.9;
  }
`;
export const EmojiButton = styled(BiSmile)`
  cursor: pointer;
  color: ${(props) => props.theme.colors.secondary};
  border-radius: 50%;
  padding: 0.4rem;
  box-sizing: content-box;
  position: relative;
  &:hover {
    background-color: ${(props) => props.theme.colors.hoverDark};
  }
`;

export const ImageButtonWrapper = styled.div`
  display: flex;
  &:focus {
    outline: none;
  }
`;

export const ImageButton = styled(BsImage)`
  cursor: pointer;
  color: ${(props) => props.theme.colors.secondary};
  padding: 0.4rem;
  box-sizing: content-box;
  position: relative;
  &:hover {
    background-color: ${(props) => props.theme.colors.hoverDark};
  }
`;
export const ImageContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  padding: 0.5rem 2rem;
`;
export const Image = styled.img`
  width: 80%;
  margin: auto;
`;
