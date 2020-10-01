import styled from "styled-components";
import Logo from "../../Images/Twitter_Logo_WhiteOnImage.svg";
type HeaderProps = {
  first?: boolean;
};
export const Header = styled.nav<HeaderProps>`
  width: 100%;
  display: flex;
  justify-content: ${(props) => (props.first ? "flex-end" : "space-between")};
  position: relative;
  padding: 1rem 0;

  ::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${Logo});
    background-repeat: no-repeat;
    background-size: 45px;
    background-position: center;
  }
`;

export const Button = styled.button`
  border: none;
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 0.4rem 0.8rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0.8rem;
  z-index: 20;

  :hover {
    opacity: 0.9;
  }

  :focus {
    outline: none;
  }

  :disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;
export const Wrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ModalContent = styled.div`
  width: 40%;
  max-width: 700px;
  height: 75%;
  overflow-x: hidden;
  background-color: ${(props) => props.theme.colors.primary};
  padding: 1.2rem;
  border-radius: 0.8rem;
`;
export const RegisterError = styled.h2`
  color: ${(props) => props.theme.colors.error};
  padding: 1rem 0;
`;
export const VerifyAccountWrapper = styled.div`
  width: 100%;
  padding: 1rem 0;
`;
