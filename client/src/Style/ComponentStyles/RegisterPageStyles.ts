import styled from "styled-components";
import Logo from "../../Images/Twitter_Logo_WhiteOnImageMain.svg";
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
`;
export const MainContentContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 95%;
  flex: 50% 50%;
`;

export const LogoContainer = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryBlue};
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  ::after {
    content: "";
    background-image: url(${Logo});
    background-repeat: no-repeat;
    background-size: cover;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: 1;
  }
`;
export const LogoInfos = styled.div`
  width: 45%;
  z-index: 10;
`;
export const LogoInfo = styled.h3`
  width: 100%;
  max-width: 500px;
  padding: 0 0.4rem;
`;
export const IconWithTextContainer = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.white};
  padding: 1.5rem;
`;
export const OuterContainer = styled.div`
  width: 50%;
`;
export const Main = styled.main`
  width: 75%;
  display: flex;
  flex-direction: column;
  float: right;
`;
export const LoginForm = styled.form`
  width: 100%;
  display: flex;
  padding: 1rem 0;
  align-items: center;
  max-width: 680px;
`;
export const Button = styled.button`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 1rem;
  padding: 0.6rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  border-radius: 25px;
  font-weight: 500;
  background: inherit;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8rem;
  }
  &:hover {
    background-color: ${(props) => props.theme.colors.hoverDark};
  }
`;
export const ButtonsSection = styled.section`
  display: flex;
  flex-direction: column;
  height: calc(95vh - 86px);
  justify-content: center;
  color: white;
`;
export const TwitterLogo = styled.img`
  max-width: 70px;
`;
export const ButtonsTitle = styled.h1`
  padding: 1rem 0 2.5rem 0;
  font-size: 1.8rem;
  max-width: 400px;
`;
export const InputWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.dark};
  display: flex;
  width: 35%;
  flex-direction: column-reverse;
  margin-right: 2rem;
`;
export const JoinTitle = styled.h4`
  padding: 0.8rem 0;
`;
export const SignUpButton = styled.button`
  max-width: 400px;
  text-align: center;
  padding: 0.8rem 0;
  border: none;
  background-color: ${(props) => props.theme.colors.secondary};
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.white};
  border-radius: 25px;
  font-weight: 600;
`;
export const LogInButton = styled.button`
  max-width: 400px;
  text-align: center;
  padding: 0.8rem 0;
  border: none;
  background-color: inherit;
  color: ${(props) => props.theme.colors.secondary};
  border: 1px solid ${(props) => props.theme.colors.secondary};
  font-weight: 500;
  border-radius: 25px;
  font-weight: 600;
`;
export const FooterWrapper = styled.footer`
  width: 100%;
`;
export const FeatureList = styled.ul`
  display: flex;
  width: 80%;
  margin: auto;
  height: 5vh;
  list-style-type: none;
  justify-content: space-between;
  align-items: center;
`;
export const Feature = styled.li`
  font-size: 0.8rem;
  padding: 0.4rem;
  color: ${(props) => props.theme.colors.darkGray};
`;
