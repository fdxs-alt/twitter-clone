import React from "react";
import AllTweets from "../../Components/Home/AllTweets";
import TweetInput from "../../Components/Home/TweetInput";
import { useRootStore } from "../../Store/RootStore";
import { Title, Wrapper } from "../../Style/ComponentStyles/SharedStyles";

const Main = () => {
  const { tweetStore } = useRootStore();

  return (
    <Wrapper>
      <Title>Home</Title>
      <TweetInput
        addPost={(dataToSend: FormData) => tweetStore.addPost(dataToSend)}
        placeholder="What's happening"
      />
      <AllTweets />
    </Wrapper>
  );
};

export default Main;
