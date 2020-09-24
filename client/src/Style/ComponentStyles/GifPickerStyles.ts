import styled from "styled-components";
import { RiFileGifLine } from "react-icons/ri";
export const GifButton = styled(RiFileGifLine)`
  cursor: pointer;
  color: ${(props) => props.theme.colors.secondary};
  padding: 0.4rem;
  box-sizing: content-box;
  &:hover {
    background-color: ${(props) => props.theme.colors.hoverDark};
  }
`;
export const GifContainer = styled.div`
  -webkit-column-count: 3;
  -webkit-column-gap: 0px;
  -moz-column-count: 3;
  -moz-column-gap: 0px;
  column-count: 3;
  column-gap: 5px;
`;
export const Gif = styled.img`
  width: 100%;
`;
export const SearchContainer = styled.div`
  width: 100%;
  padding: 0.5rem;
  color: ${(props) => props.theme.colors.secondary};
`;
export const SearchInput = styled.input`
  width: 80%;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  border-radius: 1rem;
  padding: 0.6rem 0.4rem;
  background-color: inherit;
  color: white;
  &::placeholder {
    color: ${(props) => props.theme.colors.darkGray};
  }
  &::focus {
    outline: none;
  }
`;
export const LoadingMessage = styled.p`
  font-size: 1.5rem;
  text-align: center;
  color: ${(props) => props.theme.colors.darkGray};
  font-weight: 600;
`;
