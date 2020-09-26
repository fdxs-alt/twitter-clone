import React, { useState } from "react";
import styled from "styled-components";
import AllTweets from "../../Components/Home/AllTweets";
import TweetInput from "../../Components/Home/TweetInput";
import { useRootStore } from "../../Store/RootStore";
import { postTweetURL } from "../../utils/Urls";
import Axios from "../../utils/Axios";
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
  const [tweets, setTweets] = useState<any>([]);
  const { userStore } = useRootStore();
  const addPost = async (dataToSend: FormData) => {
    const response = await Axios.post(
      postTweetURL,
      dataToSend,
      userStore.setFormDataConfig()
    );
    setTweets([response.data, ...tweets]);
  };
  return (
    <Wrapper>
      <Title>Home</Title>
      <TweetInput addPost={addPost} placeholder="What's happening"/>
      <AllTweets setTweets={setTweets} tweets={tweets} />
    </Wrapper>
  );
};

export default Main;
