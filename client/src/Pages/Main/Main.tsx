import React, { useState } from "react";
import styled from "styled-components";
import AllTweets from "../../Components/AllTweets";
import TweetInput from "../../Components/TweetInput";

const Wrapper = styled.section`
  width: 50%;
  & > div {
    border: 1px solid ${(props) => props.theme.colors.hoverDark};
  }
  & > form {
    border: 1px solid ${(props) => props.theme.colors.hoverDark};
    border-bottom: 10px solid ${(props) => props.theme.colors.hoverDark};
  }
`;
const Title = styled.div`
  padding: 1rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
`;
const Main = () => {
  const [tweets, setTweets] = useState<any[]>([]);

  return (
    <Wrapper>
      <Title>Home</Title>
      <TweetInput setTweets={setTweets} tweets={tweets} />
      <AllTweets setTweets={setTweets} tweets={tweets} />
    </Wrapper>
  );
};

export default Main;
