import React from "react";
import styled from "styled-components";
import TweetInput from "../../Components/TweetInput";
const Wrapper = styled.section`
  width: 50%;
  & > div {
    border: 1px solid ${(props) => props.theme.colors.hoverDark};
  }
  & > form {
    border: 1px solid ${(props) => props.theme.colors.hoverDark};
  }
`;
const Title = styled.div`
  padding: 1rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
`;
const Main = () => {
  return (
    <Wrapper>
      <Title>Home</Title>
      <TweetInput />
    </Wrapper>
  );
};

export default Main;
