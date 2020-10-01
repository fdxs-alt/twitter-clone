import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  color: white;
`;
export const Navigation = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const TwitterLogo = styled.img`
  width: 35px;
  height: 35px;
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &:focus {
    outline: none;
  }
`;
export const Avatar = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${(props) => props.theme.colors.extraExtraLightGray};
`;
export const AddButton = styled.button`
  border: none;
  width: 25px;
  height: 25px;
  background: none;
  position: absolute;
  color: ${(props) => props.theme.colors.extraExtraLightGray};
  border-radius: 50%;
  box-sizing: content-box;
  padding: 0.4rem;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 0.6;
    background: ${(props) => props.theme.colors.tweetHover};
  }
  &:focus {
    outline: none;
  }
`;
export const BackgroundPhoto = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;
